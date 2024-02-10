/* eslint-disable prefer-const */

import type { AlertStatus } from '@chakra-ui/react';
import type { CustomQueryError, IAnswer } from 'common';
import CreateOutsideToast from 'components/Toast/Toast';
import { ToastStatus } from 'interfaces/enums/toast';

import i18n from 'config/i18n';
import { ContentReviewStatus } from 'interfaces';
import type { ICookies } from 'interfaces/cookiesOptions';
import type { RangeCriteria, SelectCriteria } from 'interfaces/criteria';
import { CriteriaTypes } from 'interfaces/criteria';
import Cookies from 'js-cookie';
import type { IBOUser } from 'models';
import moment from 'moment';
import type * as Yup from 'yup';

//? REGEX
export const usernameValidator = /^[a-z0-9_-]{3,16}$/gim;
export const alphaNumericWithSpace = /^[a-zA-Z0-9 ]*$/gs;
export const alphaNumericWithoutSpace = /^[a-zA-Z0-9]*$/g;
export const floatValidator = /^\d{1,6}$|^(?=\d+[.]\d+$).{3,10}$/;
export const numberValidator = /^[0-9]{1,6}$/;
export const passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
export const alphaNumeric = /^[a-z0-9]+([-_\s]{1}[a-z0-9]+)*$/i;
export const noSpaceValidator = /^\S*$/gm;

export const slugify = (text: string): string => {
  if (text) {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  }
  return '';
};

export const checkObjEqual = (
  obj1: Record<string, any>,
  obj2: Record<string, any>,
): boolean => {
  if (obj1 && obj2) {
    for (const key in obj1) {
      if (key == 'undefined') {
        delete obj1.undefined;
      }
      if (obj1[key]?.toString() !== obj2[key]?.toString()) {
        return false;
      }
    }
    return true;
  }
  return false;
};

export const convertToBase64 = async (file: File): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    if (file?.type) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (): void => {
        resolve(fileReader?.result);
      };
      fileReader.onerror = (error): void => {
        reject(error);
      };
    } else {
      reject('empty_file');
    }
  });
};

// *************** | Remove a certain keyword from object key | ***************

export const transformObject = (
  object: Record<string, any>,
  keyword: any,
): {
  [k: string]: any;
} => {
  const renamedObject = Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      const keyName =
        key.replace(keyword, '').charAt(0).toLowerCase() +
        key.replace(keyword, '').slice(1);
      return [keyName, value];
    }),
  );
  return renamedObject;
};

// ************************ | Get all object keys | ************************

export const getObjectKeys = (object: Record<string, string>): string[] => {
  const objKeys: Array<string> = [];
  Object.keys(object).forEach(key => {
    objKeys.push(key);
  });
  return objKeys;
};

export function isObjEmpty(obj: Record<string, any>): boolean {
  return obj ? Object.keys(obj).length === 0 : false;
}

//? ***************** | ***************** | *****************

export const getFormattedDate = (dateTime: Date): string => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const year = dateTime.getFullYear();
  const month = dateTime.getMonth();
  const day = dateTime.getDate();
  const monthName = months[month];
  return `${day}, ${dateTime.getDay()} ${monthName} ${year}`;
};

export const getFormattedTime = (dateTime: Date): string => {
  return (
    dateTime.getHours() +
    ':' +
    dateTime.getMinutes() +
    ':' +
    dateTime.getSeconds()
  );
};

export const isDate = (date: string): boolean => {
  return moment.ISO_8601, moment(date, true).isValid();
};

export const stringToDate = (dateTime: string): string =>
  new Date(dateTime)?.toUTCString();

// export const getTimeElapsed = (stringDate: string): string => {
//   const date = new Date(stringDate);
//   const now = new Date();
//   const elapsedTime = Math.abs(now.getTime() - date.getTime()) / 1000; // Elapsed time in seconds

//   const timeIntervals = [
//     { interval: 60, unit: 'second' },
//     { interval: 3600, unit: 'minute' },
//     { interval: 86400, unit: 'hour' },
//     { interval: 2592000, unit: 'day' },
//     { interval: 31536000, unit: 'month' },
//     { interval: Infinity, unit: 'year' },
//   ];

//   for (const { interval, unit } of timeIntervals) {
//     if (elapsedTime < interval) {
//       const timeValue = Math.floor(elapsedTime / (interval / 60));
//       if (unit === 'hour') {
//         return `${timeValue - 1} ${timeValue === 1 ? unit : unit + 's'} ago`;
//       }
//       return `${timeValue} ${timeValue === 1 ? unit : unit + 's'} ago`;
//     }
//   }

//   return ''; // Handle edge case where elapsed time exceeds the largest defined interval
// };

enum TimeUnit {
  Seconds = 'second',
  Minutes = 'minute',
  Hours = 'hour',
  Days = 'day',
  Months = 'month',
  Years = 'year',
}

