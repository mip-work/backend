import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 1000 * 600,
      store: redisStore,
    }),
  ],
  controllers: [],
  providers: [],
})
export class RedisModule {}
