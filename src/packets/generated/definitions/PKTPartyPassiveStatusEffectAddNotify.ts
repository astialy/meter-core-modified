// Auto Generated, do not edit.
import { Read } from "../../stream";
export type PKTPartyPassiveStatusEffectAddNotify = {
  passiveStatusEffectList: number[];
  ObjectId: bigint;
  Unk0_m: number;
};
export function read(buf: Buffer) {
  const reader = new Read(buf);
  const data = {} as PKTPartyPassiveStatusEffectAddNotify;
  data.passiveStatusEffectList = reader.array(reader.u16(), () => reader.u32(), 10);
  data.ObjectId = reader.u64();
  data.Unk0_m = reader.u8();
  return data;
}
export const name = "PKTPartyPassiveStatusEffectAddNotify";
export const opcode = 44797;
