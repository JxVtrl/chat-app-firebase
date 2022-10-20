import React from 'react';
import { Avatar, Flex, Input, InputGroup, InputLeftElement, Text, ModalBody, ModalHeader } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';
import { iUser } from '../../App';

interface iContacts {
    users: iUser[] | null
}

export const Contacts: React.FC<iContacts> = ({ users }) => {
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
      <ModalBody overflow='auto'>
          <Flex h='35px' align='center'>
              <i className="fa-solid fa-download"></i>
              <Text>Arquivadas</Text>
          </Flex>
        {users?.map(item => (
          <>
            <hr />
              <Flex key={item.id} h='65px' align='center'>
                <Avatar name={item.name} src='https://bit.ly/dan-abramov' mr='15px' />
                  
                  {item.name}

              </Flex>
            </>
          ))}
      </ModalBody>     
    </Flex>
  );
}
