# Studyverse

A focused study environment where you can join and study with friends. Studyverse provides themed study rooms, ambient sounds, and productivity tools to enhance your study sessions.

## Features

- **Multiple Study Environments**: Choose from library, café, minimalist, forest, or night study themes
- **Customizable Colors**: Personalize your experience with custom accent colors
- **Audio Controls**: Toggle lofi music and rain sounds for better focus
- **Task Management**: Keep track of your study tasks with the built-in task list
- **Pomodoro Timer**: Use the timer for focused study sessions
- **Social Features**: Study with friends in shared rooms

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Deployment**: Vercel
- **Authentication**: Simple cookie-based auth (can be extended)
- **State Management**: React Context API, localStorage

## Deployment on Vercel

### Prerequisites

- GitHub account
- Vercel account (free tier available)

### Deployment Steps

1. **Fork or Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/studyverse.git
   cd studyverse
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run Locally**

   ```bash
   npm run dev
   ```

4. **Deploy to Vercel**

   - Push your code to GitHub
   - Log in to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Keep the default settings (Vercel will auto-detect Next.js)
   - Click "Deploy"

### Environment Variables

No environment variables are required for basic functionality. For future extensions:

- `NEXT_PUBLIC_API_URL`: API URL for backend services (if added)

## Project Structure

```
studyverse/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js app router pages
│   ├── components/     # React components
│   ├── contexts/       # React context providers
│   ├── lib/            # Utility functions
│   └── styles/         # Global styles
├── .gitignore
├── next.config.ts      # Next.js configuration
├── package.json
├── README.md
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── vercel.json         # Vercel deployment configuration
```

## Extending the Project

### Adding a Database

For persistent data storage, consider adding:

1. **Vercel KV**: For simple key-value storage
   ```bash
   npm install @vercel/kv
   ```

2. **Vercel Postgres**: For relational data
   ```bash
   npm install @vercel/postgres
   ```

3. **MongoDB Atlas**: For document-based storage
   ```bash
   npm install mongodb
   ```

### Adding Authentication

For more robust authentication:

1. **NextAuth.js**: For social logins and more
   ```bash
   npm install next-auth
   ```

2. **Clerk**: For complete auth solution
   ```bash
   npm install @clerk/nextjs
   ```

## License

MIT

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Vercel](https://vercel.com)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Unsplash](https://unsplash.com/) for placeholder images
