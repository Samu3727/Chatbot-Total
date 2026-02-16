import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {

  test('renderiza el contenido (children)', () => {
    render(<Button>Guardar</Button>);

    expect(screen.getByText('Guardar')).toBeInTheDocument();
  });

  test('ejecuta handleClick cuando se hace click', () => {
    const handleClick = vi.fn();

    render(<Button handleClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('usa el type por defecto "button"', () => {
    render(<Button>Default</Button>);

    const button = screen.getByText('Default');
    expect(button).toHaveAttribute('type', 'button');
  });

  test('permite asignar el type submit', () => {
    render(<Button type="submit">Enviar</Button>);

    const button = screen.getByText('Enviar');
    expect(button).toHaveAttribute('type', 'submit');
  });

});