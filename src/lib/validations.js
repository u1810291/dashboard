export function required(value) {
  if (!value) {
    return 'validations.required'
  }
}

export function cleanText(value) {
  const CLEAN_TEXT = /^[^`~!@#$%^&*()+=[{\]}|\\'<,.>?";:]+$/;
  if (!CLEAN_TEXT.test(value)) {
    return 'validations.cleanText'
  }
}

export function email(value) {
  const EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!EMAIL.test(value)) {
    return 'validations.email'
  }
}
