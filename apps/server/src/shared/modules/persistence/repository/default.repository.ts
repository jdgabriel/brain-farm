import {
  EntityManager,
  EntityTarget,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { DefaultEntity } from '../entity/default.entity';

export abstract class DefaultTypeOrmRepository<T extends DefaultEntity<T>> {
  private repository: Repository<T>;
  protected transactionalEntityManager: EntityManager;
  constructor(
    readonly entity: EntityTarget<T>,
    readonly manager: EntityManager,
  ) {
    /**
     * Note that we don't extend the Repository class from TypeORM, but we use it as a property.
     * This way we can control the access to the repository methods and avoid exposing them to the outside world.
     */
    this.repository = manager.getRepository(entity);
    this.transactionalEntityManager = manager;
  }

  async save(entity: T): Promise<T> {
    return await this.repository.save(entity);
  }

  async findOneById(id: string, relations?: string[]): Promise<T | null> {
    return this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
      relations,
    });
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne(options);
  }

  async find(options: FindOneOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async exists(id: string): Promise<boolean> {
    return this.repository.exists({
      where: { id } as FindOptionsWhere<T>,
      withDeleted: true,
    });
  }

  async existsBy(properties: FindOptionsWhere<T>): Promise<boolean> {
    return this.repository.exists({
      where: properties,
      withDeleted: true,
    });
  }

  async softDelete(id: string): Promise<boolean> {
    const row = await this.repository.softDelete(id);
    return row?.affected === 1;
  }
}
