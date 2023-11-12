import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  msgContent: string;

  @IsNotEmpty()
  @IsString()
  recipientId: string;
}
