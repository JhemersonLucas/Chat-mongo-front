import React, { useRef, useCallback } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiInfo, FiUser, FiLogIn } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Container, Content } from './styles';

import { useToast } from '../../hooks/Toast';
import getValidationErros from '../../utils/getValidationErros';

import Input from '../../components/Input';
import logoImg from '../../assets/logo.svg';

interface SignInData {
  login: string;
  password: string;
}
const SignInAdmin: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: SignInData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        login: Yup.string().required('Preenchimento obrigatório'),
        password: Yup.string().required('Preenchimento obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (data.login !== 'admin' || data.password !== 'admin') {
        formRef.current?.setErrors({
          login: 'Usuário inválido',
          password: 'Senha inválida',
        });
        return;
      }

      addToast({
        title: 'Bem-vindo',
        type: 'success',
        description: 'Usuário logado com sucesso.',
      });

      sessionStorage.setItem('@chat-admin', 'admin');
      history.push({ pathname: '/main' });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);
        formRef.current?.setErrors(errors);
      }

      addToast({
        title: 'Ops :(',
        type: 'error',
        description: 'Preencha os campos.',
      });
    }
  }, []);

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <img src={logoImg} />
          <Input name="login" icon={FiUser} placeholder="Login" />
          <Input
            name="password"
            icon={FiUser}
            placeholder="Password"
            type="password"
          />
          <button type="submit">
            <FiLogIn size={20} />
          </button>
          <span>
            <FiInfo />
            <br />
            Acesso padrão: admin, admin
          </span>
        </Form>
      </Content>
    </Container>
  );
};

export default SignInAdmin;
