/* @internal */

/**
 * When this upgrade or errata/adjustment was last edited.
 */
export type RuleSet =
  | {
      SWL: number;
    }
  | {
      RRG: string | ('Homebrew' | 'Unknown');
    };
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
 * Ranks that are part of the game. These values are not customizable for custom content.
 */
export type UnitRank =
  | 'Commander'
  | 'Operative'
  | 'Corps'
  | 'Special Forces'
  | 'Support'
  | 'Heavy';
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
 * Rank of the unit
 */
export type UnitRank1 =
  | 'Commander'
  | 'Operative'
  | 'Corps'
  | 'Special Forces'
  | 'Support'
  | 'Heavy';
/**
 * Unit types and sub-types
 */
export type UnitType1 =
  | ('Trooper' | 'Vehicle')
  | {
      Trooper: string;
    }
  | {
      Vehicle: string;
    };
/**
 * Defense dice in the game.
 */
export type DefenseDice = 'White' | 'Red';
/**
 * Sides of a notched base.
 */
export type NotchedBaseSide = 'Front' | 'Sides' | 'Rear';
/**
 * Range in the game.
 */
export type Range = ('Melee' | 'Infinite' | number)[];
/**
 * When this upgrade or errata/adjustment was last edited.
 */
export type RuleSet1 =
  | {
      SWL: number;
    }
  | {
      RRG: string | ('Homebrew' | 'Unknown');
    };
export type RuleSet2 =
  | {
      SWL: number;
    }
  | {
      RRG: string | ('Homebrew' | 'Unknown');
    };

export interface DataBank {
  core: CardSet;
  errata?: {
    cards?: CardSet;
    points?: PointAdjustments;
  };
}
export interface CardSet {
  units: UnitCard[];
  upgrades: UpgradeCard[];
}
/**
 * Defines a unit card.
 */
export interface UnitCard {
  /**
   * Name of the unit.
   */
  name: string;
  since?: RuleSet;
  restrictions: TargetSet;
  points: number;
  /**
   * Optional sub-title for the unit card.
   */
  title?: string;
  rank: UnitRank1;
  /**
   * Number of miniatures in the unit.
   */
  miniatures: number;
  type: UnitType1;
  defense: Defense;
  attack?: Offense;
  speed: number;
  upgrades: {
    [k: string]: number | undefined;
  };
  keywords?: UnitKeywords;
  weapons: Weapon[];
}
/**
 * A set of units, types, ranks, targeted by an effect.
 */
