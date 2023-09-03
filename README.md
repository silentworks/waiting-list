# Waiting List App

Example Supabase application showing how to use the `inviteUserByEmail` api to invite users to your application.

This project is built with:

- [SvelteKit](https://kit.svelte.dev/)
- [Bulma](https://bulma.io/)
- [Vest](https://vestjs.dev/)
- [Supabase](https://supabase.com/)

## Features

- Invite List
- Sign Up to Invite
- Forgot Password
- Admin Registration

## Getting started

Clone the project from GitHub

```sh
git clone https://github.com/silentworks/waiting-list
cd waiting-list
```

## Developing

Copy the `env.example` and name it `.env`

Edit the file and enter all the required variable values

```
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

This project makes use of the [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started) which uses docker under the hood for setting up a Supabase project locally. Docker must be running before attempting to run any of the `supaabse` commands.

### Starting your project

```sh
pnpm exec supabase start
```

This commend will download the necessary docker containers and run the migration files inside of the `supabase/migrations` directory.

### Run database migrations

When creating a new migration file you can manually run the command below to update your local database.

```sh
pnpm exec supabase migration up
```

### Creating admin user

Once the project server is running you can visit the signup path `/auth/signup` to create your admin user.

> Note that once you have created your admin user, this route will no longer be accessible.

### Start development server

Once you've created a project and installed dependencies with `pnpm install` (or `npm install` or `yarn`), start a development server:

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

## Production

There are email templates in this project that are used for local development. To update your hosted project, please copy the templates from `supabase/auth/email` into the [Email Templates](https://supabase.com/dashboard/project/_/auth/templates) section of the Dashboard.

This project also contains GitHub workflow files for deploying your application into production using [Fly.io](https://fly.io/).

### Building

To manually create a production version of your app:

```bash
pnpm build
```

You can preview the production build with `pnpm preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
