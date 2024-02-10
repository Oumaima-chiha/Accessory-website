export type ICookies = {
  domain: string | undefined;
  expires: number | Date | undefined;
  path: string | undefined;
  sameSite: 'strict' | 'Strict' | 'lax' | 'Lax' | 'none' | 'None' | undefined;
  secure: boolean | undefined;
};
