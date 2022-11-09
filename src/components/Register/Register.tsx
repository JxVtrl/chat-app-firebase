import React from "react";

import { Link } from "react-router-dom";

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
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useApp } from "../../context";

export function Register() {
  const { handleRegister }: any = useApp();

  function validateName(value: string) {
    let error;
    if (!value) {
      error = "Nome é obrigatório";
    }
    return error;
  }

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
    } else if (value.length < 6) {
      error = "Senha deve ter no mínimo 6 caracteres";
    }
    return error;
  }

  function validateConfirm(value: string, password: string) {
    let error;
    if (!value) {
      error = "Confirmação de senha é obrigatória";
    } else if (value !== password) {
      error = "Senhas não conferem";
    }
    return error;
  }

  return (
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
          <Formik
            initialValues={{ name: "", email: "", password: "", confirm: "" }}
            onSubmit={(values, actions) => {
              console.log(values);
              setTimeout(() => {
                handleRegister(values);
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
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
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
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
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
                      props.values.name === ""
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
  );
}
