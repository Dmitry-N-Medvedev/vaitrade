import {
  isBoundariesValid,
} from './boundaries/boundaries.mjs';

const validators = {
  boundaries: isBoundariesValid,
};

export const isValid = ({ rawText, config }) => {
  const validationResults = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const validatorName of Object.keys(config)) {
    const validationResult = (validators[validatorName])({
      rawText,
      config: config[validatorName],
    });

    validationResults.push(...validationResult);
  }

  return validationResults.reduce((acc, val) => acc && val, true);
};
