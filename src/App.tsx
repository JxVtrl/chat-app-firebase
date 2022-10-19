import { Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@chakra-ui/react'
import { useState } from 'react'

export default function App() {

  return (
    <Flex h='100vh' w='100vw' overflow='hidden' justify='center' align='center'>
      <Modal isOpen={true} onClose={() => null}>
        <ModalContent w='100%' maxW='80%'>
          <ModalHeader>
a
          </ModalHeader>
          <ModalBody>

          </ModalBody>

          <ModalFooter>

          </ModalFooter>
        </ModalContent>
      </Modal>

    </Flex>
  )
}
