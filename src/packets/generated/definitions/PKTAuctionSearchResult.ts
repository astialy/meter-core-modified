// Auto Generated, do not edit.
import { Read } from "../../stream";
import { MeterData } from "../../../data";
import { readFileSync } from "fs";
import { v4 as uuidv4 } from 'uuid';

enum AccessoryType {
  Ring = 0,
  Earring,
  Necklace,
  Bracelet,
  Invalid
};

enum AccessoryRank {
  Legendary = 4,
  Relic,
  Ancient,
  Invalid
}

export type EngravingData = {
  engravingType: number,
  engravingValue: number,
  EngravingName: string
};

export type StatData = {
  statType1: number;
  stat1Quantity: number;
  statType2: number;
  stat2Quantity: number;
}

export type Accessory = {
  id: string;
  name: string;
  accessoryType: number; // 0 - ring, 1 - earring, 2 - necklace
  accessoryRank: number; // 4 - legendary, 5 - relic
  quality: number;
  minimumBid: number;
  buyNowPrice: number;

  engravings: EngravingData[];
  negativeEngraving: EngravingData;

  stats: StatData;

  // Extra
  ItemID: number;
}

export type PKTAuctionSearchResult = {
  accCount: number;
  accessories: Accessory[];
};

const relicRings = new Map([
  [213300062, 'Radiant Destroyer Ring'],
  [213300052, 'Radiant Inquirer Ring'],
  [213300022, 'Corrupted Space Ring'],
  [213300012, 'Corrupted Time Ring'],
  [213300032, 'Wailing Chaos Ring'],
  [213300042, 'Wailing Aeon Ring'],
  [213300082, 'Burning Faith Ring'],
  [213300072, 'Burning Will Ring'],
  [213300122, 'Corrupted Dimensional Ring'],
  [213300112, 'Corrupted Foreknowledge Ring'],
  [213300152, 'Radiant Executioner Ring'],
  [213300162, 'Radiant Pilgrim Ring'],
  [213300132, 'Wailing Fantasy Ring'],
  [213300142, 'Wailing Nightmare Ring']
]);

const relicEarrings = new Map([
  [213300061, 'Radiant Destroyer Earrings'],
  [213300051, 'Radiant Inquirer Earrings'],
  [213300021, 'Corrupted Space Earrings'],
  [213300011, 'Corrupted Time Earrings'],
  [213300031, 'Wailing Chaos Earrings'],
  [213300041, 'Wailing Aeon Earrings'],
  [213300081, 'Burning Faith Earrings'],
  [213300071, 'Burning Will Earrings'],
  [213300121, 'Corrupted Dimensional Earrings'],
  [213300111, 'Corrupted Foreknowledge Earrings'],
  [213300151, 'Radiant Executioner Earrings'],
  [213300161, 'Radiant Pilgrim Earrings'],
  [213300131, 'Wailing Fantasy Earrings'],
  [213300141, 'Wailing Nightmare Earrings']
]);

const relicNecklaces = new Map([
  [213300050, 'Radiant Inquirer Necklace'],
  [213300010, 'Corrupted Time Necklace'],
  [213300030, 'Wailing Chaos Necklace'],
  [213300070, 'Burning Will Necklace'],
  [213300110, 'Corrupted Foreknowledge Necklace'],
  [213300150, 'Radiant Executioner Necklace'],
  [213300130, 'Wailing Fantasy Necklace']
]);

const ancientRings = new Map([
  [213400012, 'Destined Void Ring'],
  [213400022, 'Void Providence Ring'],
  [213400052, 'Sacred Guardian Ring'],
  [213400062, 'Sacred Liberator Ring'],
  [213400032, 'Gruesome Destruction Ring'],
  [213400042, 'Gruesome Apocalypse Ring'],
]);

const ancientEarrings = new Map([
  [213400011, 'Destined Void Earrings'],
  [213400021, 'Void Providence Earrings'],
  [213400031, 'Gruesome Destruction Earrings'],
  [213400041, 'Gruesome Apocalypse Earrings'],
  [213400051, 'Sacred Guardian Earrings'],
  [213400061, 'Sacred Liberator Earrings'],
]);

const ancientNecklaces = new Map([
  [213400050, 'Sacred Guardian Necklace'],
  [213400030, 'Gruesome Destruction Necklace'],
  [213400010, 'Destined Void Necklace'],
]);

const relicBracelet = new Map([
  [213300013, 'Ascendant Hero Bracelet']
]);

export const name = "PKTAuctionSearchResult";
export const opcode = 36394;

const headerLength = 14;

const inBtwPadding = 0;
const endPadding = 0;

const numResults = 12;
const itemId = 12;
const ringLength = 288 - headerLength - endPadding;
const necklaceLength = 317 - headerLength - endPadding;
const braceletLength = 242 - headerLength - endPadding;

const ringQtyOffset = 17;
const ringBuyout = 240;
const ringBid = 216;
const ringEngrType1 = 143;
const ringEngrQty1 = ringEngrType1 + ringQtyOffset;
const ringEngrType2 = 172;
const ringEngrQty2 = ringEngrType2 + ringQtyOffset;
const ringStatType = 85;
const ringStatQty = ringStatType + ringQtyOffset;
const ringNegType = 114;
const ringNegQty = ringNegType + ringQtyOffset;

