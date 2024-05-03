# Start using remote backend

- Clone the repo and move to the cloned directory and install dependencies.

```bash
git clone https://github.com/dtutimes/frontend_rm_v2.git nix_frontend
cd nix_frontend
npm i # or yarn or pnpm whatever u like
```

- Copy `.env` file to `.env.local` file in the root of the repo

```bash
cp .env .env.local
```

- Edit this file and change the env variable to `VITE_NIX_BACKEND="https://team.dtutimes.com/api/v1"`
- Start dev mode `npm run dev`

---

# Start using localhost backend

- Clone the repo and move to the cloned directory and install dependencies.

```bash
git clone https://github.com/dtutimes/frontend_rm_v2.git nix_frontend
cd nix_frontend
npm i
```

- Clone and [initialise the backend repo](https://github.com/dtutimes/Backend_v2/)
- Start dev mode `npm run dev`

---
