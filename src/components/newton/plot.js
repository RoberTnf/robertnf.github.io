import { Component, createContext, createRef, useRef } from "react"
import { Polynomial } from "../../utils/newton/polynomial"
import * as palette from "google-palette"
import { add, complex, max, min, multiply, pi, square, subtract } from "mathjs"
import { newton } from "../../utils/newton/newton"
import { BinaryHeap } from "../../utils/binary-heap.js"

class Canvas extends Component {
  constructor(props) {
    super(props)
    this.ref = createRef()
    this.height = 400
    this.width = 900
    this.drawFractal = this.drawFractal.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.state = { range: this.props.roots.range(0.1) }
    this.handleChangeRange = this.handleChangeRange.bind(this)
    this.start = null
  }

  handleChangeRange(range) {
    let newState = Object.assign({}, this.state)
    newState.range = range
    this.setState(newState)
  }

  coordToPx = (x, y, range) => {
    const xFraction = (x - range.x.min) / (range.x.max - range.x.min)
    const yFraction = (y - range.y.min) / (range.y.max - range.y.min)

    return [xFraction * this.width, this.height * (1 - yFraction)]
  }
  PxToCoord = (x, y, range) => {
    const canvas = this.ref.current
    const xFraction = x / canvas.width
    const yFraction = (y - canvas.height) / -canvas.height

    return [
      range.x.min + xFraction * (range.x.max - range.x.min),
      range.y.min + yFraction * (range.y.max - range.y.min),
    ]
  }

  drawFractal() {
    const roots = this.props.roots
    const canvas = this.ref.current
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const pal = palette("tol", roots.r.length)

    const polynomial = Polynomial.fromRoots(roots)
    const derivative = polynomial.derivative
    const triangles = getTriangles(
      this.state.range,
      polynomial,
      derivative,
      roots,
      this.props.nNewtonSteps,
      this.props.nTriangles
    )

    triangles.content.forEach((tt) => {
      ctx.beginPath()
      const [p1, p2, p3] = tt.points.map((el) =>
        this.coordToPx(el.re, el.im, this.state.range)
      )
      ctx.moveTo(...p1)
      ctx.lineTo(...p2)
      ctx.lineTo(...p3)
      ctx.lineTo(...p1)
      ctx.fillStyle = "#" + pal[tt.closestRoot[0]]
      ctx.strokeStyle = "black"
      ctx.strokeStyle = "#" + pal[tt.closestRoot[0]]
      ctx.lineWidth = 2
      ctx.fill()
      ctx.stroke()

      if (false) {
        ctx.strokeStyle = "black"
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(...p1, 1, 0, 2 * pi)
        ctx.fillStyle = "#" + pal[tt.closestRoot[0]]
        ctx.fill()
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(...p2, 1, 0, 2 * pi)
        ctx.fillStyle = "#" + pal[tt.closestRoot[1]]
        ctx.fill()
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(...p3, 1, 0, 2 * pi)
        ctx.fillStyle = "#" + pal[tt.closestRoot[2]]
        ctx.fill()
        ctx.stroke()
      }
    })
    roots.r.forEach((r, i) => {
      const p = this.coordToPx(r.re, r.im, this.state.range)
      ctx.beginPath()
      ctx.arc(...p, 5, 0, 2 * pi)
      ctx.fillStyle = "#" + pal[i]
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 2
      ctx.fill()
      ctx.stroke()
    })
  }

  clientToCanvas(x, y) {
    const canvas = this.ref.current
    const rect = canvas.getBoundingClientRect()
    return [x - rect.left, y - rect.top]
  }

  componentDidMount() {
    this.drawFractal()
  }

  componentDidUpdate() {
    this.drawFractal()
  }

  onMouseDown(event) {
    let [x, y] = this.clientToCanvas(event.clientX, event.clientY)
    this.start = this.PxToCoord(x, y, this.state.range)
    console.log("Start: ", this.start)
  }

  onMouseUp(event) {
    let [canvasx, canvasy] = this.clientToCanvas(event.clientX, event.clientY)
    let end = this.PxToCoord(canvasx, canvasy, this.state.range)
    console.log("End: ", end)
    let x = [this.start[0], end[0]]
    let y = [this.start[1], end[1]]
    let range = {
      x: { min: min(...x), max: max(...x) },
      y: { min: min(...y), max: max(...y) },
    }
    this.handleChangeRange(range)
  }

  render() {
    return (
      <canvas
        ref={this.ref}
        height="400"
        width="900"
        style={{ border: "1px solid black" }}
        onMouseUp={this.onMouseUp}
        onMouseDown={this.onMouseDown}
      ></canvas>
    )
  }
}

