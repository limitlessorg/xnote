import { SpaceType } from '@prisma/client';

/**
 * Token载荷
 */
export interface Payload {
  userId: string;
  userName: string;
  spaceType: SpaceType;
  spaceId?: string;
}
