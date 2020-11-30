/**
 * Represents an indexed @see DataBank with errata and point changes applied.
 *
 * Also @see CatalogBuilder
 */
export declare class Catalog {
    private readonly units;
    private readonly upgrades;
    /**
     * Returns all units in the catalog.
     */
    allUnits(): UnitCard[];
    /**
     * Returns all upgrades in the catalog.
     */
    allUpgrades(): UpgradeCard[];
    /**
     * Tries to find a unit with the provided name.
     *
     * @param name
     * @param options
     */
    lookupUnit(name: string, options?: {
        title?: string;
        faction?: Faction;
    }): UnitCard | undefined;
    /**
     * Tries to find an upgrade with the provided name.
     *
     * @param name
     * @param options
     */
    lookupUpgrade(name: string, options?: {
        unit?: UnitCard;
    }): UpgradeCard | undefined;
}
/**
 * A mutable @see Catalog instance for incrementally building.
 */
export declare class CatalogBuilder {
    private readonly units;
    private readonly upgrades;
    /**
     * Returns a @see Catalog from this builder.
     */
    build(): Catalog;
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
    addData(data: DataBank): void;
    /**
     * Adds the provided unit to the catalog.
     *
     * If an unit with the same name/title/faction exists, it is replaced.
     *
     * @param unit
     */
    addUnit(unit: UnitCard): void;
    /**
     * Adds the provided upgrade to the catalog.
     *
     * If an upgrade with the same name/unit restrictions exists, it is replaced.
     *
     * @param unit
     */
    addUpgrade(upgrade: UpgradeCard): void;
    /**
     * Apply the provided point adjustments to the catalog.
     *
     * This method **replaces** existing data, and is expected to be used after
     * initial data (@member addData) has been added, otherwise the points are
     * ignored for cards that do not match.
     *
     * @param points
     */
    replacePoints(points: PointAdjustments): void;
}
