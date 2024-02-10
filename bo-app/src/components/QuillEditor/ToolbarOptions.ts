const colors = [
  '#8A1538',
  '#0D4261',
  '#a29475',
  '#FDF39E',
  '#4194B3',
  '#009c80',
  '#ff9800',
  'white',
];
const formats = [
  [
    {
      className: 'ql-size',
      options: ['small', 'large', 'huge'],
    },
  ],
  [
    { className: 'ql-bold' },
    { className: 'ql-italic' },
    { className: 'ql-underline' },
    { className: 'ql-strike' },
  ],
  [
    {
      className: 'ql-color',
      options: colors,
    },
    {
      className: 'ql-background',
      options: colors,
    },
  ],
  [
    {
      className: 'ql-script',
      value: 'sub',
    },
    {
      className: 'ql-script',
      value: 'super',
    },
  ],
  [
    {
      className: 'ql-header',
      value: '1',
    },
    {
      className: 'ql-header',
      value: '2',
    },
    {
      className: 'ql-blockquote',
    },
    // {
    //   className: 'ql-code-block',
    // },
  ],
  [
    {
      className: 'ql-list',
      value: 'ordered',
    },
    {
      className: 'ql-list',
      value: 'bullet',
    },
    // {
    //   className: 'ql-indent',
    //   value: '-1',
    // },
    // {
    //   className: 'ql-indent',
    //   value: '+1',
    // },
  ],
  // [
  //   {
  //     className: 'ql-direction',
  //     value: 'rtl',
  //   },
  //   {
  //     className: 'ql-align',
  //     options: ['right', 'center', 'justify'],
  //   },
  // ],
  // [{ className: 'ql-formula' }],
];

export default formats;
