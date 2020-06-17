import { Location } from './location.model';
import { User } from './user.model';

export interface Event {
  location: Location;
  weekDay: string;
  time: string;
  users: User[];
}
