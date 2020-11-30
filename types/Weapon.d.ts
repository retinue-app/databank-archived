/* @internal */

/**
 * Range in the game.
 */
export type Range = ('Melee' | 'Infinite' | number)[];
/**
 * Sides of a notched base.
 */
export type NotchedBaseSide = 'Front' | 'Sides' | 'Rear';

/**
 * Weapon definition.
 */
export interface Weapon {
  name: string;
  range: Range;
  dice: AttackPool;
  keywords?: WeaponKeywordSet;
  surge?: 'Hit' | 'Crit';
}
/**
 * A pool of attack dice.
 */
export interface AttackPool {
  white?: number;
  black?: number;
  red?: number;
}
/**
 * A set of weapon keywords (i.e. on a weapon).
 */
export interface WeaponKeywordSet {
  Beam?: number;
  Blast?: null;
  Critical?: number;
  Cumbersome?: null;
  Fixed?: NotchedBaseSide[];
  'High Velocity'?: null;
  Immobilize?: number;
  Immune?: 'Deflect'[];
  Impact?: number;
  Ion?: number;
  Lethal?: number;
  'Long Shot'?: number;
  Pierce?: number;
  Poison?: number;
  Ram?: number;
  Scatter?: null;
  Spray?: null;
  Suppressive?: null;
  'Tow Cable'?: null;
  Versatile?: null;
  [k: string]: (null | undefined | string[] | number | string) | undefined;
}
