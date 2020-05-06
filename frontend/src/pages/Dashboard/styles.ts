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
  max-width: 150px;
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
  max-height: 80vh;
  overflow: auto;
  flex: 1;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;

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
        width: 25px;
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

export const Tool = styled.div`
  margin: 10px 20px;
  background: #f3f3f3;
  border-radius: 5px;
  width: 100%;
  padding: 24px;
  display: block;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: transform 0.2s;
  overflow: hidden;

  button {
    transform: translateX(-80px);
    transition: transform 0.2s;
    padding: 10px;
    border-radius: 50%;
    background: #b22222;
    color: #fff;
    border: 0;

    svg {
      color: #fff;
    }
  }

  &:hover div,
  &:hover button {
    transform: translateX(0px);
  }

  & + a {
    margin-top: 16px;
  }

  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }

  > div {
    transform: translateX(-50px);
    transition: transform 0.2s;
    margin: 0 16px;
    flex: 1;

    strong {
      font-size: 20px;
      color: #3d3d4d;
    }

    p {
      font-size: 18px;
      color: #a8a8b3;
      margin-top: 4px;
      margin-bottom: 15px;
    }

    span {
      height: 10px;
      padding: 2px 5px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 13px;
      color: #fff;
      background: #4682b4;
      & + span {
        margin-left: 5px;
      }
    }
  }

  svg {
    margin-left: auto;
    color: #cbcbd6;
  }

  a {
    color: #cbcbd6;
    display: flex;
    align-items: center;
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

    .date {
      margin: 0 5px;
    }

    .user {
      width: 100px;
      text-align: center;
    }

    .message {
      flex: 1;
    }

    .divisor {
      margin-right: 10px;
    }
  }
`;

export const BarraSend = styled.form`
  background: #fff;
  height: 60px;
  width: 100%;
  border-radius: 8px;

  display: flex;
  justify-items: space-between;
  align-items: center;
  padding: 0px;

  input {
    flex: 1;
    padding: 10px 35px;
    border: 0px;
    background: transparent;
    font-size: 18px;
    color: #222;
    font-weight: 700;
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
