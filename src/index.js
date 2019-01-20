/* @flow */

import type { Bytes, NonboolListEncoding } from "@capnp-js/layout";

type uint = number;

export class SegmentIdError extends Error {
  +id: number;
  +max: number;

  constructor(id: number, max: number) {
    super();
    this.id = id;
    this.max = max;
  }
}

export class StaleStructCompileError extends Error {
  +bytes: Bytes;
  +compiledBytes: Bytes;

  constructor(bytes: Bytes, compiledBytes: Bytes) {
    super();
    this.bytes = bytes;
    this.compiledBytes = compiledBytes;
  }
}

export class StaleNonboolListCompileError extends Error {
  +encoding: NonboolListEncoding;
  +compiledEncoding: NonboolListEncoding;

  constructor(encoding: NonboolListEncoding, compiledEncoding: NonboolListEncoding) {
    super();
    this.encoding = encoding;
    this.compiledEncoding = compiledEncoding;
  }
}

export class PointerLevelError extends Error {
  +level: number;

  constructor(level: number) {
    super();
    this.level = level;
  }
}

export class ReadLimitError extends Error {}

export class DoubleFarTagError extends Error {
  +offset: number;

  constructor(offset: number) {
    super();
    this.offset = offset;
  }
}

export class InconsistentWordCountError extends Error {
  +words: uint;
  +bytes: Bytes;
  +length: number;

  constructor(words: uint, bytes: Bytes, length: uint) {
    super();
    this.words = words;
    this.bytes = bytes;
    this.length = length;
  }
}

type PointerType = "struct" | "list" | "intersegment" | "intersegment hop" | "capability";
export class PointerTypeError extends Error {
  +expected: $ReadOnlyArray<PointerType>;
  +found: PointerType;

  constructor(expected: $ReadOnlyArray<PointerType>, found: PointerType) {
    super();
    this.expected = expected;
    this.found = found;
  }
}

type ListAlignment = "bit aligned" | "byte aligned";
export class ListAlignmentError extends Error {
  +expected: ListAlignment;
  +found: ListAlignment;

  constructor(expected: ListAlignment, found: ListAlignment) {
    super();
    this.expected = expected;
    this.found = found;
  }
}

/* Exclude 0x01 from `ListType` to avoid ambiguity where `ListAlignment` and
   `UnexpectedListType` can both characterize the same error. */
type ListType = 0x00 | 0x02 | 0x03 | 0x04 | 0x05 | 0x06 | 0x07;
export class ListTypeError extends Error {
  +expected: ListType;
  +found: ListType;

  constructor(expected: ListType, found: ListType) {
    super();
    this.expected = expected;
    this.found = found;
  }
}

export class IllegalAdoptError extends Error {
  +nonorphan: "struct" | "list";

  //TODO: Can I clobber this class?
  constructor(nonorphan: "struct" | "list") {
    super();
    this.nonorphan = nonorphan;
  }
}

export class InvalidUtf8Error extends Error {}

//TODO: Should this be "overflow"?
export class Utf8OverrunError extends Error {}
