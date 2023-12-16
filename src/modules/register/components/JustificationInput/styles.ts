import styled from "styled-components/native";
import { TextInputForm } from "../../../../shared/components/TextInputForm";

export const Container = styled.View`
  padding: 16px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.gray_700};
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.gray_300};
  font-size: ${({ theme }) => theme.font_size.sm};
  font-family: ${({ theme }) => theme.font_family.regular};
`;

export const TextArea = styled(TextInputForm)`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font_size.md};
  font-family: ${({ theme }) => theme.font_family.regular};
  background-color: ${({ theme }) => theme.colors.gray_700};
  margin-top: 16px;
  border: 0px;
  height: 80px;
  vertical-align: top;
  padding-left: 0;
`;