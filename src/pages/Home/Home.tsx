import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { Main } from "src/sections";
import { Profile, Config, Search } from "src/components";

export function Home() {
  return (
    <Flex
      h="100vh"
      w="100vw"
      overflow="hidden"
      justify="center"
      align="center"
      pos="relative"
    >
      <Main />
      <Profile />
      <Config />
      <Search />
    </Flex>
  );
}
