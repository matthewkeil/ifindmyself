export const isObjectLiteral = (obj: any) =>
  Object.getPrototypeOf(obj) === Object.getPrototypeOf({});

export default isObjectLiteral;
