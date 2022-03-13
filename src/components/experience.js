import React from "react"
import styled from "@emotion/styled"

const Container = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  margin-bottom: 36px;
`

const Left = styled.div`
  border-right: 1px solid black;
  text-align: center;
`

const Right = styled.div`
  margin-left: 16px;
`

const Experience = (props) => {
  return (
    <Container>
      <Left>{props.dates}</Left>
      <Right>{props.content}</Right>
    </Container>
  )
}

export default Experience
