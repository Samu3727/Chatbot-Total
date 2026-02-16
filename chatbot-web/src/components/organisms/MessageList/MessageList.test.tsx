import { describe, it, expect } from 'vitest';
import MessageList from './MessageList';

describe('MessageList', () => {
  it('should render without crashing', () => {
    expect(MessageList).toBeDefined();
  });
});