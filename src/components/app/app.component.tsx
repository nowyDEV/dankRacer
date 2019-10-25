import React from 'react'
import { Container, StyledButton, TextField, VerticalLine, Wrapper } from './app.styles'

function App({ data }: { data: any }): JSX.Element {
  console.log(data)
  return (
    <Wrapper>
      <Container>
        <TextField>dank</TextField>
        <StyledButton type="button">Start</StyledButton>
        <VerticalLine />
      </Container>
    </Wrapper>
  )
}

export default App
