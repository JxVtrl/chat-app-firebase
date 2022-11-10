export function validateName(value: string) {
  let error;
  if (!value) {
    error = "Nome é obrigatório";
  }
  return error;
}

export function validateEmail(value: string) {
  let error;
  if (!value) {
    error = "E-mail é obrigatório";
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
    error = "E-mail inválido";
  }
  return error;
}

export function validatePassword(value: string) {
  let error;
  if (!value) {
    error = "Senha é obrigatória";
  } else if (value.length < 6) {
    error = "Senha deve ter no mínimo 6 caracteres";
  }
  return error;
}

export function validateConfirm(value: string, password: string) {
  let error;
  if (!value) {
    error = "Confirmação de senha é obrigatória";
  } else if (value !== password) {
    error = "Senhas não conferem";
  }
  return error;
}
