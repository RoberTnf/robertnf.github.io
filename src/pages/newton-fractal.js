import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ImaginaryPlotter from "../components/newton/plotter_container"

const NewtonFractal = () => (
  <Layout>
    <SEO title="Neuton Fractal" />
    <h1>Newton Fractal</h1>
    Based on{" "}
    <a href="https://www.youtube.com/watch?v=-RdOwhmqP5s">
      3Blue1Brown's video
    </a>
    .
    <ImaginaryPlotter />
  </Layout>
)

export default NewtonFractal
