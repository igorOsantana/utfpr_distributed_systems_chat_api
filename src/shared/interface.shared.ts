export type TPaginationInput = {
  take?: number;
  skip?: number;
};

export type TPaginationOutput<Entity> = {
  list: Entity[];
  meta: {
    taken: number;
    skipped: number;
    total: number;
  };
};
