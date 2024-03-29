# Pickem project

The stack originates from [create-t3-app](https://github.com/t3-oss/create-t3-app).

## About structure

Ever wondered how to migrate your T3 application into a monorepo? Stop right here! This is the perfect starter repo to
get you running with the perfect stack!

It uses [Turborepo](https://turborepo.org/) and contains:

```
.github
  └─ workflows
        └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  └─ next.js
      ├─ Next.js 13
      ├─ React 18
      ├─ Tailwind CSS
      └─ E2E Typesafe API Server & Client
packages
 ├─ api
 |   └─ tRPC v10 router definition
 ├─ types
 |   └─ Shared types between packages
 ├─ functions
 |   └─ Serverless supabase functions
 └─ config
     └─ Shared configuration between packages
supabase
  └─ Supabase project configs
```

## Quick Start

### Install dependencies

```diff
pnpm i
```

### Configure environment variables.

#### There is an `.env.example` in the root directory you can use for reference

```bash
cp .env.example .env
```

## Setup Supabase

### First steps

#### Login to Supabase

```bash
supabase login
```

#### Link with remote project

```bash
supabase link --project-ref $PROJECT_ID
```

#### Start Supabase

```bash
supabase start
```

### Migrations

#### Reset database to latest migration

```bash
supabase db reset
```

#### Create a new migration file

```bash
supabase db diff -f <new_migration_file_name>
```

#### Push new migrations to database

```bash
supabase db push
```

### Generate types for supabase

```bash
npx supabase gen types typescript --project-id $PROJECT_ID --schema public > packages/shared/supabase.ts
```
