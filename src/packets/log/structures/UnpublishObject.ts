import type { Read, Write } from "../../stream";
import type { UnpublishObject } from "../../generated/structures/UnpublishObject";
export type UnpublishObjectLog = {
  UnpublishReason: number;
  ObjectId: bigint;
};
export function read(reader: Read, version: number) {
  const data = {} as UnpublishObjectLog;
  data.UnpublishReason = reader.u8();
  data.ObjectId = reader.u64();
  return data;
}
export function write(writer: Write, data: UnpublishObjectLog | UnpublishObject) {
  writer.u8(data.UnpublishReason);
  writer.u64(data.ObjectId);
}
