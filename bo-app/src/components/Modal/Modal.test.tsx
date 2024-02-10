import { describe, it, test, beforeEach, vi } from 'vitest';
import { render, fireEvent } from 'utils/test-utils';
import Modal from './Modal';
describe('Modal', () => {
  it('renders the Modal component', () => {
    const onClose = vi.fn();
    const title = 'Test Modal';
    const content = <div>Test content</div>;
    const footer = <div>Test footer</div>;

    beforeEach(() => {
      onClose.mockClear();
    });

    test('renders with title and content', () => {
      const { getByText } = render(
        <Modal
          title={title}
          renderContent={content}
          isOpen={true}
          onClose={onClose}
        />,
      );

      expect(getByText(title)).toBeInTheDocument();
      expect(getByText('Test content')).toBeInTheDocument();
    });

    test('renders with footer content', () => {
      const { getByText } = render(
        <Modal
          title={title}
          renderContent={content}
          isOpen={true}
          onClose={onClose}
          footerContent={footer}
        />,
      );

      expect(getByText('Test footer')).toBeInTheDocument();
    });

    test('calls onClose when close button is clicked', () => {
      const { getByRole } = render(
        <Modal
          title={title}
          renderContent={content}
          footerContent={footer}
          isOpen={true}
          onClose={onClose}
        />,
      );

      fireEvent.click(getByRole('button'));

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
