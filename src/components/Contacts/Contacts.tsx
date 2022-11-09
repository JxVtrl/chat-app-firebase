import React, { useEffect } from "react";
import {
  Avatar,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  ModalBody,
  ModalHeader,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useApp } from "../../context";
import { useDevice } from "../../hooks";

export const Contacts: React.FC = () => {
  const { isMobile } = useDevice();
  const { users, setContactSelected }: any = useApp();

  const handleContactSelection = (id: number) => {
    if (users) {
      const user = users.find((user: any) => user.id === id);
      setContactSelected(user);
    }
  };

  return (
    <Flex direction="column" w={isMobile ? "100%" : "33%"}>
      <ModalHeader as={Flex} direction="column" w="100%" gap="15px" p="0">
        <Flex
          borderRight="1px solid #9b9b9b"
          p="16px"
          w="100%"
          align="center"
          justify="space-between"
          bgColor="#dddddddd"
        >
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          <Flex color="#474747" gap="35px">
            <Flex w="20px" justify="center" align="center">
              <i className="fa-solid fa-circle-notch" />
            </Flex>
            <Flex w="20px" justify="center" align="center">
              <i className="fa-solid fa-message" />
            </Flex>
            <Flex w="20px" justify="center" align="center">
              <i className="fa-solid fa-ellipsis-vertical" />
            </Flex>
          </Flex>
        </Flex>
        <Flex w="100%" align="center" gap="15px" p="8px 14px">
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
              placeholder="Pesquisar ou começar uma nova conversa"
            />
          </InputGroup>

          <i className="fa-solid fa-filter" />
        </Flex>
      </ModalHeader>
      <ModalBody overflow="auto" p="0">
        {users?.map((item: any) => (
          <Flex direction="column" key={item.id}>
            <hr />
            <Flex
              onClick={() => handleContactSelection(item.id)}
              h="65px"
              align="center"
              _hover={{ bgColor: "silver" }}
              cursor="pointer"
              px="24px"
              overflow="hidden"
            >
              <Avatar name={item.name} src={item.photos} mr="15px" />
              <Flex w="100%" direction="column">
                <Text>{item.name}</Text>
                {/* <Text 
                    overflow='hidden' w='90%' textOverflow='ellipsis' whiteSpace='nowrap'>{photos ? photos[item.id].title : undefined}</Text> */}
              </Flex>
            </Flex>
          </Flex>
        ))}
      </ModalBody>
    </Flex>
  );
};
