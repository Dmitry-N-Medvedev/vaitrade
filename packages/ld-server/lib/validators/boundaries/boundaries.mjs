import chars from './chars.mjs';
import words from './words.mjs';

const validators = {
  chars,
  words,
};

export const isBoundariesValid = ({ rawText, config }) => {
  const validationResults = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const validatorName of Object.keys(config)) {
    const validationResult = (validators[validatorName])({
      rawText,
      config: config[validatorName],
    });

    validationResults.push(validationResult);
  }

  return validationResults;
};
