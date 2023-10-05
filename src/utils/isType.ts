/**
 * 类型判断
 */

/**
 * 判断是否为 Number 类型
 * @param value
 * @returns {boolean}
 */
export const isNumber = (value: any): value is number => {
  return typeof value === "number";
};

/**
 * 判断是否为 String 类型
 * @param value
 * @returns {boolean}
 */
export const isString = (value: any): value is string => {
  return typeof value === "string";
};

/**
 * 判断是否为 Function 类型
 * @param value
 * @returns {boolean}
 */
export const isFunction = (value: any): value is Function => {
  return typeof value === "function";
};

/**
 * 判断是否为 Boolean 类型
 * @param value
 * @returns {boolean}
 */
export const isBoolean = (value: any): value is boolean => {
  return typeof value === "boolean";
};

/**
 * 判断是否为 Undefined 类型
 * @param value
 * @returns {boolean}
 */
export const isUndefined = (value: any): value is undefined => {
  return typeof value === "undefined";
};

/**
 * 判断是否为 Null
 * @param value
 * @returns {boolean}
 */
export const isNull = (value: any): value is null => {
  return value === null;
};

/**
 * 判断是否为 Object 类型
 * @param value
 * @returns {boolean}
 */
export const isObject = (value: any): value is object => {
  return isNull(value) && typeof value === "object";
};

/**
 * 判断是否为 Array 类型
 * @param value
 * @returns {boolean}
 */
export const isArray = (value: any): value is any[] => {
  return Array.isArray(value);
};

/**
 * 判断是否为 Date 类型
 * @param value
 * @returns {boolean}
 */
export const isDate = (value: any): value is Date => {
  return Object.prototype.toString.call(value) === "[object Date]";
};

/**
 * 判断对象是否存在某个属性
 * @param value
 * @returns {boolean}
 */
export const hasProperty = <T, K extends keyof T>(
  obj: T,
  key: K
): obj is T & Record<K, unknown> => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

const myObject: unknown = Math.random() > 0.5 ? { name: "John", age: 30 } : { age: 30 };

if (hasProperty(myObject, "age")) {
  // 在这里，TypeScript 知道 myObject 具有 "name" 属性
  console.log(myObject.name);
}

type petsGroup = "dog" | "cat" | "fish";
interface IPetInfo {
  name: string;
  age: number;
}

type IPets = Record<petsGroup, IPetInfo>;

const animalsInfo: IPets = {
  dog: {
    name: "dogName",
    age: 2,
  },
  cat: {
    name: "catName",
    age: 3,
  },
  fish: {
    name: "fishName",
    age: 5,
  },
};
