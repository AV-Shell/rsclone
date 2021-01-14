

function storage(key: string, data?: any) {
  if (arguments.length === 1) {
    const storedData = localStorage.getItem(key);
    if (storedData !== null) {
      return JSON.parse(storedData);
    }
    return false;
  }
  if (data === null) {
    localStorage.removeItem(key);
    return true;
  }
  localStorage.setItem(key, JSON.stringify(data));
  return true;
}


export {
  storage,
};
