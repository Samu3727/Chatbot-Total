import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChatLayout from './ChatLayout';

describe('ChatLayout', () => {
  it('should render children', () => {
    render(
      <ChatLayout>
        <div>Contenido de prueba</div>
      </ChatLayout>
    );
    expect(screen.getByText('Contenido de prueba')).toBeInTheDocument();
  });
});