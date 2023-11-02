import * as yup from 'yup';

export const payrollValidationSchema = yup.object().shape({
  salary: yup.number().integer().required(),
  bonus: yup.number().integer().required(),
  deduction: yup.number().integer().required(),
  pay_date: yup.date().required(),
  employee_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
