import { TPaginationInput } from './interface.shared';

export class PaginationInputHelper {
  static parse(params: TPaginationInput) {
    return {
      take: Number(params.take) || undefined,
      skip: Number(params.skip) || undefined,
    };
  }
}
