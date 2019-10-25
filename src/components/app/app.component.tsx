import React from 'react'
import {
  Container,
  StyledButton,
  TextField,
  VerticalLine,
  Wrapper,
  HorizontalLine,
  BottomContainer
} from './app.styles'

function App({ data }: { data: any }): JSX.Element {
  console.log(data)
  const dank = new Array(19).fill(1)
  return (
    <Wrapper>
      <Container>
        {dank.map((item, index) => (
          <HorizontalLine key={`${index * 2}-y`} top={index * 30} />
        ))}
        <TextField>dank</TextField>
        <StyledButton type="button">Start</StyledButton>
        <VerticalLine />
        <BottomContainer />
      </Container>
    </Wrapper>
  )
}

export default App
