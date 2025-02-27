/*!
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */
import {CborldEncoder} from './CborldEncoder.js';
import {Token, Type} from 'cborg';
import {decode as decodeBase58} from '@digitalcredentials/base58-universal';

const SCHEME_TO_ID = new Map([
  ['did:v1:nym:', 1024],
  ['did:key:', 1025]
]);

export class Base58DidUrlEncoder extends CborldEncoder {
  constructor({value, scheme} = {}) {
    super();
    this.value = value;
    this.scheme = scheme;
  }

  encode() {
    const {value, scheme} = this;
    const suffix = value.substr(scheme.length);
    const [authority, fragment] = suffix.split('#');
    const entries = [
      new Token(Type.uint, SCHEME_TO_ID.get(scheme)),
      _multibase58ToToken(authority)
    ];
    if(fragment !== undefined) {
      entries.push(_multibase58ToToken(fragment));
    }
    return [new Token(Type.array, entries.length), entries];
  }

  static createEncoder({value} = {}) {
    const keys = [...SCHEME_TO_ID.keys()];
    for(const key of keys) {
      if(value.startsWith(key)) {
        return new Base58DidUrlEncoder({value, scheme: key});
      }
    }
  }
}

function _multibase58ToToken(str) {
  if(str.startsWith('z')) {
    const decoded = decodeBase58(str.substr(1));
    if(decoded) {
      return new Token(Type.bytes, decoded);
    }
  }
  // cannot compress
  return new Token(Type.string, str);
}
