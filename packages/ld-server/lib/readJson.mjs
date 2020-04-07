export const readJson = (res, cb, err) => {
  let buffer;

  res.onData((ab, isLast) => {
    const chunk = Buffer.from(ab);

    if (isLast) {
      let json;
      if (buffer) {
        try {
          json = JSON.parse(Buffer.concat([buffer, chunk]));
        } catch (e) {
          res.close();

          return;
        }
        cb(json);
      } else {
        try {
          json = JSON.parse(chunk);
        } catch (e) {
          res.close();

          return;
        }
        cb(json);
      }
    } else if (buffer) {
      buffer = Buffer.concat([buffer, chunk]);
    } else {
      buffer = Buffer.concat([chunk]);
    }
  });

  res.onAborted(err);
};