/**
 * 类型判断
 */

/**
 * 判断是否为 Number 类型
 * @param value
 * @returns {boolean}
 */
export const isNumber = (value: unknown): value is number => {
  return typeof value === "number";
};

/**
 * 判断是否为 String 类型
 * @param value
 * @returns {boolean}
 */
export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

/**
 * 判断是否为 Function 类型
 * @param value
 * @returns {boolean}
 */

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export const isFunction = (value: unknown): value is Function => {
  return typeof value === "function";
};

/**
 * 判断是否为 Boolean 类型
 * @param value
 * @returns {boolean}
 */
export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === "boolean";
};

/**
 * 判断是否为 Undefined 类型
 * @param value
 * @returns {boolean}
 */
export const isUndefined = (value: unknown): value is undefined => {
  return typeof value === "undefined";
};

/**
 * 判断是否为 Null
 * @param value
 * @returns {boolean}
 */
export const isNull = (value: unknown): value is null => {
  return value === null;
};

/**
 * 判断是否为 Object 类型
 * @param value
 * @returns {boolean}
 */
export const isObject = (value: unknown): value is object => {
  return isNull(value) && typeof value === "object";
};

/**
 * 判断是否为 Array 类型
 * @param value
 * @returns {boolean}
 */
export const isArray = (value: unknown): value is unknown[] => {
  return Array.isArray(value);
};

/**
 * 判断是否为 Date 类型
 * @param value
 * @returns {boolean}
 */
export const isDate = (value: unknown): value is Date => {
  return Object.prototype.toString.call(value) === "[object Date]";
};
