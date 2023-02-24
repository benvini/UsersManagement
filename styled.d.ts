import * as styledComponents from 'styled-components/native';
import {Theme} from './src/shared/styles/theme';

const {
  default: styled,
  css,
  ThemeProvider,
} = styledComponents as styledComponents.ReactNativeThemedStyledComponentsModule<Theme>;

export {css, ThemeProvider, styled};
export default styled;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
