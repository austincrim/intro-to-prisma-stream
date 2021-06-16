- Prisma Client
  - Strongly typed JavaScript library for data access
  - Dynamically generated with `prisma generate`
- Prisma Migrate
  - CLI to manage schema changes and migrations
  - `db pull` for syncing upstream changes with schema file
  - `db push` for prototyping, does not generate migrations
  - `migrate` for production, generates migration files
- Prisma Studio
  - UI to view and interact with data
  - Data is presented according to Prisma schema, not underlying tables

[] install prisma
[] `npx prisma init`
[] write schema
[] `npx prisma db push`
[] `npx prisma studio`
[] add sample data
[] GetServerSideProps
[] highlight types/autocomplete
[] add api route for creating
[] add client side fetch
[] add `musings` field
[] `npx prisma db push` without `@default`
[] talk about error
[] add `@default` and rerun
[] add musings field in form
[] update api route
[] show studio
