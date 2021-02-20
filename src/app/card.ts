import { User } from './user';

export interface Card {
    user: User;
    display: string;
    selected: boolean;
}
