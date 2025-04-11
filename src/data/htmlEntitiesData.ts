import { decode } from 'html-entities';

// HTML Entities data for reference
export interface HtmlEntity {
  character: string;
  namedCode: string;
  numberedCode: string;
  description: string;
}

// Common HTML entity names and their descriptions
const entityDescriptions: Record<string, string> = {
  // Special Characters
  amp: 'Ampersand',
  lt: 'Less than',
  gt: 'Greater than',
  quot: 'Quotation mark',
  apos: 'Apostrophe',

  // Currency Symbols
  cent: 'Cent sign',
  pound: 'Pound sign',
  yen: 'Yen sign',
  euro: 'Euro sign',

  // Copyright and Trademark
  copy: 'Copyright symbol',
  reg: 'Registered trademark',
  trade: 'Trademark',

  // Mathematical Symbols
  plusmn: 'Plus-minus sign',
  times: 'Multiplication sign',
  divide: 'Division sign',
  infin: 'Infinity',
  ne: 'Not equal to',
  asymp: 'Approximately equal to',
  le: 'Less than or equal to',
  ge: 'Greater than or equal to',
  radic: 'Square root',
  sum: 'Summation (sigma)',
  int: 'Integral',
  prod: 'Product (pi)',

  // Arrows
  larr: 'Left arrow',
  rarr: 'Right arrow',
  uarr: 'Up arrow',
  darr: 'Down arrow',
  harr: 'Left-right arrow',

  // Punctuation and Spacing
  nbsp: 'Non-breaking space',
  iexcl: 'Inverted exclamation mark',
  iquest: 'Inverted question mark',
  ndash: 'En dash',
  mdash: 'Em dash',
  hellip: 'Horizontal ellipsis',

  // Quotes
  ldquo: 'Left double quotation mark',
  rdquo: 'Right double quotation mark',
  lsquo: 'Left single quotation mark',
  rsquo: 'Right single quotation mark',

  // Accented Characters
  Agrave: 'A with grave accent',
  Aacute: 'A with acute accent',
  Acirc: 'A with circumflex accent',
  Atilde: 'A with tilde',
  Auml: 'A with diaeresis',
  Aring: 'A with ring above',
  AElig: 'AE ligature',
  Ccedil: 'C with cedilla',
  Egrave: 'E with grave accent',
  Eacute: 'E with acute accent',
  Ecirc: 'E with circumflex accent',
  Euml: 'E with diaeresis',

  // Symbols
  deg: 'Degree sign',
  sect: 'Section sign',
  para: 'Paragraph sign',
  bull: 'Bullet point',
  spades: 'Spade suit',
  clubs: 'Club suit',
  hearts: 'Heart suit',
  diams: 'Diamond suit',
  star: 'Black star',
  starf: 'White star',
  phone: 'Telephone sign',
  check: 'Check mark',
  cross: 'Cross mark',
};

// Generate HTML entities data programmatically
export const generateHtmlEntitiesData = (): HtmlEntity[] => {
  const entities: HtmlEntity[] = [];

  // Add named entities
  Object.entries(entityDescriptions).forEach(([name, description]) => {
    const namedCode = `&${name};`;
    const character = decode(namedCode);

    // Get the decimal code point
    const codePoint = character.codePointAt(0);
    const numberedCode = codePoint ? `&#${codePoint};` : '';

    entities.push({
      character,
      namedCode,
      numberedCode,
      description,
    });
  });

  // Add some special entities that don't have named codes or need special handling
  const specialEntities = [
    { codePoint: 8377, namedCode: '&inr;', description: 'Indian Rupee sign' },
  ];

  specialEntities.forEach(({ codePoint, namedCode, description }) => {
    const numberedCode = `&#${codePoint};`;
    // Use the numeric code to ensure correct character rendering
    const character = String.fromCodePoint(codePoint);

    entities.push({
      character,
      namedCode,
      numberedCode,
      description,
    });
  });

  return entities;
};

export const htmlEntitiesData: HtmlEntity[] = generateHtmlEntitiesData();
