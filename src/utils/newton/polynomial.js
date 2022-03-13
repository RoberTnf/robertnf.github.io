import { complex, multiply, add, min, max, pow } from "mathjs"

class Polynomial {
  // Stores a complex polynomial by storing its coefficients.
  // Coefficients alter between real and imaginary.
  // [1,2, 0, 1] => 1 + 2i + ix
  constructor(p) {
    this.p = p
    this.calculate = this.calculate.bind(this)
  }

  calculate(x) {
    return this.p.reduce((acc, el, i) => {
      let degree = Math.floor(i / 2)
      let imaginary = i % 2 === 1
      let element = imaginary ? complex(0, el) : complex(el, 0)
      let res = add(multiply(element, pow(x, degree)), acc)
      return complex("0")
    }, 0)
  }

  toString() {
    return this.p
      .map((el, i) => {
        let degree = Math.floor(i / 2)
        let imaginary = i % 2
        if (el === 0) {
          return ""
        } else if (degree === 0) {
          return el + (imaginary === 0 ? "" : "i")
        } else if (el === 1) {
          return (imaginary === 0 ? "" : "i") + "x^" + degree
        } else if (degree === 1) {
          return el + (imaginary === 0 ? "" : "i") + "x"
        } else {
          return el + (imaginary === 0 ? "" : "i") + "x^" + degree
        }
      })
      .filter((el) => el !== "")
      .join(" + ")
      .replaceAll(" + -", " - ")
      .replaceAll(" - +", " - ")
  }

  get derivative() {
    let result = []
    this.p.forEach((a, i) => {
      let degree = Math.floor(i / 2)
      if (degree === 0) {
        return
      } else {
        result[i - 2] = degree * a
      }
    })

    return new Polynomial(result)
  }

  static fromRoots(roots) {
    // Expands a polynomial defined by its roots.
    // inspiration from https://stackoverflow.com/questions/43074714/how-to-calculate-coefficients-of-polynomial-expansion-in-javascript
    // expanded it to work with complex numbers
    const multiply = (a1, a2) => {
      let result = []
      a1.forEach((a, i) => {
        a2.forEach((b, j) => {
          // i*i=-1
          let signChange = i % 2 === 1 && j % 2 === 1 ? -1 : 1
          let degree = Math.floor(i / 2) + Math.floor(j / 2)
          let imaginaryOffset = (i + j) % 2 === 0 ? 0 : 1
          let idx = degree * 2 + imaginaryOffset
          let currentRes = a * b * signChange
          result[idx] = (result[idx] || 0) + currentRes
        })
      })
      return result
    }

    const rootsAsPolynomials = roots.r.map((root) => [-root.re, -root.im, 1, 0])
    const p = rootsAsPolynomials.reduce(multiply)

    return new Polynomial(p)
  }
}

class PolynomialRoots {
  // Stores polynomial defined by its roots
  constructor(r) {
    this.r = r
    this.toString = this.toString.bind(this)
    this.range = this.range.bind(this)
  }

  toString() {
    return this.r.reduce(
      (acc, el) => acc + "(x - (" + el.toString() + ")) \\;",
      " "
    )
  }

  range(offset) {
    offset = offset || 0
    let beforeOffset = {
      x: {
        min: min(this.r.map((x) => x.re)),
        max: max(this.r.map((x) => x.re)),
      },
      y: {
        min: min(this.r.map((x) => x.im)),
        max: max(this.r.map((x) => x.im)),
      },
    }

    let xOffset = (beforeOffset.x.max - beforeOffset.x.min) * 0.1
    let yOffset = (beforeOffset.y.max - beforeOffset.y.min) * 0.1
    yOffset = yOffset === 0 ? xOffset : yOffset
    xOffset = xOffset === 0 ? yOffset : xOffset
    return {
      x: {
        min: beforeOffset.x.min - xOffset,
        max: beforeOffset.x.max + xOffset,
      },
      y: {
        min: beforeOffset.y.min - yOffset,
        max: beforeOffset.y.max + yOffset,
      },
    }
  }
}

export { Polynomial, PolynomialRoots }
