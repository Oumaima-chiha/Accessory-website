import type {
  RangeSliderMarkProps,
  RangeSliderProps as ChakraRangeSliderProps,
} from '@chakra-ui/react';
import {
  RangeSlider as ChakraRangeSlider,
  RangeSliderFilledTrack,
  RangeSliderMark,
  RangeSliderThumb,
  RangeSliderTrack,
} from '@chakra-ui/react';
import React, { useState } from 'react';

export interface RangeSliderProps extends ChakraRangeSliderProps {
  range: number[];
}

const CustomRangeSliderMark: React.FC<RangeSliderMarkProps> = props => (
  <RangeSliderMark textAlign="center" mt="-10" ml="-6" w="12" {...props}>
    {props?.value}
  </RangeSliderMark>
);

const RangeSlider: React.FC<RangeSliderProps> = props => {
  const { range, onChangeEnd, onChange, ...rest } = props;
  const [sliderValue, setSliderValue] = useState(range);
  return (
    <ChakraRangeSlider
      {...rest}
      aria-label={['min', 'max']}
      min={range[0]}
      max={range[1]}
      defaultValue={range}
      onChange={(values): void => {
        setSliderValue(values);
        onChange && onChange(values);
      }}
      onChangeEnd={(values): void => {
        onChangeEnd && onChangeEnd(values);
      }}>
      <CustomRangeSliderMark value={sliderValue[0]} />
      <CustomRangeSliderMark value={sliderValue[1]} />

      <RangeSliderTrack bg="secondary.100">
        <RangeSliderFilledTrack bg="secondary.500" />
      </RangeSliderTrack>
      <RangeSliderThumb boxSize={6} index={0} bg="secondary.500" />
      <RangeSliderThumb boxSize={6} index={1} bg="secondary.500" />
    </ChakraRangeSlider>
  );
};

export default RangeSlider;
