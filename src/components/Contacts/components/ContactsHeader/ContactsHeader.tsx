import React from "react";
import { EditIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { useApp, useAuth } from "../../../../context";

export const ContactsHeader: React.FC = () => {
  const { setMenuOpened }: any = useApp();
  const { user }: any = useAuth();

  const handleTheme = () => {};

  const handleOut = () => {};

  return (
    <Flex direction="column" w="100%" p="0">
      <Flex
        borderRight="1px solid #9b9b9b"
        px="16px"
        w="100%"
        h="72px"
        align="center"
        justify="space-between"
        bgColor="#dddddddd"
      >
        <Avatar
          name={user?.name}
          src={user?.photoURL}
          cursor="pointer"
          onClick={() => setMenuOpened(0)}
        />
        <Flex color="#474747" gap="35px" align="center">
          <EditIcon cursor="pointer" w="20px" />
          <Menu>
            <MenuButton w="20px">
              <i className="fa-solid fa-ellipsis-vertical" />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setMenuOpened(0)}>Perfil</MenuItem>
              <MenuItem onClick={handleTheme}>Trocar tema</MenuItem>
              <MenuItem onClick={() => setMenuOpened(1)}>
                Configurações
              </MenuItem>
              <MenuItem onClick={handleOut}>Sair</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <Flex w="100%" align="center" p="8px 14px">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            type="txt"
            _placeholder={{
              fontSize: "14px",
            }}
            placeholder="Pesquisar contato"
          />
        </InputGroup>
      </Flex>
    </Flex>
  );
};
