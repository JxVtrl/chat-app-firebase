import React from "react";
import { ChevronLeftIcon, SearchIcon } from "@chakra-ui/icons";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useApp } from "../../../../context";
import { useDevice } from "../../../../hooks";

export const ChatHeader: React.FC = () => {
  const { isMobile } = useDevice();
  const { contactSelected, setContactSelected }: any = useApp();

  return (
    <Flex
      direction="row"
      px="16px"
      h="72px"
      w="100%"
      bgColor="#dddddddd"
      flexShrink={0}
    >
      {contactSelected && (
        <Flex w="100%" gap="20px" align="center">
          {isMobile && (
            <ChevronLeftIcon
              cursor="pointer"
              onClick={() => setContactSelected(undefined)}
            />
          )}
          <Avatar
            src={contactSelected?.photoURL}
            name={contactSelected?.name}
          />
          <Flex w="100%" align="center" justify="space-between">
            <Flex direction="column">
              <Text fontSize="16px">{contactSelected?.name}</Text>
            </Flex>
            <SearchIcon />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
