import { useTheme } from 'styled-components/native';
import avatarDefault from '../../../../shared/assets/images/avatar-default.jpg';
import * as S from './styles';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { updateUserPhoto } from '../../../../shared/services/userService';
import { useAuthStore } from '../../../../shared/store/useAuthStore';
import { useToastStore } from '../../../../shared/store/useToastStore';
import { Alert } from 'react-native';

export const HeaderHome = () => {
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);
  const setToken = useAuthStore(state => state.setToken);
  const setMessage = useToastStore(state => state.setMessage);
  const theme = useTheme();

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.2,
        base64: true
      });

      if(!result.canceled) {
        const photo = result?.assets[0]?.base64;
        if(photo) {
          await updateUserPhoto({
            photo,
          });

          if(user) {
            setUser({
              ...user,
              photo
            })
          }

          setMessage({
            type: 'success',
            text: 'Foto atualizada com sucesso'
          });
        }
      }

    } catch (error: any) {
      setMessage({
        type: 'danger',
        text: error?.message
      });
    }
  }

  const handleLogoff = async () => {
    Alert.alert('Sair', 'Deseja sair do sistema?', [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: () => {
          setToken(undefined);
          setUser(undefined);
        }
      }
    ])
  }

  return (
    <S.Container>
      <S.UserInfo>
        <S.UserInfoAvatarContainer>
          <S.UserInfoAvatar 
            source={
              user?.photo 
              ? {
                  uri: `data:image/png;base64,${user?.photo}`
                }
              : avatarDefault
            }
          />
          <S.UserChangeAvatar onPress={handlePickImage}>
            <FontAwesome name="pencil" size={14} color={theme.colors.brand} />
          </S.UserChangeAvatar>
        </S.UserInfoAvatarContainer>
        <S.UserDetailsContainer>
          <S.UserDetailsGreeting>Olá,</S.UserDetailsGreeting>
          <S.UserDetailsName>{user?.name}</S.UserDetailsName>
        </S.UserDetailsContainer>
      </S.UserInfo>
      <S.UserLogoff onPress={handleLogoff}>
        <MaterialIcons name="power-settings-new" size={30} color={theme.colors.gray_400} />
      </S.UserLogoff>
    </S.Container>
  )
}