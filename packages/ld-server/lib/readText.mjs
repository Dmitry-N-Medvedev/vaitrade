export const readText = (res, cb, err) => {
  let buffer;

  res.onData((ab, isLast) => {
    const chunk = Buffer.from(ab);

    if (isLast) {
      let text;

      if (buffer) {
        try {
          text = Buffer.concat([buffer, chunk]);
        } catch (e) {
          res.close();

          return;
        }
        cb(text);
      } else {
        try {
          text = chunk;
        } catch (e) {
          res.close();

          return;
        }
        cb(text);
      }
    } else if (buffer) {
      buffer = Buffer.concat([buffer, chunk]);
    } else {
      buffer = Buffer.concat([chunk]);
    }
  });

  res.onAborted(err);
};
