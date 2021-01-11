import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 190px;
  background: #ffffff;
  border-radius: 4px;
`;

const Content = styled.div`
  padding: 10px;
`;

const Modal = ({ isOpen, children }) =>
  isOpen ? (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  ) : null;

export default Modal;
