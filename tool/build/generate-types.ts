#!node_modules/.bin/ts-node

import * as fs from 'fs-extra';
import { compileFromFile } from 'json-schema-to-typescript';
import minimist from 'minimist';
import * as path from 'path';
import * as prettier from 'prettier';
import asyncGlob from '../common/async-glob';

const argv = minimist(process.argv.slice(2));

async function compileAndNormalize(
  input: string,
  cwd: string,
): Promise<string> {
  return compileFromFile(input, {
    cwd,
    enableConstEnums: true,
    declareExternallyReferenced: false,
    bannerComment: `/* Generated from ${path.basename(input)} */`,
  });
}

async function formatWithPrettier(input: string): Promise<string> {
  const config = await prettier.resolveConfigFile();
  if (config == null) {
    throw new Error('Could not find ".prettierrc".');
  }
  const options = await fs.readJson(config);
  return prettier.format(input, {
    ...options,
    parser: 'typescript',
  });
}

async function compileAllSchemas(): Promise<string> {
  const cwd = path.join('schema');
  const out = [] as string[];
  for (const file of await asyncGlob(path.join(cwd, '**', '*.json'))) {
    out.push(await compileAndNormalize(file, cwd));
  }
  return await formatWithPrettier(out.join('\n'));
}

(async () => {
  const output = await compileAllSchemas();
  if (argv.output) {
    await fs.writeFile(argv.output, output);
  } else {
    process.stdout.write(output);
  }
})();
