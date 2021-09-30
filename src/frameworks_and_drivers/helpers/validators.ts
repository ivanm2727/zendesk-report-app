export const isEmptyObject = (object: any) => {
  return Object.keys(object).length === 0 && object.constructor === Object
}