/* @internal */

import {
  DataBank,
  Faction,
  PointAdjustments,
  UnitCard,
  UpgradeCard,
} from '../index';

class IndexedCard<T extends UnitCard | UpgradeCard> {
  public readonly cards: T[] = [];

  insert(card: T): void {
    this.cards.push(card);
  }

  lookup(options?: {
    title?: string;
    faction?: Faction;
    unit?: UnitCard;
  }): T | undefined {
    for (const card of this.cards) {
      if (options) {
        if (options.title && (card as UnitCard).title !== options.title) {
          continue;
        }
        if (
          options.faction &&
          card.restrictions?.factions?.indexOf(options.faction) === -1
        ) {
          continue;
        }
        if (
          options.unit &&
          card.restrictions?.units?.indexOf(options.unit.name) === -1
        ) {
          continue;
        }
      }
      return card;
    }
  }
}

/**
 * Represents an indexed @see DataBank with errata and point changes applied.
 *
 * Also @see CatalogBuilder
 */
export class Catalog {
  /**
   * @internal
   */
  constructor(
    private readonly units: Map<string, IndexedCard<UnitCard>>,
    private readonly upgrades: Map<string, IndexedCard<UpgradeCard>>,
  ) {}

  /**
   * Returns all units in the catalog.
   */
  allUnits(): UnitCard[] {
    const cards: UnitCard[] = [];
    for (const index of this.units.values()) {
      cards.push(...index.cards);
    }
    return cards;
  }

  /**
   * Returns all upgrades in the catalog.
   */
  allUpgrades(): UpgradeCard[] {
    const cards: UpgradeCard[] = [];
    for (const index of this.upgrades.values()) {
      cards.push(...index.cards);
    }
    return cards;
  }

  /**
   * Tries to find a unit with the provided name.
   *
   * @param name
   * @param options
   */
  lookupUnit(
    name: string,
    options?: { title?: string; faction?: Faction },
  ): UnitCard | undefined {
    return this.units.get(name)?.lookup(options);
  }

  /**
   * Tries to find an upgrade with the provided name.
   *
   * @param name
   * @param options
   */
  lookupUpgrade(
    name: string,
    options?: { unit?: UnitCard },
  ): UpgradeCard | undefined {
    return this.upgrades.get(name)?.lookup(options);
  }
}

/**
 * A mutable @see Catalog instance for incrementally building.
 */
export class CatalogBuilder {
  private readonly units: UnitCard[] = [];
  private readonly upgrades: UpgradeCard[] = [];

  /**
   * Returns a @see Catalog from this builder.
   */
  build(): Catalog {
    const units = new Map<string, IndexedCard<UnitCard>>();
    for (const unit of this.units) {
      if (!units.has(unit.name)) {
        units.set(unit.name, new IndexedCard());
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      units.get(unit.name)!.insert(unit);
    }
    const upgrades = new Map<string, IndexedCard<UpgradeCard>>();
    for (const upgrade of this.upgrades) {
      if (!upgrades.has(upgrade.name)) {
        upgrades.set(upgrade.name, new IndexedCard());
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      upgrades.get(upgrade.name)!.insert(upgrade);
    }
    return new Catalog(units, upgrades);
  }

  /**
   * Adds the provided data set to the catalog.
   *
   * Core (non-Errata) cards are added first, and then replaced with errata.
   *
   * Any existing data prior to calling `addData` is replaced if the card is
   * considered equal (i.e. the "name", "title", and sometimes "restrictions"
   * are the same).
   *
   * @param data
   */
  addData(data: DataBank): void {
    data.core.units.forEach((u) => this.addUnit(u));
    data.core.upgrades.forEach((u) => this.addUpgrade(u));
    data.errata?.cards?.units.forEach((u) => this.addUnit(u));
    data.errata?.cards?.upgrades.forEach((u) => this.addUpgrade(u));
  }

  /**
   * Adds the provided unit to the catalog.
   *
   * If an unit with the same name/title/faction exists, it is replaced.
   *
   * @param unit
   */
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

  /**
   * Adds the provided upgrade to the catalog.
   *
   * If an upgrade with the same name/unit restrictions exists, it is replaced.
   *
   * @param unit
   */
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

  /**
   * Apply the provided point adjustments to the catalog.
   *
   * This method **replaces** existing data, and is expected to be used after
   * initial data (@member addData) has been added, otherwise the points are
   * ignored for cards that do not match.
   *
   * @param points
   */
  replacePoints(points: PointAdjustments): void {
    const { units, upgrades } = this;
    for (const unit of units) {
      let key = `${unit.name}`;
      if (unit.title) {
        key = `${key}: ${unit.title}`;
      }
      if (key in points.units) {
        unit.points = points.units[key] as number;
      }
    }
    for (const upgrade of upgrades) {
      if (upgrade.name in points.upgrades) {
        upgrade.points = points.upgrades[upgrade.name] as number;
      }
    }
  }
}
