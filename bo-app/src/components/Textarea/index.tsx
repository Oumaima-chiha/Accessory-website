import type { TextareaProps as ChakraTextareaProps } from '@chakra-ui/react';
import { Textarea as ChakraTextarea } from '@chakra-ui/react';
import useAutosizeTextArea from 'hooks/useAutosizeTextArea';
import React, { useRef } from 'react';

const Textarea: React.FC<ChakraTextareaProps> = props => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current);

  return <ChakraTextarea {...props} ref={textAreaRef} />;
};

export default Textarea;
