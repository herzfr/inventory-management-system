# Inventory Management System (IMS)
###### Desciption Project

This project aims to develop an Inventory Management System (IMS) for small retail businesses using Angular. IMS will simplify the inventory management process, increase accuracy, and improve user experience.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.2.

Under [Node.JS](https://nodejs.org/en) version 16.20.1.
With [NPM](https://nodejs.org/en) version 9.8.0.

### Install Node Module
```bash
npm install

#optional
| npm install | npm install --force | npm install --legacy-peer-deps
```

### Running Server
```bash
npm run server
```

### Running Angular
```bash
ng serve

#optional
npm run start
```

### Username & Password
```bash
{
    "users": [
    {
      "username": "adriana",
      "password": "123456",
      "roles": ["admin", "staff"],
      "name": "Adriana Romana"
    },
    {
      "username": "john",
      "password": "654321",
      "roles": ["admin"],
      "name": "John Doe"
    },
    {
      "username": "evan",
      "password": "123123",
      "roles": ["staff"],
      "name": "Evan Smith"
    }
}
````

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Project Structure /src directory
```bash
src/
├── app/
│   ├── core/                 # Core module (singleton services, etc.)
│   │   ├── services/
│   │   ├── interceptors/
│   │   └── guards/
│   ├── features/             # Feature modules
│   │   ├── inventory/
│   │   └── login/
│   │   └── sales/
│   │   └── supplier/
│   ├── shared/               # Shared module (common components, pipes, directives)
│   ├── assets/               # Static assets (images, icons, etc.)
│   ├── environments/         # Environment-specific configuration
│   ├── app-routing.module.ts # App-level routing module
│   ├── app.component.html    # Root component template
│   ├── app.component.ts      # Root component class
│   └── app.module.ts         # Root module
├── assets/                   # Global static assets
├── environments/             # Environment configuration files
├── favicon.ico
├── index.html                # Main HTML file
├── main.ts                   # Main entry point
├── polyfills.ts              # Polyfills for browser compatibility
├── styles.scss               # Global styles
├── test.ts                   # Test entry point
└── tsconfig.app.json         # TypeScript configuration for the app

```

## Plugin
| Plugin | Source |
| ------ | ------ |
| Angular Material v16 | [https://v16.material.angular.io/][PlDb] |
| Apex Chart | [https://apexcharts.com/][PlGh] |
| JSON Server | [https://www.npmjs.com/package/json-server][PlGd] |

