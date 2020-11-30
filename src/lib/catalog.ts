/* @internal */

import { DataBank, UnitCard, UpgradeCard } from '../index';

/**
 * Represents an indexed @see DataBank with errata and point changes applied.
 *
 * Also @see CatalogBuilder
 */
export class Catalog {}

/**
 * A mutable @see Catalog instance for incrementally building.
 */
export class CatalogBuilder {
  private readonly units: UnitCard[] = [];
  private readonly upgrades: UpgradeCard[] = [];

  addData(data: DataBank): void {
    data.core.units.forEach((u) => this.addUnit(u));
    data.core.upgrades.forEach((u) => this.addUpgrade(u));
  }

  addUnit(unit: UnitCard): void {
    const units = this.units;
    for (let i = 0; i < units.length; i++) {
      const other = units[i];
      if (unit.name === other.name && unit.title === other.title) {
        // Check one more thing: are there unique faction restrictions?
        const factionsA = (unit.restrictions.factions || []).join();
        const factionsB = (other.restrictions.factions || []).join();
        if (factionsA === factionsB) {
          units[i] = unit;
          return;
        }
      }
    }
    units.push(unit);
  }

  addUpgrade(upgrade: UpgradeCard): void {
    const upgrades = this.upgrades;
    for (let i = 0; i < upgrades.length; i++) {
      const other = upgrades[i];
      if (upgrade.name === other.name) {
        // Check one more thing: are there unique unit restrictions?
        const unitsA = (upgrade.restrictions?.units || []).join();
        const unitsB = (other.restrictions?.units || []).join();
        if (unitsA === unitsB) {
          upgrades[i] = upgrade;
          return;
        }
      }
    }
    upgrades.push(upgrade);
  }
}
