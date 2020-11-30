/* @internal */

/**
 * Factions that are part of the game.
 */
export type Faction = OfficialFaction | string;
export type OfficialFaction =
  | 'Galactic Empire'
  | 'Galactic Republic'
  | 'Separatist Alliance'
  | 'Rebel Alliance';
