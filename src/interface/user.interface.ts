import { deflate } from 'zlib';

interface UserAttributeI {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  // role: string;
  password: string;
  isVerified: boolean;
}

export default UserAttributeI;
// I added a new comment here to indicate that this is the end of the file.