export interface TargetSet {
  /**
   * Factions. Multiple entries is treated as an OR.
   */
  factions?: Faction[];
  /**
   * Force alignments. Multiple entries is treated as an OR.
   */
  forceAlignment?: ('Light Side' | 'Dark Side')[];
  /**
   * Unit names. Multiple entries is treated as an OR.
   */
  units?: string[];
  /**
   * Unit ranks. Multiple entries is treated as an OR.
   */
  unitRanks?: UnitRank[];
  /**
   * Unit types. Multiple entries is treated as an OR.
   */
  unitTypes?: UnitType[];
  /**
   * This unit or effect is unique (once per list or per game).
   */
  isUnique?: true;
  /**
   * Units that have an upgrade icon. Multiple entries is treated as an OR.
   */
  hasUpgradeSlot?: UpgradeType[];
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
 * A collection of sets of keywords for units.
 */
export interface UnitKeywords {
  actions?: ActionKeywordSet;
  passive?: PassiveKeywordSet;
}
/**
 * A set of keywords that provide an action.
 */
export interface ActionKeywordSet {
  Arm?: {
    actions: number;
    amount: number;
    /**
     * This name must be identical to a weapon on an upgrade or command card.
     */
    explosive: string;
  };
  'Calculate Odds'?: {
    actions: number;
  };
  Distract?: {
    actions: number;
  };
  Jump?: {
    actions: number;
    amount: number;
  };
  Observe?: {
    actions: number;
    amount: number;
  };
  'Pulling the Strings'?: {
    actions: number;
  };
  'Quick Thinking'?: {
    actions: number;
  };
  Repair?: {
    actions: number;
    amount: number;
    capacity: number;
  };
  'Secret Mission'?: {
    actions: number;
  };
  Smoke?: {
    actions: number;
    amount: number;
  };
  Spotter?: {
    actions: number;
    amount: number;
  };
  Treat?: {
    actions: number;
    amount: number;
    capacity: number;
  };
  'Take Cover'?: {
    actions: number;
    amount: number;
  };
  [k: string]:
    | (
        | undefined
        | {
            actions: number;
          }
        | {
            actions: number;
            amount: number;
          }
        | {
            actions: number;
            amount: number;
            capacity: number;
          }
        | {
            actions: number;
            amount: number;
            /**
             * This name must be identical to a weapon on an upgrade or command card.
             */
            explosive: string;
          }
      )
    | undefined;
}
/**
 * A set of keywords that provide a passive effect.
 */
export interface PassiveKeywordSet {
  '$Add Upgrade'?: UpgradeType;
  '$Add and Equip Upgrade'?: UpgradeType;
  '$Coordinate: Range 1-2'?: null;
  '$Increase Courage'?: number;
  '$Lose Keyword'?: PassiveKeywordSet;
  '$Modify Maximum Speed'?: number;
  '$Move While Engaged With Immobilized Unit'?: null;
  $Surge?: 'Hit' | 'Crit';
  AI?: ('Attack' | 'Dodge' | 'Move')[];
  Agile?: number;
  Armor?: null | number;
  Arsenal?: number;
  Authoritative?: null;
  Barrage?: null;
  Block?: null;
  Bounty?: null;
  Charge?: null;
  'Climbing Vehicle'?: null;
  Compel?: null;
  Coordinate?: TargetSet;
  Cover?: number;
  'Covert Ops'?: null;
  Cunning?: null;
  'Danger Sense'?: number;
  Dauntless?: null;
  Defend?: number;
  Deflect?: null;
  Demoralize?: number;
  Detachment?: TargetSet;
  Detonate?: {
    amount: number;
    /**
     * This name must be identical to a weapon on an upgrade or command card.
     */
    explosive: string;
  };
  Disciplined?: number;
  Disengage?: null;
  'Djem So Mastery'?: null;
  Duelist?: null;
  Enrage?: number;
  Entourage?: TargetSet;
  Equip?: TargetSet;
  Exemplar?: null;
  'Expert Climber'?: null;
  'Field Commander'?: null;
  'Fire Support'?: null;
  Flawed?: null;
  'Full Pivot'?: null;
  Generator?: number;
  Grounded?: null;
  Guardian?: number;
  Gunslinger?: null;
  'Heavy Weapon Team'?: null;
  Hover?:
    | 'Ground'
    | {
        Air: number;
      };
  Immune?: (
    | 'Blast'
    | 'Deflect'
    | 'Melee'
    | 'Pierce'
    | 'Pierce (Melee)'
    | 'Range 1 Weapons'
  )[];
  Impervious?: null;
  Incognito?: null;
  Inconspicuous?: null;
  Indomitable?: null;
  Infiltrate?: null;
  Inspire?: number;
  'Jedi Hunter'?: null;
  'Juyo Mastery'?: null;
  'Light Transport'?: {
    type: 'Open' | 'Closed';
    capacity: number;
  };
  Loadout?: null;
  'Low Profile'?: null;
  'Makashi Mastery'?: null;
  Marksman?: null;
  'Master of the Force'?: number;
  Nimble?: null;
  Outmaneuver?: null;
  Plodding?: null;
  Precise?: number;
  Ready?: number;
  Recharge?: number;
  Regenerate?: number;
  Relentless?: null;
  Reliable?: number;
  Reposition?: null;
  Retinue?: TargetSet;
  Scale?: null;
  Scout?: number;
  'Scouting Party'?: number;
  Sentinel?: null;
  Sharpshooter?: number;
  Shielded?: number;
  'Soresu Mastery'?: null;
  Speeder?: number;
  Spur?: null;
  Stationary?: null;
  Steady?: null;
  Tactical?: number;
  Target?: number;
  Teamwork?: TargetSet;
  Tempted?: null;
  Transport?: {
    type: 'Open' | 'Closed';
    capacity: number;
  };
  'Uncanny Luck'?: number;
  Unhindered?: null;
  Versatile?: null;
  'Weak Point'?: {
    amount: number;
    sides: NotchedBaseSide[];
  };
  'Wheel Mode'?: null;
  [k: string]:
    | (
        | undefined
        | null
        | ('Attack' | 'Dodge' | 'Move')[]
        | number
        | (
            | 'Blast'
            | 'Deflect'
            | 'Melee'
            | 'Pierce'
            | 'Pierce (Melee)'
            | 'Range 1 Weapons'
          )[]
        | {
            amount: number;
            /**
             * This name must be identical to a weapon on an upgrade or command card.
             */
            explosive: string;
          }
        | PassiveKeywordSet
        | {
            amount: number;
            sides: NotchedBaseSide[];
          }
        | ('Hit' | 'Crit')
        | TargetSet
        | {
            type: 'Open' | 'Closed';
            capacity: number;
          }
        | (
            | 'Ground'
            | {
                Air: number;
              }
          )
        | UpgradeType
      )
    | undefined;
}
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
/**
 * Defines an upgrade card.
 */
export interface UpgradeCard {
  /**
   * Name of the upgrade.
   */
  name: string;
  since?: RuleSet1;
  description?: string;
  keywords?: UpgradeKeywords;
  usage?: 'Detonate' | 'Discard' | 'Exhaust';
  type: UpgradeType;
  /**
   * Wounds if this is a miniature. If omitted defaults to the unit.
   */
  wounds?: number;
  counterpart?: {
    type: UnitType;
    upgrades?: {
      [k: string]: number | undefined;
    };
  };
  restrictions?: TargetSet;
  restrictionsNot?: TargetSet;
  points: number;
  pointAdjustments?: {
    if: TargetSet;
    condition: 'In Army' | 'On Unit';
    adjustBy: number;
    [k: string]: unknown | undefined;
  };
  weapon?: Weapon;
}
/**
 * A collection of sets of keywords for upgrades.
 */
export interface UpgradeKeywords {
  actions?: ActionKeywordSet;
  passiveForUnit?: PassiveKeywordSet;
  passiveForUnitWhileExhausted?: PassiveKeywordSet;
  passiveForUpgrade?: UpgradeKeywordSet;
}
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
  [k: string]: (undefined | null | number | string) | undefined;
}
export interface PointAdjustments {
  since: RuleSet2;
  units: {
    [k: string]: number | undefined;
  };
  upgrades: {
    [k: string]: number | undefined;
  };
}
