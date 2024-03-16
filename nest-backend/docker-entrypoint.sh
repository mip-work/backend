#!/bin/bash

while ! exec 6<>/dev/tcp/postgres/5432; do
  sleep 1
done

exec 6>&-
exec 6<&-

npx prisma generate
npx prisma migrate dev

exec npm run start:dev