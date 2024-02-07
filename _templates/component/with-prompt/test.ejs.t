---
to: app/components/ui/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.spec.tsx
---
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { <%= h.changeCase.pascal(name) %> } from './<%= h.changeCase.pascal(name) %>';

describe('<%= h.changeCase.pascal(name) %>', () => {
  it('renders children', () => {
    render(<<%= h.changeCase.pascal(name) %>>Hello world</<%= h.changeCase.pascal(name) %>>);
    expect(screen.getByTestId('<%= h.changeCase.param(name) %>')).toBeInTheDocument();
    expect(screen.getByTestId('<%= h.changeCase.param(name) %>')).toHaveTextContent('Hello world');
  });
});
