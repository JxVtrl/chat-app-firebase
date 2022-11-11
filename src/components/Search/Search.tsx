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
  Input,
} from "@chakra-ui/react";
import { useApp } from "../../context";

export const Search: React.FC = () => {
  const { menuOpened, setMenuOpened }: any = useApp();

  return (
    <Modal
      isOpen={menuOpened == 2}
      onClose={() => setMenuOpened(undefined)}
      onOverlayClick={() => setMenuOpened(undefined)}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Procurar Usuário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Procurar"
            // onChange={(e) => setFilterContact(e.target.value)}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
