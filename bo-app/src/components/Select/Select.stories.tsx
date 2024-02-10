// import NumberFormatmdx from './NumberFormat.mdx'
import CustomSelect from './index';
import type { SelectInputProps } from './Select';
export default {
  component: CustomSelect,
  title: 'Components/CustomSelect',
  argTypes: {
    isMulti: {
      type: 'boolean',
      defaultValue: false,
    },

    label: {
      type: 'string',
      defaultValue: 'Label',
    },
    labelDir: {
      type: 'select',
      options: ['column', 'row'],
      defaultValue: 'column',
    },
    isDisabled: {
      type: 'boolean',
      defaultValue: false,
    },
    options: {
      defaultValue: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
      ],
    },
    value: {
      defaultValue: 'option1',
    },
    onChange: {
      action: 'onChange',
    },
    cssStyle: {},
  },
  parameters: {},
} as any;
const Template = (props: SelectInputProps): JSX.Element => (
  <CustomSelect {...props} />
);

export const selectCustom: any = Template.bind({});
selectCustom.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
};
