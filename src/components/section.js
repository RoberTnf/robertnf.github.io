import React from "react"

const Section = (props) => (
  <div>
    <h2 style={{ textAlign: "center" }}>{props.title}</h2>
    {props.text}
    <hr
      style={{
        margin: "3rem auto",
        width: "10vw",
      }}
    />
  </div>
)

export default Section
