import React, { Fragment } from 'react';
import formats from './ToolbarOptions.js';

const renderOptions = (formatData): React.ReactElement => {
  const { className, options } = formatData;
  return (
    <select className={className}>
      <option></option>
      {options?.map((value, index) => {
        return <option key={index} value={value}></option>;
      })}
    </select>
  );
};
const renderSingle = (formatData): React.ReactElement => {
  const { className, value } = formatData;
  return <button className={className} value={value}></button>;
};
const CustomToolbar = ({ id }: { id: string }): React.ReactElement => (
  <div id={id}>
    {formats?.map((classes, index) => {
      return (
        <span key={index} className="ql-formats">
          {classes?.map((formatData, _index) => {
            return formatData.options ? (
              <Fragment key={_index}>{renderOptions(formatData)}</Fragment>
            ) : (
              <Fragment key={_index}>{renderSingle(formatData)}</Fragment>
            );
          })}
        </span>
      );
    })}
  </div>
);
export default CustomToolbar;
