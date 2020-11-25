#!./node_modules/.bin/ts-node

import fs from 'fs-extra';
import path from 'path';
import { exit } from 'shelljs';
import { PointAdjustments } from '../../src/index';
import Catalog from '../common/index-catalog';

function containAllOrFail(primary: Set<string>, secondary: Set<string>): void {
  const diff = [...secondary].filter((x) => !primary.has(x));
  if (diff.length) {
    throw new Error(`Did not find the following: ${diff.join(', ')}`);
  }
}

(async () => {
  console.log('Verifying "errata".');
  try {
    console.log('Loading core data...');
    const core = await Catalog.load(path.join('src', 'data', 'core'));

    console.log('Loading errata data...');
    const errata = await Catalog.load(path.join('src', 'data', 'errata'));

    console.log('Checking that errata units replace core units...');
    containAllOrFail(core.units, errata.units);

    console.log('Checking that errata upgrades replace core upgrades...');
    containAllOrFail(core.upgrades, errata.upgrades);

    const points = (await fs.readJson(
      path.join('src', 'data', 'errata', 'Metadata.json'),
    )) as PointAdjustments;

    const adjustedUnits = new Set(Object.keys(points.units).sort());
    containAllOrFail(core.units, adjustedUnits);

    const adjustedUpgrades = new Set(Object.keys(points.upgrades).sort());
    containAllOrFail(core.upgrades, adjustedUpgrades);

    console.log('All errata matches!');
  } catch (e) {
    process.stderr.write(`${e}`);
    exit(1);
  }
})();
