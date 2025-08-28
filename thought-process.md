
So, for this project, I have decided to dive into the best practices within this environment. That being tRPC, Drizzle with PostgreSQL and NextAuth.js. 

This project also consists in a study to demonstrate my ability to absorb new skills in a short period of time. So, starting with that, I've prepared a study regarding both the server and the client side of this project architecture.

Firstly, in the server side, the tRPC router `server/api/routers/post.ts` for the procedures which can be protected. The parameters are all inserted into context and are type checked with zod inferences.  

The Drizzle ORM database schema in `server/db/schema.ts` defines the tables, indexes and relations. From the initial `bun create-t3-app-`, since I have opted for the most recent and optimized technologies, has already defined the users, accounts and sessions, and also their relations, for example the one-to-many relation between the users and the accounts table, where every row of the users table can relate to many rows of the accounts table, but every row of the accounts table can only relate to one row of the users table.

Also, the `server/auth/config.js` which has the configuration to enable the tRPC procedures to be called in the backend. 

Then, for the Client side, the `/src/env.js` has the environment variables and makes the validation with Zod as well. Then I went to the tRPC client setup, which consists in 3 main files. Firstly, the `react.tsx` which is a client component that imports the App Router and defines the api with the AppRouter type to get all the tRPC procedures defined previously. This is why tRPC shines here. This way, it is not necessary to make API calls directly through HTTP, but instead we havethis channel of conversation between the client and the server, and Zod makes possible to have trust in this system. Further, the `/src/app/` has all the front-end routes. Then the `layout.tsx` is the root layout for all the pages, which then the Providers wraps it's children to also carry the previously configured capability of the client.

So with this study I understood how tRPC enables Next.js to create this type-safe ensured channel between the front and the backend, and the syntax that Drizzle orm (or Prisma, similar but different syntax), and how the tRPC procedures are available in the front-end, making it possible to work without the necessity of the traditional http requests.

### direct coding exercise 

After studying how the stack works, I've decided a few changes. First, create a new route for listing user's every posts. Then, create a post and [postId] pages to show the user's posts. Then, I decided to make a friends functionality, and a feed. This would exercise every part of the stack, in both client and server side.

So I got started. I will now list every step and my chain of thought.

- Create a new procedure in the postRouter "getMyPosts", a protected procedure which fetches all the posts where `createdById` matches the logged user.
- Create a posts page to show the user's posts.
- Modify the auth config to set the redirectory to /posts
- Now, a bug appeared, when I logged out, the page was being redirected to /posts as well, and this was triggering a eerror, since we had no user logged in and the posts page queries the database in a protected procedure.
- So, I removed the custom redirect. this way the app goes directly to home `page.tsx`, and then I started adding the client component with "use client", removed the `async` in the default function, since now this is a Client Component. And then  i imported`useSession`, `useRouter` and `useEffect` hooks to handle authentication, navigation and redirection.
- The useSession requires the <SessionProvider /> wrapper in the `trpc/react.tsx`. Later I have moved this provider to `layout.tsx`

At this point, The `MyPosts` page has a functional behavior.  I decided to add a user section in the top right corner of the page. For that, I have modified the `layout.tsx` to check if the user is logged in, and show the Avatar from Discord. For that, I modified `next.config.js` to allow the remote host from discord cdn to fetch the image. 

Then, continuing to the initial idea, I idealized a new schema where the column `name` would be renamed to `title`, add a new `text` field, and of course modify the previous relation to with user and the post title, instead of name. So I did that and then used `bun run db:push` and modified the client components that were fetching the post name as well.

Now, I created a friends table and it's necessary relations, defining how users can have multiple friends and be a friend to multiple users, consisting in a many-to-many relation as well, and ran successfully the schema change. At this point, I  created `/server/api/routers/friend.ts`, add it to root.ts, and implement `addFriend`and  `getFriends` procedures. 

At this point, I added a few front end features and animation between this pages. 