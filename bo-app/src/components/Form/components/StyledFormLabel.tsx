import type { FormLabelProps } from '@chakra-ui/react';
import { FormLabel } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface CustomFormLabelProps extends FormLabelProps {
  children: ReactNode;
  isFieldImportant?: boolean;
}

const StyledFormLabel = ({
  children,
  isFieldImportant,
  ...rest
}: CustomFormLabelProps): JSX.Element => {
  return (
    <FormLabel
      color="secondary.500"
      fontSize={16}
      pointerEvents="none"
      sx={{
        //? Update the color of the form fields to custom color
        // '& span': {
        //   color: 'primary.500',
        // },
        '& span:after': {
          content: isFieldImportant ? '"*"' : '""',
          // color: 'primary.500',
        },
      }}
      {...rest}>
      {children}
    </FormLabel>
  );
};

export default StyledFormLabel;
