import React, {useState} from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DEFAULT_PAGE_SIZE} from '../constants';
import {SelectType} from '../../../shared/types';
import {COLOR} from '../../../shared/styles/colors';
import {TouchableOpacity} from 'react-native';

type Props = {
  data: SelectType[];
  onSubmit: (value: number) => void;
};

const Container = styled.View`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
`;

const Typography = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  background-color: white;
  padding-right: 8px;
  padding-left: 8px;
`;

const OptionContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid ${COLOR.GRAY_BACKGROUND};
  width: 200px;
  height: 40px;
  align-items: center;
  padding: 5px;
  margin-bottom: 8px;
  border-radius: 8px;
`;

const DropdownOptions = styled.View`
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: white;
  width: 200px;
`;

const CustomDropdown = ({data = [], onSubmit}: Props) => {
  const [selectedValue, setSelectedValue] = useState<number>(DEFAULT_PAGE_SIZE);
  const [isOpen, setIsOpen] = useState(false);

  const onOptionClicked = (option: SelectType) => {
    setSelectedValue(option.value);
    setIsOpen(false);
    onSubmit(option.value);
  };

  const renderDropdown = () => {
    const options = data.filter(option => option.value !== selectedValue);
    return (
      <DropdownOptions>
        {options.map((option: SelectType) => (
          <TouchableOpacity
            key={option.label}
            onPress={() => onOptionClicked(option)}>
            <OptionContainer>
              <Typography>{option.value}</Typography>
              <Icon name="arrow-down" size={10} color={COLOR.LIGHT_BROWN} />
            </OptionContainer>
          </TouchableOpacity>
        ))}
      </DropdownOptions>
    );
  };

  return (
    <Container>
      <>
        <TouchableOpacity onPress={() => setIsOpen(currOpen => !currOpen)}>
          <OptionContainer>
            <Typography>{selectedValue}</Typography>
            <Icon name="arrow-down" size={10} color={COLOR.LIGHT_BROWN} />
          </OptionContainer>
        </TouchableOpacity>
        {isOpen ? renderDropdown() : null}
      </>
    </Container>
  );
};

export default CustomDropdown;
