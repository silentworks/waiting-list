# Waiting List App

Example Supabase application showing how to use the `inviteUserByEmail` api to invite users to your application.

This project is built with:

- [SvelteKit](https://kit.svelte.dev/)
- [Svelte Form Library](https://github.com/tjinauyeung/svelte-forms-lib)
- [Bulma](https://bulma.io/)
- [Vest](https://vestjs.dev/)
- [Supabase](https://supabase.com/)
- [ley](https://github.com/lukeed/ley)

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

> Note: the `@next` is temporary

## Developing

Copy the `env.example` and name it `.env`

Edit the file and enter all the required variable values

```
VITE_APP_URL=http://localhost:3000/
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
CONNECTION_STRING=
```

The "CONNECTION_STRING" can be found inside the Supabase Dashboard by going to **Settings > Database** then scrolling down to **Connection string** and clicking on the **URI** tab. You should see a string looking like `postgresql://postgres:[YOUR-PASSWORD]@host:5432/postgres`.

### Run database migrations

```sh
pnpm m:up
```

### Creating admin user

Once the project server is running you can visit the signup path `/auth/signup` to create your admin user.

> Note that once you have created your admin user, this route will no longer be accessible.

### Start development server

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment. Then:

```bash
pnpm build
```

> You can preview the built app with `pnpm preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.
