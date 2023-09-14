import { describe, expect, it, vi } from 'vitest';
import { useKeyDown } from './useKeyDown';

const pressKey = (key: string) => {
  const event = new KeyboardEvent('keydown', {
    key,
    bubbles: true,
  });
  global.dispatchEvent(event);
};

describe('useKeyDown', () => {
  it('can listen for keyboard events and invokes the corresponding handler', () => {
    // arrange
    const mockHandler = vi.fn();
    useKeyDown([{ key: 'Escape', then: mockHandler }]);

    // act
    pressKey('Escape');

    // assert
    expect(mockHandler).toHaveBeenCalledOnce();
  });

  it('does not invoke handlers not associated with that key', () => {
    // arrange
    const mockHandler = vi.fn();
    useKeyDown([{ key: 'Escape', then: mockHandler }]);

    // act
    pressKey('ArrowLeft');

    // assert
    expect(mockHandler).not.toHaveBeenCalled();
  });
});
