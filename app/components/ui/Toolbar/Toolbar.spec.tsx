import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Toolbar } from './Toolbar';

describe('Toolbar', () => {
  it('renders children correctly', () => {
    render(<Toolbar>Hello world</Toolbar>);
    expect(screen.getByTestId('toolbar')).toBeInTheDocument();
    expect(screen.getByTestId('toolbar')).toHaveTextContent('Hello world');
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<Toolbar className={customClass}>Content</Toolbar>);
    expect(screen.getByTestId('toolbar')).toHaveClass(customClass);
  });
});
