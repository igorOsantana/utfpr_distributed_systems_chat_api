import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

export class UserPresenter {
  @ApiProperty({ example: 'fcbff226-51f9-4910-8221-0dbb11d6d34a' })
  id: string;
  @ApiProperty({ example: 'John Doe' })
  name: string;
  @ApiProperty({ example: 'johndoe@mail.com' })
  email: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
