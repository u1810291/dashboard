import { cleanText, email, required } from './validations';

describe('.required', () => {
  const errorId = 'validations.required';
  it('should return undefined when gets value', () => {
    expect(required('Mati')).toBe(undefined);
  });
  it('should return error when gets empty string', () => {
    expect(required('')).toBe(errorId);
  });
});

describe('.cleanText', () => {
  const errorId = 'validations.cleanText';
  it('should return undefined when no special characters', () => {
    expect(cleanText('Mati')).toBe(undefined);
  });
  it('should return error when contains special characters', () => {
    expect(cleanText('Mati@')).toBe(errorId);
  });
});

describe('.email', () => {
  const errorId = 'validations.email';
  it('should return undefined when email is valid', () => {
    expect(email('someuser@mati.io')).toBe(undefined);
  });
  it('should return error when email is invalid', () => {
    expect(email('@mati')).toBe(errorId);
  });
});
