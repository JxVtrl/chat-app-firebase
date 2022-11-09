import React from "react";
import {
  Avatar,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Contacts, Chat } from "../../components";
import { useDevice } from "../../hooks";
import { useApp } from "../../context";

export const Main: React.FC = () => {
  const { isMobile } = useDevice();
  const { contactSelected }: any = useApp();

  return (
    <Modal isOpen={true} onClose={() => null}>
      <ModalContent
        w="100%"
        maxW="80%"
        maxH="85%"
        h="100%"
        as={Flex}
        flexDirection="row"
      >
        {isMobile ? (
          contactSelected ? (
            <Chat />
          ) : (
            <Contacts />
          )
        ) : (
          <>
            <Contacts />
            <Chat />
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
