import theme from '../../theme';
import * as S from './styles'
import { IconBoxFamily, IconComponentMap } from './types'

export type IconBoxProps = {
  icon: IconBoxFamily,
  size?: S.SizeProps;
}

export const IconBox = ({icon, size = 'normal'}: IconBoxProps) => {

  const IconComponent: JSX.ElementType = IconComponentMap[icon.iconName]

  const iconSize = size === 'normal' ? 24 : 16;

  return (
    <S.Container size={size}>
      <IconComponent name={icon.name} size={iconSize} color={theme.colors.brand} />
    </S.Container>
  )
}