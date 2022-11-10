import React, { useEffect, useRef } from "react";
import { Flex } from "@chakra-ui/react";
import { useApp } from "../../../../context";
import mockChat from "../../../../mocks/my-chat.json";
import bgDefault from "../../../../assets/img/whatsApp.jpeg";
import { Message } from "../../../Message";
import { iMessage } from "../../../../interfaces/Message.interface";

export const ChatBody: React.FC = () => {
  const { contactSelected, user }: any = useApp();
  const bottomRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [contactSelected]);

  return (
    <Flex
      bgImage={bgDefault}
      bgPos="center"
      px="25px"
      bgSize="contain"
      w="100%"
      h="85%"
      overflowY="scroll"
      direction="column"
      gap="15px"
      pb="15px"
    >
      {mockChat.messages.map(
        ({ user: { name, avatar }, text, timestamp, id }: iMessage) => (
          <Message
            key={id}
            user={{ name, avatar }}
            message={text}
            timestamp={timestamp}
            active={name === user?.name}
          />
        )
      )}
      <div ref={bottomRef} />
    </Flex>
  );
};
