import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { RegisterContent } from "../../components";

export function Register() {
  return (
    <Flex h="100vh" w="100vw" overflow="hidden" justify="center" align="center">
      <RegisterContent />
    </Flex>
  );
}
