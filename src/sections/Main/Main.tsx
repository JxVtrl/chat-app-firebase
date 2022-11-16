import React from "react";
import { Flex, Modal, ModalContent } from "@chakra-ui/react";
import { Contacts, Chat } from "src/components";
import { useDevice } from "src/hooks";
import { useApp } from "src/context";

export const Main: React.FC = () => {
  const { isMobile } = useDevice();
  const { contactSelected }: any = useApp();

  return (
    <Flex h="100%" w="100%" overflow="hidden">
      {isMobile ? (
        contactSelected ? (
          <Chat />
        ) : (
          <Contacts />
        )
      ) : (
        <Modal isOpen={true} onClose={() => null}>
          <ModalContent
            w="100%"
            maxW="80%"
            maxH="85%"
            h="100%"
            as={Flex}
            flexDirection="row"
          >
            <Contacts />
            <Chat />
          </ModalContent>
        </Modal>
      )}
    </Flex>
  );
};
