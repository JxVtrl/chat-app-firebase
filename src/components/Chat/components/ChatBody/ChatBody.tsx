import React, { useEffect, useRef } from "react";
import { Flex } from "@chakra-ui/react";
import { useApp, useAuth } from "src/context";
import bgDefault from "src/assets/img/whatsApp.jpeg";
import { Message } from "src/components/Message";
import { iMessage } from "src/interfaces";

export const ChatBody: React.FC = () => {
  const { contactSelected }: any = useApp();
  const { chats }: any = useAuth();
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
        chats[contactSelected.id]?.chat?.map(
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
