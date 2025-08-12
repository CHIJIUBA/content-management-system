import { Includeable, ModelStatic, Model } from 'sequelize';

export default class BaseService {
  constructor() {}

  protected generateIncludables<T extends Model>(
    model: ModelStatic<T>,
    alias: string,
    attributes?: string[],
    include?: Includeable[]
  ) {
    return {
      model,
      as: alias,
      attributes,
      ...(include && { include }),
    };
  }
}
