[![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)](https://stenciljs.com) ![NPM Version](https://img.shields.io/npm/v/%40arcia125%2Fcustom-dropdown)

# @arcia125/custom-dropdown

![Custom Dropdown Example](https://github.com/user-attachments/assets/30b74b93-2cb5-47b6-a6b9-27c4faa104d3)

## Single-Select Dropdown Component with Keyboard Navigation

[Live Demo](https://arcia125.github.io/custom-dropdown-stencil/)

This project is a Stencil.js implementation of a single-select dropdown component with keyboard navigation and optional filtering.

## Features:
- **Custom Dropdown Component**: Renders `custom-option` elements passed via a default slot.
- **Keyboard Navigation**: Navigate using the "Arrow Up" and "Arrow Down" keys, select with "Enter". Navigation wraps at the start and end of the list.
- **Single Selection**: Allows one option to be selected and highlighted.
- **Optional Filtering**: Includes a debounced input for filtering options.
- **CSS Customization**: Component appearance can be customized using CSS variables.
- **Accessibility**: Includes the proper ARIA roles and properties for accessibility.

## Installation

```bash
npm i @arcia125/custom-dropdown
```

## Usage

The component can be with frameworks or in vanilla HTML.

### React
```tsx
import '@arcia/custom-dropdown';

function App() {
  return (
    <div>
      <custom-dropdown
        label="Color Options"
        onChangeDropdown={(event) => console.log(event.detail)}
      >
        <custom-option value="white">White</custom-option>
        <custom-option value="white-titanium">White Titanium</custom-option>
        <custom-option value="black">Black</custom-option>
        <custom-option value="black-titanium">Black Titanium</custom-option>
        <custom-option value="teal">Teal</custom-option>
        <custom-option value="pink">Pink</custom-option>
      </custom-dropdown>
    </div>
  );
}

export default App;

```

### HTML

```html
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/@arcia125/custom-dropdown@0.5.0/dist/index.js"></script>
  </head>
  <custom-dropdown label="Color Options">
    <custom-option value="white">White</custom-option>
    <custom-option value="white-titanium">White Titanium</custom-option>
    <custom-option value="black">Black</custom-option>
    <custom-option value="black-titanium">Black Titanium</custom-option>
    <custom-option value="teal">Teal</custom-option>
    <custom-option value="pink">Pink</custom-option>
  </custom-dropdown>
  <script>
    const customDropdown = document.querySelector('custom-dropdown');
    customDropdown.addEventListener('changeDropdown', console.log);
  </script>
</html>
```

## Known Issues

Flash of Unstyled Content (FOUC): Can be fixed by adding a style block in the HTML file to ensure styles load correctly before content is displayed.
```html
<style>
  :not(:defined) {
    visibility: hidden;
  }

</style>
```


## Customization and enabling Dark/Light mode

Add these styles to your application to enable Dark mode.
```html
<style>
  @media (prefers-color-scheme: dark) {
    :root {
      --custom-dropdown-background-color: #2C2C2E;
      --custom-option-background-color-hover: #3A3A3C;
      --custom-option-background-color-focus: #48484A;
      --custom-dropdown-font-color: #F5F5F7;
    }
    body {
      background-color: #1C1C1E;
    }
  }
</style>
```

## Local Development

running the demo:

```bash
npm install
npm start
```

To build the component for production, run:

```bash
npm run build
```

To run the unit tests for the components, run:

```bash
npm run test
```

To deploy the demo to github pages run the build and commit, then run:

```bash
npm run deploy-demo
```

To deploy to npm run the build and commit, then run:
```bash
npm publish
```
