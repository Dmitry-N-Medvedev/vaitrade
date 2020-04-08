import uWS from 'uWebSockets.js';
import {
  calc,
} from './libdl.mjs';
import {
  readText,
} from './readText.mjs';
import {
  DL_VERBOSITY,
} from './constants.mjs';


// eslint-disable-next-line no-unused-vars
let Server = null;
let Handle = null;
// eslint-disable-next-line no-unused-vars
let Config = null;

export const configure = (config) => {
  if (typeof config === 'undefined' || config === null) {
    throw new Error('config is undefined');
  }

  if (Object.keys(config).length === 0) {
    throw new Error('config is empty');
  }

  Config = Object.assign(Object.create(null), config);
};

export const stop = () => {
  if (Handle !== null) {
    uWS.us_listen_socket_close(Handle);
    Handle = null;
  }

  Server = null;
};

export const start = ({ port }) => new Promise((resolve, reject) => {
  stop();

  if (Config === null) {
    throw new Error('config is undefined');
  }

  Server = uWS.App({})
    .post('/complexity', (res, req) => {
      const query = req.getQuery();
      const mode = (query.length > 0 && query.split('=').includes('verbose')) ? DL_VERBOSITY.VERBOSE : DL_VERBOSITY.NORMAL;

      readText(res, async (buffer) => {
        const data = await calc({
          buffer,
          mode,
          config: Config,
        });

        res.end(
          JSON.stringify(
            Object.assign(Object.create(null), { data }),
          ),
        );
      });
    })
    .listen(port, (token) => {
      Handle = token;

      if (token === null) {
        return reject(new Error(`failed to listen on port ${port}. bye`));
      }

      return resolve();
    });
});

export const isRunning = () => (Handle !== null);
