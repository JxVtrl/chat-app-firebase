import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { Main } from "../../sections";

export function ChatPage() {
  return (
    <Flex h="100vh" w="100vw" overflow="hidden" justify="center" align="center">
      <Main />
    </Flex>
  );
}