const neckQtyOffset = 17;
const neckBuyout = 269;
const neckBid = 245;
const neckEngrType1 = 172;
const neckEngrQty1 = neckEngrType1 + neckQtyOffset;
const neckEngrType2 = 201;
const neckEngrQty2 = neckEngrType2 + neckQtyOffset;
const neckStatType1 = 114;
const neckStatQty1 = neckStatType1 + neckQtyOffset;
const neckStatType2 = 85;
const neckStatQty2 = neckStatType2 + neckQtyOffset;
const neckNegType = 143;
const neckNegQty = neckNegType + neckQtyOffset;

var allAcc: Accessory[] = [];
const fs = require('fs');
var version = 0;

const debug = true;

const meterData = new MeterData();
meterData.processAbilityData(JSON.parse(readFileSync("meter-data/databases/Ability.json", "utf-8")));
meterData.processStatType(JSON.parse(readFileSync("meter-data/databases/StatType.json", "utf-8")));

export function read(buf: Buffer) {

  if (debug) {
    console.log("Buf: ");
    for (const item of buf) {
      process.stdout.write(item + ",");
    }
  }

  const reader = new Read(buf);
  const data = {} as PKTAuctionSearchResult;

  reader.o = numResults;
  data.accCount = reader.i8();
  data.accessories = [];
  var beginOffset = headerLength;

  for (let i = 0; i < data.accCount; ++i) {
    if (debug)
      console.log("\n" + i);

    if (beginOffset >= reader.b.length)
      break;

    var element = {} as Accessory;

    reader.o = beginOffset + itemId;
    element.ItemID = reader.i32();

    const [name, type, rank] = getAccType(element.ItemID);
    element.name = name!;
    element.accessoryType = type;
    element.accessoryRank = rank;
    element.stats = {} as StatData;
    element.engravings = [];

    if (type == AccessoryType.Ring) {
      element = readRing(element, reader, beginOffset);
      beginOffset += inBtwPadding + ringLength;
    } else if (type == AccessoryType.Earring) {
      element = readEarring(element, reader, beginOffset);
      beginOffset += inBtwPadding + ringLength;
    } else if (type == AccessoryType.Necklace) {
      element = readNecklace(element, reader, beginOffset);
      beginOffset += inBtwPadding + necklaceLength;
    } else if (type == AccessoryType.Bracelet) { // faking bracelets 
      if (i != data.accCount - 1)
        beginOffset = bruteForceSkipBracelet(reader, beginOffset + itemId + 1);
      if (beginOffset == 0)
        break;
      continue;
    } else { // else? explode or smth
      console.log("Invalid data index: " + i);
    }

    if (element.buyNowPrice == 0) {
      if (debug)
        console.log("Price 0, skipping")
      continue;
    }

    if (debug)
      console.log("Adding to list")
    data.accessories.push(element);
  }

  allAcc = allAcc.concat(data.accessories);

  if (!fs.existsSync('./output')) {
    fs.mkdirSync('./output');
  }

  fs.writeFileSync('output/data' + version++ + '.json', JSON.stringify(allAcc));

  return data;
}

function readRing(acc: Accessory, reader: Read, beginOffset: number) {
  acc.id = uuidv4();

  reader.o = beginOffset + ringBid;
  acc.minimumBid = reader.i32();
  reader.o = beginOffset + ringBuyout;
  acc.buyNowPrice = reader.i32();

  reader.o = beginOffset + ringStatType;
  acc.stats.statType1 = reader.i32();
  reader.o = beginOffset + ringStatQty;
  acc.stats.stat1Quantity = reader.i32();

  acc.stats.statType2 = 0;
  acc.stats.stat2Quantity = 0;

  acc.quality = getQuality(AccessoryType.Ring, acc.stats.stat1Quantity);

  reader.o = beginOffset + ringEngrType1;
  var type = reader.i32();
  reader.o = beginOffset + ringEngrQty1;
  var qty = reader.i32();
  acc.engravings.push(createEngravingData(type, qty));

  reader.o = beginOffset + ringEngrType2;
  type = reader.i32();
  reader.o = beginOffset + ringEngrQty2;
  qty = reader.i32();
  acc.engravings.push(createEngravingData(type, qty));

  reader.o = beginOffset + ringNegType;
  type = reader.i32();
  reader.o = beginOffset + ringNegQty;
  qty = reader.i32();
  acc.negativeEngraving = createEngravingData(type, qty);

  return acc;
}

