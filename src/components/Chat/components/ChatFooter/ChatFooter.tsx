import React from "react";
import { Button, Flex, Input } from "@chakra-ui/react";

export const ChatFooter: React.FC = () => {
  return (
    <Flex w="100%" h="65px" gap="15px" align="center" px="16px" flexShrink={0}>
      <i className="fa-solid fa-face-grin-wide fa-lg"></i>
      <Input placeholder="Escreva algo..." />
      <i className="fa-solid fa-paperclip fa-lg"></i>
      <i className="fa-solid fa-microphone fa-lg"></i>
      <Button colorScheme="blue">Enviar</Button>
    </Flex>
  );
};
