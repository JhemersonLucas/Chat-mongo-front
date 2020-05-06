import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex: 1;
  justify-items: center;
  align-items: center;
  place-content: center;
`;

export const Content = styled.div`
  display: flex;
  background: transparent;
  flex-direction: column;
  width: 100%;
  max-width: 450px;
  align-items: center;
  border-radius: 10px;

  form {
    margin: 0px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      color: #fff;
    }

    span {
      display: flex;
      flex-direction: column;
      color: #333;
      display: block;
      margin-top: 100px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }

    div {
      height: 150px;
      align-items: flex-end;
      display: flex;

      button {
        background: #222;
        border: 0;
        padding: 0px 10px;
        border-radius: 50%;
        height: 40px;
        transition: 0.2s;

        &:hover {
          background: ${shade(0.2, '#222')};
        }
      }
    }
  }

  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;
