import styled from "styled-components/native";
import { Button } from "../../../../shared/components/Button";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.black_700};
`;

export const Content = styled.View`
  flex-grow: 1;
  gap: 10px;
  padding: 32px;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.gray_300};
  font-family: ${({ theme }) => theme.font_family.regular};
  font-size: ${({ theme }) => theme.font_size.sm};
  margin-top: 32px;
  margin-bottom: 5px;
`;

export const LicensePlate = styled.Text`
  color: ${({ theme }) => theme.colors.gray_100};
  font-family: ${({ theme }) => theme.font_family.bold};
  font-size: ${({ theme }) => theme.font_size.xxxl};
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.gray_100};
  font-family: ${({ theme }) => theme.font_family.regular};
  font-size: ${({ theme }) => theme.font_size.md};
`;


export const ButtonCheckOutOutput = styled(Button)`
  margin-top: 15px;
`;