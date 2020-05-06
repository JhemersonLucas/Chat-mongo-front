/* eslint-disable react-hooks/rules-of-hooks */
import React, {
  useState,
  useEffect,
  FormEvent,
  useRef,
  useCallback,
} from 'react';
import { FiSearch } from 'react-icons/fi';
import * as Yup from 'yup';
import { format, parseISO } from 'date-fns';
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

  const [controle, setControle] = useState(0);
  const [usersA, setUsersA] = useState<UserData[]>([] as UserData[]);
  const [usersB, setUsersB] = useState<UserData[]>([] as UserData[]);
  const [usersC, setUsersC] = useState<UserData[]>([] as UserData[]);
  const [usersD, setUsersD] = useState<UserData[]>([] as UserData[]);
  const [userFind, setUserFind] = useState('');
  const [dateFind, setDateFind] = useState('');
  const [sortedFind, setSortedFind] = useState('');
  const [user, setUser] = useState(() => {
    const data = sessionStorage.getItem('@chat-admin');
    if (data == null) {
      addToast({
        type: 'error',
        title: 'Acesso Restrito',
        description: 'Você precisa logar para acesso ao chat',
      });
      history.goBack();
    }
    return { _id: '1', user: 'Admin' };
  });

  useEffect(() => {
    api
      .get('chat/messages')
      .then(response => {
        setMessages(response.data);
      })
      .catch(err => console.log(err));

    api.get('chat').then(response => {
      const a = [] as UserData[];
      const b = [] as UserData[];
      const c = [] as UserData[];
      const d = [] as UserData[];
      let trava = 0;
      response.data.forEach((e: UserData) => {
        if (trava === 0) a.push(e);
        else if (trava === 1) b.push(e);
        else if (trava === 2) c.push(e);
        else if (trava === 3) d.push(e);

        if (trava <= 2) trava++;
        else trava = 0;
      });
      setUsersA(a);
      setUsersB(b);
      setUsersC(c);
      setUsersD(d);
    });
  }, []);

  const handleRemove = useCallback(async (id: string) => {
    try {
      const response = await api.delete(`chat/messages/${id}`);
      setMessages(state => state.filter(e => e._id !== id));
    } catch (err) {
      addToast({
        title: 'Erro',
        type: 'error',
        description: 'Não foi possível completar a requisição',
      });
    }
  }, []);

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();

      let filtro = '';
      if (userFind) filtro += `user=${userFind}&`;
      if (dateFind) filtro += `date=${dateFind}&`;
      if (sortedFind) filtro += `sorted=${sortedFind}`;

      try {
        const res = await api.get(`/chat/messages?${filtro}`);
        setMessages(res.data);
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
    [userFind, dateFind, sortedFind],
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
        <div id="grid_users">
          <ListUsers>
            <ul>
              {usersA.map(v => (
                <li>
                  <span>{v.user.substring(1, 0)}</span>
                  {v.user}
                </li>
              ))}
            </ul>
          </ListUsers>
          <ListUsers>
            <ul>
              {usersB.map(v => (
                <li>
                  <span>{v.user.substring(1, 0)}</span>
                  {v.user}
                </li>
              ))}
            </ul>
          </ListUsers>
          <ListUsers>
            <ul>
              {usersC.map(v => (
                <li>
                  <span>{v.user.substring(1, 0)}</span>
                  {v.user}
                </li>
              ))}
            </ul>
          </ListUsers>
          <ListUsers>
            <ul>
              {usersD.map(v => (
                <li>
                  <span>{v.user.substring(1, 0)}</span>
                  {v.user}
                </li>
              ))}
            </ul>
          </ListUsers>
        </div>
        <div id="active">
          <span>A</span>
          Admin
        </div>
      </SideBar>
      <Content>
        <Messages ref={messagesRef}>
          {messages.map(m => (
            <button className="messageBox" onClick={() => handleRemove(m._id)}>
              <div className="date">
                {format(parseISO(m.createdAt), 'dd/MM/yyyy')}
              </div>
              <div className="user">{m.user_id.user}</div>
              <div className="date">
                {format(parseISO(m.createdAt), 'HH:mm')}
              </div>
              <div className="divisor">=></div>
              <div className="message">{m.message}</div>
            </button>
          ))}
        </Messages>
        <BarraSend onSubmit={handleSubmit}>
          <select
            value={userFind}
            onChange={op => setUserFind(op.target.value)}
          >
            <option value="">Filtrar por usuário</option>
            <optgroup label="Group A">
              {usersA.map(u => (
                <option value={u._id}>{u.user}</option>
              ))}
            </optgroup>
            <optgroup label="Group B">
              {usersB.map(u => (
                <option value={u._id}>{u.user}</option>
              ))}
            </optgroup>
            <optgroup label="Group C">
              {usersC.map(u => (
                <option value={u._id}>{u.user}</option>
              ))}
            </optgroup>
            <optgroup label="Group D">
              {usersD.map(u => (
                <option value={u._id}>{u.user}</option>
              ))}
            </optgroup>
          </select>
          <input
            value={dateFind}
            onChange={op => setDateFind(op.target.value)}
            type="date"
          />
          <select
            value={sortedFind}
            onChange={op => setSortedFind(op.target.value)}
          >
            <option value="">Novas primeiro</option>
            <option value="desc">Antigas primeiro</option>
          </select>
          <button type="submit">
            <FiSearch size={20} />
          </button>
        </BarraSend>
      </Content>
    </Container>
  );
};

export default DashBoard;
