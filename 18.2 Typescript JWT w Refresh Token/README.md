# Session based Auth w React - Node

## Getting Started

To get started with this project, follow the steps below for both the frontend and backend components.

### Keys Generation

Note: That would require openssl in your system

```shell
ssh-keygen -t rsa -b 4096 -m PEM -f private.pem
# Don't add passphrase
openssl rsa -in private.pem -pubout -outform PEM -out public.pem
```

Or run the script in backend directory

```sh
pnpm keys
```

---

### Frontend

Navigate to the `frontend` directory:

```bash
cd frontend
```

Install dependencies using pnpm:

```bash
pnpm i
```

Run the development server:

```bash
pnpm dev
```

Now, you can access the frontend application @ [Dev Server](http://localhost:5173)

## Backend

Open a new terminal for the backend setup.

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies using pnpm:

```bash
pnpm i
```

Run the backend development server:

```bash
pnpm dev
```

The backend server should now be running.

---

```js
declare global {
  namespace Express {
    interface Request {
      user?: string;
      role?: string;
    }
  }
}
```

> This is done to provide type safety of the req param
