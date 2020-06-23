import { Media } from './media.model';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: Media;
}
