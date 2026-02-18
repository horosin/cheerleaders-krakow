# AGENTS

## Project description
- Next.js static export app for a cheerleading team in Kraków, Poland.
- Girly, feminine color scheme.

## Technical guidelines
- Uses shadcn/ui component system.
- Uses TypeScript for type safety.
- Uses PagesCMS for content management, so everything is stored in markdown files under `content/`. We use frontmatter for metadata.
- Whenever you are changing markdown format or structure, update `.pages.yml` accordingly.
- Deployed on GitHub Pages with custom domain.
- Uses GitHub Actions for CI/CD.
- Ignore next/image warnings, because it's a static export.

## Main pages
- Home page: `/`
- News (Aktualności): `/news`
- Championship (Mistrzostwa): `/championship`

Championship content will be in both Polish and English. 

Reference design for all things is in static-mocks/


## Required commands (run after every change)
- `npm run lint`
- `npm test`
- `npm run build`

## UI component system
This project uses [shadcn/ui](https://ui.shadcn.com/) components stored under `src/components/ui`.

### Adding new shadcn/ui components
From the repository root, run:

```bash
npx shadcn-ui@latest add <component>
```

This will generate component files in `src/components/ui` and update any required dependencies. Prefer importing these components via the `@/components/ui/*` path.

