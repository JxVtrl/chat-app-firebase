import React from 'react';
import { Avatar, Flex, Input, Text, InputGroup, InputLeftElement, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@chakra-ui/react'
import { useApp } from '../../context';
import { SearchIcon } from '@chakra-ui/icons';
import bgDefault from '../../assets/img/whatsApp.jpeg'

export const Chat: React.FC = () => {
  const { contactSelected }: any = useApp()

  return (
    <Flex w='100%' direction='column'>
      <ModalHeader
        as={Flex}
        direction='row'
        w='100%'
        bgColor='#dddddddd'
      >
        {contactSelected && (
          <>
            <Avatar name={contactSelected?.name} />
            <Flex  ml='20px' w='100%' align='center' justify='space-between'>
              <Flex direction='column'>
                <Text
                  fontSize='16px'
                >
                  {contactSelected?.name}
                </Text>
                <Text
                  fontSize='12px'
                  fontWeight='400'
                  letterSpacing='1px'
                
                >
                  online
                </Text>

              </Flex>
              <Flex gap='35px' align='center'>
                <SearchIcon />
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </Flex>
            </Flex>
          </>
        )}
      </ModalHeader>
      <ModalBody
        w='100%'
        h='100%'
        bgImage={bgDefault}
        bgPos='center'
        bgSize='contain'
      >

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
