# Anchor 

This is the official monorepo for Anchor during the Winter 2026 semester

# Project description

Add a brief project description here. A logo or screenshot would be also nice.

## Team Members

- Alessandro Bongiorno: Fullstack Developer
- Trevor Lee: Fullstack Developer
- Isaac Lopez: Fullstack Developer

## Getting Started

### Requirements

```
node >= 18
npm >= 10.9.2
```

### Overview

This project was built using expo and react native, meaning that this app can work on most platforms including
ios, android, and the web.


### Local Deployment 
To run the application locally using an emulator you can follow these steps:

```bash
  
 npm run dev 

```
In your terminal this will bring up a tui which can be used to select which kind of emulator you want to 
use.

>[!NOTE] 
>If you are using a mac, you can use the xcode emulator for apple devices




## Testing 
For this project we are using [jest](https://jestjs.io/) as our testing suite of choice. 

Under **__tests__** we contain all of our unit tests and it contains the following structure
```
__tests__
├── components
├── convex
├── hooks
└── test.tsx
```
To create a new test do the following:
1. Inside of the appropriate folder create a new file `<filename>.test.tsx`
2. Make sure to import the `@testing-library/react-native` library.
3. `describe` is how we label the testing suite inside the file, then  `it` is the actual test you wish to run


To run your tests:

```bash

npm run test

```

for verbose outputs:

```bash

npm run test -- --verbose
``
