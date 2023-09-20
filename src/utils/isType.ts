/**
 * 类型判断
 */

/**
 * 判断是否为 Number 类型
 * @param value
 * @returns {boolean}
 */
export const isNumber = (value: any): boolean => {
  return typeof value === "number";
};

/**
 * 判断是否为 String 类型
 * @param value
 * @returns {boolean}
 */
export const isString = (value: any): boolean => {
  return typeof value === "string";
};

/**
 * 判断是否为 Function 类型
 * @param value
 * @returns {boolean}
 */
export const isFunction = (value: any): boolean => {
  return typeof value === "function";
};

/**
 * 判断是否为 Boolean 类型
 * @param value
 * @returns {boolean}
 */
export const isBoolean = (value: any): boolean => {
  return typeof value === "boolean";
};

/**
 * 判断是否为 Undefined 类型
 * @param value
 * @returns {boolean}
 */
export const isUndefined = (value: any): boolean => {
  return typeof value === "undefined";
};

/**
 * 判断是否为 Null
 * @param value
 * @returns {boolean}
 */
export const isNull = (value: any): boolean => {
  return value === null;
};

/**
 * 判断是否为 Object 类型
 * @param value
 * @returns {boolean}
 */
export const isObject = (value: any): boolean => {
  return isNull(value) && typeof value === "object";
};

/**
 * 判断是否为 Array 类型
 * @param value
 * @returns {boolean}
 */
export const isArray = (value: any): boolean => {
  return Array.isArray(value);
};

/**
 * 判断是否为 Date 类型
 * @param value
 * @returns {boolean}
 */
export const isDate = (value: any): boolean => {
  return Object.prototype.toString.call(value) === "[object Date]";
};

/**
 * 判断对象是否存在某个属性
 * @param value
 * @returns {boolean}
 */
export const hasProperty = (obj: object, key: string): boolean => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};
