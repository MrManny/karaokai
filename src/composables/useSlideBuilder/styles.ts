type Style = {
  name: string;
  positivePrompt: string;
  negativePrompt: string;
};
export const styles: Style[] = [
  {
    name: 'base',
    positivePrompt: '{prompt}',
    negativePrompt: '',
  },
  {
    name: '3D Model',
    positivePrompt: 'professional 3d model {prompt} . octane render, highly detailed, volumetric, dramatic lighting',
    negativePrompt: 'ugly, deformed, noisy, low poly, blurry, painting',
  },
  {
    name: 'Analog Film',
    positivePrompt:
      'analog film photo {prompt} . faded film, desaturated, 35mm photo, grainy, vignette, vintage, Kodachrome, Lomography, stained, highly detailed, found footage',
    negativePrompt: 'painting, drawing, illustration, glitch, deformed, mutated, cross-eyed, ugly, disfigured',
  },
  {
    name: 'Anime',
    positivePrompt: 'anime artwork {prompt} . anime style, key visual, vibrant, studio anime,  highly detailed',
    negativePrompt: 'photo, deformed, black and white, realism, disfigured, low contrast',
  },
  {
    name: 'Cinematic',
    positivePrompt:
      'cinematic film still {prompt} . shallow depth of field, vignette, highly detailed, high budget, bokeh, cinemascope, moody, epic, gorgeous, film grain, grainy',
    negativePrompt:
      'anime, cartoon, graphic, text, painting, crayon, graphite, abstract, glitch, deformed, mutated, ugly, disfigured',
  },
  {
    name: 'Comic Book',
    positivePrompt: 'comic {prompt} . graphic illustration, comic art, graphic novel art, vibrant, highly detailed',
    negativePrompt: 'photograph, deformed, glitch, noisy, realistic, stock photo',
  },
  {
    name: 'Craft Clay',
    positivePrompt: 'play-doh style {prompt} . sculpture, clay art, centered composition, Claymation',
    negativePrompt: 'sloppy, messy, grainy, highly detailed, ultra textured, photo',
  },
  {
    name: 'Digital Art',
    positivePrompt: 'concept art {prompt} . digital artwork, illustrative, painterly, matte painting, highly detailed',
    negativePrompt: 'photo, photorealistic, realism, ugly',
  },
  {
    name: 'Enhance',
    positivePrompt: 'breathtaking {prompt} . award-winning, professional, highly detailed',
    negativePrompt: 'ugly, deformed, noisy, blurry, distorted, grainy',
  },
  {
    name: 'Fantasy Art',
    positivePrompt:
      'ethereal fantasy concept art of  {prompt} . magnificent, celestial, ethereal, painterly, epic, majestic, magical, fantasy art, cover art, dreamy',
    negativePrompt:
      'photographic, realistic, realism, 35mm film, dslr, cropped, frame, text, deformed, glitch, noise, noisy, off-center, deformed, cross-eyed, closed eyes, bad anatomy, ugly, disfigured, sloppy, duplicate, mutated, black and white',
  },
  {
    name: 'Isometric Style',
    positivePrompt: 'isometric style {prompt} . vibrant, beautiful, crisp, detailed, ultra detailed, intricate',
    negativePrompt: 'deformed, mutated, ugly, disfigured, blur, blurry, noise, noisy, realistic, photographic',
  },
  {
    name: 'Line Art',
    positivePrompt:
      'line art drawing {prompt} . professional, sleek, modern, minimalist, graphic, line art, vector graphics',
    negativePrompt:
      'anime, photorealistic, 35mm film, deformed, glitch, blurry, noisy, off-center, deformed, cross-eyed, closed eyes, bad anatomy, ugly, disfigured, mutated, realism, realistic, impressionism, expressionism, oil, acrylic',
  },
  {
    name: 'Lowpoly',
    positivePrompt:
      'low-poly style {prompt} . low-poly game art, polygon mesh, jagged, blocky, wireframe edges, centered composition',
    negativePrompt: 'noisy, sloppy, messy, grainy, highly detailed, ultra textured, photo',
  },
  {
    name: 'Neon Punk',
    positivePrompt:
      'neonpunk style {prompt} . cyberpunk, vaporwave, neon, vibes, vibrant, stunningly beautiful, crisp, detailed, sleek, ultramodern, magenta highlights, dark purple shadows, high contrast, cinematic, ultra detailed, intricate, professional',
    negativePrompt: 'painting, drawing, illustration, glitch, deformed, mutated, cross-eyed, ugly, disfigured',
  },
  {
    name: 'Origami',
    positivePrompt:
      'origami style {prompt} . paper art, pleated paper, folded, origami art, pleats, cut and fold, centered composition',
    negativePrompt: 'noisy, sloppy, messy, grainy, highly detailed, ultra textured, photo',
  },
  {
    name: 'Photographic',
    positivePrompt: 'cinematic photo {prompt} . 35mm photograph, film, bokeh, professional, 4k, highly detailed',
    negativePrompt: 'drawing, painting, crayon, sketch, graphite, impressionist, noisy, blurry, soft, deformed, ugly',
  },
  {
    name: 'Pixel Art',
    positivePrompt: 'pixel-art {prompt} . low-res, blocky, pixel art style, 8-bit graphics',
    negativePrompt: 'sloppy, messy, blurry, noisy, highly detailed, ultra textured, photo, realistic',
  },
  {
    name: 'Texture',
    positivePrompt: 'texture {prompt} top down close-up',
    negativePrompt: 'ugly, deformed, noisy, blurry',
  },
  {
    name: 'Advertising',
    positivePrompt:
      'Advertising poster style {prompt} . Professional, modern, product-focused, commercial, eye-catching, highly detailed',
    negativePrompt: 'noisy, blurry, amateurish, sloppy, unattractive',
  },
  {
    name: 'Food Photography',
    positivePrompt:
      'Food photography style {prompt} . Appetizing, professional, culinary, high-resolution, commercial, highly detailed',
    negativePrompt: 'unappetizing, sloppy, unprofessional, noisy, blurry',
  },
  {
    name: 'Real Estate',
    positivePrompt:
      'Real estate photography style {prompt} . Professional, inviting, well-lit, high-resolution, property-focused, commercial, highly detailed',
    negativePrompt: 'dark, blurry, unappealing, noisy, unprofessional',
  },
  {
    name: 'Abstract',
    positivePrompt:
      'Abstract style {prompt} . Non-representational, colors and shapes, expression of feelings, imaginative, highly detailed',
    negativePrompt: 'realistic, photographic, figurative, concrete',
  },
  {
    name: 'Cubist',
    positivePrompt: 'Cubist artwork {prompt} . Geometric shapes, abstract, innovative, revolutionary',
    negativePrompt: 'anime, photorealistic, 35mm film, deformed, glitch, low contrast, noisy',
  },
  {
    name: 'Graffiti',
    positivePrompt: 'Graffiti style {prompt} . Street art, vibrant, urban, detailed, tag, mural',
    negativePrompt: 'ugly, deformed, noisy, blurry, low contrast, realism, photorealistic',
  },
  {
    name: 'Hyperrealism',
    positivePrompt:
      'Hyperrealistic art {prompt} . Extremely high-resolution details, photographic, realism pushed to extreme, fine texture, incredibly lifelike',
    negativePrompt: 'simplified, abstract, unrealistic, impressionistic, low resolution',
  },
  {
    name: 'Impressionist',
    positivePrompt:
      'Impressionist painting {prompt} . Loose brushwork, vibrant color, light and shadow play, captures feeling over form',
    negativePrompt: 'anime, photorealistic, 35mm film, deformed, glitch, low contrast, noisy',
  },
  {
    name: 'Pointillism',
    positivePrompt:
      'Pointillism style {prompt} . Composed entirely of small, distinct dots of color, vibrant, highly detailed',
    negativePrompt: 'line drawing, smooth shading, large color fields, simplistic',
  },
  {
    name: 'Pop Art',
    positivePrompt: 'Pop Art style {prompt} . Bright colors, bold outlines, popular culture themes, ironic or kitsch',
    negativePrompt: 'ugly, deformed, noisy, blurry, low contrast, realism, photorealistic, minimalist',
  },
  {
    name: 'Psychedelic',
    positivePrompt: 'Psychedelic style {prompt} . Vibrant colors, swirling patterns, abstract forms, surreal, trippy',
    negativePrompt: 'monochrome, black and white, low contrast, realistic, photorealistic, plain, simple',
  },
  {
    name: 'Renaissance',
    positivePrompt:
      'Renaissance style {prompt} . Realistic, perspective, light and shadow, religious or mythological themes, highly detailed',
    negativePrompt: 'ugly, deformed, noisy, blurry, low contrast, modernist, minimalist, abstract',
  },
  {
    name: 'Steampunk',
    positivePrompt:
      'Steampunk style {prompt} . Antique, mechanical, brass and copper tones, gears, intricate, detailed',
    negativePrompt: 'deformed, glitch, noisy, low contrast, anime, photorealistic',
  },
  {
    name: 'Surrealist',
    positivePrompt: 'Surrealist art {prompt} . Dreamlike, mysterious, provocative, symbolic, intricate, detailed',
    negativePrompt: 'anime, photorealistic, realistic, deformed, glitch, noisy, low contrast',
  },
  {
    name: 'Typography',
    positivePrompt: 'Typographic art {prompt} . Stylized, intricate, detailed, artistic, text-based',
    negativePrompt: 'ugly, deformed, noisy, blurry, low contrast, realism, photorealistic',
  },
  {
    name: 'Watercolor',
    positivePrompt: 'Watercolor painting {prompt} . Vibrant, beautiful, painterly, detailed, textural, artistic',
    negativePrompt: 'anime, photorealistic, 35mm film, deformed, glitch, low contrast, noisy',
  },
  {
    name: 'Fighting Game',
    positivePrompt:
      'Fighting game style {prompt} . Dynamic, vibrant, action-packed, detailed character design, reminiscent of fighting video games',
    negativePrompt: 'peaceful, calm, minimalist, photorealistic',
  },
  {
    name: 'GTA',
    positivePrompt:
      'GTA-style artwork {prompt} . Satirical, exaggerated, pop art style, vibrant colors, iconic characters, action-packed',
    negativePrompt: 'realistic, black and white, low contrast, impressionist, cubist, noisy, blurry, deformed',
  },
  {
    name: 'Super Mario',
    positivePrompt:
      'Super Mario style {prompt} . Vibrant, cute, cartoony, fantasy, playful, reminiscent of Super Mario series',
    negativePrompt: 'realistic, modern, horror, dystopian, violent',
  },
  {
    name: 'Minecraft',
    positivePrompt:
      'Minecraft style {prompt} . Blocky, pixelated, vibrant colors, recognizable characters and objects, game assets',
    negativePrompt: 'smooth, realistic, detailed, photorealistic, noise, blurry, deformed',
  },
  {
    name: 'Pokémon',
    positivePrompt: 'Pokémon style {prompt} . Vibrant, cute, anime, fantasy, reminiscent of Pokémon series',
    negativePrompt: 'realistic, modern, horror, dystopian, violent',
  },
  {
    name: 'Retro Arcade',
    positivePrompt:
      'Retro arcade style {prompt} . 8-bit, pixelated, vibrant, classic video game, old school gaming, reminiscent of 80s and 90s arcade games',
    negativePrompt: 'modern, ultra-high resolution, photorealistic, 3D',
  },
  {
    name: 'Retro Game',
    positivePrompt: 'Retro game art {prompt} . 16-bit, vibrant colors, pixelated, nostalgic, charming, fun',
    negativePrompt: 'realistic, photorealistic, 35mm film, deformed, glitch, low contrast, noisy',
  },
  {
    name: 'RPG Fantasy Game',
    positivePrompt:
      'Role-playing game (RPG) style fantasy {prompt} . Detailed, vibrant, immersive, reminiscent of high fantasy RPG games',
    negativePrompt: 'sci-fi, modern, urban, futuristic, low detailed',
  },
  {
    name: 'Strategy Game',
    positivePrompt:
      'Strategy game style {prompt} . Overhead view, detailed map, units, reminiscent of real-time strategy video games',
    negativePrompt: 'first-person view, modern, photorealistic',
  },
  {
    name: 'Street Fighter',
    positivePrompt:
      'Street Fighter style {prompt} . Vibrant, dynamic, arcade, 2D fighting game, highly detailed, reminiscent of Street Fighter series',
    negativePrompt: '3D, realistic, modern, photorealistic, turn-based strategy',
  },
  {
    name: 'Legend of Zelda',
    positivePrompt:
      'Legend of Zelda style {prompt} . Vibrant, fantasy, detailed, epic, heroic, reminiscent of The Legend of Zelda series',
    negativePrompt: 'sci-fi, modern, realistic, horror',
  },
  {
    name: 'Architectural',
    positivePrompt:
      'Architectural style {prompt} . Clean lines, geometric shapes, minimalist, modern, architectural drawing, highly detailed',
    negativePrompt: 'curved lines, ornate, baroque, abstract, grunge',
  },
  {
    name: 'Disco',
    positivePrompt:
      'Disco-themed {prompt} . Vibrant, groovy, retro 70s style, shiny disco balls, neon lights, dance floor, highly detailed',
    negativePrompt: 'minimalist, rustic, monochrome, contemporary, simplistic',
  },
  {
    name: 'Dreamscape',
    positivePrompt: 'Dreamscape {prompt} . Surreal, ethereal, dreamy, mysterious, fantasy, highly detailed',
    negativePrompt: 'realistic, concrete, ordinary, mundane',
  },
  {
    name: 'Dystopian',
    positivePrompt: 'Dystopian style {prompt} . Bleak, post-apocalyptic, somber, dramatic, highly detailed',
    negativePrompt: 'ugly, deformed, noisy, blurry, low contrast, cheerful, optimistic, vibrant, colorful',
  },
  {
    name: 'Fairy Tale',
    positivePrompt: 'Fairy tale {prompt} . Magical, fantastical, enchanting, storybook style, highly detailed',
    negativePrompt: 'realistic, modern, ordinary, mundane',
  },
  {
    name: 'Gothic',
    positivePrompt: 'Gothic style {prompt} . Dark, mysterious, haunting, dramatic, ornate, detailed',
    negativePrompt: 'ugly, deformed, noisy, blurry, low contrast, realism, photorealistic, cheerful, optimistic',
  },
  {
    name: 'Grunge',
    positivePrompt: 'Grunge style {prompt} . Textured, distressed, vintage, edgy, punk rock vibe, dirty, noisy',
    negativePrompt: 'smooth, clean, minimalist, sleek, modern, photorealistic',
  },
  {
    name: 'Horror',
    positivePrompt: 'Horror-themed {prompt} . Eerie, unsettling, dark, spooky, suspenseful, grim, highly detailed',
    negativePrompt: 'cheerful, bright, vibrant, light-hearted, cute',
  },
  {
    name: 'Minimalist',
    positivePrompt: 'Minimalist style {prompt} . Simple, clean, uncluttered, modern, elegant',
    negativePrompt: 'ornate, complicated, highly detailed, cluttered, disordered, messy, noisy',
  },
  {
    name: 'Monochrome',
    positivePrompt: 'Monochrome {prompt} . Black and white, contrast, tone, texture, detailed',
    negativePrompt: 'colorful, vibrant, noisy, blurry, deformed',
  },
  {
    name: 'Nautical',
    positivePrompt: 'Nautical-themed {prompt} . Sea, ocean, ships, maritime, beach, marine life, highly detailed',
    negativePrompt: 'landlocked, desert, mountains, urban, rustic',
  },
  {
    name: 'Space',
    positivePrompt:
      'Space-themed {prompt} . Cosmic, celestial, stars, galaxies, nebulas, planets, science fiction, highly detailed',
    negativePrompt: 'earthly, mundane, ground-based, realism',
  },
  {
    name: 'Stained Glass',
    positivePrompt: 'Stained glass style {prompt} . Vibrant, beautiful, translucent, intricate, detailed',
    negativePrompt: 'ugly, deformed, noisy, blurry, low contrast, realism, photorealistic',
  },
  {
    name: 'Techwear Fashion',
    positivePrompt: 'Techwear fashion {prompt} . Futuristic, cyberpunk, urban, tactical, sleek, dark, highly detailed',
    negativePrompt: 'vintage, rural, colorful, low contrast, realism, sketch, watercolor',
  },
  {
    name: 'Tribal',
    positivePrompt:
      'Tribal style {prompt} . Indigenous, ethnic, traditional patterns, bold, natural colors, highly detailed',
    negativePrompt: 'modern, futuristic, minimalist, pastel',
  },
  {
    name: 'Zentangle',
    positivePrompt: 'Zentangle {prompt} . Intricate, abstract, monochrome, patterns, meditative, highly detailed',
    negativePrompt: 'colorful, representative, simplistic, large fields of color',
  },
  {
    name: 'Collage',
    positivePrompt: 'Collage style {prompt} . Mixed media, layered, textural, detailed, artistic',
    negativePrompt: 'ugly, deformed, noisy, blurry, low contrast, realism, photorealistic',
  },
  {
    name: 'Flat Papercut',
    positivePrompt:
      'Flat papercut style {prompt} . Silhouette, clean cuts, paper, sharp edges, minimalist, color block',
    negativePrompt: '3D, high detail, noise, grainy, blurry, painting, drawing, photo, disfigured',
  },
  {
    name: 'Kirigami',
    positivePrompt:
      'Kirigami representation of {prompt} . 3D, paper folding, paper cutting, Japanese, intricate, symmetrical, precision, clean lines',
    negativePrompt: 'painting, drawing, 2D, noisy, blurry, deformed',
  },
  {
    name: 'Paper Mache',
    positivePrompt: 'Paper mache representation of {prompt} . 3D, sculptural, textured, handmade, vibrant, fun',
    negativePrompt: '2D, flat, photo, sketch, digital art, deformed, noisy, blurry',
  },
  {
    name: 'Paper Quilling',
    positivePrompt:
      'Paper quilling art of {prompt} . Intricate, delicate, curling, rolling, shaping, coiling, loops, 3D, dimensional, ornamental',
    negativePrompt: 'photo, painting, drawing, 2D, flat, deformed, noisy, blurry',
  },
  {
    name: 'Papercut Collage',
    positivePrompt:
      'Papercut collage of {prompt} . Mixed media, textured paper, overlapping, asymmetrical, abstract, vibrant',
    negativePrompt: 'photo, 3D, realistic, drawing, painting, high detail, disfigured',
  },
  {
    name: 'Papercut Shadow Box',
    positivePrompt:
      '3D papercut shadow box of {prompt} . Layered, dimensional, depth, silhouette, shadow, papercut, handmade, high contrast',
    negativePrompt: 'painting, drawing, photo, 2D, flat, high detail, blurry, noisy, disfigured',
  },
  {
    name: 'Stacked Papercut',
    positivePrompt:
      'Stacked papercut art of {prompt} . 3D, layered, dimensional, depth, precision cut, stacked layers, papercut, high contrast',
    negativePrompt: '2D, flat, noisy, blurry, painting, drawing, photo, deformed',
  },
  {
    name: 'Thick Layered Papercut',
    positivePrompt:
      'Thick layered papercut art of {prompt} . Deep 3D, volumetric, dimensional, depth, thick paper, high stack, heavy texture, tangible layers',
    negativePrompt: '2D, flat, thin paper, low stack, smooth texture, painting, drawing, photo, deformed',
  },
  {
    name: 'Alien',
    positivePrompt:
      'Alien-themed {prompt} . Extraterrestrial, cosmic, otherworldly, mysterious, sci-fi, highly detailed',
    negativePrompt: 'earthly, mundane, common, realistic, simple',
  },
  {
    name: 'Film Noir',
    positivePrompt:
      'Film noir style {prompt} . Monochrome, high contrast, dramatic shadows, 1940s style, mysterious, cinematic',
    negativePrompt: 'ugly, deformed, noisy, blurry, low contrast, realism, photorealistic, vibrant, colorful',
  },
  {
    name: 'HDR',
    positivePrompt:
      'HDR photo of {prompt} . High dynamic range, vivid, rich details, clear shadows and highlights, realistic, intense, enhanced contrast, highly detailed',
    negativePrompt: 'flat, low contrast, oversaturated, underexposed, overexposed, blurred, noisy',
  },
  {
    name: 'Long Exposure',
    positivePrompt:
      'Long exposure photo of {prompt} . Blurred motion, streaks of light, surreal, dreamy, ghosting effect, highly detailed',
    negativePrompt: 'static, noisy, deformed, shaky, abrupt, flat, low contrast',
  },
  {
    name: 'Neon Noir',
    positivePrompt:
      'Neon noir {prompt} . Cyberpunk, dark, rainy streets, neon signs, high contrast, low light, vibrant, highly detailed',
    negativePrompt: 'bright, sunny, daytime, low contrast, black and white, sketch, watercolor',
  },
  {
    name: 'Silhouette',
    positivePrompt: 'Silhouette style {prompt} . High contrast, minimalistic, black and white, stark, dramatic',
    negativePrompt: 'ugly, deformed, noisy, blurry, low contrast, color, realism, photorealistic',
  },
  {
    name: 'Tilt-Shift',
    positivePrompt:
      'Tilt-shift photo of {prompt} . Selective focus, miniature effect, blurred background, highly detailed, vibrant, perspective control',
    negativePrompt: 'blurry, noisy, deformed, flat, low contrast, unrealistic, oversaturated, underexposed',
  },
];

function inject(template: string, prompt: string): string {
  return template.replace('{prompt}', prompt);
}

export type StyledPrompt = Omit<Style, 'name'>;
export function applyStyle(style: Style, prompt: string): StyledPrompt {
  const positive = inject(style.positivePrompt, prompt);
  const negative = inject(style.negativePrompt, prompt);
  return {
    positivePrompt: positive,
    negativePrompt: negative,
  };
}
