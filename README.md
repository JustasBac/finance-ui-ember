# Finance UI app

This repository contains the frontend code for a Finance App built using Ember.js, styled with Tailwind CSS, and utilizing Highcharts for data visualization. It utilizes Yarn as the package manager and includes Highcharts for data visualization

## Prerequisites

- [Git](https://git-scm.com/)
- [Node (16 or higher)](https://nodejs.org/)
- [Ember CLI](https://cli.emberjs.com/release/)
- Yarn

## Getting started

- `git clone <this-repository-url>`
- `cd finance-ui-ember`
- `yarn install`

## Configuration (ENV variables)

```bash
cp .dist-env-development .env-development
cp .dist-env-production .env-production
```

## Running the Application

To run the application locally, use the following command:

```bash
ember serve
```

This will start a development server, and you can access the application in your web browser at `http://localhost:4200`

## Building Tailwind CSS

To generate the Tailwind CSS classes, you can use the following command:

```bash
yarn:tailwind:build
```

This command will process your Tailwind CSS configuration and generate the necessary CSS file.

## Tracking Tailwind CSS Classes

To track Tailwind CSS classes in your application, you can use the following command:

```bash
yarn tailwind:watch
```

This command will analyze your application code and generate a report of the used and unused Tailwind CSS classes.

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

## Using Highcharts

The Finance App frontend utilizes Highcharts for data visualization. You can refer to the [Highcharts documentation](https://www.highcharts.com/docs/index) for detailed information on how to create and customize charts.
