import { describe, it, expect, vi } from 'vitest';
import { sendQuestion } from './chat.service';
import { http } from '../apis/http';

describe('chat.service module', () => {
  it('sendQuestion should call http.post and return data', async () => {
    const mockData = { response: 'respuesta de prueba', status: 'ok' };
    const postSpy = vi.spyOn(http, 'post').mockResolvedValue({ data: mockData } as any);

    const res = await sendQuestion({ message: 'hola' });

    expect(postSpy).toHaveBeenCalledWith('/api/v1/chat', { message: 'hola' });
    expect(res).toEqual(mockData);

    postSpy.mockRestore();
  });
});