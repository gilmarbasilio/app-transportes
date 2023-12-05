import styled from 'styled-components/native'
import {SafeAreaView} from 'react-native-safe-area-context'

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.black_700};
`;

export const Title = styled.Text`
  flex: 1;
  color: ${({theme}) => theme.colors.white};
`;