import { SimpleGrid, VStack } from '@chakra-ui/react';
import Form from 'components/Form';
import FormControlButtons from 'components/Form/components/FormControlButtons';
import FormControlInput from 'components/Form/components/FormControlInput';
import FormControlSelect from 'components/Form/components/FormControlSelect';
import { useFormik } from 'formik';
import { FORM_TYPE } from 'interfaces/enums/formType';
import type { FormProps } from 'interfaces/FormProps';
import type { Jewelry } from 'models';
import * as Yup from 'yup';
import {default as JewelryFormSchema } from '../extra/ProductsFormValidationSchema'; // Assuming JewelryFormValidationSchema is provided
import { useAddJewelryMutation, useUpdateJewelryMutation } from '../redux';
import Category from '../../../../common/enums/ProductCategory';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { displayToast } from '../../../../utils/functions';
import { productsManagementRoute } from '../../../../utils/constant';


const ProductForm = (): JSX.Element => {
  const { t } = useTranslation(['jewelry', 'common', 'fields']);
  const location = useLocation();
  const navigate = useNavigate();
  const { state }: { state: FormProps<Jewelry> } = location;
  const [addJewelryHandler, { isLoading: isAddJewelryLoading }] =
    useAddJewelryMutation();
  const [updateJewelryHandler, { isLoading: isUpdateJewelryLoading }] =
    useUpdateJewelryMutation();
  const formSchema = useMemo(
    () => Yup.object().shape({...JewelryFormSchema}), // Using provided validation schema
    [state?.type],
  );
  const formik = useFormik({
    initialValues: {
      name: state?.form?.name ?? '',
      description: state?.form?.description ?? '',
      category: state?.form?.category ?? '',
      main_image: state?.form?.main_image ?? '',
      extra_images: state?.form?.extra_images ?? [],
      status: state?.form?.status ?? '',
      price: state?.form?.price ?? 0,
      quantity: state?.form?.quantity ?? 0,
    },
    validationSchema: formSchema,
    onSubmit: async values => {
      try {
        if (state?.type === FORM_TYPE.ADD) {
          await addJewelryHandler(values);
          displayToast(
            t('success_msgs.Jewelry_success'),
            'success',
          );
        } else {
          await updateJewelryHandler({ id: state?.form?.id, ...values });
          displayToast(
            t('success_msgs.Jewelry_success', { context: 'update' }),
            'success',
          );
        }
        navigate(productsManagementRoute);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <VStack gap={10}>
      <Form
        handleSubmit={formik.handleSubmit}
        handleReset={formik.resetForm}
        title={`${t(`shared:${state?.type}`)} ${t('name')}`}>
        <VStack gap={10} alignItems="start">
          <SimpleGrid columns={2} spacing={2} width="100%">
            <FormControlInput
              formik={formik}
              name="name"
              label="name"
              readOnly={state?.type === FORM_TYPE.VIEW}
            />
            <FormControlInput
              formik={formik}
              name="description"
              label="description"
              readOnly={state?.type === FORM_TYPE.VIEW}
            />
            <FormControlSelect
              name="category"
              label="category"
              formik={formik}
              defaultValue={state?.form?.category}
              options={Object.values(Category).map(category => ({
                label: category,
                value: category,
              }))}
              readOnly={state?.type === FORM_TYPE.VIEW}
            />
            <FormControlInput
              formik={formik}
              name="main_image"
              label="main_image"
              readOnly={state?.type === FORM_TYPE.VIEW}
            />
            <FormControlInput
              formik={formik}
              name="extra_images"
              label="extra_images"
              readOnly={state?.type === FORM_TYPE.VIEW}
            />
            <FormControlInput
              formik={formik}
              name="status"
              label="status"
              readOnly={state?.type === FORM_TYPE.VIEW}
            />
            <FormControlInput
              formik={formik}
              name="price"
              label="price"
              readOnly={state?.type === FORM_TYPE.VIEW}
            />
            <FormControlInput
              formik={formik}
              name="quantity"
              label="quantity"
              readOnly={state?.type === FORM_TYPE.VIEW}
            />
          </SimpleGrid>
          {state?.type !== FORM_TYPE.VIEW && (
            <FormControlButtons
              isLoading={isAddJewelryLoading || isUpdateJewelryLoading}
            />
          )}
        </VStack>
      </Form>
    </VStack>
  );
};

export default ProductForm;
