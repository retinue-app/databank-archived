/* @internal */

/**
 * Factions that are part of the game.
 */
export type Faction =
  | (
      | 'Galactic Empire'
      | 'Galactic Republic'
      | 'Separatist Alliance'
      | 'Rebel Alliance'
    )
  | string;
/**
 * Unit types and sub-types
 */
export type UnitType =
  | ('Trooper' | 'Vehicle')
  | {
      Trooper: string;
    }
  | {
      Vehicle: string;
    };
/**
 * Upgrade categories in the game.
 */
export type UpgradeType =
  | 'Armament'
  | 'Command'
  | 'Comms'
  | 'Counterpart'
  | 'Crew'
  | 'Force'
  | 'Gear'
  | 'Generator'
  | 'Grenades'
  | 'Hardpoint'
  | 'Heavy Weapon'
  | 'Ordnance'
  | 'Personnel'
  | 'Pilot'
  | 'Training';

/**
 * A set of units, types, ranks, targeted by an effect.
 */
export interface TargetSet {
  /**
   * Factions. Multiple entries is treated as an OR.
   */
  factions?: [Faction, ...Faction[]];
  /**
   * Force alignments. Multiple entries is treated as an OR.
   */
  forceAlignment?: [
    'Light Side' | 'Dark Side',
    ...('Light Side' | 'Dark Side')[]
  ];
  /**
   * Unit names. Multiple entries is treated as an OR.
   */
  units?: [string, ...string[]];
  /**
   * Unit ranks. Multiple entries is treated as an OR.
   */
  unitRanks?: [UnitRank, ...UnitRank[]];
  /**
   * Unit types. Multiple entries is treated as an OR.
   */
  unitTypes?: [UnitType, ...UnitType[]];
  /**
   * This unit or effect is unique (once per list or per game).
   */
  isUnique?: true;
  /**
   * Units that have an upgrade icon. Multiple entries is treated as an OR.
   */
  hasUpgradeSlot?: [UpgradeType, ...UpgradeType[]];
}

/**
 * Ranks that are part of the game. These values are not customizable for custom content.
 */
export const enum UnitRank {
  Commander = 'Commander',
  Operative = 'Operative',
  Corps = 'Corps',
  SpecialForces = 'Special Forces',
  Support = 'Support',
  Heavy = 'Heavy',
}