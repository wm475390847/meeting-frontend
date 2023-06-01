/// <reference path="../typings/cocos-creator.d.ts" />

/**
 * We do not assign 'storage' to window.localStorage immediatelly for React
 * Native compatibility. window.localStorage is not present when this module is
 * loaded.
 */

let storage: any;

function getStorage(): Storage {
  if (!storage) {
    storage = (typeof (cc) !== 'undefined' && cc.sys && cc.sys.localStorage)
      ? cc.sys.localStorage  // compatibility with cocos creator
      : typeof (window) !== "undefined" && window.localStorage //RN does have window object at this point, but localStorage is not defined
        ? window.localStorage // regular browser environment
        : { // mock localStorage for Node.js or RN environment
          cache: {},
          setItem: function (key: string | number, value: any) { this.cache[key] = value; },
          getItem: function (key: string | number) { return this.cache[key]; },
          removeItem: function (key: string | number) { delete this.cache[key]; },
        };

  }
  return storage;
}

export function setItem(key: string, value: any) {
  getStorage().setItem(key, String(value));
}

export function removeItem(key: string) {
  getStorage().removeItem(key);
}

export function getItem(key: string, callback?: Function): any {
  const value: any = getStorage().getItem(key);
  callback && callback(value);
  return value;
} 