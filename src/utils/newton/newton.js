import { complex, divide, subtract, Complex, abs } from "mathjs"

function newton(f, fprime, x0, steps) {
  // TODO: magic number
  const ATOL = 1e-5
  let current = x0
  for (let i = 0; i < steps; i++) {
    let fvalue = f(current)
    let fpvalue = fprime(current)
    let next = subtract(current, divide(fvalue, fpvalue))
    if (abs(subtract(current, next)) < ATOL) {
      return current
    } else if (Complex.compare(fpvalue, complex("0")) === 0) {
      return null
    }

    current = next
  }
  return current
}

export { newton }
