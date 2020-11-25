#!./node_modules/.bin/ts-node
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import fs from 'fs-extra';
import path from 'path';
import { DataBank } from '../../src/index';
import glob from '../common/async-glob';

(async () => {
  const output: DataBank = {
    core: {
      units: [],
      upgrades: [],
    },
    errata: {
      cards: {
        units: [],
        upgrades: [],
      },
      points: await fs.readJson(
        path.join('src', 'data', 'errata', 'Metadata.json'),
      ),
    },
  };
  for (const file of await glob(
    path.join('src', 'data', 'core', '**', 'units', '**', '*.json'),
  )) {
    output.core.units.push(await fs.readJson(file));
  }
  for (const file of await glob(
    path.join('src', 'data', 'core', '**', 'upgrades', '**', '*.json'),
  )) {
    output.core.upgrades.push(await fs.readJson(file));
  }
  for (const file of await glob(
    path.join('src', 'data', 'errata', '**', 'units', '**', '*.json'),
  )) {
    output.errata!.cards!.units.push(await fs.readJson(file));
  }
  for (const file of await glob(
    path.join('src', 'data', 'errata', '**', 'upgrades', '**', '*.json'),
  )) {
    output.errata!.cards!.upgrades.push(await fs.readJson(file));
  }
  await fs.writeJson(path.join('src', 'data.json'), output, { spaces: 2 });
})();
