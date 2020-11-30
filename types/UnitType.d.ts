/* @internal */

/**
 * Unit types and sub-types
 */
export type UnitType = ('Trooper' | 'Vehicle') | Trooper | Vehicle;

/**
 * A trooper subtype.
 */
export interface Trooper {
  Trooper: string;
}
/**
 * A vehicle subtype.
 */
export interface Vehicle {
  Vehicle: string;
}
