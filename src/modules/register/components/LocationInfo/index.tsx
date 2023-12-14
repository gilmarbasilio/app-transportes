import { IconBox } from "../../../../shared/components/IconBox";
import { IconBoxFamily } from "../../../../shared/components/IconBox/types";
import * as S from './styles'

export type LocationInfoProps = {
  label: string;
  description: string;
}

type Props = LocationInfoProps & {
  icon: IconBoxFamily;
}

export const LocationInfo = ({label, description, icon}: Props) => {
  return (
    <S.Container>
      <IconBox icon={icon} />
      <S.Info>
        <S.Label>{label}</S.Label>
        <S.Description>{description}</S.Description>
      </S.Info>
    </S.Container>
  )
}