import React, { useRef, useState } from "react";
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
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { useApp, useAuth } from "../../context";
import { Field, Form, Formik } from "formik";
import { PreviewAvatar } from "../PreviewAvatar";

export const Profile: React.FC = () => {
  const { menuOpened, setMenuOpened }: any = useApp();
  const { user }: any = useAuth();
  const fileRef = useRef<any>(null);

  return (
    <Modal
      isOpen={menuOpened == 0}
      onClose={() => setMenuOpened(undefined)}
      onOverlayClick={() => setMenuOpened(undefined)}
    >
      <ModalOverlay />
      <ModalContent>
        <Formik
          initialValues={{
            name: user.name,
            email: user.email,
            username: user.username,
            photo: user.photoURL,
          }}
          onSubmit={(values, actions) => {
            console.log(values);
            setTimeout(() => {
              actions.setSubmitting(false);
              setMenuOpened(undefined);
            }, 1000);
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <>
              <ModalHeader>Perfil</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Form>
                  <Flex direction="column" gap="20px">
                    <Field type="file" name="photo">
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.photo && form.touched.photo}
                        >
                          <FormLabel>Foto</FormLabel>
                          <Flex
                            cursor="pointer"
                            w="100%"
                            justify="center"
                            direction="column"
                            align="center"
                            onClick={() => fileRef?.current?.click()}
                          >
                            {/* <PreviewAvatar file={values?.photo} /> */}
                            <Text>Clique para alterar</Text>
                          </Flex>
                          <input
                            {...field}
                            ref={fileRef}
                            hidden
                            type="file"
                            accept="image/*"
                            onChange={(e: any) => {
                              console.log(e);
                              setFieldValue("file", e.target.files);
                            }}
                          />
                          <FormErrorMessage>
                            {form.errors.photo}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="name">
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <FormLabel>Nome</FormLabel>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Insira seu nome"
                            defaultValue={values.name}
                          />
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="username">
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.username && form.touched.username
                          }
                        >
                          <FormLabel>Username</FormLabel>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Insira seu username"
                            defaultValue={values.username}
                            isDisabled
                          />
                          <FormErrorMessage>
                            {form.errors.username}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="email">
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.email && form.touched.email}
                        >
                          <FormLabel>E-mail</FormLabel>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Insira seu email"
                            defaultValue={values.email}
                            isDisabled
                          />
                          <FormErrorMessage>
                            {form.errors.email}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                </Form>
              </ModalBody>

              <ModalFooter>
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Salvar
                </Button>
              </ModalFooter>
            </>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};
