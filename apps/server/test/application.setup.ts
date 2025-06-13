import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

export const createNestApp = async (modules: any[] = [AppModule]) => {
  const module = await Test.createTestingModule({
    imports: modules,
  }).compile();

  const app = module.createNestApplication();
  await app.init();
  return { module, app };
};
