/* @internal */

export type RuleSet = SWL | RRG;

export interface SWL {
  SWL: number;
}
export interface RRG {
  RRG: string | ('Homebrew' | 'Unknown');
}
