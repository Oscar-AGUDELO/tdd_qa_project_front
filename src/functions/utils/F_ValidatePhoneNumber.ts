export const F_ValidatePhoneNumber = (number: string): boolean => {
  const pattern: RegExp = /^[0-9]{10}$/;
  const patternWithCountryCode: RegExp = /^\+[0-9]{1,3}-?[0-9]{3,}$/;

  return pattern.test(number) || patternWithCountryCode.test(number);
};