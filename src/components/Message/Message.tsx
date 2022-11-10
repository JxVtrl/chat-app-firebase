import React from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { Timestamp } from "../../helpers";

interface iMessage {
  user: {
    name: string;
    avatar: string;
  };
  message: string;
  timestamp: string;
  active: boolean;
}

export const Message: React.FC<iMessage> = ({
  user,
  message,
  timestamp,
  active,
}) => {
  return (
    <Flex gap="30px" alignSelf={active ? "flex-end" : "flex-start"}>
      {active ? (
        <>
          <Flex
            bgColor="#58a9f9"
            h="fit-content"
            borderRadius="20px 0px 20px 20px"
            p="15px"
          >
            <Text color="white" fontWeight={500} letterSpacing="0.5px">
              {message}
            </Text>
          </Flex>
          <Flex direction="column">
            <Avatar name={user.name} src={user.avatar} />
            <Text color="grey" fontSize="14px">
              {Timestamp(timestamp)}
            </Text>
          </Flex>
        </>
      ) : (
        <>
          <Flex direction="column">
            <Avatar name={user.name} src={user.avatar} />
            <Text color="grey" fontSize="14px">
              {Timestamp(timestamp)}
            </Text>
          </Flex>
          <Flex
            bgColor="white"
            h="fit-content"
            borderRadius="0px 20px 20px 20px"
            p="15px"
          >
            <Text>{message}</Text>
          </Flex>
        </>
      )}
    </Flex>
  );
};
