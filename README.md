# Anchor Monorepo

This is the official monorepo for Anchor during the Winter 2026 semester

## Team Members

- Alessandro Bongiorno: Fullstack Developer
- Trevor Lee: Fullstack Developer
- Isacc Lopez: Backend Developer

## Getting Started

### Requirements

```
node >= 18
npm >= 10.9.2
uv >= 0.9.21
python >=3.14
```

As mentioned before this is a monorepo created using [turborepo](https://turborepo.dev/docs/getting-started) this project features two main applications

### Frontend Application

Built using [react native](https://reactnative.dev/docs/getting-started) and [expo](https://docs.expo.dev/)

### Backend Application

Our backend application is built using [Python](https://www.python.org/), [FastAPI](https://fastapi.tiangolo.com/), and [uv](https://docs.astral.sh/uv/)

### Local Deployment

On a fresh clone of this repo you will need to run:

```
npm install
```

To build this project we can use the following command:

```bash
npm run build
```

To run this project we can use the following command:

```bash
npm run dev
```

For us, this will launch both our **frontend and backend** services in our terminal
