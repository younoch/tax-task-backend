# Project command

## Project Setup
### Run development server
npm run start:dev

## Prisma Commands
### Initialize Prisma (first time)
npx prisma init

### Run migration
npx prisma migrate dev --name init

### Generate Prisma Client
npx prisma generate

### Open Prisma Studio (DB GUI)
npx prisma studio

### Reset database (⚠️ all data will be lost)
npx prisma migrate reset