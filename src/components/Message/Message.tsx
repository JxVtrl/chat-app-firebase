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
          <Flex bgColor="white" h="fit-content">
            <Text>{message}</Text>
          </Flex>
          <Flex direction="column">
            <Avatar name={user.name} src={user.avatar} />
            <Text>{Timestamp(timestamp)}</Text>
          </Flex>
        </>
      ) : (
        <>
          <Flex direction="column">
            <Avatar name={user.name} src={user.avatar} />
            <Text>{Timestamp(timestamp)}</Text>
          </Flex>
          <Flex bgColor="white" h="fit-content">
            <Text>{message}</Text>
          </Flex>
        </>
      )}
    </Flex>
  );
};
