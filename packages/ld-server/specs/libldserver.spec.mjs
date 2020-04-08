import got from 'got';
import mocha from 'mocha';
import chai from 'chai';
import {
  start,
  stop,
  isRunning,
} from '../lib/libldserver.mjs';

const {
  describe,
  it,
  before,
  after,
} = mocha;
const {
  expect,
} = chai;

describe('libldserver', () => {
  const port = 9001;
  const urls = {
    complexity: {
      default: 'complexity',
      verbose: 'complexity?mode=verbose',
    },
  };

  before(async () => {
    await start({ port });

    expect(isRunning()).to.be.true;
  });

  after(async () => {
    await stop();

    expect(isRunning()).to.be.false;
  });

  it('should request /complexity', async () => {
    const url = `http://localhost:${port}/${urls.complexity.default}`;
    const text = 'Kim loves going ​to the ​cinema.';
    const expectedObject = {
      data: {
        overall_ld: 0.67,
      },
    };

    const result = await got.post(url, {
      body: text,
    }).json();

    expect(result).to.deep.equal(expectedObject);
  });

  it('should request /complexity?mode=verbose', async () => {
    const url = `http://localhost:${port}/${urls.complexity.default}?mode=verbose`;
    const text = `
      For the sake of simplicity,
      we define a ​lexical word​ as all words not contained in the provided list of non lexical words in the Appendix.
      Case sensitivity should be ignored.
    `;
    const expectedObject = {
      data: {
        sentence_ld: [0.58, 1.0, 0.0],
        overall_ld: 0.65,
      },
    };

    const result = await got.post(url, {
      body: text,
    }).json();

    expect(result).to.deep.equal(expectedObject);
  });
});
