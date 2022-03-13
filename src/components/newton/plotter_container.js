import { Component } from "react"
import ImaginaryForm from "./form"
import { complex } from "mathjs"
import { PolynomialRoots } from "../../utils/newton/polynomial"
import NewtonPlot from "./plot"

class NewtonPlotContainer extends Component {
  constructor(props) {
    super(props)

    // Form state
    const inputs = [
      { root: "1", valid: true },
      { root: "-0.5-i", valid: true },
      { root: "-0.5+i", valid: true },
    ]
    const p = new PolynomialRoots(inputs.map((x) => complex(x.root)))
    const formState = {
      inputs: inputs,
      roots: p,
      nNewtonSteps: {
        n: 4,
        valid: true,
      },
      focus: null,
    }

    // state
    this.state = {
      form: formState,
    }

    // binding
    this.handleChangeForm = this.handleChangeForm.bind(this)
  }

  handleChangeForm(event) {
    const idx = event.target.id
    const name = event.target.name
    const formState = this.state.form
    const inputs = formState.inputs
    let focus = null
    let newState = Object.assign({}, this.state)

    if (name === "nNewtonSteps") {
      formState.nNewtonSteps.n = event.target.value
      formState.nNewtonSteps.valid = /^\d+$/.test(formState.nNewtonSteps.n)
      newState.form = formState
    } else if (name === "rootInput") {
      try {
        if (idx === "empty") {
          inputs.push({ root: event.target.value, valid: true })
          focus = inputs.length - 1
        } else if (event.target.value === "") {
          inputs.splice(idx, 1)
          focus = inputs.length - 1
        } else {
          inputs[idx] = { root: event.target.value, valid: true }
        }
        const p = new PolynomialRoots(inputs.map((x) => complex(x.root)))
        newState.form = {
          inputs: inputs,
          roots: p,
          nNewtonSteps: formState.nNewtonSteps,
          focus: focus,
        }
      } catch (err) {
        inputs[idx] = { root: event.target.value, valid: false }
        newState.form = {
          inputs: inputs,
          roots: null,
          nNewtonSteps: formState.nNewtonSteps,
          focus: focus,
        }
      }
    }
    this.setState(newState)
  }

  render() {
    return (
      <div>
        <ImaginaryForm
          inputs={this.state.form.inputs}
          roots={this.state.form.roots}
          focus={this.state.form.focus}
          nNewtonSteps={this.state.form.nNewtonSteps}
          onFormChange={this.handleChangeForm}
        />
        <NewtonPlot
          roots={this.state.form.roots}
          nNewtonSteps={this.state.form.nNewtonSteps.n}
        />
      </div>
    )
  }
}

export default NewtonPlotContainer