export function getTimeElapsed(stringDate: string): string {
  const now = new Date();
  const elapsedDate = new Date(stringDate);

  let years = now.getFullYear() - elapsedDate.getFullYear();
  let months = now.getMonth() - elapsedDate.getMonth();
  let days = now.getDate() - elapsedDate.getDate();
  let hours = now.getHours() - elapsedDate.getHours();
  let minutes = now.getMinutes() - elapsedDate.getMinutes();
  let seconds = now.getSeconds() - elapsedDate.getSeconds();

  // Adjust for negative values
  if (seconds < 0) {
    minutes--;
    seconds += 60;
  }
  if (minutes < 0) {
    hours--;
    minutes += 60;
  }
  if (hours < 0) {
    days--;
    hours += 24;
  }
  if (days < 0) {
    const daysInLastMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      0,
    ).getDate();
    months--;
    days += daysInLastMonth;
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  // Adjust for incomplete month
  const daysInElapsedMonth = new Date(
    elapsedDate.getFullYear(),
    elapsedDate.getMonth() + 1,
    0,
  ).getDate();
  if (days > daysInElapsedMonth) {
    days -= daysInElapsedMonth;
    months++;
  }

  // Return the appropriate value based on conditions
  if (years !== 0) {
    return `${years} ${
      years === 1 ? TimeUnit.Years : TimeUnit.Years + 's'
    } ago`;
  } else if (months !== 0) {
    return `${months} ${
      months === 1 ? TimeUnit.Months : TimeUnit.Months + 's'
    } ago`;
  } else if (days !== 0) {
    return `${days} ${days === 1 ? TimeUnit.Days : TimeUnit.Days + 's'} ago`;
  } else if (hours !== 0) {
    return `${hours} ${
      hours === 1 ? TimeUnit.Hours : TimeUnit.Hours + 's'
    } ago`;
  } else if (minutes !== 0) {
    return `${minutes} ${
      minutes === 1 ? TimeUnit.Minutes : TimeUnit.Minutes + 's'
    } ago`;
  } else {
    return `${seconds} ${
      seconds === 1 ? TimeUnit.Seconds : TimeUnit.Seconds + 's'
    } ago`;
  }
}

//? ***************** | Capitalize Words (UpperCase only first letter)| *****************
//? Supports multiple words

export function capitalizeWords(value: string): string {
  if (value && value !== undefined) {
    return value
      ?.toLocaleLowerCase()
      ?.replace(/(?:^|\s)\S/g, function (letter: string) {
        return letter?.toUpperCase();
      });
  }
  return 'N/A';
}

//? ********************** | Toast Creation | ************************
export const displayToast = (
  msg: string,
  status: AlertStatus,
  duration?: number | null | undefined,
): void => {
  CreateOutsideToast({
    title: status?.charAt(0)?.toUpperCase() + status?.slice(1),
    description: msg,
    status: status,
    duration: duration,
  });
};

//? ********************** | Check if Error type is from interface Custom Query Error | ************************
export function isCustomQueryError(object: any): object is CustomQueryError {
  return 'data' in object;
}

export function isRangeCriteria(data: any): data is RangeCriteria {
  return data && data.type === CriteriaTypes.RANGE;
}

export function isSelectCriteria(data: any): data is SelectCriteria {
  return data && data.type === CriteriaTypes.SELECT;
}

export const getToastStatusColor = (status: string): string =>
  status === ToastStatus.ERROR
    ? 'error'
    : status === ToastStatus.WARN
    ? 'warning'
    : status === ToastStatus.INFO
    ? 'info'
    : 'success';

//? ********************** | Cookies functionalities | ************************

export function setCookie(name: string, value: any, options?: ICookies): void {
  Cookies.set(name, value, { ...options });
}

export function removeCookie(name: string): void {
  Cookies.remove(name);
}

export function getCookie(name: string): string | null {
  const value = Cookies.get(name);
  if (value) {
    return value;
  }
  return null;
}

export const getValueById = (
  id: string,
  answer: IAnswer[] | undefined,
): string => {
  return answer
    ? answer.find((elt: IAnswer) => elt.id === id)?.choiceId ?? ''
    : '';
};

// Download File from Blob
export const downloadFile = (blob: Blob, fileName = 'triage-report'): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

export function isiOSDevice(): boolean {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export function getLabelValuePairs<T, K extends keyof T>(
  arr: T[],
  labelProperty: K,
  valueProperty: K,
): { label: string; value: T[K] }[] {
  const result: { label: string; value: T[K] }[] = [];
  for (const item of arr) {
    const label = String(item[labelProperty]);
    const value = item[valueProperty];
    result.push({ label, value });
  }
  return result;
}

export function isFieldRequired<T extends Yup.Maybe<Yup.AnyObject>>(
  schema: Yup.ObjectSchema<T> | undefined,
  fieldName: keyof T,
): boolean {
  if (!schema) return false;
  try {
    schema.validateSyncAt(fieldName as string, {});
    return false;
  } catch (error: any) {
    return error.message?.toLowerCase()?.includes('required');
  }
}

export const parseJwt = (token: string): IBOUser & { sub: string } => {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
};

//? Validate formik image with yup

const validFileExtensions = {
  image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'],
};

export const isValidFileType = (
  fileName: string,
  fileType: string,
): boolean => {
  return (
    fileName !== '' &&
    validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1
  );
};

export const isEditorFieldEmpty = (input: string): boolean => {
  return !input?.replaceAll(/<[^>]*>/g, '');
};

export const getBadgeVariant = {
  [ContentReviewStatus.PENDING]: {
    variant: 'pending',
    text: i18n.t('status', {
      context: 'pending',
      ns: 'fields',
      lng: getCookie('lang') ?? 'en',
    }),
  },
  [ContentReviewStatus.REJECTED]: {
    variant: 'inactive',
    text: i18n.t('status', {
      context: 'rejected',
      ns: 'fields',
      lng: getCookie('lang') ?? 'en',
    }),
  },
  [ContentReviewStatus.APPROVED]: {
    variant: 'active',
    text: i18n.t('status', {
      context: 'approved',
      ns: 'fields',
      lng: getCookie('lang') ?? 'en',
    }),
  },
};
export function mergeArrays<T extends { id: number }>(
    arr1: T[],
    arr2: T[],
): T[] {
  const idSet = new Set([...arr2.map(item => item.id)]); // Create a set of ids from arr2
  return arr1.filter(item => !idSet.has(item.id)).concat(arr2);
}
