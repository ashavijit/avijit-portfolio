# Avijit Sen — Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

Personal portfolio for **Avijit Sen** — Software Engineer at Hoichoi. Built with Next.js App Router, TypeScript, Tailwind CSS 4, MDX and Framer Motion.

## Quick Start

```bash
npm install
npm run dev          # http://localhost:3000
```

## Where the content lives

Everything personal is centralised — you rarely need to touch the components.

| What | File |
| --- | --- |
| Name, role, bio, socials, education, GitHub accounts | `lib/site.ts` |
| Work experience | `components/timeline.tsx` (`roles` array) |
| Projects | `components/projects.tsx` (`projects` array) |
| Skills | `components/skills.tsx` (`groups` array) |
| Blog posts | `data/*.mdx` |
| Generated cover art | `public/covers/` (regenerate with the scripts noted below) |

## Environment Variables

Create `.env.local` in the project root:

```env
# Enables the Pull Requests feed (GitHub GraphQL API).
# Client-side, so it ships to the browser — use a no-scope classic PAT.
NEXT_PUBLIC_GITHUB_TOKEN=your_github_personal_access_token
```

Without it the contribution calendars still render; the PR list shows a hint instead.

## GitHub accounts

The "Proof Of Work" section reads from both accounts declared in `lib/site.ts`:

- `ashavijit` — personal / open source
- `avijit213` — work (@Hoichoi)

The calendar has a Personal/Work switcher; the PR feed queries both authors at once.

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment

Deploy on Vercel: import the repo, set `NEXT_PUBLIC_GITHUB_TOKEN`, deploy.


## License

MIT.
