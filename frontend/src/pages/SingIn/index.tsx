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
import api from '../../services/api';

interface SignInData {
  login: string;
}
const SingIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: SignInData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        login: Yup.string().required('Preenchimento obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      try {
        const res = await api.get(`/chat/login/${data.login}`);
        addToast({
          title: 'Bem-vindo',
          type: 'success',
          description: 'Usuário logado com sucesso.',
        });
        sessionStorage.setItem('@chat-user', JSON.stringify(res.data));
        history.push({ pathname: '/chat' });
      } catch (err) {
        formRef.current?.setErrors({ login: 'Usuário inválido' });
        addToast({
          title: 'Ops2 :(',
          type: 'error',
          description: 'Usuár2io inválido.',
        });
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);
        formRef.current?.setErrors(errors);
        console.log(errors);
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
          <div>
            <Input name="login" icon={FiUser} placeholder="Login" />
            <button type="submit">
              <FiLogIn size={20} />
            </button>
          </div>
          <span>
            <FiInfo />
            <br />
            Acesso padrão: Jhemerson
          </span>
        </Form>
      </Content>
    </Container>
  );
};

export default SingIn;
