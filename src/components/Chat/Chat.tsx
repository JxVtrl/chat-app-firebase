import React from "react";
import {
  Avatar,
  Flex,
  Input,
  Text,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { useApp } from "../../context";
import { ChevronLeftIcon, SearchIcon } from "@chakra-ui/icons";
import bgDefault from "../../assets/img/whatsApp.jpeg";
import { useDevice } from "../../hooks";

export const Chat: React.FC = () => {
  const { isMobile } = useDevice();
  const { contactSelected, setContactSelected }: any = useApp();

  return (
    <Flex w="100%" direction="column" overflow='hidden'>
      <Flex direction="row" h="85px" px="16px" w="100%" bgColor="#dddddddd">
        {contactSelected && (
          <Flex w="100%" gap="20px" align="center">
            {isMobile && (
              <ChevronLeftIcon
                cursor="pointer"
                onClick={() => setContactSelected(undefined)}
              />
            )}
            <Avatar name={contactSelected?.name} />
            <Flex w="100%" align="center" justify="space-between">
              <Flex direction="column">
                <Text fontSize="16px">{contactSelected?.name}</Text>
                <Text fontSize="12px" fontWeight="400" letterSpacing="1px">
                  online
                </Text>
              </Flex>
              <Flex gap="35px" align="center">
                <SearchIcon />
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>
      <Flex
        w="100%"
        h="100%"
        bgImage={bgDefault}
        bgPos="center"
        bgSize="contain"
      ></Flex>

      <Flex w="100%" h="45px" gap="15px" align="center" px="16px">
        <i className="fa-solid fa-face-grin-wide fa-lg"></i>
        <i className="fa-solid fa-paperclip fa-lg"></i>
        <Input placeholder="Mensagem" />
        <i className="fa-solid fa-microphone fa-lg"></i>
      </Flex>
    </Flex>
  );
};
