import glob from 'glob';

export default function asyncGlob(pattern: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    glob(pattern, (error, matches) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(matches);
      }
    });
  });
}
