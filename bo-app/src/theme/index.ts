import { extendTheme } from '@chakra-ui/react';
import { CardComponent } from './additions/card/Card';
import { CardBodyComponent } from './additions/card/CardBody';
import { CardFooterComponent } from './additions/card/CardFooter';
import { CardHeaderComponent } from './additions/card/CardHeader';
import { ModalComponent } from './additions/modal/Modal';
import { accordionStyles } from './components/accordion';
import { badgeStyles } from './components/badge';
import { buttonStyles } from './components/button';
import { checkboxStyles } from './components/checkbox';
import { inputStyles } from './components/Input';
import { menuStyles } from './components/menu';
import { numberInputStyles } from './components/numberInput';
import { radioStyles } from './components/radio';
import { tagStyles } from './components/tag';
import { textStyles } from './components/text';
import { toastStyles } from './components/toast';
import { tooltipStyles } from './components/tooltip';
import { customFonts } from './fonts';
import { breakpoints } from './foundations/breakpoints';
import { fontSizes } from './foundations/fontSize';
import { globalStyles } from './styles';

const theme = (dir?: string): Record<string, any> => {
  return extendTheme(
    { direction: dir },
    { breakpoints }, // Breakpoints
    {
      fontSizes,
    },
    {
      fonts: customFonts,
    },
    globalStyles,
    // components
    buttonStyles,
    menuStyles,
    textStyles,
    tooltipStyles,
    CardFooterComponent,
    CardHeaderComponent,
    CardComponent,
    CardBodyComponent,
    ModalComponent,
    tagStyles,
    badgeStyles,
    inputStyles,
    numberInputStyles,
    checkboxStyles,
    radioStyles,
    toastStyles,
    accordionStyles,
  );
};

export default theme;

// export default extendTheme(
//   { breakpoints }, // Breakpoints
//   {
//     fontSizes,
//   },
//   {
//     fonts: customFonts,
//   },
//   globalStyles,

//   // components
//   buttonStyles,
//   textStyles,
//   tooltipStyles,
//   CardFooterComponent,
//   CardHeaderComponent,
//   CardComponent,
//   CardBodyComponent,
//   ModalComponent,
//   tagStyles,
//   badgeStyles,
//   inputStyles,
//   checkboxStyles,
//   radioStyles,
// );
