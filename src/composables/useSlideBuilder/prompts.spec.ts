import { describe, expect, it } from 'vitest';
import { parseSlides } from './prompts';

describe('prompts', () => {
  it('should be able to parse proper output', () => {
    const slideText =
      '## Slide 1\n\n * Text: "Houston, We have a Banana: The Startling Stellar Journey"\n * Image prompt: A banana in an astronaut\'s helmet floating in space.\n\n## Slide 2\n\n * Text: "Peeling Back the Layers: The Truth about Zero-G Banana Bunches" \n * Image prompt: A group of bananas floating in a space station.\n\n## Slide 3\n\n * Text: "Banana Ships: Conquering the Final Fruitier with Potassium Power!"\n * Image prompt: A spaceship shaped like a banana streaking across the galaxy. \n\n## Slide 4\n\n * Text: "Banana Black Holes: The A-Peeling Possibility"\n * Image prompt: A black hole shaped like a banana with galaxies swirling into it.\n\n## Slide 5\n\n * Text: "One Giant Leap for Banana-kind: The Future of Interstellar Banana Travel"\n * Image prompt: An illustrated future city on a banana shaped planet.';

    const parsed = parseSlides(slideText);

    expect(parsed).toHaveLength(5);
    expect(parsed).toMatchObject([
      {
        text: { text: 'Houston, We have a Banana: The Startling Stellar Journey' },
        image: { prompt: "A banana in an astronaut's helmet floating in space." },
      },
      {
        image: { prompt: 'A group of bananas floating in a space station.' },
        text: { text: 'Peeling Back the Layers: The Truth about Zero-G Banana Bunches' },
      },
      {
        image: { prompt: 'A spaceship shaped like a banana streaking across the galaxy.' },
        text: { text: 'Banana Ships: Conquering the Final Fruitier with Potassium Power!' },
      },
      {
        image: { prompt: 'A black hole shaped like a banana with galaxies swirling into it.' },
        text: { text: 'Banana Black Holes: The A-Peeling Possibility' },
      },
      {
        image: { prompt: 'An illustrated future city on a banana shaped planet.' },
        text: { text: 'One Giant Leap for Banana-kind: The Future of Interstellar Banana Travel' },
      },
    ]);
  });

  it('throws if it could not find anything', () => {
    const slideText = 'This will not parse';

    const parseAction = () => parseSlides(slideText);

    expect(parseAction).toThrowError();
  });
});
