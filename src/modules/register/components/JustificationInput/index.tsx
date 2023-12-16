import { Control } from "react-hook-form";
import * as S from './styles';
import theme from "../../../../shared/theme";

type JustificationInputProps = {
  label: string;
  placeholder: string;
  control: Control<any>;
}

export const JustificationInput = ({label, placeholder, control}: JustificationInputProps) => {
  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      <S.TextArea 
        control={control}
        name="justification"
        label={placeholder}
        placeholderTextColor={theme.colors.white}
        multiline
        numberOfLines={5}
      />
    </S.Container>
  )
}