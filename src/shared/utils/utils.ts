import {FilteredUser} from '../types';

export const updateUser = (
  users: FilteredUser[],
  updatedUser: FilteredUser,
) => {
  return users.map((user: FilteredUser) => {
    if (user.id === updatedUser.id) {
      return {...user, ...updatedUser};
    } else {
      return user;
    }
  });
};

export const deleteUser = (users: FilteredUser[], id: string) => {
  return users.filter(user => user.id !== id);
};

export const syncUserWithIndexes = (users: FilteredUser[]) => {
  return users.reduce(
    (acc: FilteredUser[], item: FilteredUser, index: number) => {
      let newUser = {
        ...item,
        actualIndex: index,
      };
      acc.push(newUser);
      return acc;
    },
    [],
  );
};
