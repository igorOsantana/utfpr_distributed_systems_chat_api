import { TPaginationInput } from './interface.shared';

export class PaginationInputHelper {
  static parse(params: TPaginationInput) {
    return {
      take: params.take || 10,
      skip: params.skip || 0,
    };
  }
}
