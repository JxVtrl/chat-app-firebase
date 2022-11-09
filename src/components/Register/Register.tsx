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
} from "@chakra-ui/react";

export function Register() {
  return (
    <Modal isOpen={true} onClose={() => null}>
      <ModalOverlay />
      <ModalContent placeSelf="center" h="60vh">
        <ModalHeader textAlign="center">
          <Text fontSize="2xl" fontWeight="bold">
            Jx's Chat
          </Text>
          <Text fontSize="sm" fontWeight="medium">
            Register
          </Text>
        </ModalHeader>
        <ModalBody></ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
