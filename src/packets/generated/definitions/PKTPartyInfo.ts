// Auto Generated, do not edit.
import { Read } from "../../stream";
import * as PartyMemberData from "../structures/PartyMemberData";
export type PKTPartyInfo = {
  RaidInstanceId: number;
  LootGrade: number;
  PartyLootType: number;
  PartyInstanceId: number;
  MemberDatas: PartyMemberData.PartyMemberData[];
  PartyType: number;
};
export function read(buf: Buffer) {
  const reader = new Read(buf);
  const data = {} as PKTPartyInfo;
  data.RaidInstanceId = reader.u32();
  data.LootGrade = reader.u32();
  data.PartyLootType = reader.u8();
  data.PartyInstanceId = reader.u32();
  data.MemberDatas = reader.array(reader.u16(), () => PartyMemberData.read(reader), 40);
  data.PartyType = reader.u8();
  return data;
}
export const name = "PKTPartyInfo";
export const opcode = 2273;
