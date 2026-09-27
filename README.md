# Seunpaul Fiverr Portfolio — Dashboard Edition

This version turns the static portfolio into a small portfolio CMS.

## What changed

- Public portfolio at `/`
- Private dashboard at `/dashboard`
- Password-protected admin login
- PostgreSQL storage for projects and site settings
- Add, edit, publish/hide, reorder and delete projects without touching page source code
- Change headline, Fiverr URL, stats, SEO site URL and Google Search Console token from the dashboard
- Every project supports a CSS animation, image URL, or MP4/WebM video URL
- Dynamic `robots.txt` and `sitemap.xml`
- SEO metadata and Person structured data remain dynamic

## Local setup

1. Install Node.js 24.x or a current Node release supported by the chosen Next.js version.
2. Create a PostgreSQL database.
3. Copy `.env.example` to `.env.local`.
4. Fill in `DATABASE_URL`, `ADMIN_PASSWORD`, `ADMIN_SECRET`, and `NEXT_PUBLIC_SITE_URL`.
5. Run:

```powershell
npm install
npm run db:push
npm run db:seed
npm run dev
```

6. Open `http://localhost:3000` for the portfolio.
7. Open `http://localhost:3000/dashboard` to manage content.

## Dashboard workflow

To add another portfolio item:

`Dashboard → Projects → + Add project → fill fields → Save changes`

The project then appears on the public homepage in the order shown by the dashboard.

Use the up/down buttons to change its position. Use Hide/Publish to control whether visitors can see it.

## Video projects

For a project that has a real demo recording, select `Video / MP4 / WebM` and paste a public video URL in the Video URL field. The portfolio will render it automatically.

For an image-based project, choose `Image` and paste the public image URL.

## Vercel + PostgreSQL

The app is designed for a Vercel deployment with PostgreSQL. Add the same environment variables in the Vercel project, connect your PostgreSQL provider, run the schema setup once, then deploy.

Recommended environment variables:

- `DATABASE_URL`
- `ADMIN_PASSWORD`
- `ADMIN_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- `GOOGLE_SITE_VERIFICATION`

## Search Console

After the real domain is live:

1. Put the Google verification token in the dashboard under Site settings, or set `GOOGLE_SITE_VERIFICATION` before seeding.
2. Deploy.
3. Add the domain/URL-prefix property in Google Search Console.
4. Verify ownership.
5. Submit `/sitemap.xml`.

## Security note

This is intentionally a simple personal-admin CMS. Use a long random `ADMIN_SECRET` and a strong `ADMIN_PASSWORD`. Never commit `.env.local`.
