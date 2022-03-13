import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Image from "./personal_image"

const Header = ({ siteTitle }) => (
  <header
    style={{
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `2vw auto`,
        maxWidth: 960,
        textAlign: "center",
      }}
    >
      <Link to="/">
        <Image />
      </Link>
      <Link to="/">
        <h1
          style={{
            margin: "16px",
            fontSize: "46px",
          }}
        >
          {siteTitle}
        </h1>
      </Link>
      <h2>Data Scientist, Physicist & Full Stack Web Developer</h2>
      <p>
        <a href="mailto:robertodiaztnf@gmail.com">
          <span className="material-icons" style={{ verticalAlign: "middle" }}>
            mail_outline
          </span>{" "}
        </a>
        | <Link to="/posts">Posts</Link>
      </p>
    </div>
    <hr />
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