function readEarring(acc: Accessory, reader: Read, beginOffset: number) {
  acc.id = uuidv4();

  reader.o = beginOffset + ringBid;
  acc.minimumBid = reader.i32();
  reader.o = beginOffset + ringBuyout;
  acc.buyNowPrice = reader.i32();

  reader.o = beginOffset + ringStatType;
  acc.stats.statType1 = reader.i32();
  reader.o = beginOffset + ringStatQty;
  acc.stats.stat1Quantity = reader.i32();

  acc.stats.statType2 = 0;
  acc.stats.stat2Quantity = 0;

  acc.quality = getQuality(AccessoryType.Earring, acc.stats.stat1Quantity);

  reader.o = beginOffset + ringEngrType1;
  var type = reader.i32();
  reader.o = beginOffset + ringEngrQty1;
  var qty = reader.i32();
  acc.engravings.push(createEngravingData(type, qty));

  reader.o = beginOffset + ringEngrType2;
  type = reader.i32();
  reader.o = beginOffset + ringEngrQty2;
  qty = reader.i32();
  acc.engravings.push(createEngravingData(type, qty));

  reader.o = beginOffset + ringNegType;
  type = reader.i32();
  reader.o = beginOffset + ringNegQty;
  qty = reader.i32();
  acc.negativeEngraving = createEngravingData(type, qty);

  return acc;
}

function readNecklace(acc: Accessory, reader: Read, beginOffset: number) {
  acc.id = uuidv4();

  reader.o = beginOffset + neckBid;
  acc.minimumBid = reader.i32();

  reader.o = beginOffset + neckBuyout;
  acc.buyNowPrice = reader.i32();

  reader.o = beginOffset + neckStatType1;
  acc.stats.statType1 = reader.i32();
  reader.o = beginOffset + neckStatQty1;
  acc.stats.stat1Quantity = reader.i32();

  reader.o = beginOffset + neckStatType2;
  acc.stats.statType2 = reader.i32();
  reader.o = beginOffset + neckStatQty2;
  acc.stats.stat2Quantity = reader.i32();

  acc.quality = getQuality(AccessoryType.Necklace, acc.stats.stat1Quantity, acc.stats.stat2Quantity);

  reader.o = beginOffset + neckEngrType1;
  var type = reader.i32();
  reader.o = beginOffset + neckEngrQty1;
  var qty = reader.i32();
  acc.engravings.push(createEngravingData(type, qty));

  reader.o = beginOffset + neckEngrType2;
  type = reader.i32();
  reader.o = beginOffset + neckEngrQty2;
  qty = reader.i32();
  acc.engravings.push(createEngravingData(type, qty));

  reader.o = beginOffset + neckNegType;
  type = reader.i32();
  reader.o = beginOffset + neckNegQty;
  qty = reader.i32();
  acc.negativeEngraving = createEngravingData(type, qty);

  return acc;
}

function getAccType(itemId: number) {
  if (debug)
    console.log("itemId: " + itemId);
  if (relicRings.has(itemId))
    return [relicRings.get(itemId), AccessoryType.Ring, AccessoryRank.Relic] as const;
  else if (ancientRings.has(itemId))
    return [ancientRings.get(itemId), AccessoryType.Ring, AccessoryRank.Ancient] as const;
  else if (relicEarrings.has(itemId))
    return [relicEarrings.get(itemId), AccessoryType.Earring, AccessoryRank.Relic] as const;
  else if (ancientEarrings.has(itemId))
    return [ancientEarrings.get(itemId), AccessoryType.Earring, AccessoryRank.Ancient] as const;
  else if (relicNecklaces.has(itemId))
    return [relicNecklaces.get(itemId), AccessoryType.Necklace, AccessoryRank.Relic] as const;
  else if (ancientNecklaces.has(itemId))
    return [ancientNecklaces.get(itemId), AccessoryType.Necklace, AccessoryRank.Ancient] as const;
  else if (relicBracelet.has(itemId))
    return [relicBracelet.get(itemId), AccessoryType.Bracelet, AccessoryRank.Relic] as const;
  else
    return ["Invalid", AccessoryType.Invalid, AccessoryRank.Invalid] as const;
}

function getQuality(type: AccessoryType, stat1Qty: number, stat2Qty: number = 0) {
  var actualStat = 0;
  var real = 0.0;
  // For relic only
  switch (type) {
    case AccessoryType.Ring:
      actualStat = stat1Qty - 160;
      real = actualStat / 0.4;
      break;
    case AccessoryType.Earring:
      actualStat = stat1Qty - 240;
      real = actualStat / 0.6;
      break;
    case AccessoryType.Necklace:
      actualStat = stat1Qty + stat2Qty - 800;
      real = actualStat / 2;
      break;
  }
  real = Math.floor(real);
  return real;
}

function createEngravingData(type: number, value: number) {
  var data = {} as EngravingData;
  data.engravingType = type;
  data.engravingValue = value;
  data.EngravingName = meterData.getEngravingName(type);
  return data;
}

function bruteForceSkipBracelet(reader: Read, beginOffset: number) {
  var currOffset = beginOffset;

  if (debug)
    console.log("Length: " + reader.b.length);
  while (currOffset < reader.b.length - 16) {
    if (debug)
      console.log("Offset: " + currOffset);
    reader.o = currOffset
    var val = reader.i32();
    const [name, type, rank] = getAccType(val);
    if (type != AccessoryType.Invalid && type != AccessoryType.Bracelet) {
      if (debug)
        console.log(val + " at index: " + currOffset);
      return currOffset - itemId;
    }
    currOffset++;
  }
  return 0;
}