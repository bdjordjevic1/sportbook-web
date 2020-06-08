import { Media } from './media.model';

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: Media;
}
