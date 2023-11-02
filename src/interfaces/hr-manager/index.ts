import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface HrManagerInterface {
  id?: string;
  manager_name: string;
  contact_number: string;
  email: string;
  department: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface HrManagerGetQueryInterface extends GetQueryInterface {
  id?: string;
  manager_name?: string;
  contact_number?: string;
  email?: string;
  department?: string;
  user_id?: string;
}
