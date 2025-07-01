import { LocationId } from '@little-samo/samo-ai';
import { LocationConfig } from '@little-samo/samo-ai-sdk/models';

import { LocationMessageDto } from './location.messages';

export interface LocationMessagesDto {
  id: LocationId;
  messages: LocationMessageDto[];
  messageCursor?: string;
}

export interface LocationBasicDto {
  id: LocationId;
  name: string;

  platform: string;
  type: string;

  config: LocationConfig;

  createdAt: Date;
  updatedAt: Date;
}
