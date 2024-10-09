import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'custom-dropdown',
  styleUrl: 'custom-dropdown.css',
  shadow: true,
})
export class CustomDropdown {
  // /**
  //  * The first name
  //  */
  // @Prop() first: string;

  // /**
  //  * The middle name
  //  */
  // @Prop() middle: string;

  // /**
  //  * The last name
  //  */
  // @Prop() last: string;

  render() {
    return <div>Hello, World!</div>;
  }
}
