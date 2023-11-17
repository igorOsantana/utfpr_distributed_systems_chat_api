import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { PaginationDto } from 'src/shared/dto.shared';

export class CreateChatDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  msgContent: string;

  @IsNotEmpty()
  @IsString()
  recipientId: string;
}

export class FindAllChatDto extends PaginationDto {}
