import type { Read, Write } from "../../stream";
import type { PKTActiveAbilityNotify } from "../../generated/types";
import * as ActiveAbility from "../structures/ActiveAbility";
export type ActiveAbilityNotify = {
  activeAbilityList: ActiveAbility.ActiveAbilityLog[];
  ObjectId: bigint;
};
export function read(reader: Read, version: number) {
  const data = {} as ActiveAbilityNotify;
  data.activeAbilityList = reader.array(reader.u16(), () => ActiveAbility.read(reader, version), 60);
  data.ObjectId = reader.u64();
  return data;
}
export function write(writer: Write, data: ActiveAbilityNotify | PKTActiveAbilityNotify) {
  writer.array(data.activeAbilityList, { maxLen: 60, lenType: "u16" }, (obj: ActiveAbility.ActiveAbilityLog) => {
    ActiveAbility.write(writer, obj);
  });
  writer.u64(data.ObjectId);
}

export const logId = 1;
export const name = "ActiveAbilityNotify";
