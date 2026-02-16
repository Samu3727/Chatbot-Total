import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUserId } from './user';

describe('getUserId', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns stored id if exists', () => {
    localStorage.setItem('usuario_id', 'stored-id');
    expect(getUserId()).toBe('stored-id');
  });

  it('generates and stores new id if not exists', () => {
    const mockId = 'mock-uuid';
    vi.stubGlobal('crypto', { randomUUID: () => mockId });
    expect(getUserId()).toBe(mockId);
    expect(localStorage.getItem('usuario_id')).toBe(mockId);
  });
});