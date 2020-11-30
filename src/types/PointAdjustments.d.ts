/* @internal */

export type RuleSet =
  | {
      SWL: number;
    }
  | {
      RRG: string | ('Homebrew' | 'Unknown');
    };

export interface PointAdjustments {
  since: RuleSet;
  units: NamedCards;
  upgrades: NamedCards;
}
export interface NamedCards {
  [k: string]: number;
}
