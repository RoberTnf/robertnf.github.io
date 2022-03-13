import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { css } from "@emotion/react"

/*
 * Images of websites I have developed.
 * name of image and url of site to be provided from props.
 */

const imageCSS = css`
  border: solid 2px #007199;
  &:hover {
    border: solid 2px #cc6c9d;
  }
  margin: 16px;
`

const PortfolioImage = (props) => (
  <StaticQuery
    query={graphql`
      {
        allFile(filter: { relativePath: { regex: "/png/" } }) {
          edges {
            node {
              name
              childImageSharp {
                gatsbyImageData(width: 960, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      const images = data.allFile.edges
      let selected_img = undefined
      for (let img of images) {
        if (img.node.name === props.name) {
          selected_img = img.node.childImageSharp
        }
      }
      return (
        <a href={props.url} rel="noreferrer noopener" target="blank">
          <GatsbyImage
            image={selected_img.gatsbyImageData}
            css={imageCSS}
            alt="Personal image"
          />
        </a>
      )
    }}
  />
)
export default PortfolioImage
