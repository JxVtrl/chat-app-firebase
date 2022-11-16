import React from "react";
import { Flex } from "@chakra-ui/react";
import { useDevice } from "src/hooks";
import { ContactsBody, ContactsHeader } from "./components";

export const Contacts: React.FC = () => {
  const { isMobile } = useDevice();

  return (
    <Flex direction="column" w={isMobile ? "100%" : "33%"} overflow="hidden">
      <ContactsHeader />
      <ContactsBody />
    </Flex>
  );
};
