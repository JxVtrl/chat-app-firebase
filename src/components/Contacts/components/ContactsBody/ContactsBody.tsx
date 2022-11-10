import React from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useApp } from "../../../../context";

export const ContactsBody: React.FC = () => {
  const { contacts, setContactSelected }: any = useApp();

  const handleContactSelection = (id: number) => {
    if (contacts) {
      const user = contacts.find((contact: any) => contact.id === id);
      setContactSelected(user);
    }
  };

  return (
    <Flex overflowY="scroll" overflowX="hidden" p="0" direction="column">
      {contacts?.map((item: any) => (
        <Flex direction="column" key={item.id}>
          <hr />
          <Flex
            onClick={() => handleContactSelection(item.id)}
            h="65px"
            align="center"
            _hover={{ bgColor: "silver" }}
            cursor="pointer"
            px="24px"
            overflow="hidden"
          >
            <Avatar name={item.name} src={item.photos} mr="15px" />
            <Flex w="100%" direction="column" justify="center">
              <Text>{item.name}</Text>
              {/* <Text 
                    overflow='hidden' w='90%' textOverflow='ellipsis' whiteSpace='nowrap'>{photos ? photos[item.id].title : undefined}</Text> */}
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
