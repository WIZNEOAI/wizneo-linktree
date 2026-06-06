import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import LinkCard from '@/components/LinkCard';

// Mock the analytics hook
vi.mock('@/hooks/useAnalytics', () => ({
  useAnalytics: () => ({
    trackEvent: vi.fn(),
  }),
}));

describe('LinkCard', () => {
  const defaultProps = {
    icon: 'brain',
    title: 'Test Title',
    description: 'Test Description',
    url: 'https://example.com',
  };

  it('renders correctly', () => {
    render(<LinkCard {...defaultProps} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders a real external anchor', () => {
    render(<LinkCard {...defaultProps} />);

    const linkElement = screen.getByRole('link', {
      name: 'Test Title - Test Description',
    });

    expect(linkElement).toHaveAttribute('href', 'https://example.com');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('is keyboard focusable through the native link element', () => {
    render(<LinkCard {...defaultProps} />);

    const linkElement = screen.getByRole('link', {
      name: 'Test Title - Test Description',
    });

    linkElement.focus();
    expect(linkElement).toHaveFocus();
  });

  it('has proper accessibility attributes', () => {
    render(<LinkCard {...defaultProps} />);

    const linkElement = screen.getByRole('link', {
      name: 'Test Title - Test Description',
    });

    expect(linkElement).toHaveAttribute('aria-label', 'Test Title - Test Description');
  });
});
