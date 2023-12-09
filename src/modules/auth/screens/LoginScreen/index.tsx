import * as S from './styles';
import loginBackground from '../../../../shared/assets/images/login-background.png';
import logo from '../../../../shared/assets/images/logo-and-slogan.png';
import { useForm } from 'react-hook-form';
import { TextInputForm } from '../../../../shared/components/TextInputForm';
import {zodResolver} from '@hookform/resolvers/zod'
import { z } from 'zod';
import {useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PublicStackParamList } from '../../../../routes/PublicRoutes';
import { loginService } from '../../../../shared/services/authService';
import { useAuthStore } from '../../../../shared/store/useAuthStore';
import { useToastStore } from '../../../../shared/store/useToastStore';

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

type LoginScreenProps = NativeStackNavigationProp<
  PublicStackParamList,
  "LoginScreen"
>;

export default function LoginScreen() {
  const setToken = useAuthStore(state => state.setToken);
  const setMessage = useToastStore(state => state.setMessage);
  const { navigate } = useNavigation<LoginScreenProps>();

  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit
  } = useForm<LoginSchema>(
    {
      resolver: zodResolver(loginSchema)
    }
  );

  const onSubmit = async (data: LoginSchema) => {
    try {
      setIsLoading(true);

      const response = await loginService({
        email: data.email,
        password: data.password,
      });

      setToken(response.token);
      
      setMessage({
        text: 'Login realizado com sucesso!',
        type: 'success'
      })
    } catch (error: any) {
      setMessage({
        text: error?.message,
        type: 'danger'
      });
    } finally {
      setIsLoading(false);
    }
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
          onPress={() => navigate('CreateAccountScreen')}
        />
      </S.CreateAccountContaier>
    </S.ImageBackground>
  )
}