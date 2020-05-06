/* eslint-disable react-hooks/rules-of-hooks */
import React, {
  useState,
  useEffect,
  FormEvent,
  useRef,
  useCallback,
} from 'react';
import { FiSend } from 'react-icons/fi';
import { format, parseISO, formatISO } from 'date-fns';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../hooks/Toast';
import imgLogo from '../../assets/logo.svg';

import {
  Container,
  Content,
  ListUsers,
  SideBar,
  BarraSend,
  Messages,
} from './styles';

interface UserData {
  _id: string;
  user: string;
}

const DashBoard: React.FC = () => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      _id: '1',
      user_id: { _id: '1', user: 'User' },
      createdAt: '2020-05-06T16:05:57.429Z',
      message: '...',
    },
  ]);

  const { addToast } = useToast();
  const history = useHistory();

  const [users, setUsers] = useState<UserData[]>([] as UserData[]);
  const [user, setUser] = useState(() => {
    const data = sessionStorage.getItem('@chat-user');
    if (data == null) {
      addToast({
        type: 'error',
        title: 'Acesso Restrito',
        description: 'Você precisa logar para acesso ao chat',
      });
      history.goBack();
      return { _id: '1', user: 'User' };
    }
    return JSON.parse(data);
  });

  useEffect(() => {
    api
      .get('chat/messages')
      .then(response => {
        setMessages(response.data);
      })
      .catch(err => console.log(err));

    api.get('chat').then(response => {
      setUsers(response.data);
    });
  }, []);

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      const agora = new Date();
      const backup = message;

      // enviar mensagem
      const data = {
        user: user._id,
        message,
      };

      try {
        const res = await api.post('/chat/messages', data);
        console.log(res.data);
        setMessages(m => [
          ...m,
          {
            _id: '1',
            user_id: { _id: user._id, user: user.user },
            createdAt: formatISO(agora),
            message,
          },
        ]);
        setMessage('');
        if (messagesRef != null && messagesRef.current != null) {
          messagesRef.current.scroll(0, 9999999);
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Ops',
          description: 'Não foi possível enviar sua mensagem, tente novamente.',
        });
      }
    },
    [message, messagesRef],
  );

  useEffect(() => {
    if (messagesRef != null && messagesRef.current != null) {
      messagesRef.current.scroll(0, 9999999);
    }
    if (!user) {
      addToast({
        type: 'error',
        title: 'Acesso Restrito',
        description: 'Você precisa logar para acessar ao chat',
      });
      history.push({ pathname: '/' });
    }
  }, []);

  return (
    <Container>
      <SideBar>
        <img src={imgLogo} />
        <ListUsers>
          <ul>
            {users.map(v => (
              <li>
                <span>{v.user.substring(1, 0)}</span>
                {v.user}
              </li>
            ))}
          </ul>
        </ListUsers>
        {user.user != null && (
          <div id="active">
            <span>{user.user.substring(1, 0)}</span>
            {user.user}
          </div>
        )}
      </SideBar>
      <Content>
        <Messages ref={messagesRef}>
          {messages.map(m => (
            <div className="messageBox">
              <div className="date">
                {format(parseISO(m.createdAt), 'dd/MM/yyyy')}
              </div>
              <div className="user">{m.user_id.user}</div>
              <div className="date">
                {format(parseISO(m.createdAt), 'HH:mm')}
              </div>
              <div className="divisor">=></div>
              <div className="message">{m.message}</div>
            </div>
          ))}
        </Messages>
        <BarraSend onSubmit={handleSubmit}>
          <input
            placeholder="Digite sua mensagem aqui"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <button type="submit">
            <FiSend size={20} />
          </button>
        </BarraSend>
      </Content>
    </Container>
  );
};

export default DashBoard;
