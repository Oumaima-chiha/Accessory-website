type CustomQueryError = {
  data: {
    message: string;
    code: string;
  };
  status: number;
};

export default CustomQueryError;

export type { CustomQueryError };
