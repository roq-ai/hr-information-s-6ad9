import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { useRoqClient } from 'lib/roq';
import * as RoqTypes from 'lib/roq/types';

import { payrollValidationSchema } from 'validationSchema/payrolls';
import { EmployeeInterface } from 'interfaces/employee';
import { UserInterface } from 'interfaces/user';
import { PayrollInterface } from 'interfaces/payroll';

function PayrollCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const roqClient = useRoqClient();
  const handleSubmit = async (values: PayrollInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await roqClient.payroll.create({ data: values as RoqTypes.payroll });
      resetForm();
      router.push('/payrolls');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PayrollInterface>({
    initialValues: {
      salary: 0,
      bonus: 0,
      deduction: 0,
      pay_date: new Date(new Date().toDateString()),
      employee_id: (router.query.employee_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: payrollValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Payrolls',
              link: '/payrolls',
            },
            {
              label: 'Create Payroll',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Payroll
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Salary"
            formControlProps={{
              id: 'salary',
              isInvalid: !!formik.errors?.salary,
            }}
            name="salary"
            error={formik.errors?.salary}
            value={formik.values?.salary}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('salary', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Bonus"
            formControlProps={{
              id: 'bonus',
              isInvalid: !!formik.errors?.bonus,
            }}
            name="bonus"
            error={formik.errors?.bonus}
            value={formik.values?.bonus}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('bonus', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Deduction"
            formControlProps={{
              id: 'deduction',
              isInvalid: !!formik.errors?.deduction,
            }}
            name="deduction"
            error={formik.errors?.deduction}
            value={formik.values?.deduction}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('deduction', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="pay_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Pay Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.pay_date ? new Date(formik.values?.pay_date) : null}
              onChange={(value: Date) => formik.setFieldValue('pay_date', value)}
            />
          </FormControl>
          <AsyncSelect<EmployeeInterface>
            formik={formik}
            name={'employee_id'}
            label={'Select Employee'}
            placeholder={'Select Employee'}
            fetcher={() => roqClient.employee.findManyWithCount({})}
            labelField={'employee_name'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={() => roqClient.user.findManyWithCount({})}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/payrolls')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'payroll',
    operation: AccessOperationEnum.CREATE,
  }),
)(PayrollCreatePage);
