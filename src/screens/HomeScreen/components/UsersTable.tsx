import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {ScrollView, FlatList} from 'react-native';

import {User, FilteredUser} from '../../../shared/types';
import {
  DEFAULT_PAGE_SIZE,
  ERROR_MESSAGES,
  PAGE_SIZE_SELECT_OPTIONS,
} from '../constants';
import TableRow from './TableRow';
import {
  deleteUser,
  syncUserWithIndexes,
  updateUser,
} from '../../../shared/utils/utils';
import TableColumns from './TableColumns';
import CustomDropdown from './CustomDropdown';

type Props = {
  users: User[];
};

const Container = styled.View`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.background};
  padding: 8px;
  justify-content: center;
  height: 80%;
`;

const Typography = styled.Text`
  color: ${props => props.theme.colors.textColor};
  font-size: 8px;
  text-align: center;
`;

const UsersContainer = styled.View`
  height: 90%;
`;

const FlexCol = styled.View`
  display: flex;
  flex-direction: column;
`;

const UsersTable = ({users}: Props) => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [fullUsers, setFullUsers] = useState<FilteredUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<FilteredUser[]>([]);

  useEffect(() => {
    const newUsers = users
      .slice(0, users.length)
      .reduce((acc: FilteredUser[], item: User, index: number) => {
        let newUser = {
          ...item,
          actualIndex: index,
        };
        acc.push(newUser);
        return acc;
      }, []);
    setFullUsers(newUsers);
    const initialUsers = newUsers.slice(0, DEFAULT_PAGE_SIZE);
    setFilteredUsers(initialUsers);
  }, [users]);

  const onUpdateUser = useCallback(
    (user: FilteredUser) => {
      const updatedUsers = updateUser(fullUsers, user);
      const updatedFilteredUsers = updatedUsers.slice(0, filteredUsers.length);
      setFullUsers(updatedUsers);
      setFilteredUsers(updatedFilteredUsers);
    },
    [filteredUsers.length, fullUsers],
  );

  const onDeleteUser = useCallback(
    (id: string) => {
      const updatedFullUsers = deleteUser(fullUsers, id);
      const syncedUsers = syncUserWithIndexes(updatedFullUsers);
      const updatedFilteredUsers = syncedUsers.slice(0, pageSize);
      const syncedFilteredUsers = syncUserWithIndexes(updatedFilteredUsers);
      setFullUsers(updatedFullUsers);
      setFilteredUsers(syncedFilteredUsers);
    },
    [fullUsers, pageSize],
  );

  const renderUser = useCallback(
    ({item}: {item: FilteredUser}) => {
      return (
        <TableRow
          item={item}
          onUpdateUser={onUpdateUser}
          onDeleteUser={onDeleteUser}
        />
      );
    },
    [onUpdateUser, onDeleteUser],
  );

  const onPageSizeChanged = useCallback(
    (value: number) => {
      setPageSize(value);
      const newFilteredUsers = fullUsers.slice(0, value);
      setFilteredUsers(newFilteredUsers);
    },
    [fullUsers],
  );

  const onLoadMoreUsers = useCallback(() => {
    const startIndex = filteredUsers.length;
    const endIndex = startIndex + pageSize;
    const newFilteredUsers = fullUsers
      .slice(startIndex, endIndex)
      .reduce((acc: FilteredUser[], item: FilteredUser, index: number) => {
        let newUser = {
          ...item,
          actualIndex: index + filteredUsers.length,
        };
        acc.push(newUser);
        return acc;
      }, []);
    setFilteredUsers(currUsers => [...currUsers, ...newFilteredUsers]);
  }, [fullUsers, pageSize, filteredUsers]);

  return (
    <ScrollView horizontal>
      <FlexCol>
        <CustomDropdown
          data={PAGE_SIZE_SELECT_OPTIONS}
          onSubmit={onPageSizeChanged}
        />
        <Container>
          <TableColumns />
          <UsersContainer>
            <FlatList
              data={filteredUsers}
              renderItem={renderUser}
              keyExtractor={item => item.id}
              onEndReached={
                filteredUsers.length === fullUsers.length
                  ? null
                  : onLoadMoreUsers
              }
              onEndReachedThreshold={0.1}
              ListEmptyComponent={
                <Typography>{ERROR_MESSAGES.NO_USERS_FOUND}</Typography>
              }
            />
          </UsersContainer>
        </Container>
      </FlexCol>
    </ScrollView>
  );
};

export default UsersTable;
