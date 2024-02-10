import { ScaleFade, SimpleGrid } from '@chakra-ui/react';
import FormControlSelect from 'components/Form/components/FormControlSelect';
import type { FormikProps } from 'formik';
import { FORM_TYPE } from 'interfaces';
import type { CustomCriteria } from 'interfaces/criteria';
import { CriteriaTypes } from 'interfaces/criteria';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { hexToRGB } from 'theme/colors';
import { borderRadius } from 'utils/constant';
import {
  capitalizeWords,
  isRangeCriteria,
  isSelectCriteria,
} from 'utils/functions';
import type * as Yup from 'yup';
import RangeFormInputs from './RangeFormInputs';

interface NotificationCriteriaProps {
  isOpen: boolean;
  formik: FormikProps<any>;
  formType: FORM_TYPE;
  NotificationsFormYupSchema: Yup.ObjectSchema<any>;
  customFields: CustomCriteria[] | undefined;
}

const fieldComponents = {
  [CriteriaTypes.RANGE]: RangeFormInputs,
  [CriteriaTypes.SELECT]: FormControlSelect,
};

const NotificationCriteria = ({
  isOpen,
  formik,
  formType,
  customFields,
}: NotificationCriteriaProps): React.ReactElement => {
  const { i18n } = useTranslation();
  return (
    <ScaleFade
      in={isOpen}
      style={{
        width: '100%',
        borderWidth: '1px',
        borderColor: 'gray.200',
        background: hexToRGB('secondary', 0.03),
        padding: isOpen ? 10 : 0,
        height: isOpen ? 'auto' : 0,
        borderRadius: borderRadius,
      }}>
      {isOpen && customFields?.length && (
        <SimpleGrid columns={3} spacing={10} width="100%">
          {customFields?.map((field, index) => {
            const FieldComponent = fieldComponents[field?.data?.type];
            if (FieldComponent) {
              return (
                <FieldComponent
                  key={field?.id}
                  formik={formik}
                  label={
                    field?.data?.[`label${capitalizeWords(i18n.language)}`]
                  }
                  name={`criteria.${field?.data?.targetField}`}
                  range={
                    isRangeCriteria(field?.data)
                      ? [field?.data?.min, field?.data?.max]
                      : []
                  }
                  options={
                    isSelectCriteria(field?.data)
                      ? field?.data?.options?.map(option => ({
                          label:
                            option?.[`label${capitalizeWords(i18n.language)}`],
                          value: option?.value,
                        }))
                      : []
                  }
                  onChange={(change): void => {
                    if (field?.data?.type === CriteriaTypes.SELECT) {
                      formik.values['criteria'][index] = {
                        targetField: field?.data?.targetField,
                        type: field?.data?.type,
                        value: change?.value,
                      };
                    } else if (field?.data?.type === CriteriaTypes.RANGE) {
                      if (change?.currentTarget?.value === 'e') {
                        return change?.preventDefault();
                      }
                      formik.values['criteria'][index] = {
                        targetField: field?.data?.targetField,
                        type: field?.data?.type,
                        ...formik.values['criteria'][index],
                        [change?.currentTarget?.name]:
                          change?.currentTarget?.value,
                      };
                    }
                  }}
                  mt={'15px'}
                  style={{ marginTop: 10 }}
                  readOnly={formType === FORM_TYPE.VIEW}
                  isFieldImportant={true}
                />
              );
            }
            return null;
          })}
        </SimpleGrid>
      )}
    </ScaleFade>
  );
};

export default memo(NotificationCriteria);
