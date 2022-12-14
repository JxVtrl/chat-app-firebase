import React from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useApp, useAuth } from "src/context";

export const ContactsBody: React.FC = () => {
  const { chats }: any = useAuth();
  const { setContactSelected, filterContact }: any = useApp();

  const handleContactSelection = (id: number) => {
    if (chats) {
      const user = chats.find((contact: any) => contact.id === id);
      setContactSelected(user);
    }
  };

  return (
    <Flex overflowY="auto" overflowX="hidden" p="0" direction="column">
      {chats &&
        chats
          .filter((contact: any) => {
            if (filterContact) {
              return contact.name
                .toLowerCase()
                .includes(filterContact.toLowerCase());
            } else {
              return contact;
            }
          })
          .map((contact: any) => {
            return (
              <Flex direction="column" key={contact.id}>
                <hr />
                <Flex
                  onClick={() => handleContactSelection(contact.id)}
                  h="65px"
                  align="center"
                  _hover={{ bgColor: "silver" }}
                  cursor="pointer"
                  px="24px"
                  overflow="hidden"
                  transition="all 0.4s ease"
                >
                  <Avatar
                    name={contact.name}
                    src={contact.photoURL}
                    mr="15px"
                  />
                  <Flex w="100%" direction="column" justify="center">
                    <Text>{contact.name}</Text>
                    {/* <Text 
                    overflow='hidden' w='90%' textOverflow='ellipsis' whiteSpace='nowrap'>{photos ? photos[item.id].title : undefined}</Text> */}
                  </Flex>
                </Flex>
              </Flex>
            );
          })}
    </Flex>
  );
};
