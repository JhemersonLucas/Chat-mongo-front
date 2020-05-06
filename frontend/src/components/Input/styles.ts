import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}
export const Container = styled.div<ContainerProps>`
  background: transparent;
  border-radius: 1px;
  border-bottom: 2px solid #202020;
  padding: 16px;
  width: 100%;
  color: #303030;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isFocused &&
    css`
      color: #343434;
      border-color: #343434;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #343434;
    `}

${props =>
  props.isErrored &&
  css`
    color: #f00;
    border-color: #c53030;
  `}

  input {
    flex: 1;
    border: 0px;
    background: transparent;
    color: #343434;

    &::placeholder {
      color: #303030;
    }

    & + input {
      margin-top: 8px;
    }
  }

  > svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  span {
    background: #c53030;
    color: #fff;
    text-align: center;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
