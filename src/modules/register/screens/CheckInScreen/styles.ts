import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.black_700};
`;

export const FormContainer = styled.View`
  flex: 1;
  gap: 16px;
  padding: 0 32px;
  margin-top: 32px;
`;