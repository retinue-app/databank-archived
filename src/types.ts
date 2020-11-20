/* Generated from UnitCard.json */

/**
 * Names of units that are part of the game.
 */
export type UnitName = string;
/**
 * Factions that are part of the game.
 */
export type Faction = string;
/**
 * Unit types and sub-types
 */
export type UnitType =
  | 'Trooper'
  | {
      name: 'Trooper';
      type: string;
    }
  | {
      name: 'Vehicle';
      type: string;
    };

/**
 * Unit card definition.
 */
export interface UnitCard {
  name: UnitName;
  /**
   * Optional sub-title for the unit.
   */
  title?: string;
  faction: Faction;
  points: number;
  rank: UnitRank;
  /**
   * Number of miniatures in the unit.
   */
  miniatures: number;
  type: UnitType;
  defense: Defense;
  attack?: Offense;
  speed: number;
  upgrades: {
    [k: string]: number;
  };
}
export interface Defense {
  color: DefenseDice;
  surges?: true;
  wounds: number;
  courage?: number;
  resilience?: number;
}
export interface Offense {
  surges: 'Hit' | 'Crit';
}

/**
 * Ranks that are part of the game.
 */
export const enum UnitRank {
  Commander = 'Commander',
  Operative = 'Operative',
  Corps = 'Corps',
  SpecialForces = 'Special Forces',
  Support = 'Support',
  Heavy = 'Heavy',
}
/**
 * Defensive dice in the game.
 */
export const enum DefenseDice {
  White = 'White',
  Red = 'Red',
}

/* Generated from Weapon.json */

/**
 * Range in the game.
 */
export type Range = ('Melee' | 0 | 1 | 2 | 3 | 4 | 5 | 'Infinite')[];

/**
 * Weapon definition.
 */
export interface Weapon {
  name: string;
  range: Range;
}
