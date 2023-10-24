import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFriendshipDto {
  @IsNotEmpty()
  @IsString()
  senderId: string;

  @IsNotEmpty()
  @IsString()
  recipientId: string;
}

export class AcceptFriendshipDto extends CreateFriendshipDto {}

export class DeclineFriendshipDto extends CreateFriendshipDto {}
