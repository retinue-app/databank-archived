/* Generated from UnitCard.json */

/**
 * Factions that are part of the game.
 */
export type Faction = string;

/**
 * Unit card definition.
 */
export interface UnitCard {
  /**
   * Name of the unit.
   */
  name: string;
  /**
   * Optional sub-title for the unit.
   */
  title?: string;
  faction: Faction;
}

/* Generated from UnitType.json */

/**
 * Unit types and sub-types
 */
export type UnitType = Trooper | Vehicle;

/**
 * A trooper subtype.
 */
export interface Trooper {
  name: 'Trooper';
  type?: string;
}
/**
 * A vehicle subtype.
 */
export interface Vehicle {
  name: 'Vehicle';
  type?: string;
}
