# Waiting List App

Example Supabase application showing how to use the `inviteUserByEmail` api to invite users to your application.

This project is built with:

- [SvelteKit](https://kit.svelte.dev/)
- [Svelte Form Library](https://github.com/tjinauyeung/svelte-forms-lib)
- [Bulma](https://bulma.io/)
- [Vest](https://vestjs.dev/)
- [Supabase](https://supabase.com/)

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

The "CONNECTION_STRING" can be found under **Settings/Database** inside the Supabase Dashboard

### Run database migrations

```sh
pnpm m:up
```

### Start development server

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
pnpm build
```

> You can preview the built app with `pnpm preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.
