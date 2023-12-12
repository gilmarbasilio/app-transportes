import styled from "styled-components/native";


export const Container = styled.View`
  flex-direction: row;
  gap: 5px;
  padding: 0px 25px;
`;

export const CarInfo = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray_700};
  padding: 20px;
  border-radius: 6px;
`;

export const CarIcon = styled.View`
  width: 77px;
  height: 77px;
  background-color: ${({ theme }) => theme.colors.gray_600};
  padding: 15px;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`;

export const CarDescription = styled.View`
  flex: 1;
`;

export const CartText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font_size.md};
  font-family: ${({ theme }) => theme.font_family.regular};
`;

export const CartTextBold = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font_size.md};
  font-family: ${({ theme }) => theme.font_family.bold};
`;