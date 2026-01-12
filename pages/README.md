This folder is placed here to prevent Next.js from treating `src/pages` as the Pages Router directory.
In a Feature-Sliced Design (FSD) structure with Next.js App Router, we want to store our page logic in `src/pages`, but Next.js automatically looks for `src/pages` if `pages` doesn't exist in the root.
By keeping this empty `pages` folder in the root, we force Next.js to ignore `src/pages` for routing, allowing us to use `app` router exclusively while maintaining FSD structure.

[link: https://feature-sliced.design/docs/guides/tech/with-nextjs]