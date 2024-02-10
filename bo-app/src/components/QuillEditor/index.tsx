import { Box } from '@chakra-ui/react';
import type { FormikProps } from 'formik';
import React, { memo, useLayoutEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomToolbar from './CustomToolbar';
import './style.css';

export interface QuillEditorProps {
  name: string;
  placeholder?: string;
  value: string;
  dir?: 'rtl' | 'ltr';
  handleChange: (value: string) => void;
  formik: FormikProps<any>;
  readOnly: boolean;
}
const QuillEditor = (props: QuillEditorProps): React.ReactElement => {
  const { handleChange, value, name, readOnly, dir = 'ltr' } = props;
  const editorRef = useRef<ReactQuill>(null);
  const formats = [
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'script',
    'header',
    'blockquote',
    'code-block',
    'indent',
    'list',
    'direction',
    'align',
    'link',
    'image',
    'video',
    'formula',
  ];

  useLayoutEffect(() => {
    if (editorRef.current && editorRef.current.editingArea) {
      const editingArea = editorRef?.current?.editingArea as HTMLDivElement;
      const editor = editingArea.firstChild as HTMLDivElement;
      editor.style.direction = dir;
      editor.style.textAlign = dir === 'rtl' ? 'right' : 'left';
    }
  }, [dir]);

  return (
    <Box w="100%">
      <CustomToolbar id={name} />
      <ReactQuill
        ref={editorRef}
        value={value}
        onChange={handleChange}
        modules={{
          toolbar: {
            container: `#${name}`,
          },
        }}
        preserveWhitespace
        placeholder={props?.placeholder}
        formats={formats}
        className="ql-parent"
        id={name}
        readOnly={readOnly}
      />
    </Box>
  );
};

export default memo(QuillEditor);
