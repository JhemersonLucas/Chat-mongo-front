import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  padding: 20px;
  height: 100vh;
`;

export const SideBar = styled.div`
  background: transparent;
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  place-content: center;

  img {
    width: 90%;
  }

  #grid_users {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 30px;
  }

  #active {
    width: 100%;
    border-top: 2px solid #222;
    padding-top: 15px;
    display: flex;
    align-items: center;

    > span {
      display: block;
      border-radius: 50%;
      background: #02c39a;
      color: #fff;
      font-weight: bold;
      font-size: 20px;
      width: 25px;
      text-align: center;
      margin-right: 8px;
    }
  }
`;
export const ListUsers = styled.div`
  background: transparent;
  width: 100%;
  flex: 1;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #fff;
  max-height: 220px;
  overflow: auto;
  margin: 15px 0;
  padding: 15px;

  ul {
    width: 100%;

    li {
      width: 100%;
      list-style: none;
      display: block;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #222;

      & + li {
        margin-top: 15px;
      }

      > span {
        display: block;
        border-radius: 50%;
        background: #fff;
        color: #343434;
        font-weight: bold;
        font-size: 20px;
        min-width: 25px;
        text-align: center;
        margin-right: 8px;
      }
    }
  }

  form {
    margin-top: 40px;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px 20px;

    h2 {
      margin-bottom: 0px;
      text-align: center;
    }

    span {
      color: #fff;
      font-weight: 700;
      margin-bottom: 5px;
      margin-left: 5px;
      margin-top: 15px;

      i {
        font-weight: 200;
        font-size: 13px;
      }
    }

    button {
      width: 100%;
      height: 70px;
      display: flex;
      align-items: center;
      justify-items: center;
      place-content: center;
      background: #04d361;
      border-radius: 5px;
      border: 0;
      margin-top: 20px;
      color: #fff;
      transition: background-color 0.2s;
      font-weight: bold;
      font-size: 20px;

      &:hover {
        background: ${shade(0.2, '#04d361')};
      }

      svg {
        margin-right: 16px;
      }
    }
  }
`;

export const Content = styled.div`
  margin-left: 20px;
  flex: 1;
  border-radius: 8px;
  background: #222;
  border: 0;
  position: relative;
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-items: center;
  height: calc(100vh - 40px);
`;

export const Messages = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow-y: auto;
  justify-content: flex-end;
  align-items: flex-start;
  padding-top: 20px;
  padding-bottom: 30px;
  height: calc(100vh - 130px);

  .messageBox {
    display: flex;
    width: 100%;
    border: 0;
    background: transparent;
    color: #fff;

    &:hover {
      background: rgba(220, 20, 60, 0.3);
      cursor: pointer;
    }

    .date {
      margin: 0 5px;
    }

    .user {
      width: 100px;
      text-align: center;
    }

    .message {
    }

    .divisor {
      margin-right: 10px;
    }
  }
`;

export const BarraSend = styled.form`
  background: transparent;
  height: 60px;
  width: 100%;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;

  input {
    width: 250px;
    padding: 10px 35px;
    border: 0px;
    background: transparent;
    font-size: 18px;
    color: #fff;
    font-weight: 700;
    background: #333;
    border-radius: 10px;
    height: 100%;
    margin-right: 15px;
  }

  select {
    width: 200px;
    height: 100%;
    background: #333;
    border-radius: 10px;
    color: #fff;
    font-weight: bold;
    border: 0px;
    margin-right: 15px;
    padding-left: 15px;
  }

  button {
    background: #343434;
    color: #666;
    padding: 10px 15px;
    border-radius: 50%;
    border: 0px;
    text-align: center;
    margin-right: 15px;

    svg {
      margin-top: 3px;
    }
  }
`;
