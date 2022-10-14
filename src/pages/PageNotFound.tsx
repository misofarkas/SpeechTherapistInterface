import { Container, Heading } from '@chakra-ui/react'

function PageNotFound() {
  return (
    <Container textAlign="center">
        <Heading fontSize="5rem">404</Heading>
        <Heading fontSize="3rem">Page not found</Heading>
    </Container>
  )
}

export default PageNotFound