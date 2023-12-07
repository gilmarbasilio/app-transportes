import * as S from './styles'

export type TypeButton = 'button' | 'outlined';

type Props = {
  title: string;
  type?: TypeButton;
  onPress: () => void;
  isLoading?: boolean;
}

export const Button = ({title, onPress, type = 'button', isLoading, ...rest}: Props) => {
  return (
    <S.Container 
      {...rest} 
      type={type} 
      isLoading={isLoading}
      onPress={!isLoading ? onPress : () => null}>
      {isLoading ? <S.Loading /> : <S.Title>{title}</S.Title>}
    </S.Container>
  )
}