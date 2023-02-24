export type User = {
  id: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  gender: string;
};

export type FilteredUser = User & {
  actualIndex: number;
};

export type SelectType = {
  label: string;
  value: number;
};
