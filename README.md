# My T3 Social App

This is a social application built with the [T3 Stack](https://create.t3.gg/), demonstrating core functionalities like user authentication, post management, and friend relationships. It serves as a study project to explore modern web development best practices with Next.js, tRPC, Drizzle ORM, and NextAuth.js.

## Key Features

-   **User Authentication:** Secure user authentication powered by NextAuth.js, supporting Discord provider, with improved UI/UX for seamless login and logout experiences.
-   **Post Management:** Users can create, view, and delete their posts. Posts include both a title and a body, with client-side validation ensuring data integrity.
-   **Friends Functionality:** Establish one-way friend relationships between users and view a comprehensive list of your connections.
-   **Modern UI/UX:** A responsive and intuitive user interface built with Tailwind CSS, featuring smooth page transitions powered by the native View Transition API for an enhanced user experience.

## Technologies Used

This project is built upon the robust [T3 Stack](https://create.t3.gg/) and leverages the following key technologies:

-   [Next.js](https://nextjs.org): A React framework for building full-stack web applications.
-   [NextAuth.js](https://next-auth.js.org): Flexible authentication for Next.js apps.
-   [Drizzle ORM](https://orm.drizzle.team): A modern TypeScript ORM for type-safe database interactions.
-   [PostgreSQL](https://www.postgresql.org/): A powerful, open-source relational database system.
-   [Tailwind CSS](https://tailwindcss.com): A utility-first CSS framework for rapid UI development.
-   [tRPC](https://trpc.io): End-to-end typesafe APIs made easy.
-   [Zod](https://zod.dev/): TypeScript-first schema declaration and validation library.
-   [Bun](https://bun.sh/): A fast all-in-one JavaScript runtime, bundler, transpiler, and package manager.
-   [@tanstack/react-query](https://tanstack.com/query/latest): Powerful asynchronous state management for React, used by tRPC for data fetching.


## Getting Started

Follow these steps to get your development environment set up and running.

### Prerequisites

Make sure you have the following installed:

-   [Node.js](https://nodejs.org/en/download/) (LTS version recommended)
-   [Bun](https://bun.sh/docs/installation) (v1.1.0 or later recommended)
-   [PostgreSQL](https://www.postgresql.org/download/) (or a compatible PostgreSQL database service)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git # Replace with your actual repo
    cd your-repo-name # Replace with your actual repo
    ```
2.  Install dependencies using Bun:
    ```bash
    bun install
    ```

### Environment Variables

Fill in the following environment variables in the  `.env` file:

-   `DATABASE_URL`: Your PostgreSQL connection string (e.g., `postgresql://user:password@localhost:5432/mydatabase`)
-   `AUTH_SECRET`: A long, random string used to sign the session cookie. You can generate one with `openssl rand -base64 32`.
-   `AUTH_DISCORD_ID`: Your Discord OAuth client ID.
-   `AUTH_DISCORD_SECRET`: Your Discord OAuth client secret.

### Database Setup

1.  Ensure your PostgreSQL database is running and accessible via the `DATABASE_URL`.
2.  Push the Drizzle ORM schema to your database:
    ```bash
    bun run db:push
    ```

### Running the Development Server

Start the Next.js development server:

```bash
bun run dev
```

The application will be accessible at `http://localhost:3000`.

## Project Structure

This project follows a standard Next.js App Router structure, with a focus on modularity for tRPC and Drizzle ORM. Key directories include:

-   `src/app`: Contains Next.js App Router pages, layouts, and client components.
-   `src/server/api`: Houses tRPC routers, defining your API endpoints.
-   `src/server/auth`: NextAuth.js configuration for authentication.
-   `src/server/db`: Drizzle ORM schema definitions and database connection setup.
-   `src/trpc`: Client-side tRPC setup and utilities.
-   `src/styles`: Global CSS styles, including Tailwind CSS imports.
-   `src/env.js`: Typesafe environment variable validation using Zod.
-   `src/app/_components`: Reusable client components, including `AuthStatusDisplay` and `TransitionLink`.
