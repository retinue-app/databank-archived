#!./node_modules/.bin/ts-node

import fs from 'fs-extra';
import path from 'path';
import { exit } from 'shelljs';
import glob from '../common/async-glob';

interface HasNameField {
  name: string;
  title?: string;
}

function titleCase(input: string): string {
  return input.replace(/\w\S*/g, (txt) => {
    // Allow all-caps
    if (txt.toUpperCase() == txt) {
      return txt;
    } else {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    }
  });
}

function normalizeNameToFileName(name: string): string {
  name = name
    .replace(/\.|\//g, ' ')
    .replace(/\'|\"|\:|\,|\!/g, '')
    .replace(/\s+|\-+/g, ' ');
  name = titleCase(name);
  return name.replace(/\s/g, '-').replace(/\-+/g, '-');
}

async function checkName(file: string): Promise<boolean> {
  const json: HasNameField = await fs.readJson(file);
  if (!json.name) {
    // Skip
    return true;
  }
  const fileName = path.basename(file);
  let expected!: string;
  if (json.title) {
    expected = normalizeNameToFileName(`${json.name} ${json.title}`);
  }
  if (fileName === `${expected}.json`) {
    return true;
  }
  expected = normalizeNameToFileName(`${json.name}`);
  if (fileName === `${expected}.json`) {
    return true;
  } else {
    console.error(
      'Unexpected file name:',
      file,
      ' > ',
      `Expected "${expected}.json" from "${json.name}"`,
    );
    return false;
  }
}

(async () => {
  let failed = false;
  const files = await glob(path.join('data', '**', '*.json'));
  for (const file of files) {
    if (!(await checkName(file))) {
      failed = true;
    }
  }
  if (failed) {
    exit(1);
  }
})();
