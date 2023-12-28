# SetUp the project w Prisma

## 1️⃣ Add prisma to the project

```sh
pnpm add -D prisma
```

## 2️⃣ You can now invoke the Prisma CLI by prefixing it with pnpx || **pnpm dlx(preferred)**

```sh
pnpm dlx prisma
```

## 3️⃣ Set up your Prisma schema file.

```sh
pnpm dlx prisma init
```

This command does two things:

- creates a new directory called `prisma` that contains a file called `schema.prisma`, which contains the Prisma schema with your database connection variable and schema models
- creates the `.env` file in the root directory of the project, which is used for defining environment variables (such as your database connection)

**Directory structure**

```project-root/
├── node_modules/
├── prisma/
|   ├── schema.prisma
├── index.js
├── package.json
├── pnpm-lock.yaml
├── README.md
```

Followed the instructions from [prisma guide](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-node-postgresql)

# Connect to database

Following the instructions from [prisma guide](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-node-postgresql)

- To connect your database, you need to set the url field of the datasource block in your Prisma schema to your database connection URL:

_prisma/schema.prisma_

```js
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

In this case, the url is set via an environment variable which is defined in .env:

**.env**

```env
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

[Look into specific Connection URL Config](https://www.prisma.io/docs/orm/reference/connection-urls)

If one has **special character like @#$%^ it requires escape character**.
[Follow](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding)

# Using Prisma Migrate

Following the instructions from [prisma guide](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-node-postgresql)

## 1️⃣ In this guide, you'll use `Prisma Migrate` to create the tables in your database. Add the following Prisma data model to your **Prisma schema** in `prisma/schema.prisma`:

_prisma/schema.prisma_

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String   @db.VarChar(255)
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  user   User    @relation(fields: [userId], references: [id])
  userId Int     @unique
}

model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
  posts   Post[]
  profile Profile?
}
```

## 2️⃣ To map your data model to the database schema, you need to use the prisma migrate CLI commands:

```
pnpm dlx prisma migrate dev --name init
```

This command does two things:

1. It creates a new SQL migration file for this migration.
2. It runs the SQL migration file against the database.

```
Note: generate is called under the hood by default, after running prisma migrate dev. If the prisma-client-js generator is defined in your schema, this will check if @prisma/client is installed and install it if it's missing.
```

# Install Prisma Client

Following the instructions from [prisma guide](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/install-prisma-client-node-postgresql)

## 1️⃣ Install and generate Prisma Client
1. To get started with Prisma Client, you need to install the ```@prisma/client``` package:

```
pnpm add @prisma/client
```


The install command invokes ```prisma generate``` for you which reads your Prisma schema and generates a version of Prisma Client that is tailored to your models.

<img src='./assets/prisma-client-install-and-generate.png' alt="prisma working" align-item="center" width="70%">

Whenever you update your Prisma schema, you will have to update your database schema using either ```prisma migrate dev``` or ```prisma db push```. This will keep your database schema in sync with your Prisma schema. The commands will also regenerate Prisma Client.
