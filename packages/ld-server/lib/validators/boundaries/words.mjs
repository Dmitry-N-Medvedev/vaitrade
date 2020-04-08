const wordRe = /\w+/gmiu;

export default ({ rawText, config }) => {
  const words = rawText.match(wordRe);

  return words === null ? false : ((words.length >= config.lo) && (words.length <= config.up));
};
