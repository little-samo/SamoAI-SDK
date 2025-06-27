import { UserId } from '@little-samo/samo-ai';

import { EntityDto } from '../entity';

export interface UserDto extends EntityDto {
  id: UserId;
}

export interface UserPublicDto {
  id: UserId;
  username: string | null;
  nickname: string;
  firstName: string | null;
  lastName: string | null;
  profilePicture: string | null;
}

export interface UserPrivateDto extends UserPublicDto {
  email: string | null;
}
