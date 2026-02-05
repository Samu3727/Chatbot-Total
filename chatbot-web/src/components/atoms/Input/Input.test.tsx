import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  it('should render without crashing', () => {
    render(
      <Input value="" onChange={() => {}} placeholder="Test input" />
    );
    expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument();
  });

  it('should call onChange when typing', () => {
    const handleChange = vi.fn();
    render(
      <Input value="" onChange={handleChange} placeholder="Test input" />
    );
    fireEvent.change(screen.getByPlaceholderText('Test input'), { target: { value: 'abc' } });
    expect(handleChange).toHaveBeenCalledWith('abc');
  });
});