import React from 'react';
import { Avatar, Flex, Input, InputGroup, InputLeftElement, Text, ModalBody, ModalHeader } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';
import { iUser } from '../../App';

interface iContacts {
  users: iUser[] | null
  setContact: React.Dispatch<React.SetStateAction<iUser | undefined>>
}

export const Contacts: React.FC<iContacts> = ({ users, setContact }) => {

  const handleContactSelection = (id: number) => {
    if (users) {
      const user = users.find(user => user.id === id)
      setContact(user)
    }
  }


  return (
    <Flex direction='column' w={'33%'}>
      <ModalHeader as={Flex} direction='column' w='100%' gap='15px'>
          <Flex w='100%' align='center' justify='space-between'>
              <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
              <Flex color='#474747' gap='35px'>
                  <Flex w='20px' justify='center' align='center'>
                      <i className="fa-solid fa-circle-notch"></i>
                  </Flex>
                  <Flex w='20px' justify='center' align='center'>
                      <i className="fa-solid fa-message"></i>
                  </Flex>
                  <Flex w='20px' justify='center' align='center'>
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                  </Flex>
              </Flex>
          </Flex>
          <Flex w='100%' align='center' gap='15px'>
              <InputGroup>
                  <InputLeftElement
                      pointerEvents='none'
                      children={<SearchIcon color='gray.300' />}
                  />
                  <Input
                      type='txt'
                      placeholder='Pesquisar ou começar uma nova conversa'
                  />
              </InputGroup>

              <i className="fa-solid fa-filter" />
          </Flex>
      </ModalHeader>
      <ModalBody overflow='auto' p='0'>
          <Flex h='35px' align='center' gap='15px' _hover={{ bgColor: 'silver' }} cursor='pointer' px='24px'>
              <i className="fa-solid fa-download"></i>
              <Text>Arquivadas</Text>
          </Flex>
        {users?.map(item => (
          <>
            <hr />
              <Flex onClick={() => handleContactSelection(item.id)} key={item.id} h='65px' align='center' _hover={{ bgColor: 'silver' }} cursor='pointer' px='24px' overflow='hidden'  > 
                <Avatar name={item.name} src={item.photos} mr='15px' />
                <Flex w='100%' direction='column'>
                  <Text>{item.name}</Text>
                  {/* <Text overflow='hidden' w='90%' textOverflow='ellipsis' whiteSpace='nowrap'>{photos ? photos[item.id].title : undefined}</Text> */}
                </Flex>
              </Flex>
            </>
          ))}
      </ModalBody>     
    </Flex>
  );
}
