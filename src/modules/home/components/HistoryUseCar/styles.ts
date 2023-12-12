import styled from "styled-components/native";


export const Container = styled.View`
  flex: 1;
  padding: 0px 25px;
  position: relative;
  gap: 10px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font_size.md};
  font-family: ${({ theme }) => theme.font_family.bold};
`;