import { Component } from "react"
import { css } from "@emotion/react"
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js"
import { MathJax, MathJaxContext } from "better-react-mathjax"
import { Polynomial } from "../../utils/newton/polynomial"
import { asMathJax } from "../../utils/utils"

const invalidInput = css`
  background-color: #f9b8b8;
`
const validInput = css``

const polynomialAttribContainer = css`
  display: grid;
  grid-template-columns: 50% 50%;
`

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

class ImaginaryForm extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.onFormChange(e)
  }

  render() {
    // roots
    const roots = this.props.roots
    const RootElements = this.props.inputs.map((x, i) => {
      let ref = i === this.props.focus ? (input) => input && input.focus() : ""
      return (
        <input
          onChange={this.handleChange}
          css={x.valid ? validInput : invalidInput}
          type="text"
          name="rootInput"
          key={i}
          id={i}
          value={x.root}
          ref={ref}
        />
      )
    })

    // extra root, allows higher grades
    RootElements.push(
      <input
        onChange={this.handleChange}
        css={invalidInput}
        type="text"
        name="rootInput"
        value=""
        id={RootElements.length}
        key={RootElements.length}
      />
    )
    const FormContainer = (
      <div>
        Polynomial roots: <div>{RootElements}</div>
        <div css={polynomialAttribContainer}>
          <span>Newton's method steps: </span>
          <input
            name="nNewtonSteps"
            onChange={this.handleChange}
            value={this.props.nNewtonSteps.n}
            css={this.props.nNewtonSteps.valid ? validInput : invalidInput}
          />
          <span>Number of triangles: </span>
          <input
            name="nTriangles"
            onChange={this.handleChange}
            value={this.props.nTriangles.n}
            css={this.props.nTriangles.valid ? validInput : invalidInput}
          />
        </div>
      </div>
    )

    if (!roots) {
      return <MathJaxContext>{FormContainer}</MathJaxContext>
    }

    // polynomials
    const polynomial = Polynomial.fromRoots(roots)
    const derivative = polynomial.derivative

    // MathJax elements
    const parsedRoots = (
      <MathJax>
        {roots ? asMathJax(roots.toString()) : "Error parsing polynomial"}
      </MathJax>
    )
    const parsedPolynomial = (
      <MathJax>{roots ? asMathJax(polynomial.toString()) : ""}</MathJax>
    )
    const parsedDerivative = (
      <MathJax>{roots ? asMathJax(derivative.toString()) : ""}</MathJax>
    )

    return (
      <MathJaxContext>
        {FormContainer}
        <div css={polynomialAttribContainer}>
          <span>Roots: </span>
          {parsedRoots} <span>Expanded polynomial: </span>
          {parsedPolynomial}
          <span>Derivative: </span>
          {parsedDerivative}
        </div>
      </MathJaxContext>
    )
  }
}

export default ImaginaryForm
