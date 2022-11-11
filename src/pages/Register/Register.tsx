import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  FormHelperText,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useAuth } from "../../context";
import {
  validateName,
  validateConfirm,
  validateEmail,
  validatePassword,
} from "../../helpers";
import errorCodes from "../../data/error-codes.json";

export function Register() {
  const { handleRegister, registerError, usernameAvailable }: any = useAuth();

  const navigate = useNavigate();

  const findErrorIndex = (item: any) => {
    for (let i = 0; i < errorCodes.error.length; i++) {
      if (errorCodes.error[i].code === item.code) {
        if (errorCodes.error[i].message !== "")
          return errorCodes.error[i].message;
        else return item.code;
      }
    }
    return null;
  };

  function validateUsername(value: string) {
    let error;
    if (!value) {
      error = "Usuário é obrigatório";
    } else if (usernameAvailable(value)) {
      error = "Usuário já existe";
    }
    return error;
  }

  return (
    <Flex h="100vh" w="100vw" overflow="hidden" justify="center" align="center">
      <Modal isOpen={true} onClose={() => null}>
        <ModalOverlay />
        <ModalContent placeSelf="center">
          <ModalHeader textAlign="center">
            <Text fontSize="2xl" fontWeight="bold">
              Jx's Chat
            </Text>
            <Text fontSize="sm" fontWeight="medium">
              Register
            </Text>
          </ModalHeader>
          <ModalBody>
            {registerError && (
              <Alert status="error" my="10px">
                <AlertIcon />
                <AlertTitle>Erro!</AlertTitle>
                <AlertDescription>
                  {findErrorIndex(registerError)}
                </AlertDescription>
              </Alert>
            )}
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirm: "",
                username: "",
              }}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  handleRegister(values, () => navigate("/"));
                  actions.setSubmitting(false);
                }, 1000);
              }}
            >
              {(props) => (
                <Form>
                  <Flex direction="column" gap="20px">
                    <Field name="name" validate={validateName}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <FormLabel>Nome</FormLabel>
                          <Input
                            {...field}
                            type="name"
                            placeholder="Insira seu nome"
                          />
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="username" validate={validateUsername}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.username && form.touched.username
                          }
                        >
                          <FormLabel>Username</FormLabel>
                          <FormHelperText mb="5px">
                            O username não poderá ser alterado
                          </FormHelperText>
                          <Input
                            {...field}
                            type="name"
                            placeholder="Insira seu nome de usuário"
                          />
                          <FormErrorMessage>
                            {form.errors.username}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="email" validate={validateEmail}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.email && form.touched.email}
                        >
                          <FormLabel>E-mail</FormLabel>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Insira seu e-mail"
                          />
                          <FormErrorMessage>
                            {form.errors.email}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field
                      name="password"
                      validate={(value: string) => {
                        validatePassword(value);
                        validateConfirm(props.values.confirm, value);
                      }}
                    >
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.password && form.touched.password
                          }
                        >
                          <FormLabel>Senha</FormLabel>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Insira sua senha"
                          />
                          <FormErrorMessage>
                            {form.errors.password}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field
                      name="confirm"
                      validate={(value: string) =>
                        validateConfirm(value, props.values.password)
                      }
                    >
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.confirm &&
                            form.touched.confirm &&
                            form.errors.confirm !== form.values.password
                          }
                        >
                          <FormLabel>Confirmar Senha</FormLabel>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Confirme sua senha"
                          />
                          <FormErrorMessage>
                            {form.errors.confirm}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Button
                      mt={4}
                      colorScheme="teal"
                      isLoading={props.isSubmitting}
                      type="submit"
                      disabled={
                        props.values.email === "" ||
                        props.values.password === "" ||
                        props.values.name === "" ||
                        props.values.username === ""
                      }
                    >
                      Fazer Registro
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </ModalBody>

          <ModalFooter as={Flex} flexDirection="column" gap="15px">
            <Flex direction="column" align="center" fontSize="14px">
              <Text>Já tem uma conta?</Text>
              <Link to="/login">
                <Text
                  transition="all 0.2s ease-in-out"
                  _hover={{ color: "#8790aadd" }}
                >
                  Logue-se aqui
                </Text>
              </Link>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
