import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import LinkCard from '@/components/LinkCard';

// Mock the analytics hook
vi.mock('@/hooks/useAnalytics', () => ({
  useAnalytics: () => ({
    trackEvent: vi.fn(),
  }),
}));

// Mock window.open
const mockOpen = vi.fn();
Object.defineProperty(window, 'open', { value: mockOpen });

describe('LinkCard', () => {
  const defaultProps = {
    icon: 'brain',
    title: 'Test Title',
    description: 'Test Description',
    url: 'https://example.com',
  };

  beforeEach(() => {
    mockOpen.mockClear();
  });

  it('renders correctly', () => {
    render(<LinkCard {...defaultProps} />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('opens external link when clicked', () => {
    render(<LinkCard {...defaultProps} />);
    
    const linkElement = screen.getByRole('button');
    fireEvent.click(linkElement);
    
    expect(mockOpen).toHaveBeenCalledWith(
      'https://example.com',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('handles keyboard navigation', () => {
    render(<LinkCard {...defaultProps} />);
    
    const linkElement = screen.getByRole('button');
    fireEvent.keyDown(linkElement, { key: 'Enter' });
    
    expect(mockOpen).toHaveBeenCalledWith(
      'https://example.com',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('has proper accessibility attributes', () => {
    render(<LinkCard {...defaultProps} />);
    
    const linkElement = screen.getByRole('button');
    expect(linkElement).toHaveAttribute('aria-label', 'Test Title - Test Description');
    expect(linkElement).toHaveAttribute('tabIndex', '0');
  });
});