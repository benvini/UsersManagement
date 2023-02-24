import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {RootStackParamList} from '../../../navigation/AppNavigator';
import {COLOR} from '../../../shared/styles/colors';
import {FilteredUser} from '../../../shared/types';
import {COLUMNS_WIDTH} from '../constants';
import {Pressable} from 'react-native';

type TableRowProps = {
  item: FilteredUser;
  onDeleteUser: (id: string) => void;
  onUpdateUser: (user: FilteredUser) => void;
};

type EditableCellState = {
  email: boolean;
  firstName: boolean;
  lastName: boolean;
  phone: boolean;
};

type ContainerProps = {
  isEven: boolean;
};

type WidthProps = {
  width?: number;
};

const Container = styled.View<ContainerProps>`
  display: flex;
  flex-direction: row;
  padding-top: 8px;
  padding-bottom: 8px;
  justify-content: space-between;
  align-items: center;
  background-color: ${props =>
    props.isEven ? COLOR.WHITE : COLOR.GRAY_BACKGROUND};
`;

const TextInput = styled.TextInput`
  height: 36px;
  color: ${props => props.theme.colors.textColor};
  padding: 5px;
  font-size: 8px;
  text-align: center;
`;

const Typography = styled.Text`
  color: ${props => props.theme.colors.textColor};
  font-size: 8px;
  text-align: center;
`;

const Cell = styled.Text`
  color: ${props => props.theme.colors.textColor};
  font-size: 8px;
  text-align: center;
  width: ${(props: WidthProps) => (props.width ? `${props.width}px` : '80px')};
`;

const UpdateButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 5px;
  height: 20px;
  justify-content: center;
  margin-right: 4px;
  margin-left: 4px;
  width: ${(props: WidthProps) =>
    props.width ? `${props.width - 8}px` : '80px'};
`;

const DeleteButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.error};
  border-radius: 5px;
  height: 20px;
  justify-content: center;
  margin-right: 4px;
  margin-left: 4px;
  width: ${(props: WidthProps) =>
    props.width ? `${props.width - 8}px` : '80px'};
`;

const TableRow = ({item, onDeleteUser, onUpdateUser}: TableRowProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [emailInput, setEmailInput] = useState(item.email);
  const [firstNameInput, setFirstNameInput] = useState(item.name.first);
  const [lastNameInput, setLastNameInput] = useState(item.name.last);
  const [phoneInput, setPhoneInput] = useState(item.phone);
  const [editableCell, setEditableCell] = useState<EditableCellState>({
    email: false,
    firstName: false,
    lastName: false,
    phone: false,
  });

  const onSnClicked = useCallback(() => {
    navigation.navigate('Profile', {user: item});
  }, [item, navigation]);

  const handleDeleteUser = (id: string) => {
    onDeleteUser(id);
  };

  const onChangeFirstNameInput = (text: string) => {
    setFirstNameInput(text);
  };
  const onChangeLastNameInput = (text: string) => {
    setLastNameInput(text);
  };
  const onChangeEmailInput = (text: string) => {
    setEmailInput(text);
  };
  const onChangePhoneInput = (text: string) => {
    setPhoneInput(text);
  };

  const renderGenderIcon = (gender: string) => {
    if (gender === 'male') {
      return <Icon name="male" size={20} color="blue" />;
    } else if (gender === 'female') {
      return <Icon name="female" size={20} color="red" />;
    } else {
      return null;
    }
  };

  const _onUpdateUser = () => {
    const updatedObject = {
      ...item,
      name: {
        first: firstNameInput,
        last: lastNameInput,
      },
      email: emailInput,
      phone: phoneInput,
    };
    onUpdateUser(updatedObject);
  };

  const renderSpecialCells = useCallback(() => {
    const firstNameCell = editableCell.firstName ? (
      <TextInput
        style={{width: COLUMNS_WIDTH.FIRST_NAME}}
        value={firstNameInput}
        onChangeText={onChangeFirstNameInput}
        autoFocus
      />
    ) : (
      <Pressable
        onPress={() => setEditableCell({...editableCell, firstName: true})}
        onPressOut={() => setEditableCell({...editableCell, firstName: false})}>
        <Cell width={COLUMNS_WIDTH.FIRST_NAME}>{firstNameInput}</Cell>
      </Pressable>
    );
    const lastNameCell = editableCell.lastName ? (
      <TextInput
        style={{width: COLUMNS_WIDTH.LAST_NAME}}
        value={lastNameInput}
        onChangeText={onChangeLastNameInput}
        autoFocus
      />
    ) : (
      <Pressable
        onPress={() => setEditableCell({...editableCell, lastName: true})}
        onPressOut={() => setEditableCell({...editableCell, lastName: false})}>
        <Cell width={COLUMNS_WIDTH.LAST_NAME}>{lastNameInput}</Cell>
      </Pressable>
    );
    const emailCell = editableCell.email ? (
      <TextInput
        style={{width: COLUMNS_WIDTH.EMAIL}}
        value={emailInput}
        onChangeText={onChangeEmailInput}
        autoFocus
      />
    ) : (
      <Pressable
        onPress={() => setEditableCell({...editableCell, email: true})}
        onPressOut={() => setEditableCell({...editableCell, email: false})}>
        <Cell width={COLUMNS_WIDTH.EMAIL}>{emailInput}</Cell>
      </Pressable>
    );
    const phoneCell = editableCell.phone ? (
      <TextInput
        style={{width: COLUMNS_WIDTH.PHONE}}
        value={phoneInput}
        onChangeText={onChangePhoneInput}
        autoFocus
      />
    ) : (
      <Pressable
        onPress={() => setEditableCell({...editableCell, phone: true})}
        onPressOut={() => setEditableCell({...editableCell, phone: false})}>
        <Cell width={COLUMNS_WIDTH.PHONE}>{phoneInput}</Cell>
      </Pressable>
    );
    return (
      <>
        {firstNameCell}
        {lastNameCell}
        {emailCell}
        {phoneCell}
      </>
    );
  }, [editableCell, emailInput, firstNameInput, lastNameInput, phoneInput]);

  return (
    <Container isEven={item.actualIndex % 2 === 0}>
      <Cell width={COLUMNS_WIDTH.SN} onPress={onSnClicked}>
        {item.actualIndex + 1}
      </Cell>
      {renderSpecialCells()}
      <Cell width={COLUMNS_WIDTH.GENDER}>{renderGenderIcon(item.gender)}</Cell>
      <UpdateButton width={COLUMNS_WIDTH.UPDATE} onPress={_onUpdateUser}>
        <Typography>Update</Typography>
      </UpdateButton>
      <DeleteButton
        width={COLUMNS_WIDTH.DELETE}
        onPress={() => handleDeleteUser(item.id)}>
        <Typography>Delete</Typography>
      </DeleteButton>
    </Container>
  );
};

export default TableRow;
