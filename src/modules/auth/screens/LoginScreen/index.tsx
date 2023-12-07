import * as S from './styles';
import loginBackground from '../../../../shared/assets/images/login-background.png';
import logo from '../../../../shared/assets/images/logo-and-slogan.png';
import { useForm } from 'react-hook-form';
import { TextInputForm } from '../../../../shared/components/TextInputForm';
import {zodResolver} from '@hookform/resolvers/zod'
import { z } from 'zod';
import {useState} from 'react'

const loginSchema = z.object({
  email: z.string({
    required_error: 'Email é obrigatório'
  }).email({
    message: 'Email é inválido'
  }),
  password: z.string({
    required_error: 'A senha é obrigatória'
  }).min(6, {
    message: 'A senha tem que ter no mínimo 6 caracteres'
  })
})

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit
  } = useForm<LoginSchema>(
    {
      resolver: zodResolver(loginSchema)
    }
  );

  const onSubmit = (data: LoginSchema) => {
    console.log({data});
  } 

  return(
    <S.ImageBackground source={loginBackground}>
      <S.Container>
        <S.LogoContainer>
          <S.Logo source={logo} />
        </S.LogoContainer>
      </S.Container>
      <S.FormContainer>
        <S.TitleForm>Acesse sua conta</S.TitleForm>
        <TextInputForm 
          control={control}
          label='E-mail'
          name='email'
          keyboardType='email-address'
        />
        <TextInputForm 
          control={control}
          label='Senha'
          name='password'
          secureTextEntry
        />
        <S.ButtonLogin 
          title='Entrar'
          isLoading={isLoading}
          onPress={handleSubmit(onSubmit)}
        />
      </S.FormContainer>
      <S.CreateAccountContaier>
        <S.TitleCreateAccount>Ainda não tem acesso?</S.TitleCreateAccount>
        <S.ButtonCreateAccount 
          title='Criar conta'
          type='outlined'
          onPress={() => null}
        />
      </S.CreateAccountContaier>
    </S.ImageBackground>
  )
}