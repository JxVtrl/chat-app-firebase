import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { useApp, useAuth } from "src/context";
import { Field, Form, Formik } from "formik";

export const Profile: React.FC = () => {
  const { menuOpened, setMenuOpened }: any = useApp();
  const { user, getPhotoURL }: any = useAuth();
  const fileRef = useRef<any>(null);

  return (
    <Modal
      isOpen={menuOpened == 0}
      onClose={() => setMenuOpened(undefined)}
      onOverlayClick={() => setMenuOpened(undefined)}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Perfil</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{
            name: user.name,
            email: user.email,
            username: user.username,
            photo: user.photoURL,
          }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              actions.setSubmitting(false);
              setMenuOpened(undefined);
            }, 1000);
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <>
              <ModalBody>
                <Form>
                  <Flex direction="column" gap="20px">
                    <Field type="file" name="photo">
                      {({ field, form }: any) => (
                        <FormControl>
                          <FormLabel>Foto</FormLabel>
                          <Flex
                            cursor="pointer"
                            w="100%"
                            justify="center"
                            direction="column"
                            align="center"
                            onClick={() => fileRef?.current?.click()}
                          >
                            <Avatar src={user.photoURL} name={values.name} />
                            <Text>Alterar avatar</Text>
                          </Flex>
                          <input
                            ref={fileRef}
                            hidden
                            type="file"
                            accept="image/*"
                            onChange={(e: any) => {
                              setFieldValue("file", e.target.files);
                              getPhotoURL(e.target.files[0]);
                            }}
                          />
                        </FormControl>
                      )}
                    </Field>

                    <Field name="name">
                      {({ field, form }: any) => (
                        <FormControl>
                          <FormLabel>Nome</FormLabel>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Insira seu nome"
                            value={values.name}
                          />
                        </FormControl>
                      )}
                    </Field>

                    <Field name="username">
                      {({ field, form }: any) => (
                        <FormControl>
                          <FormLabel>Username</FormLabel>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Insira seu username"
                            value={values.username}
                            isDisabled
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                </Form>
              </ModalBody>
              <ModalFooter>
                {/* <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Salvar
                </Button> */}
              </ModalFooter>
            </>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};
