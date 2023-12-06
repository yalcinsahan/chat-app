npx prisma generate
npx prisma migrate dev --name inits
npm run build
node dist/index.js