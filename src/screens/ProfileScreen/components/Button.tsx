import React from 'react';
import {TouchableOpacityProps, ViewStyle} from 'react-native';
import styled from 'styled-components/native';

type ButtonProps = TouchableOpacityProps & {
  disabled?: boolean;
  style?: ViewStyle;
};

const Container = styled.TouchableOpacity<ButtonProps>`
  opacity: ${props => (props.disabled ? 0.33 : 1)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.secondary};
  width: 90px;
  height: 40px;
`;

const Button = ({
  disabled = false,
  style,
  children,
  ...restProps
}: ButtonProps) => {
  return (
    <Container {...restProps} style={style} disabled={disabled}>
      {children}
    </Container>
  );
};

export default Button;
