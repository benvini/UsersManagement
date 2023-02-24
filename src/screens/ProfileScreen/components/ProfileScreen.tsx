import React from 'react';
import styled from 'styled-components/native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/AppNavigator';
import headerImg from '../../../../assets/images/profileScreenHeader.png';
import profilePicImg from '../../../../assets/images/bearProfilePic.png';
import {KeyboardAvoidingView} from 'react-native';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import {COLOR} from '../../../shared/styles/colors';
import {ScrollView} from 'react-native-gesture-handler';
import InputIcon from './InputIcon';
import Button from './Button';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'Profile'>;

const Container = styled.View`
  background-color: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
`;

const Heading = styled.Text`
  color: ${COLOR.GOLD};
  font-size: 32px;
  margin-bottom: 20px;
`;

const BoldTypography = styled.Text`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: ${props => props.theme.colors.textColor};
  margin-bottom: 8px;
`;

const HeaderImage = styled.Image``;

const HeaderContainer = styled.View`
  width: 100%;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
`;

const BackButton = styled.TouchableOpacity`
  margin-bottom: 4px;
`;

const StyledInputIcon = styled(InputIcon)`
  margin-right: 12px;
  margin-left: 12px;
`;

const UserField = styled.View`
  display: flex;
  flex-direction: row;
  padding: 12px 18px;
  height: 41px;
  background: ${COLOR.WHITE_LIGHT_YELLOW};
  margin-bottom: 15px;
  border: 1px solid ${COLOR.BLACK};
  border-radius: 10px;
  width: 90%;
  padding-bottom: 2px;
`;

const UserIconContainer = styled.View`
  display: flex;
  flex-direction: row;
  background-color: ${props => props.theme.colors.primary};
  border: 1px solid ${COLOR.LIGHT_BROWN};
  width: 315px;
  height: 41px;
  margin-bottom: 15px;
  border: 1px solid ${COLOR.BLACK};
  border-radius: 10px;
  width: 90%;
  align-items: center;
  padding: 5px;
`;

const MaleButton = styled(Button)`
  margin-right: 10px;
  padding: 8px 16px 8px 10px;
  background-color: ${props => props.theme.colors.secondary};
`;

const FemaleButton = styled(Button)`
  padding: 8px 16px 8px 10px;
  background-color: ${COLOR.PINK};
`;

const ButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
`;

const Typography = styled.Text`
  text-align: center;
`;

const ButtonIcon = styled(FoundationIcon)`
  margin-right: 8px;
  color: ${props => props.theme.colors.textColor};
`;

const FlexCol = styled.View`
  display: flex;
  flex-direction: column;
  padding: 5px 30px 5px 30px;
`;

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ProductDetailRouteProp>();
  const {user} = route.params;

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <Container>
          <HeaderContainer>
            <HeaderImage source={headerImg} />
          </HeaderContainer>
          <FlexCol>
            <Heading>My Profile</Heading>
            <BoldTypography>Profile Picture</BoldTypography>
            <HeaderImage source={profilePicImg} />
            <BoldTypography>First Name</BoldTypography>
            <UserField>
              <Typography>{user.name.first}</Typography>
            </UserField>
            <BoldTypography>Last Name</BoldTypography>
            <UserField>
              <Typography>{user.name.last}</Typography>
            </UserField>
            <BoldTypography>Email</BoldTypography>
            <UserIconContainer>
              <StyledInputIcon
                type="antDesign"
                name="mail"
                size={20}
                color={COLOR.LIGHT_BROWN}
              />
              <Typography>{user.email}</Typography>
            </UserIconContainer>
            <BoldTypography>Phone</BoldTypography>
            <UserIconContainer>
              <StyledInputIcon
                type="fontAwesome"
                name="mobile-phone"
                size={30}
                color={COLOR.LIGHT_BROWN}
              />
              <Typography>{user.phone}</Typography>
            </UserIconContainer>
            <BoldTypography>Gender</BoldTypography>
            <ButtonsContainer>
              <MaleButton disabled={user.gender !== 'male'}>
                <ButtonIcon name="male-symbol" size={20} color={COLOR.WHITE} />
                <Typography>Male</Typography>
              </MaleButton>
              <FemaleButton disabled={user.gender !== 'female'}>
                <ButtonIcon
                  name="female-symbol"
                  size={20}
                  color={COLOR.WHITE}
                />
                <Typography>Female</Typography>
              </FemaleButton>
            </ButtonsContainer>
          </FlexCol>
          <BackButton onPress={onBack}>
            <Typography>Back</Typography>
          </BackButton>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;
