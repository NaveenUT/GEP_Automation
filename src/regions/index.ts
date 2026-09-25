import type { RegionBehaviour, RegionName } from './RegionBehaviour';
import { genX } from './genX';
import { genY } from './genY';
import { genZ } from './genZ';

const REGIONS: Record<RegionName, RegionBehaviour> = { genx: genX, geny: genY, genz: genZ };

export function regionFor(name: RegionName): RegionBehaviour {
  return REGIONS[name];
}

export type { RegionBehaviour, RegionName };
