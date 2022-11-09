import React from 'react';
import { Avatar, Flex, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';
import { Contacts, Chat } from '../../components';

export const Main: React.FC = () => {
    return (
        <Modal isOpen={true} onClose={() => null}>
            <ModalContent w='100%' maxW='80%' maxH='85%' h='100%' as={Flex} flexDirection='row'>
                <Contacts />
                <Chat />
            </ModalContent>
        </Modal>
    );
}
