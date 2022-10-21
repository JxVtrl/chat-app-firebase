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
  photos: string
}[]

export default function App() {
  const [users, setUsers] = useState<iUser[] | null>(null)
  const [contactSelected, setContactSelected] = useState<iUser | undefined>(undefined)

  useEffect(() => {
    const getFakeUsers = async () => {
      let photos: any
      await fetch('https://jsonplaceholder.typicode.com/users')
        .then(res =>
          res.json()
        )
        .then(data => {
          setUsers(data)
        })
        .catch(err => {
            console.log(err)
        })
      
      await fetch('https://jsonplaceholder.typicode.com/photos')
        .then(res =>
          res.json()
        )
        .then(data => {
          photos = data
        })
        .catch(err => {
            console.log(err)
        })

      if (users && photos) {
        const usersWithPhotos = users.map(user => {
          const photo = photos?.find((photo: any) => photo.id === user.id)
          return {
            ...user,
            photos: photo?.url
          }
        })
        setUsers(usersWithPhotos)
      }
    }

    getFakeUsers()
  }, [])

  return (
    <Flex h='100vh' w='100vw' overflow='hidden' justify='center' align='center'>
      <Main users={users} setContact={setContactSelected} contact={contactSelected} />
    </Flex>
  )
}
