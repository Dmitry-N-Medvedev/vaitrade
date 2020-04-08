export default ({ rawText, config }) => (
  (rawText.length >= config.lo) && (rawText.length <= config.up)
);
