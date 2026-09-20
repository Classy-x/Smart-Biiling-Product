# Smart Billing Product

A simple React + TypeScript billing application that allows users to select products, apply special offers, and calculate the final bill.

## Features

* Product selection
* Add and remove products from the cart
* Quantity management
* Subtotal calculation
* Special offers and discounts
* Individual savings display
* Final bill calculation
* Redux Toolkit for state management
* Unit tests using Vitest
* Responsive UI
* Firebase deployment

## Tech Stack

* React
* TypeScript
* Redux Toolkit
* Vite
* Bootstrap
* Tailwind CSS
* Vitest
* Firebase Hosting

## Getting Started

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd Smart-Biiling-Product
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the application

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Run Tests

```bash
npm run test
```

## Create Production Build

```bash
npm run build
```

The production files will be generated inside the `dist` folder.

## Firebase Deployment

Build the application first:

```bash
npm run build
```

Then deploy:

```bash
firebase deploy
```

## Project Structure

```text
src/
├── components/     # React components
├── data/            # Product data
├── store/           # Redux store and slices
├── types/           # TypeScript types
├── utils/           # Billing calculation logic
├── tests/           # Unit tests
├── App.tsx
└── main.tsx
```

## Billing

The application supports different types of offers, including:

* Buy X Get Y Free
* Percentage Discount
* Half Price Offer
* No Offer

The bill displays:

1. Subtotal before offers
2. Applied offers
3. Individual savings
4. Total savings
5. Final total

## Deployment

The application is deployed using Firebase Hosting.
