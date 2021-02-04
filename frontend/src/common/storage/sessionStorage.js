const sessionStorage = {
  get: (key) => {
    try {
      const serialized = window.sessionStorage.getItem(key);
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
      window.sessionStorage.setItem(key, serialized);
    } catch (err) {
      /* eslint-disable no-console */
      console.error(err);
      /* eslint-enable no-console */
    }
  },
  clear: () => {
    try {
      window.sessionStorage.clear();
    } catch (err) {
      /* eslint-disable no-console */
      console.error(err);
      /* eslint-enable no-console */
    }
  },
  remove: (key) => {
    try {
      window.sessionStorage.removeItem(key);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
};

export default sessionStorage;
