const localStorage = {
  get: (key) => {
    try {
      const serialized = window.localStorage.getItem(key);
      if (serialized === null) {
        return undefined;
      }
      return JSON.parse(serialized);
    } catch (err) {
      return undefined;
    }
  },
  set: (key, value) => {
    try {
      const serialized = JSON.stringify(value);
      window.localStorage.setItem(key, serialized);
    } catch (err) {
      /* eslint-disable no-console */
      console.error(err);
      /* eslint-enable no-console */
    }
  },
  clear: () => {
    try {
      window.localStorage.clear();
    } catch (err) {
      /* eslint-disable no-console */
      console.error(err);
      /* eslint-enable no-console */
    }
  },
  remove: (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
};

export default localStorage;

