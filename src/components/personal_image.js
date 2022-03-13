import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { css } from "@emotion/react"

/*
 * Personal image, in the header
 */

const imageCSS = css`
  border-radius: 50%;
  border: solid 4px #007199;
  &:hover {
    border: solid 4px #cc6c9d;
  }
  margin: auto;
`

const Image = () => (
  <StaticQuery
    query={graphql`
      {
        file(relativePath: { eq: "roberto_bw.jpg" }) {
          childImageSharp {
            gatsbyImageData(quality: 90, placeholder: NONE, layout: FIXED)
          }
        }
      }
    `}
    render={(data) => (
      <GatsbyImage
        image={data.file.childImageSharp.gatsbyImageData}
        css={imageCSS}
        alt="Personal Image"
      ></GatsbyImage>
    )}
  />
)
export default Image
