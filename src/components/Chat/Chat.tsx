import React from "react";
import { Flex } from "@chakra-ui/react";
import { ChatBody, ChatFooter, ChatHeader } from "./components";

export const Chat: React.FC = () => {
  return (
    <Flex w="100%" direction="column" overflow="hidden" h="100%">
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </Flex>
  );
};
