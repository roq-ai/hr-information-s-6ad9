import * as yup from 'yup';

export const hrManagerValidationSchema = yup.object().shape({
  manager_name: yup.string().required(),
  contact_number: yup.string().required(),
  email: yup.string().required(),
  department: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
