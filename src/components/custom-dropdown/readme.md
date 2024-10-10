# custom-dropdown



<!-- Auto Generated Below -->


## Overview

Custom dropdown component with built in optional search. Should be used along with custom-option components simiarly
to the native browser select element

## Properties

| Property | Attribute | Description              | Type     | Default     |
| -------- | --------- | ------------------------ | -------- | ----------- |
| `label`  | `label`   | Label above the dropdown | `string` | `undefined` |


## Events

| Event            | Description                                               | Type                  |
| ---------------- | --------------------------------------------------------- | --------------------- |
| `changeDropdown` | Fires whenever the value of the dropdown changes          | `CustomEvent<string>` |
| `changeFilter`   | Fires whenever the value of the input changes (debounced) | `CustomEvent<string>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
