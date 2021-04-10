# Weather App

The Weather App is a simple application built do display the weather of your current location detected by using the Geolocation API or the weather of a list of comma separated cities passed in the `city` query parameter.

## Motivation

The application was built to showcase the knowledge of JavaScript/TypeScript, Razzle/SSR, Redux, Express, API requests and general coding skills.

## Screenshots

[![Screen-Shot-2021-04-10-at-10-57-03.png](https://i.postimg.cc/CKynH5Jr/Screen-Shot-2021-04-10-at-10-57-03.png)](https://postimg.cc/18Hzy9kD)

## Live version

https://weather-app-sickdyd.vercel.app/

https://weather-app-sickdyd.vercel.app/?city=Milan,Paris,Helsinki,Vancouver

## Tech

- Razzle
- TypeScript / JavaScript
- Redux
- Emotion
- Express
- Axios

## Weather data

- https://openweathermap.org/

## Icons

- https://erikflowers.github.io/weather-icons/

## Usage

Start the server:

```
yarn start
```

Run tests

```
yarn test
```

Run the linter:

```
yarn lint
```

Typecheck

```
yarn typecheck
```

## Features

- SSR
- Reverse proxy for client side weather requests
- Detect current city using geolocation
- Display the city name, current weather icon, temperature, humidity and wind speed
- Background color changes based on the temperature
- Humidity icon size changes depending on humidity value
- Load a specific list of cities using comma separated names within the city query string param, ie `?city=Milan,Rome,Florence`
- Automatically rotate weather information on multiple cities every 5 seconds
- Caches the API in session storage and auto refreshes data after 5 minutes
- Compatible with IE11