class NewtonPlot extends Component {
  render() {
    const roots = this.props.roots
    if (!roots) {
      return null
    }

    return (
      <Canvas
        roots={this.props.roots}
        nNewtonSteps={this.props.nNewtonSteps}
        nTriangles={this.props.nTriangles}
      />
    )
  }
}

export default NewtonPlot

class Triangle {
  static fromPoints(points, polynomial, derivative, roots, nNewtonSteps) {
    // Calculate closest roots
    const closestRoots = points.map((p) =>
      getClosestRoot(p, polynomial, derivative, nNewtonSteps, roots)
    )

    return new Triangle(points, closestRoots)
  }

  constructor(points, closestRoots) {
    this.points = points
    this.closestRoot = closestRoots
    let metrics = []
    // Get largest distance between sides
    let max_metric = {
      side: null,
      metric: -1,
    }
    const sides = [
      [0, 1],
      [0, 2],
      [1, 2],
    ]
    sides.forEach((sides) => {
      const p1 = points[sides[0]]
      const p2 = points[sides[1]]
      const sameRoots = closestRoots[sides[0]] === closestRoots[sides[1]]
      const diff = subtract(p1, p2)
      let magnitude = square(diff.re) + square(diff.im)
      // TODO: extract magic number
      let metric = sameRoots ? magnitude / 1.3 : magnitude
      metrics.push(metric)

      if (metric > max_metric.metric) {
        max_metric.metric = metric
        max_metric.side = sides
      }
    })

    // Calculate TODO organize
    max_metric.metric = metrics.reduce((el, acc) => el * acc)
    this.metrics = metrics
    this.max_metric = max_metric
  }

  split(polynomial, derivative, roots, nNewtonSteps) {
    const sideToSplit = this.max_metric.side
    let p1 = this.points[sideToSplit[0]]
    let p2 = this.points[sideToSplit[1]]
    const middlePoint = multiply(add(p1, p2), 0.5)
    const middlePointClosestRoot = getClosestRoot(
      middlePoint,
      polynomial,
      derivative,
      nNewtonSteps,
      roots
    )
    const oppositePointIdx = [0, 1, 2].filter(
      (el) => !sideToSplit.includes(el)
    )[0]
    const oppositePoint = this.points[oppositePointIdx]

    const t1 = new Triangle(
      [oppositePoint, middlePoint, p1],
      [
        this.closestRoot[oppositePointIdx],
        middlePointClosestRoot,
        this.closestRoot[sideToSplit[0]],
      ]
    )
    const t2 = new Triangle(
      [oppositePoint, middlePoint, p2],
      [
        this.closestRoot[oppositePointIdx],
        middlePointClosestRoot,
        this.closestRoot[sideToSplit[1]],
      ]
    )

    return [t1, t2]
  }
}

function getTriangles(
  range,
  polynomial,
  derivative,
  roots,
  nNewtonSteps,
  nTriangles
) {
  // Starting two triangles
  const t1 = Triangle.fromPoints(
    [
      complex(range.x.min, range.y.min),
      complex(range.x.min, range.y.max),
      complex(range.x.max, range.y.min),
    ],
    polynomial,
    derivative,
    roots,
    nNewtonSteps
  )
  const t2 = Triangle.fromPoints(
    [
      complex(range.x.min, range.y.max),
      complex(range.x.max, range.y.max),
      complex(range.x.max, range.y.min),
    ],
    polynomial,
    derivative,
    roots,
    nNewtonSteps
  )
  let triangles = new BinaryHeap((el) => -el.max_metric.metric)
  triangles.push(t1)
  triangles.push(t2)

  // TODO: extract magic number
  const start = new Date().getTime()
  for (var _idx = 0; _idx < nTriangles; _idx++) {
    // remove triangle with largest metric and split it
    let triangleToSplit = triangles.pop()
    let [t1, t2] = triangleToSplit.split(
      polynomial,
      derivative,
      roots,
      nNewtonSteps
    )

    triangles.push(t1)
    triangles.push(t2)
  }

  console.log(
    "Generated " +
      triangles.content.length +
      " triangles in " +
      (new Date().getTime() - start) +
      " ms"
  )

  return triangles
}

function getClosestRoot(point, polynomial, derivative, nNewtonSteps, roots) {
  let newtonMinimum = newton(
    polynomial.calculate,
    derivative.calculate,
    point,
    nNewtonSteps
  )

  let distances = roots.r.map((r) => {
    let s = subtract(r, newtonMinimum)
    return square(s.re) + square(s.im)
  })

  let closestRoot = distances.reduce(
    (iMin, x, i, arr) => (x < arr[iMin] ? i : iMin),
    0
  )

  return closestRoot
}
