L2-B5-Assignment-4-Frontend

# Book Library Frontend

A React + TypeScript frontend for managing a book library.  
Live site: [https://l2-b5-assignment-4-front.vercel.app/](https://l2-b5-assignment-4-front.vercel.app/)

## Features

- View all books
- View book details
- Create, edit, and delete books
- Borrow books and view borrow summary
- Responsive and modern UI

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Vite](https://vitejs.dev/)
- [PNPM](https://pnpm.io/)

## Project Structure

```
src/
  App.tsx
  main.tsx
  types.ts
  assets/
  components/
    layout/
  pages/
    BookDetailPage.tsx
    Books.tsx
    BorrowBook.tsx
    BorrowSummary.tsx
    CreateBook.tsx
    EditBook.tsx
    Home.tsx
  redux/
    hook.ts
    store.ts
    api/
    features/
  routes/
    index.tsx
public/
  library.png
  vite.svg
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [PNPM](https://pnpm.io/)

### Installation

```sh
pnpm install
```

### Running the Development Server

```sh
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```sh
pnpm build
```

### Linting

```sh
pnpm lint
```

## Configuration

- API endpoints and Redux slices are defined in `src/redux/`.
- Main entry point: [`src/main.tsx`](src/main.tsx)
- App root: [`src/App.tsx`](src/App.tsx)

## License

MIT

---

_This project was created as part of an assignment._
