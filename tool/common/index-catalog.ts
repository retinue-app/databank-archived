import fs from 'fs-extra';
import path from 'path';
import glob from './async-glob';

interface HasNameField {
  name: string;
  title?: string;
}

export default class Catalog {
  private static readonly ignoreDuplicates = new Set<string>([
    'AT-RT',
    'C-3PO',
  ]);

  private static readonly unitsDir = path.join('**', 'Units', '*.json');

  private static readonly upgradesDir = path.join(
    '**',
    'Upgrades',
    '*',
    '*.json',
  );

  private static ensureNoDuplicates(array: string[]): Set<string> {
    const set = new Set<string>(array);
    if (set.size !== array.length) {
      let duplicates = array.filter((e, i, a) => a.indexOf(e) !== i);
      duplicates = duplicates.filter((e) => !Catalog.ignoreDuplicates.has(e));
      if (duplicates.length) {
        throw new Error(`Unexpected duplicates: ${duplicates.join(', ')}`);
      }
    }
    return set;
  }

  static async load(dir: string): Promise<Catalog> {
    const units: string[] = [];
    for (const file of await glob(path.join(dir, Catalog.unitsDir))) {
      const json = (await fs.readJson(file)) as HasNameField;
      if (json.title) {
        units.push(`${json.name}: ${json.title}`);
      } else {
        units.push(`${json.name}`);
      }
    }
    const upgrades: string[] = [];
    for (const file of await glob(path.join(dir, Catalog.upgradesDir))) {
      const json = (await fs.readJson(file)) as HasNameField;
      upgrades.push(`${json.name}`);
    }
    return new Catalog(
      Catalog.ensureNoDuplicates(units.sort()),
      Catalog.ensureNoDuplicates(upgrades.sort()),
    );
  }

  private constructor(
    readonly units: Set<string>,
    readonly upgrades: Set<string>,
  ) {}
}
