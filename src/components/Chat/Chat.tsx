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
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useApp } from "../../context";
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronLeftIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import bgDefault from "../../assets/img/whatsApp.jpeg";
import { useDevice } from "../../hooks";
import { Message } from "../Message";

import mockChat from "../../mocks/my-chat.json";
import { iMessage } from "../../interfaces/Message.interface";

export const Chat: React.FC = () => {
  const { isMobile } = useDevice();
  const { contactSelected, setContactSelected }: any = useApp();

  return (
    <Flex w="100%" direction="column" overflow="hidden">
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
              </Flex>
              <SearchIcon />
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
        direction="column"
        px="25px"
      >
        {mockChat.messages.map((item: iMessage) => (
          <Message
            user={item.user}
            message={item.text}
            timestamp={item.timestamp}
            active={true}
          />
        ))}
      </Flex>

      <Flex w="100%" h="65px" gap="15px" align="center" px="16px">
        <i className="fa-solid fa-face-grin-wide fa-lg"></i>
        <Input placeholder="Escreva algo..." />
        <i className="fa-solid fa-paperclip fa-lg"></i>
        <i className="fa-solid fa-microphone fa-lg"></i>
        <Button colorScheme="blue">Enviar</Button>
      </Flex>
    </Flex>
  );
};
