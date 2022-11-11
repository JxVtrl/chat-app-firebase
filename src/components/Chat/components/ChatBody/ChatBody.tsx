import React, { useEffect, useRef } from "react";
import { Flex } from "@chakra-ui/react";
import { useApp, useAuth } from "../../../../context";
import userChats from "../../../../mocks/my-chat.json";
import bgDefault from "../../../../assets/img/whatsApp.jpeg";
import { Message } from "../../../Message";
import { iMessage } from "../../../../interfaces/Message.interface";

export const ChatBody: React.FC = () => {
  const { contactSelected }: any = useApp();
  const bottomRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [contactSelected]);

  return (
    <Flex
      bgImage={bgDefault}
      bgPos="center"
      bgSize="contain"
      w="100%"
      h="85%"
      overflowY="scroll"
      direction="column"
      gap="15px"
      p="15px 25px"
    >
      {contactSelected &&
        userChats?.chats[contactSelected.id]?.chat?.map(
          ({ id, active, message, timestamp }: iMessage) => (
            <Message
              key={id}
              message={message}
              timestamp={timestamp}
              active={active}
            />
          )
        )}
      <div ref={bottomRef} />
    </Flex>
  );
};
