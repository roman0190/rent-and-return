This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
# Rent & Return

A modern rental marketplace web app built with Next.js, TypeScript, shadcn/ui, and i18n support for English, Bengali, and Hindi.

## Preview

[Live Demo](https://rent-return-demo.vercel.app) (Replace with your actual deployed URL)

## Features
- Browse, search, and filter rental items
- Add, edit, and manage your own items
- Location-based item discovery
- Ratings, reviews, and item statistics
- Responsive UI with shadcn/ui components
- Multi-language support (en, bn, hi)
- Modern design and UX

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Add shadcn/ui components
To add new UI components:
```bash
npx shadcn-ui@latest add <component>
```

## Project Structure
```
client/
├── src/
│   ├── app/           # Next.js app routes
│   ├── components/    # UI and shared components
│   ├── context/       # React contexts
│   ├── i18n/          # i18n config and translations
│   ├── lib/           # Static data (items.json, utils)
│   └── public/        # Static assets
├── package.json
├── README.md
└── ...
```

## Data Model
- All items are stored in `src/lib/items.json`.
- Each item includes fields for title, description, category, images, price, priceUnit, condition, owner (English & Bangla), location, available, rating, ratingCount, views, rentals, etc.

## Localization
- Language switcher available in the UI
- Add new translations in `src/i18n/languages/`

## Customization
- Update UI components in `src/components/ui/`
- Add new pages/routes in `src/app/`
- Modify item data in `src/lib/items.json`

## License
MIT

---
Made with ❤️ by roman0190
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
