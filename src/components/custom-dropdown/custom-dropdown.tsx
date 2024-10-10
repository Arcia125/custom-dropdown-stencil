import { Component, h, ComponentInterface, Host, Prop, State, Listen, Element, Event, EventEmitter } from '@stencil/core';
import clsx from 'clsx';
import { debounce } from '../../utils/debounce';
import { Option } from '../../utils/models';

@Component({
  tag: 'custom-dropdown',
  styleUrl: 'custom-dropdown.css',
  shadow: true
})
export class CustomDropdown implements ComponentInterface {
  /**
   * Label above the dropdown
   */
  @Prop() label: string;
  /**
   * Whether or not the dropdown is open
   */
  @State() active: boolean = false;
  /**
   * The currently highlighted/focused option in the menu
   */
  @State() focusedOption: Option = null;
  /**
   * Value of the dropdown
   */
  @State() selectedOption: Option;
  /**
   * The value of the input
   */
  @State() filter: string = '';

  @Element() el: HTMLElement;

  // @Event() focusOption: EventEmitter<Option>;

  /**
   * Fires whenever the value of the input changes (debounced)
   */
  @Event() changeFilter: EventEmitter<string>;

  /**
   * Fires whenever the value of the dropdown changes
   */
  @Event() changeDropdown: EventEmitter<string>;

  /**
   * Time in milliseconds to debounce the changeFilter event
   */
  private filterDebounceMs = 200;

  @Listen('click', { target: 'document' })
  handleDocumentClick(event: MouseEvent) {
    if (!this.active) {
      return;
    }
    if (!this.el.contains(event.target as Node)) {
      this.active = false;
    }
  }

  private updateOption = () => {
    this.toggleDropdown();
    this.changeDropdown.emit(this.selectedOption.value);
  };

  @Listen('selectOption')
  handleSelectOption(event: CustomEvent<Option>) {
    this.selectedOption = event.detail;
    this.updateOption();
  }

  getVisibleOptions = () => {
    return Array.from(this.el.querySelectorAll('custom-option'));
  };

  setOptionFocus = (option: Option) => {
    const options = this.getVisibleOptions();
    const optEl = options.find((o) => o.value === option.value);
    const li = optEl?.shadowRoot.querySelector('li')
    li?.focus();
    this.focusedOption = option;
    // this.focusOption.emit(option);
  };

  focusSelectedOption = () => {
    if (this.selectedOption) {
      this.setOptionFocus(this.selectedOption);
    } else {
      this.focusNextOption();
    }
  };

  focusNextOption = () => {
    const options = this.getVisibleOptions();
    const hasFocusedOption = this.focusedOption !== null;
    const index = hasFocusedOption ? options.findIndex((o) => o.value === this.focusedOption.value) : 0;
    if (index === -1) {
      return;
    }
    if (index === options.length - 1 || !hasFocusedOption) {
      const option = options[0];
      this.setOptionFocus({ value: option.value, label: option.innerHTML });
    } else {
      const option = options[index + 1];
      this.setOptionFocus({ value: option.value, label: option.innerHTML });
    }
  }

  focusPrevOption = () => {
    const options = this.getVisibleOptions();
    const index = options.findIndex((o) => o.value === this.focusedOption.value);
    if (index === -1) {
      return;
    }
    if (index === 0) {
      const option = options[options.length - 1];
      this.setOptionFocus({ value: option.value, label: option.innerHTML });
    } else {
      const option = options[index - 1];
      this.setOptionFocus({ value: option.value, label: option.innerHTML });
    }
  }

  private toggleDropdown = () => {
    this.active = !this.active

    if (this.active) {
      this.focusSelectedOption();
    } else {
      this.el.focus();
      this.focusedOption = null;
    }
  };

  @Listen('keydown')
  handleKeyDown (event: KeyboardEvent) {
    if (['Enter', ' '].includes(event.key)) {
      event.preventDefault();
      this.selectedOption = this.focusedOption;
      this.updateOption();
    }
    if (this.active && event.key === 'Escape') {
      this.active = false;
    }

    if (this.active) {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          this.focusNextOption();
          break;
        case 'ArrowUp':
          event.preventDefault();
          this.focusPrevOption();
          break;
      }
    }
  };

  debouncedChangeFilter = debounce((filter: string) => {
    this.changeFilter.emit(filter);
  }, this.filterDebounceMs);

  handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.filter = value;
    this.debouncedChangeFilter(this.filter);
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
              value={this.selectedOption?.label || this.filter}
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
