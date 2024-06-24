export const secureUrl = (url: string, path: string) => {
  let URL = url;
  let PATH = path;
  if (url.endsWith('/')) {
    URL = url.slice(0, -1);
  }

  if (!path.startsWith('/')) {
    PATH = `/${path}`;
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return { URL: URL, PATH: PATH };
  }
  return { URL: `http://${URL}`, PATH: PATH };
};
