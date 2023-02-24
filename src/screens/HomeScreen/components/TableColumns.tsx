import React from 'react';
import styled from 'styled-components/native';
import {COLUMNS, COLUMNS_WIDTH} from '../constants';

type WidthProps = {
  width?: number;
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
  padding-bottom: 8px;
  border-bottom-width: 1px;
  border-bottom-color: '#ccc';
  background-color: ${props => props.theme.colors.green};
`;

const Column = styled.Text`
  color: ${props => props.theme.colors.textColor};
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  width: ${(props: WidthProps) => (props.width ? `${props.width}px` : '80px')};
`;

const TableColumns = () => {
  return (
    <Container>
      <Column width={COLUMNS_WIDTH.SN}>{COLUMNS.SN}</Column>
      <Column width={COLUMNS_WIDTH.FIRST_NAME}>{COLUMNS.FIRST_NAME}</Column>
      <Column width={COLUMNS_WIDTH.LAST_NAME}>{COLUMNS.LAST_NAME}</Column>
      <Column width={COLUMNS_WIDTH.EMAIL}>{COLUMNS.EMAIL}</Column>
      <Column width={COLUMNS_WIDTH.PHONE}>{COLUMNS.PHONE}</Column>
      <Column width={COLUMNS_WIDTH.GENDER}>{COLUMNS.GENDER}</Column>
      <Column width={COLUMNS_WIDTH.UPDATE}>{COLUMNS.UPDATE}</Column>
      <Column width={COLUMNS_WIDTH.DELETE}>{COLUMNS.DELETE}</Column>
    </Container>
  );
};

export default TableColumns;
