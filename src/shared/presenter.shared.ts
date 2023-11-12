import { ApiProperty } from '@nestjs/swagger';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export class RequestPresenter<T> {
  @ApiProperty()
  data: T;
  @ApiProperty({ example: '/api/v1/users' })
  path: string;
  @ApiProperty({ example: 'GET' })
  method: Method;
  @ApiProperty({ example: 200 })
  status: number;
  @ApiProperty({ example: '12ms' })
  duration: string;
}

export class PaginationPresenter {
  @ApiProperty({ example: 10 })
  taken: number;
  @ApiProperty({ example: 10 })
  skipped: number;
  @ApiProperty({ example: 29 })
  total: number;
}
