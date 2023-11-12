import { TPaginationInput } from './interface.shared';

export class PaginationInputHelper {
  static parse(params: TPaginationInput) {
    return {
      take: Number(params.take) || 10,
      skip: Number(params.skip) || 0,
    };
  }
}
