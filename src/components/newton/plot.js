import { Component, createRef, useRef } from "react"
import { Polynomial } from "../../utils/newton/polynomial"
import * as palette from "google-palette"
import { add, complex, multiply, pi, square, subtract } from "mathjs"
import { newton } from "../../utils/newton/newton"
import { BinaryHeap } from "../../utils/binary-heap.js"

class Canvas extends Component {
  constructor(props) {
    super(props)
    this.ref = createRef()
    this.height = 400
    this.width = 900
    this.drawFractal = this.drawFractal.bind(this)
  }

  drawFractal() {
    const roots = this.props.roots
    const canvas = this.ref.current
    const ctx = canvas.getContext("2d")
    ctx.translate(0.5, 0.5)
    const range = roots.range(0.1)
    const coordToPx = (x, y) => {
      const xFraction = (x - range.x.min) / (range.x.max - range.x.min)
      const yFraction = (y - range.y.min) / (range.y.max - range.y.min)

      return [xFraction * this.width, this.height * (1 - yFraction)]
    }
    const pal = palette("tol", roots.r.length)

    const polynomial = Polynomial.fromRoots(roots)
    const derivative = polynomial.derivative
    const triangles = getTriangles(
      range,
      polynomial,
      derivative,
      roots,
      this.props.nNewtonSteps
    )

    triangles.content.forEach((tt) => {
      ctx.beginPath()
      const [p1, p2, p3] = tt.points.map((el) => coordToPx(el.re, el.im))
      ctx.moveTo(...p1)
      ctx.lineTo(...p2)
      ctx.lineTo(...p3)
      ctx.lineTo(...p1)
      ctx.fillStyle = "#" + pal[tt.closestRoot[0]]
      ctx.strokeStyle = "black"
      ctx.strokeStyle = "#" + pal[tt.closestRoot[0]]
      ctx.lineWidth = 3
      ctx.stroke()
      ctx.fill()
    })
    roots.r.forEach((r, i) => {
      const p = coordToPx(r.re, r.im)
      ctx.beginPath()
      ctx.arc(...p, 5, 0, 2 * pi)
      ctx.fillStyle = "#" + pal[i]
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 2
      ctx.fill()
      ctx.stroke()
    })
  }

  componentDidMount() {
    this.drawFractal()
  }

  componentDidUpdate() {
    this.drawFractal()
  }

  render() {
    return (
      <canvas
        ref={this.ref}
        height="400"
        width="900"
        style={{ border: "1px solid black" }}
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
      <Canvas roots={this.props.roots} nNewtonSteps={this.props.nNewtonSteps} />
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
      let metric = sameRoots ? magnitude / 3 : magnitude
      metrics.push(metric)

      if (metric > max_metric.metric) {
        max_metric.metric = metric
        max_metric.side = sides
      }
    })
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

function getTriangles(range, polynomial, derivative, roots, nNewtonSteps) {
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
  let nSteps = 10000
  for (var _idx = 0; _idx < nSteps; _idx++) {
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

    /*
    // Insert new triangles into ordered list
    // TODO make it in N, rather than 2N?
    let insertAt = null
    for (let i = 0; i < triangles.length; i++) {
      const tt = triangles[i]
      if (t1.max_metric.metric < tt.max_metric.metric) {
        insertAt = i
        break
      }
    }
    insertAt = insertAt || insertAt === 0 ? insertAt : triangles.length
    triangles.splice(insertAt, 0, t1)
    insertAt = null
    for (let i = 0; i < triangles.length; i++) {
      const tt = triangles[i]
      if (t2.max_metric.metric < tt.max_metric.metric) {
        insertAt = i
        break
      }
    }
    insertAt = insertAt || insertAt === 0 ? insertAt : triangles.length
    triangles.splice(insertAt, 0, t2)
    */
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

function generateXYGrid(range, npoints) {
  let xrange = linspace(range.x.min, range.x.max, npoints)
  let yrange = linspace(range.y.min, range.y.max, npoints)

  let res = {
    x: [],
    y: [],
  }
  xrange.forEach((x) =>
    yrange.forEach((y) => {
      res.x.push(x)
      res.y.push(y)
    })
  )
  return res
}

function linspace(start, stop, npoints) {
  let step = (stop - start) / (npoints - 1)
  let arr = []
  for (let i = 0; i < npoints; i++) {
    arr.push(start + i * step)
  }
  return arr
}
