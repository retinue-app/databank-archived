/* @internal */

/**
 * A set of keywords that provide a passive effect for a specific upgrade/model.
 */
export interface UpgradeKeywordSet {
  '$May Flip At Start'?: string;
  Cycle?: null;
  Leader?: null;
  Noncombatant?: null;
  Reconfigure?: string;
  Sidearm?: 'Melee' | 'Ranged';
  Small?: null;
  [k: string]: undefined | null | number | string;
}
