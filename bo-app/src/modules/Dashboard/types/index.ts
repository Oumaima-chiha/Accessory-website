import type { FlexProps } from '@chakra-ui/react';
import type { mockEventData } from '../extra/mock';

export type DiagnosisDataType = {
  id: number;
  title: {
    ar: string;
    en: string;
  };
  date: string;
  isActive: boolean;
  heading: {
    ar: string;
    en: string;
  };
  symptoms: {
    ar: string[];
    en: string[];
  };
  result: {
    ar: string;
    en: string;
  };
  alarmingSymptoms: {
    ar: string;
    en: string;
  };
};

export interface TimelineProps extends FlexProps {
  historyItems: DiagnosisDataType[];
  setHistoryItems: React.Dispatch<React.SetStateAction<DiagnosisDataType[]>>;
}

export type EventCordsProps = {
  details: (typeof mockEventData)[0];
};

export type EventDetailsProps = {
  details: (typeof mockEventData)[0];
};
