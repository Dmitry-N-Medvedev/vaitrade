import {
  DL_VERBOSITY,
} from './constants.mjs';
import {
  nonLexicalWords,
} from '../config/non-lexical-words.mjs';

const sentenceSplitAtRe = /[.?!]/;
const wordRe = /\w+/gmiu;

const decoder = new TextDecoder('utf-8');

const splitBuffer = ({ buffer, mode }) => {
  const rawText = decoder.decode(buffer);

  switch (mode) {
    case DL_VERBOSITY.NORMAL: {
      return [rawText];
    }
    case DL_VERBOSITY.VERBOSE: {
      return [...rawText.split(sentenceSplitAtRe)];
    }
    default: {
      throw new Error(`incorrect verbosity mode: "${mode}"`);
    }
  }
};

const calcLexULex = (words) => words.reduce((acc, word) => {
  if (nonLexicalWords.includes(word) === false) {
    return { ...acc, lex: acc.lex + 1 };
  }

  return acc;
}, {
  lex: 0,
});

const processSentence = (sentence) => {
  const words = sentence.match(wordRe);

  if (words === null) {
    return 0.00;
  }

  const { lex } = calcLexULex(words);

  return Number((lex / words.length).toFixed(2));
};

export const calc = async ({
  buffer = null,
  mode = DL_VERBOSITY.NORMAL,
}) => {
  if (buffer === null) {
    throw new Error('calc(null) - buffer is undefined');
  }

  const sentences = splitBuffer({
    buffer,
    mode,
  });
  const results = [];

  // eslint-disable-next-line no-restricted-syntax
  for await (const sentence of sentences) {
    results.push(
      processSentence(sentence),
    );
  }

  if (mode === DL_VERBOSITY.NORMAL) {
    return results[0];
  }

  return results;
};
