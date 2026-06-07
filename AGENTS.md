# Real Linkings workflow

## Automatic deployment

When changing the website's visual design or page content:

1. Run `npm run build`.
2. Run `npm run lint`.
3. Commit the completed change with a clear Spanish commit message.
4. Push the `main` branch to `origin`.
5. Verify that https://real-linkings.vercel.app/ responds correctly.

Do not leave visual or content changes only on the local machine unless the
user explicitly asks not to publish them.

Vercel deploys automatically from:

- Repository: https://github.com/adrianlopezgarrido12-prog/real-linkings
- Branch: `main`
- Public website: https://real-linkings.vercel.app/
