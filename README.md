# Aurora Atelier - Paint App 🎨
**Aurora Atelier** is a simple yet powerful paint app featuring an interactive canvas for drawing, with options to **save** your creations. It integrates **Clerk** for authentication, ensuring secure sign-ins and **user management**. Perfect for **creative projects** with seamless login and save functionality.

This is a [React](https://reactjs.org/) project created with [Vite](https://vitejs.dev/), a fast and lightweight build tool. The app leverages Vite's blazing-fast development experience to deliver high-performance React applications, designed to provide a simple and intuitive digital painting experience.

## Project Setup

To get started, follow these steps:

**Clone the repository**:
```bash
 git clone https://github.com/binayakbartaula11/aurora-atelier.git
```

**Install dependencies**:
```bash
npm install
```
This will install all necessary packages for the project.

---

## Clerk Authentication Setup

To enable authentication with Clerk, you need to set up your Clerk API keys. After cloning the repository, follow these steps:

1. Create a .env.local file in the root directory of the project.
2. Add your Clerk API keys to the .env.local file. You can get your keys by signing up at [Clerk](https://clerk.com/) and creating an app there. Then, add the following variables:
```bash
VITE_CLERK_API_KEY=<your-clerk-api-key>
```
Make sure to replace <your-clerk-api-key> with your actual Clerk API values.

3. Now, you can continue with the following steps to run the app.

---

## Running the Development Server

To start the development server, run the following command:
```bash
npm run dev
```
This will launch the application locally at [http://localhost:3000](http://localhost:3000/). The Vite development server supports fast hot-module reloading, allowing you to see changes instantly in the browser.

## Development Flow

The project is set up for smooth and efficient development. You can begin modifying the files within the src directory. Vite handles fast updates through its Hot Module Replacement (HMR) feature, enabling an interactive development experience.

## Project Initialization

In case you need to reset the project, use the following command to restore the default state:
```bash
npm run reset
```
This command will move the current code to a backup folder (src-example) and create a new empty src directory, giving you a clean slate to work with. Alternatively, you can create a new Vite project by running:
```bash
npm create vite@latest
```
During Setup:
- Project Name: Choose a name for your project.
- Template Selection: Select a template based on the framework you want to use. For example, choose react for a React project.

---

# Key Features

- 🎨 **Simple Paint Tools**: Draw freely with a brush, adjustable line thickness, and colors.
- ⚡ **Fast Development**: Vite provides an incredibly fast development environment with instant Hot Module Replacement (HMR), ensuring rapid feedback during development.
- 🚀 **Optimized Builds**: Vite offers optimized production builds, utilizing techniques like tree-shaking and code-splitting to reduce bundle size.
- 🧑‍💻 **React 18 Support**: Built with the latest React version, including advanced features such as Suspense and Concurrent Rendering, enabling smoother UI experiences.
- 🎨 **CSS Support**: Out-of-the-box support for CSS, CSS modules, and pre-processors like SCSS, allowing you to customize your app’s styling easily.
- 🛠️ **TypeScript Support**: Fully supports TypeScript, ensuring a type-safe development experience for better code quality and maintainability.
- ✍️ **Canvas Drawing**: A fully interactive canvas for users to draw with their mouse or touch gestures.
- 💾 **Save**: Ability to save your creations as images.

---

## Live Demonstrations 🌐

Want to dive straight into the action? You can experience the live version of **Aurora Atelier** hosted on [Explore Demo](https://paintwithaurora.vercel.app). Unleash your creativity, create digital art, and share your masterpieces! 🎨✨

---

## React + Vite Configuration

This template provides a minimal setup to get React working in Vite with Hot Module Replacement (HMR). You can enhance your development experience by using official Vite plugins:

- `@vitejs/plugin-react` - Uses Babel for Fast Refresh.
- `@vitejs/plugin-react-swc` - Uses SWC for Fast Refresh.
Expanding ESLint Configuration For a production application, it’s recommended to enable type-aware lint rules in ESLint. Follow these steps to configure:

1. Configure the parserOptions in ESLint:
```javascript
export default {
  parserOptions: {
    ecmaVersion: 2021,   // Support for modern JavaScript
    sourceType: 'module', // Enable ES modules
    ecmaFeatures: {
      jsx: true,          // Enable JSX parsing
    },
  },
}
```
2. Install and configure eslint-plugin-react:
```bash
npm install eslint-plugin-react --save-dev
```
```javascript
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the React version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the React plugin
    react,
  },
  rules: {
    // Enable recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
3. Optional Custom Rules: Add additional custom rules or stylistic configurations to enforce a consistent code style across your project.

---

##  Learn More

For in-depth knowledge and guides, refer to the following resources:
- **[Vite Documentation](https://vite.dev/)**: Explore the core concepts of Vite, its features, and advanced configurations.
- **[React Documentation](https://legacy.reactjs.org/docs/getting-started.html)**: Learn how to build interactive UIs using React.
- **[Vite + React Template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)**: Discover how Vite integrates with React and benefits your development workflow.

---

## Join the Community

Explore these communities and get involved in the broader ecosystem of Vite and React development:
- **[Vite GitHub Repository](https://github.com/vitejs/vite)**: Explore the open-source Vite repository and contribute.
- **[React GitHub Repository](https://github.com/facebook/react)**: The source code for React and its community-driven development.
- **[Vite Discord](https://discord.com/invite/vitejs)**:  Join the Vite Discord server for discussions, help, and sharing knowledge.
- **[React Community Support](https://reactjs.org/community/support.html)**: Access resources and channels for React-related support and discussions.
