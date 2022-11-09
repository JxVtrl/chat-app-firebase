import React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
    Button,
  Text,
} from '@chakra-ui/react'


export function Login() {

    return (
        <Modal isOpen={true} onClose={()=> null}>
        <ModalOverlay />
        <ModalContent>
                <ModalHeader>
                    <Text fontSize='2xl' fontWeight='bold'>
                        Faça seu Login
                    </Text>
                </ModalHeader>
            <ModalBody>
                    

            </ModalBody>

            <ModalFooter>
            
            </ModalFooter>
        </ModalContent>
      </Modal>
        
    )
}