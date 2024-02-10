const fontSizes: Record<string, string> = {};
export const baseFontSize = 14;
for (let i = 5; i <= 100; i++) {
  fontSizes[`fs-${i}`] = `${i / baseFontSize}rem`;
}
const lineHeight: Record<string, string> = {};
for (let i = 0; i <= 100; i++) {
  lineHeight[`lh-${i}`] = `${i / baseFontSize}rem`;
}
export { fontSizes, lineHeight };
