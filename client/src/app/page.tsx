'use client'
import { Container } from '@chakra-ui/react'
import TaskPage from './component/taskPage'
export default function Page() {
  return (
    <Container>
      <TaskPage />
      {/* <TaskList /> */}
    </Container>
  )

}