interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['HR Manager'],
  customerRoles: ['Customer'],
  tenantRoles: ['Business Owner', 'HR Manager', 'Payroll Administrator'],
  tenantName: 'Company',
  applicationName: 'HR Information System',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Manage personal user data',
    'View company information',
    'View employee information',
    'View payroll information',
  ],
  ownerAbilities: [
    'Manage user data',
    'Manage company data',
    'Manage employee data',
    'Manage vacation and payroll data',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/890fac5b-2a22-4fac-b543-8efe035968d6',
};
