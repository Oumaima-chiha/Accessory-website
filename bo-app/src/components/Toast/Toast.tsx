/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { ToastId, UseToastOptions } from '@chakra-ui/toast';
import { createStandaloneToast } from '@chakra-ui/toast';
import { ToastPosition, ToastStatus } from 'interfaces/enums/toast';
import { useTranslation } from 'react-i18next';
import { getToastStatusColor } from 'utils/functions';
import { v4 } from 'uuid';

const DEFAULT_TOAST_DURATION = 3000;
const defaultOptions = {
  position: ToastPosition.TOP,
  status: ToastStatus.ERROR,
  duration: DEFAULT_TOAST_DURATION,
  isClosable: true,
} as const;

let currentToast: ToastId | undefined;

// Maybe refactor later
const getToastUtils = () => {
  const id = v4();
  return { id };
};

const CreateOutsideToast = ({
  description,
  title = 'Error',
  status = ToastStatus.ERROR,
  ...options
}: UseToastOptions) => {
  const { toast } = createStandaloneToast();
  const { id } = getToastUtils();

  if (currentToast) {
    toast.close(currentToast);
  }

  currentToast = toast({
    ...defaultOptions,
    ...options,
    description: <Description description={description} />,
    title,
    status,
    id,
    variant: getToastStatusColor(status),
    // containerStyle: {
    // : 'blue',
    // },
  });
};
const Description = ({ description }: any) => {
  const { t } = useTranslation('errors');
  let translatedDescription;

  if (description && typeof description === 'string') {
    // @ts-ignore
    translatedDescription = t(description);
  } else {
    translatedDescription = description;
  }
  return <>{translatedDescription}</>;
};

export default CreateOutsideToast;
