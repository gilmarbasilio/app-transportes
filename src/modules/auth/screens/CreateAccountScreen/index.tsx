import * as S from './styles';
import loginBackground from '../../../../shared/assets/images/login-background.png';
import logo from '../../../../shared/assets/images/logo-and-slogan.png';
import { useForm } from 'react-hook-form';
import { TextInputForm } from '../../../../shared/components/TextInputForm';
import {zodResolver} from '@hookform/resolvers/zod'
import {useState} from 'react'
import { CreateAccountSchema, createAccountSchema } from './validations';
import { registerService } from '../../../../shared/services/authService';
import { useToastStore } from '../../../../shared/store/useToastStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PublicStackParamList } from '../../../../routes/PublicRoutes';
import { useNavigation } from '@react-navigation/native';

type CreateAccountScreenProps = NativeStackNavigationProp<
  PublicStackParamList,
  "CreateAccountScreen"
>;

export default function CreateAccountScreen(props: any) {
  const [isLoading, setIsLoading] = useState(false);
  const setMessage = useToastStore(state => state.setMessage);
  const {navigate} = useNavigation<CreateAccountScreenProps>();
  const {
    control,
    handleSubmit
  } = useForm<CreateAccountSchema>(
    {
      resolver: zodResolver(createAccountSchema)
    }
  );

  const onSubmit = async (data: CreateAccountSchema) => {
    try {
      setIsLoading(true);

      await registerService({
        email: data.email,
        name: data.name,
        password: data.password
      });

      setMessage({
        text: 'Usuário criado com sucesso!',
        type: 'success'
      });
      
      navigate('LoginScreen');
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
      <S.ScrollView>
        <S.Container>
          <S.LogoContainer>
            <S.Logo source={logo} />
          </S.LogoContainer>
        </S.Container>
        <S.FormContainer>
          <S.TitleForm>Crie sua conta</S.TitleForm>
          <TextInputForm 
            control={control}
            label='Nome'
            name='name'
          />
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
          <TextInputForm 
            control={control}
            label='Confirmar a Senha'
            name='confirmPassword'
            secureTextEntry
          />
          <S.ButtonLogin 
            title='Criar a conta'
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
          />
        </S.FormContainer>
        <S.CreateAccountContaier>
          <S.TitleCreateAccount>Ainda não tem acesso?</S.TitleCreateAccount>
          <S.ButtonCreateAccount 
            title='Volta para o Login'
            type='outlined'
            onPress={() => props.navigation.navigate('LoginScreen')}
          />
        </S.CreateAccountContaier>
      </S.ScrollView>
    </S.ImageBackground>
  )
}