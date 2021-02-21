import { User } from './user';

export interface Game {
   docId: string;
   name: string;
   show: boolean;
   users: User[];

}
