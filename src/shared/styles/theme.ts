export type Theme = {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    textColor: string;
    green: string;
    error: string;
  };
};

export const lightTheme: Theme = {
  colors: {
    textColor: '#000',
    green: '#04aa6d',
    primary: '#FBF1DF',
    secondary: '#5385C0',
    error: '#dc143c',
    background: '#FFF',
  },
};

export const darkTheme: Theme = {
  colors: {
    textColor: '#FFF',
    green: '#03684c',
    primary: '#D6BF9F ',
    secondary: '#2c4e86',
    background: '#000',
    error: '#ff1e46',
  },
};
