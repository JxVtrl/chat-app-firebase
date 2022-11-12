import React, { useEffect, useState } from "react";
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
  Flex,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { useApp, useAuth } from "../../context";

export const Search: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const { menuOpened, setMenuOpened }: any = useApp();
  const { allUsers, findUser, userFound }: any = useAuth();

  useEffect(() => {
    const resetSearch = () => [setSearch("")];

    return () => {
      resetSearch();
    };
  }, []);

  return (
    <Modal
      isOpen={menuOpened == 2}
      // isOpen={true}
      onClose={() => setMenuOpened(undefined)}
      onOverlayClick={() => setMenuOpened(undefined)}
    >
      <ModalOverlay />
      <ModalContent px="20px" py="25px">
        <ModalHeader p="0">Procurar Usuário</ModalHeader>
        <ModalCloseButton />
        <ModalBody p="0" mt="15px" flexDirection="column">
          <Input
            placeholder="Procurar"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              findUser(e.target.value);
            }}
          />
          {userFound && (
            <Flex w="100%" mt="15px" align="center" gap="15px">
              <Avatar src={userFound.photoURL} name={userFound.name} />
              <Text fontSize="18px" fontWeight="600">
                {userFound.username}
              </Text>
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
