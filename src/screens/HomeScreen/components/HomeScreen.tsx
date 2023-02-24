import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {v4 as uuidv4} from 'uuid';

import UsersTable from './UsersTable';
import {fetchUsers} from '../../../shared/api/api';
import {ERROR_MESSAGES} from '../constants';
import {User} from '../../../shared/types';

const Spinner = styled.ActivityIndicator``;

const Container = styled.View`
  background-color: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px;
  align-items: center;
`;

const Typography = styled.Text`
  color: ${props => props.theme.colors.textColor};
  font-size: 12px;
  text-align: center;
`;

const HomeScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newUsers = await fetchUsers();
        setIsLoading(false);
        const parsedUsers = newUsers.map((user: User, index: number) => {
          const parsedUser = {
            ...user,
            id: uuidv4(),
            sn: index + 1,
          };
          return parsedUser;
        });
        setUsers(parsedUsers);
      } catch (err) {
        setError(true);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <Container>
        <Typography>{ERROR_MESSAGES.FETCH_USERS_FAILED}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      {isLoading ? (
        <Spinner size="large" />
      ) : (
        <>
          <UsersTable users={users} />
        </>
      )}
    </Container>
  );
};

export default HomeScreen;
