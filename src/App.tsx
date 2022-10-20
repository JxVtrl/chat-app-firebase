import React, { useEffect, useState } from 'react'
import { Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@chakra-ui/react'
import { Main } from './sections'

export interface iUser {
  email: string
  id: number
  name: string
  phone: string
  username: string
  website: string
}[]

export default function App() {
  const [users, setUsers] = useState<iUser[] | null>(null)

  useEffect(() => {
    const getFakeUsers = () => {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(res =>
          res.json()
        )
        .then(data => {
          setUsers(data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    getFakeUsers()
  }, [])

  return (
    <Flex h='100vh' w='100vw' overflow='hidden' justify='center' align='center'>
      <Main users={users} />
    </Flex>
  )
}
