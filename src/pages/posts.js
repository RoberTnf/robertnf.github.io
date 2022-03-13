import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Posts = () => (
  <Layout>
    <SEO title="Post list" />
    <h1>Post list</h1>
    <li>
      <ul>
        <Link to="/newton-fractal">Newton Fractal</Link>
      </ul>
    </li>
  </Layout>
)

export default Posts
