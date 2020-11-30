/* @internal */

/**
 * Sides of a notched base.
 */
export type NotchedBaseSide = 'Front' | 'Sides' | 'Rear';

/**
 * A set of weapon keywords (i.e. on a weapon).
 */
export interface WeaponKeywordSet {
  Beam?: number;
  Blast?: null;
  Critical?: number;
  Cumbersome?: null;
  Fixed?: [NotchedBaseSide, ...NotchedBaseSide[]];
  'High Velocity'?: null;
  Immobilize?: number;
  Immune?: ['Deflect', ...'Deflect'[]];
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
  [k: string]: null | undefined | string[] | number | string;
}
