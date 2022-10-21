import React from 'react';
import { Avatar, Flex, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@chakra-ui/react'
import { iUser } from '../../App';

interface iChat {
  contact: iUser | undefined
}

export const Chat: React.FC<iChat> = ({ contact }) => {
  return (
    <Flex w='100%' direction='column'>
      <ModalHeader as={Flex} direction='column' w='100%' bgColor='silver'>

      </ModalHeader>
      <ModalBody w='100%' h='100%'>

      </ModalBody>
      
      <ModalFooter w='100%' h='45px' gap='15px'>
        <i className="fa-solid fa-face-grin-wide fa-lg"></i>
        <i className="fa-solid fa-paperclip fa-lg"></i>
        <Input placeholder='Mensagem' />
        <i className="fa-solid fa-microphone fa-lg"></i>
      </ModalFooter>
    </Flex>
  );
}
