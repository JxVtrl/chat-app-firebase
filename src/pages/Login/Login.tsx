import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useApp, useAuth } from "src/context";
import errorCodes from "src/data/error-codes.json";

export function Login() {
  const { handleLogin, LoginError, user }: any = useAuth();
  const navigate = useNavigate();

  function validateEmail(value: string) {
    let error;
    if (!value) {
      error = "E-mail é obrigatório";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      error = "E-mail inválido";
    }
    return error;
  }

  function validatePassword(value: string) {
    let error;
    if (!value) {
      error = "Senha é obrigatória";
    }
    return error;
  }

  const findErrorIndex = (item: any) => {
    for (let i = 0; i < errorCodes.error.length; i++) {
      if (errorCodes.error[i].code === item.code) {
        if (errorCodes.error[i].message !== "")
          return errorCodes.error[i].message;
        else return item.code;
      }
    }
    return item.code;
  };

  return (
    <Flex h="100vh" w="100vw" overflow="hidden" justify="center" align="center">
      <Modal isOpen={true} onClose={() => null}>
        <ModalOverlay />
        <ModalContent placeSelf="center" mx="15px">
          <ModalHeader textAlign="center">
            <Text fontSize="2xl" fontWeight="bold">
              Jx's Chat
            </Text>
            <Text fontSize="sm" fontWeight="medium">
              Login
            </Text>
          </ModalHeader>

          <ModalBody>
            {LoginError && (
              <Alert status="error" my="10px">
                <AlertIcon />
                <AlertTitle>Erro!</AlertTitle>
                <AlertDescription>
                  {findErrorIndex(LoginError)}
                </AlertDescription>
              </Alert>
            )}
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  handleLogin(values, () => navigate("/"));
                  actions.setSubmitting(false);
                }, 1000);
              }}
            >
              {(props) => (
                <Form>
                  <Flex direction="column" gap="20px">
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

                    <Field name="password" validate={validatePassword}>
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

                    <Button
                      mt={4}
                      colorScheme="teal"
                      isLoading={props.isSubmitting}
                      type="submit"
                      disabled={
                        props.values.email === "" ||
                        props.values.password === ""
                      }
                    >
                      Fazer Login
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </ModalBody>

          <ModalFooter as={Flex} flexDirection="column" gap="15px">
            <Flex direction="column" align="center" fontSize="14px">
              <Text>Ainda não tem uma conta?</Text>
              <Link to="/register">
                <Text
                  transition="all 0.2s ease-in-out"
                  _hover={{ color: "#8790aadd" }}
                >
                  Cadastre-se aqui
                </Text>
              </Link>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
