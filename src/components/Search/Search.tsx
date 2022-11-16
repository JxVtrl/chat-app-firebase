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
import { useApp, useAuth } from "src/context";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export const Search: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const { menuOpened, setMenuOpened, setContactSelected }: any = useApp();
  const {
    allUsers,
    findUser,
    userFound,
    addChats,
    setUserFound,
    getChats,
  }: any = useAuth();

  useEffect(() => {
    const resetSearch = () => [setSearch("")];

    return () => {
      resetSearch();
    };
  }, []);

  const handleSelectSearch = () => {
    if (userFound?.username) addChats(search);
    setContactSelected(userFound);
    getChats();
    handleClose();
  };

  const handleClose = () => {
    setSearch("");
    setMenuOpened(undefined);
    setUserFound(null);
  };

  return (
    <Modal
      isOpen={menuOpened == 2}
      // isOpen={true}
      onClose={() => handleClose()}
      onOverlayClick={() => handleClose()}
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
            <Flex
              w="100%"
              mt="15px"
              px="20px"
              justifyContent="space-between"
              align="center"
              onClick={handleSelectSearch}
              cursor="pointer"
            >
              <Flex align="center" gap="15px">
                <Avatar src={userFound.photoURL} name={userFound.name} />
                <Text fontSize="18px" fontWeight="600">
                  {userFound.username}
                </Text>
              </Flex>
              <Button
                transition="all 0.3s ease-in-out"
                _hover={{ transform: "scale(1.04)", colorScheme: "blue" }}
              >
                <ArrowForwardIcon boxSize={5} />
              </Button>
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
