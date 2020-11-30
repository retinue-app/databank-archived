import { CatalogBuilder, UnitCard } from '../src/index';
import { UpgradeCard } from '../src/types/DataBank';

describe('addUnit', () => {
  let builder!: CatalogBuilder;

  beforeEach(() => (builder = new CatalogBuilder()));

  const lukeSkywalker = {
    name: 'Luke Skywalker',
    restrictions: {},
    points: 160,
  } as UnitCard;

  test('should add an unit', () => {
    builder.addUnit(lukeSkywalker);

    const catalog = builder.build();
    expect(catalog.allUnits()).toEqual([lukeSkywalker]);
  });

  test('should replace an unit with the same name', () => {
    const lukeSkywalkerErrata = {
      name: 'Luke Skywalker',
      restrictions: {},
      points: 150,
    } as UnitCard;

    builder.addUnit(lukeSkywalker);
    builder.addUnit(lukeSkywalkerErrata);

    const catalog = builder.build();
    expect(catalog.allUnits()).toEqual([lukeSkywalkerErrata]);
  });

  test('should not replace an unit with a different title', () => {
    const lukeSkywalkerJediKnight = {
      ...lukeSkywalker,
      title: 'Jedi Knight',
    } as UnitCard;

    builder.addUnit(lukeSkywalker);
    builder.addUnit(lukeSkywalkerJediKnight);

    const catalog = builder.build();
    expect(catalog.allUnits()).toEqual([
      lukeSkywalker,
      lukeSkywalkerJediKnight,
    ]);

    expect(catalog.lookupUnit('Luke Skywalker')).toEqual(lukeSkywalker);
    expect(
      catalog.lookupUnit('Luke Skywalker', { title: 'Jedi Knight' }),
    ).toEqual(lukeSkywalkerJediKnight);
  });

  test('should not replace an unit for a different faction', () => {
    const rebelAtRt = {
      name: 'AT-RT',
      restrictions: {
        factions: ['Rebel Alliance'],
      },
    } as UnitCard;

    const republicAtRt = {
      name: 'AT-RT',
      restrictions: {
        factions: ['Galactic Republic'],
      },
    } as UnitCard;

    builder.addUnit(rebelAtRt);
    builder.addUnit(republicAtRt);

    const catalog = builder.build();
    expect(catalog.allUnits()).toEqual([rebelAtRt, republicAtRt]);

    expect(catalog.lookupUnit('AT-RT')).toEqual(rebelAtRt);
    expect(
      catalog.lookupUnit('AT-RT', { faction: 'Galactic Republic' }),
    ).toEqual(republicAtRt);
  });
});

describe('addUpgrade', () => {
  let builder!: CatalogBuilder;

  beforeEach(() => (builder = new CatalogBuilder()));

  const grapplingHooks = {
    name: 'Grappling Hooks',
    points: 3,
  } as UpgradeCard;

  test('should add an upgrade', () => {
    builder.addUpgrade(grapplingHooks);

    const catalog = builder.build();
    expect(catalog.allUpgrades()).toEqual([grapplingHooks]);
  });

  test('should replace an upgrade with the same name', () => {
    const grapplingHooksErrata = {
      name: 'Grappling Hooks',
      points: 1,
    } as UpgradeCard;

    builder.addUpgrade(grapplingHooks);
    builder.addUpgrade(grapplingHooksErrata);

    const catalog = builder.build();
    expect(catalog.allUpgrades()).toEqual([grapplingHooksErrata]);
  });

  test('should not replace an upgrade for a different unit', () => {
    const sabineDarkSaber = {
      name: 'The Darksaber',
      restrictions: {
        units: ['Sabine Wren'],
      },
    } as UpgradeCard;

    const moffGideonDarkSaber = {
      name: 'The Darksaber',
      restrictions: {
        units: ['Moff Gideon'],
      },
    } as UpgradeCard;

    builder.addUpgrade(sabineDarkSaber);
    builder.addUpgrade(moffGideonDarkSaber);

    const catalog = builder.build();
    expect(catalog.allUpgrades()).toEqual([
      sabineDarkSaber,
      moffGideonDarkSaber,
    ]);

    expect(catalog.lookupUpgrade('The Darksaber')).toEqual(sabineDarkSaber);
    expect(
      catalog.lookupUpgrade('The Darksaber', {
        unit: { name: 'Moff Gideon' } as UnitCard,
      }),
    ).toEqual(moffGideonDarkSaber);
  });
});
