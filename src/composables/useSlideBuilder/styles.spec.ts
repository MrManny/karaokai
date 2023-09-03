import { describe, expect, it } from 'vitest';
import { applyStyle, styles } from './styles';

describe('useStyleBuilder/styles', () => {
  it('contains a number of styles', () => {
    expect(styles.length).greaterThan(0);
  });

  it('can apply a style to a prompt', () => {
    const style = {
      name: 'test',
      positivePrompt: 'crude crayon drawing of {prompt}, by a 3 year old',
      negativePrompt: 'masterpiece',
    };
    const prompt = 'sea urchin';
    const applied = applyStyle(style, prompt);

    expect(applied).toEqual({
      positivePrompt: 'crude crayon drawing of sea urchin, by a 3 year old',
      negativePrompt: 'masterpiece',
    });
  });
});
