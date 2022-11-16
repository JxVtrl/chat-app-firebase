import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useApp } from "src/context";

export const Config: React.FC = () => {
  const { menuOpened, setMenuOpened }: any = useApp();
  return (
    <Modal
      isOpen={menuOpened == 1}
      onClose={() => setMenuOpened(undefined)}
      onOverlayClick={() => setMenuOpened(undefined)}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Configurações</ModalHeader>
        <ModalCloseButton />
        <ModalBody></ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => setMenuOpened(undefined)}
          >
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
