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

export const stop = () => {
  if (Handle !== null) {
    uWS.us_listen_socket_close(Handle);
    Handle = null;
  }

  Server = null;
};

export const start = ({ port }) => new Promise((resolve, reject) => {
  stop();

  Server = uWS.App({})
    .post('/complexity', (res, req) => {
      const query = req.getQuery();

      if (query.length > 0 && query.split('=').includes('verbose')) {
        readText(res, async (buffer) => {
          const data = await calc({
            buffer,
            mode: DL_VERBOSITY.VERBOSE,
          });

          res.end(
            JSON.stringify(
              Object.assign(Object.create(null), { data }),
            ),
          );
        });
      } else {
        readText(res, async (buffer) => {
          const data = await calc({
            buffer,
            mode: DL_VERBOSITY.NORMAL,
          });

          res.end(
            JSON.stringify(
              Object.assign(Object.create(null), { data }),
            ),
          );
        });
      }
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
