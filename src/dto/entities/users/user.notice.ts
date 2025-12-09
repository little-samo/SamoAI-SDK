export interface NoticeDto {
  id: bigint;
  content: string;
  contentImageUrls: string[];
  publishedAt: Date | null;
  isAcknowledged: boolean | null;
  isRead: boolean | null;
}
