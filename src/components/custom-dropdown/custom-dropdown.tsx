import { Component, h, ComponentInterface, Host, Prop, State } from '@stencil/core';
import clsx from 'clsx';

@Component({
  tag: 'custom-dropdown',
  styleUrl: 'custom-dropdown.css',
  shadow: true,
})
export class CustomDropdown implements ComponentInterface {
  @Prop() label: string;
  @State() active: boolean = false;

  private toggleDropdown = () => {
    this.active = !this.active
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();
    if (['Enter', ' '].includes(event.key)) {
      this.toggleDropdown();
    }
  };

  render() {
    return (
      <Host>
        <form>
          <label htmlFor={this.label}>{this.label}</label>
          {/* <button */}
          {/* id={this.label}
          role="combobox" value="Select" aria-controls={`listbox-${this.label}`}
          aria-haspopup={`listbox-${this.label}`}
          tabindex="0" aria-expanded="false" type="button" */}
          {/* > */}
          <span class="search-wrapper">
            <input
              class="search"
              type="text"
              placeholder="Select"
              id={this.label}
              role="combobox"
              // value="Select"
              aria-controls={`listbox-${this.label}`}
              aria-haspopup={`listbox-${this.label}`}
              tabindex="0"
              aria-expanded={this.active.toString()}
              onKeyDown={this.handleKeyDown}
              // type="button"
            />
          </span>
          {/* </button> */}
          <ul class={clsx('options', { active: this.active })} role="listbox" id={`listbox-${this.label}`}>
            <slot></slot>
          </ul>
        </form>
      </Host>
    );
  }
}
