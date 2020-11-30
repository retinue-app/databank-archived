"use strict";
/* @internal */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogBuilder = exports.Catalog = void 0;
class IndexedCard {
    constructor() {
        this.cards = [];
    }
    insert(card) {
        this.cards.push(card);
    }
    lookup(options) {
        var _a, _b, _c, _d;
        for (const card of this.cards) {
            if (options) {
                if (options.title && card.title !== options.title) {
                    continue;
                }
                if (options.faction &&
                    ((_b = (_a = card.restrictions) === null || _a === void 0 ? void 0 : _a.factions) === null || _b === void 0 ? void 0 : _b.indexOf(options.faction)) === -1) {
                    continue;
                }
                if (options.unit &&
                    ((_d = (_c = card.restrictions) === null || _c === void 0 ? void 0 : _c.units) === null || _d === void 0 ? void 0 : _d.indexOf(options.unit.name)) === -1) {
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
class Catalog {
    /**
     * @internal
     */
    constructor(units, upgrades) {
        this.units = units;
        this.upgrades = upgrades;
    }
    /**
     * Returns all units in the catalog.
     */
    allUnits() {
        const cards = [];
        for (const index of this.units.values()) {
            cards.push(...index.cards);
        }
        return cards;
    }
    /**
     * Returns all upgrades in the catalog.
     */
    allUpgrades() {
        const cards = [];
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
    lookupUnit(name, options) {
        var _a;
        return (_a = this.units.get(name)) === null || _a === void 0 ? void 0 : _a.lookup(options);
    }
    /**
     * Tries to find an upgrade with the provided name.
     *
     * @param name
     * @param options
     */
    lookupUpgrade(name, options) {
        var _a;
        return (_a = this.upgrades.get(name)) === null || _a === void 0 ? void 0 : _a.lookup(options);
    }
}
exports.Catalog = Catalog;
/**
 * A mutable @see Catalog instance for incrementally building.
 */
class CatalogBuilder {
    constructor() {
        this.units = [];
        this.upgrades = [];
    }
    /**
     * Returns a @see Catalog from this builder.
     */
    build() {
        const units = new Map();
        for (const unit of this.units) {
            if (!units.has(unit.name)) {
                units.set(unit.name, new IndexedCard());
            }
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            units.get(unit.name).insert(unit);
        }
        const upgrades = new Map();
        for (const upgrade of this.upgrades) {
            if (!upgrades.has(upgrade.name)) {
                upgrades.set(upgrade.name, new IndexedCard());
            }
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            upgrades.get(upgrade.name).insert(upgrade);
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
    addData(data) {
        var _a, _b, _c, _d;
        data.core.units.forEach((u) => this.addUnit(u));
        data.core.upgrades.forEach((u) => this.addUpgrade(u));
        (_b = (_a = data.errata) === null || _a === void 0 ? void 0 : _a.cards) === null || _b === void 0 ? void 0 : _b.units.forEach((u) => this.addUnit(u));
        (_d = (_c = data.errata) === null || _c === void 0 ? void 0 : _c.cards) === null || _d === void 0 ? void 0 : _d.upgrades.forEach((u) => this.addUpgrade(u));
    }
    /**
     * Adds the provided unit to the catalog.
     *
     * If an unit with the same name/title/faction exists, it is replaced.
     *
     * @param unit
     */
    addUnit(unit) {
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
    addUpgrade(upgrade) {
        var _a, _b;
        const upgrades = this.upgrades;
        for (let i = 0; i < upgrades.length; i++) {
            const other = upgrades[i];
            if (upgrade.name === other.name) {
                // Check one more thing: are there unique unit restrictions?
                const unitsA = (((_a = upgrade.restrictions) === null || _a === void 0 ? void 0 : _a.units) || []).join();
                const unitsB = (((_b = other.restrictions) === null || _b === void 0 ? void 0 : _b.units) || []).join();
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
    replacePoints(points) {
        const { units, upgrades } = this;
        for (const unit of units) {
            let key = `${unit.name}`;
            if (unit.title) {
                key = `${key}: ${unit.title}`;
            }
            if (key in points.units) {
                unit.points = points.units[key];
            }
        }
        for (const upgrade of upgrades) {
            if (upgrade.name in points.upgrades) {
                upgrade.points = points.upgrades[upgrade.name];
            }
        }
    }
}
exports.CatalogBuilder = CatalogBuilder;
