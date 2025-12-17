import { UserId } from '@little-samo/samo-ai';

export type UserNotificationType =
  | 'ADMIN_MESSAGE'
  | 'ADMIN_REWARD'
  | 'SYSTEM_REWARD_ATTENDANCE'
  | 'SYSTEM_REWARD_LEVEL_UP'
  | 'SYSTEM_REWARD_REFERRAL'
  | 'COMMENT_USER'
  | 'COMMENT_LOCATION_PRESET'
  | 'LIKE_LOCATION_PRESET'
  | 'FOLLOW_USER';

export interface UserNotificationDto {
  id: bigint;
  type: UserNotificationType;
  actorUserId: UserId | null;
  userCommentId: bigint | null;
  locationPresetId: bigint | null;
  locationPresetCommentId: bigint | null;
  content: string | null;
  count: number | null;
  isAcknowledged: boolean;
  isRead: boolean;
  createdAt: Date;
}
