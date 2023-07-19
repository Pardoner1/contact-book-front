import { Contact } from './Contact';

export interface Person {
  id?: string;
  name: string;
  contacts: Contact[];
  created_at?: Date;
  updated_at?: Date;
}
