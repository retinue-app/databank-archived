/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Factions that are part of the game.
 */
export type Faction = ('Galactic Empire' | 'Rebel Alliance') | string;
/**
 * Unit names.
 */
export type UnitName = string;
/**
 * Unit types and sub-types
 */
export type UnitType =
  | 'Trooper'
  | {
      primary: 'Trooper';
      secondary: string;
    }
  | {
      primary: 'Vehicle';
      secondary: string;
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
  units?: [UnitName, ...UnitName[]];
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
