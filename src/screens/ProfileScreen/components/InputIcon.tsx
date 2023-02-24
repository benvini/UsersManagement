import React from 'react';
import {ViewProps, ViewStyle} from 'react-native';
import styled from 'styled-components/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {COLOR} from '../../../shared/styles/colors';

type InputIconProps = ViewProps & {
  type: 'antDesign' | 'fontAwesome';
  name: string;
  style?: ViewStyle;
  size: number;
  color?: string;
};

const InputIconContainer = styled.View`
  background-color: ${props => props.theme.colors.primary};
  color: ${COLOR.WHITE};
`;

const DEFAULT_ICON_SIZE = 32;

const InputIcon = ({type, name, size, color, style}: InputIconProps) => {
  const IconComponent = type === 'antDesign' ? AntDesignIcon : FontAwesomeIcon;
  return (
    <InputIconContainer style={style}>
      <IconComponent
        name={name}
        size={size || DEFAULT_ICON_SIZE}
        color={color}
      />
    </InputIconContainer>
  );
};

export default InputIcon;
