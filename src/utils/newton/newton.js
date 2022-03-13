import { complex, divide, subtract, Complex } from "mathjs"

function newton(f, fprime, x0, steps) {
  let current = x0
  for (let i = 0; i < steps; i++) {
    let fvalue = f(current)
    let fpvalue = fprime(current)
    if (Complex.compare(fvalue, complex("0")) === 0) {
      return current
    } else if (Complex.compare(fpvalue, complex("0")) === 0) {
      return null
    }
    current = subtract(current, divide(fvalue, fpvalue))
  }
  return current
}

export { newton }
