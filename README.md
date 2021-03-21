# Razzle TypeScript Example

## Live version

https://razzle-weather-app.vercel.app/
https://razzle-weather-app.vercel.app/?city=Milan

## Usage

```
yarn start
```

## Features

- SSR
- Reverse proxy for client side weather requests
- Detect current city using geolocation
- Display the city name, current weather icon, temperature, humidity and wind speed
- Background color changes based on the temperature
- Load a specific city using the query string `?city=Milan`
- Caches the API in session storage and auto refreshes data after 5 minutes
- Compatible with IE11

<!-- START install generated instructions please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN yarn update-examples TO UPDATE -->Create and start the example:

```bash
npx create-razzle-app --example with-typescript with-typescript

cd with-typescript
yarn start
```

<!-- END install generated instructions please keep comment here to allow auto update -->

## Idea behind the example

This is an of how to use Razzle with [TypeScript](https://github.com/Microsoft/TypeScript).

Basic razzle will uses Babel to transform TypeScript to plain JavaScript ( with babel-loader ), and uses TypeScript for type-checking.

Razzle knows how to resolve `.ts` and `.tsx` files out of the box.
