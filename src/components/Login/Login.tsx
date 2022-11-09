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
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function Login() {
  return (
    <Modal isOpen={true} onClose={() => null}>
      <ModalOverlay />
      <ModalContent placeSelf="center" h="60vh">
        <ModalHeader textAlign="center">
          <Text fontSize="2xl" fontWeight="bold">
            Jx's Chat
          </Text>
          <Text fontSize="sm" fontWeight="medium">
            Login
          </Text>
        </ModalHeader>
        <ModalBody></ModalBody>

        <ModalFooter as={Flex} flexDirection="column" gap="15px">
          <Button w="100%">Fazer Login</Button>
          <Link to="/register">
            <Flex direction="column" align="center">
              <Text>Ainda não tem uma conta?</Text>
              <Text
                transition="all 0.2s ease-in-out"
                _hover={{ color: "#8790aadd" }}
              >
                Cadastre-se aqui
              </Text>
            </Flex>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
