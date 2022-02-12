import React from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
  padding: 1rem 1.5rem;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  margin: 0 5px;
  cursor: pointer;
  display: inline-block;
  font-weight: bold;
  text-transform: capitalize;
  background-color: #fff;

  &:hover {
    background-color: #eaeaea;
  }

  &.active {
    background-color: #eaeaea;
  }

  &:first-child {
    margin-left: 0;
  }
`;

type Props = {
  onClick: () => void;
  active?: boolean;
};

const Button: React.FC<Props> = ({ children, active, onClick }) => (
  <ButtonStyle className={active ? 'active' : undefined} onClick={onClick}>
    {children}
  </ButtonStyle>
);

export default Button;
