import { Box } from '@chakra-ui/react';
import { getByTestId, render, screen } from 'utils/test-utils';
import { describe, it, expect } from 'vitest';
describe('ProgressBar', () => {
  const isHorizontal = true;
  const height = 1.5;
  const width = '400px';
  const borderRadius = 10;
  const color = 'red';
  let currentStep = 0;

  it('should render with initial width of 0%', () => {
    const value = (currentStep / 4) * 100;
    const { container } = render(
      <Box
        height={isHorizontal ? 1.5 : height}
        width={isHorizontal ? width : 1.5}
        borderRadius={borderRadius}
        backgroundColor="blue"
        position="relative">
        <span
          data-testid="test-id"
          style={{
            ...(isHorizontal ? { height: 5 } : { width: 5 }),
            backgroundColor: color,
            borderRadius,
            position: 'absolute',
            left: 0,
            top: 0,
            width: `${value}%`,
          }}
        />
      </Box>,
    );

    const span = getByTestId(container, 'test-id');
    const style = window.getComputedStyle(span);
    expect(style.width).toBe('0%');
  });

  it('should progress be changed to 25%', () => {
    currentStep++;
    const value = (currentStep / 4) * 100;
    const { container } = render(
      <Box
        height={isHorizontal ? 1.5 : height}
        width={isHorizontal ? width : 1.5}
        borderRadius={borderRadius}
        backgroundColor="blue"
        position="relative">
        <span
          data-testid="test-id"
          style={{
            ...(isHorizontal ? { height: 5 } : { width: 5 }),
            backgroundColor: color,
            borderRadius,
            position: 'absolute',
            left: 0,
            top: 0,
            width: `${value}%`,
          }}
        />
      </Box>,
    );

    const span = getByTestId(container, 'test-id');
    const style = window.getComputedStyle(span);
    expect(style.width).toBe('25%');
  });

  it('should progress be changed to 100%', () => {
    currentStep = 4;
    const value = (currentStep / 4) * 100;
    const { container } = render(
      <Box
        height={isHorizontal ? 1.5 : height}
        width={isHorizontal ? width : 1.5}
        borderRadius={borderRadius}
        backgroundColor="blue"
        position="relative">
        <span
          data-testid="test-id"
          style={{
            ...(isHorizontal ? { height: 5 } : { width: 5 }),
            backgroundColor: color,
            borderRadius,
            position: 'absolute',
            left: 0,
            top: 0,
            width: `${value}%`,
          }}
        />
      </Box>,
    );

    const span = getByTestId(container, 'test-id');
    const style = window.getComputedStyle(span);
    expect(style.width).toBe('100%');
  });

  screen.debug();
});
