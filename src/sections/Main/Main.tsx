import React from 'react';
import { Avatar, Flex, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@chakra-ui/react'
import { iUser } from '../../App';
import { SearchIcon } from '@chakra-ui/icons';
import { Contacts, Chat } from '../../components';

interface iMain {
    users: iUser[] | null
}

export const Main: React.FC<iMain> = ({ users }) => {
    return (
        <Modal isOpen={true} onClose={() => null}>
            <ModalContent w='100%' maxW='80%' maxH='85%' h='100%' as={Flex} flexDirection='row'>
                <Contacts users={users} />
                <Chat />
            </ModalContent>
        </Modal>
    );
}
