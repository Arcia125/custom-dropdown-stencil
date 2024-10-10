import { Component, h, ComponentInterface, Host, Prop, State, Listen, Element, Event, EventEmitter } from '@stencil/core';
import clsx from 'clsx';
import { Option } from '../../utils/models';

@Component({
  tag: 'custom-dropdown',
  styleUrl: 'custom-dropdown.css',
  shadow: true,
})
export class CustomDropdown implements ComponentInterface {
  @Prop() label: string;
  @State() active: boolean = false;
  @State() selectedOption: Option;
  @State() filter: string = '';
  @Element() el: HTMLElement;
  @Event() changeFilter: EventEmitter<string>;

  @Listen('click', { target: 'document' })
  handleDocumentClick(event: MouseEvent) {
    if (!this.active) {
      return;
    }
    if (!this.el.contains(event.target as Node)) {
      this.active = false;
    }
  }

  @Listen('selectOption')
  handleSelectOption(event: CustomEvent<Option>) {
    this.selectedOption = event.detail;
  }

  private toggleDropdown = () => {
    this.active = !this.active
  };

  @Listen('keydown')
  handleKeyDown (event: KeyboardEvent) {
    if (['Enter', ' '].includes(event.key)) {
      event.preventDefault();
      this.toggleDropdown();
    }
    if (this.active && event.key === 'Escape') {
      this.active = false;
    }
  };

  handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.filter = value;
    this.changeFilter.emit(this.filter);
  }

  render() {
    return (
      <Host>
        <form>
          <label htmlFor={this.label}>{this.label}</label>
          <span class="search-wrapper">
            <input
              class="search"
              type="text"
              placeholder="Select"
              id={this.label}
              role="combobox"
              aria-controls={`listbox-${this.label}`}
              aria-haspopup={`listbox-${this.label}`}
              tabindex="0"
              aria-expanded={this.active.toString()}
              onClick={this.toggleDropdown}
              onInput={this.handleInput}
              value={this.filter}
            />
          </span>
          <ul class={clsx('options', { active: this.active })} role="listbox" id={`listbox-${this.label}`}>
            <slot></slot>
          </ul>
        </form>
      </Host>
    );
  }
}
