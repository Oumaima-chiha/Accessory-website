import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon component', () => {
  test('renders an icon with the given name', () => {
    const { getByTestId } = render(
      <Icon data-testid="search" displayName="search" />,
    );
    expect(getByTestId('search')).toBeInTheDocument();
    expect(getByTestId('search')).toHaveAttribute('viewBox', '0 0 1024 1024');
  });

  test('renders a multi-color icon with the given colors', () => {
    const { getByTestId } = render(
      <Icon
        data-testid="ministry_health"
        displayName="ministry_health"
        isMultiColor={true}
        multiColors={['red', 'green', 'blue']}
      />,
    );

    expect(getByTestId('ministry_health')).toBeInTheDocument();
    expect(getByTestId('ministry_health').children.length).toBe(69);
    expect(getByTestId('ministry_health').children[0]).toHaveAttribute(
      'fill',
      'red',
    );
    expect(getByTestId('ministry_health').children[1]).toHaveAttribute(
      'fill',
      'green',
    );
    expect(getByTestId('ministry_health').children[2]).toHaveAttribute(
      'fill',
      'blue',
    );
  });

  test('renders an icon with default props', () => {
    const { getByTestId } = render(
      <Icon data-testid="search" displayName="search" />,
    );
    expect(getByTestId('search').children[0]).toHaveAttribute(
      'fill',
      'currentColor',
    );
  });
});
