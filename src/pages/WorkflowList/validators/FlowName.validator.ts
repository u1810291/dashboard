import * as yup from 'yup';

const nameSchema = yup.object({
  hasDuplicate: yup.boolean().oneOf([false], 'validators.nameOccupied'),
  name: yup
    .string()
    .trim()
    .min(1, 'validators.StringMin')
    .max(30, 'validators.StringMax'),
});

export async function flowNameValidator(data) {
  return nameSchema.validate(data);
}
