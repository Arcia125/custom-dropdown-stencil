import { Component, h, ComponentInterface, Host, Prop, State, Listen, Element, Event, EventEmitter } from '@stencil/core';
import clsx from 'clsx';
import { debounce } from '../../utils/debounce';
import { Option } from '../../utils/models';

/**
 * Custom dropdown component with built in optional search. Should be used along with custom-option components simiarly
 * to the native browser select element
 */
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
   * Value of the dropdown
   */
  @State() selectedOption: Option = null;

  /**
   * The value of the input
   */
  @State() filter: string = '';

  @Element() el: HTMLElement;

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

  @Listen('focus')
  handleFocus() {
    this.toggleDropdown();
  }

  @Listen('click', { target: 'document' })
  handleDocumentClick(event: MouseEvent) {
    if (!this.active) {
      return;
    }
    if (!this.el.contains(event.target as Node)) {
      this.changeActiveState(false);
    }
  }

  private updateOption = () => {
    const options = this.getVisibleOptions();
    const optEl = options.find((o) => document.activeElement === o);
    if (optEl) {
      this.selectedOption = { value: optEl.value, label: optEl.innerHTML };
    } else {
      this.selectedOption = this.selectedOption;
    }
    this.changeDropdown.emit(this.selectedOption ? this.selectedOption.value : '');
  };

  @Listen('selectOption')
  handleSelectOption(event: CustomEvent<Option>) {
    this.selectedOption = event.detail;
    this.updateOption();
    this.toggleDropdown();
  }

  getVisibleOptions = () => {
    return Array.from(this.el.querySelectorAll('custom-option'));
  };

  setOptionFocus = (option: Option) => {
    const options = this.getVisibleOptions();
    const optEl = options.find((o) => o.value === option.value);
    const li = optEl?.shadowRoot.querySelector('li')
    li?.focus();
  };

  focusSelectedOption = () => {
    if (this.selectedOption) {
      this.setOptionFocus(this.selectedOption);
    } else {
      this.focusNextOption();
    }
  };

  focusNextOption = () => {
    if (!this.active) {
      this.changeActiveState(true);
    }
    const options = this.getVisibleOptions();
    const index = options.findIndex((o) => document.activeElement === o);
    if (index === options.length - 1) {
      const option = options[0];
      this.setOptionFocus({ value: option.value, label: option.innerHTML });
    } else {
      const option = options[index + 1];
      this.setOptionFocus({ value: option.value, label: option.innerHTML });
    }
  }

  focusPrevOption = () => {
    if (!this.active) {
      this.changeActiveState(true);
    }
    const options = this.getVisibleOptions();
    const index = options.findIndex((o) => document.activeElement === o);
    if (index === 0 || index === -1) {
      const option = options[options.length - 1];
      this.setOptionFocus({ value: option.value, label: option.innerHTML });
    } else {
      const option = options[index - 1];
      this.setOptionFocus({ value: option.value, label: option.innerHTML });
    }
  }

  private changeActiveState = (active: boolean) => {
    if (!this.active) {
      this.el.shadowRoot.querySelector('input').focus();
    }
    if (!active){
      this.el.focus();
    }
    this.active = active;
  };

  private toggleDropdown = () => {
    const active = !this.active;
    this.changeActiveState(active);
  };

  @Listen('keydown')
  handleKeyDown (event: KeyboardEvent) {
    if (['Enter', ' '].includes(event.key)) {
      event.preventDefault();
      if (this.active) {
        this.updateOption();
      }
      this.toggleDropdown();
      if (this.selectedOption) {
        this.focusSelectedOption();
      }
    }
    if (this.active && event.key === 'Escape') {
      this.changeActiveState(false);
      this.updateFilter(this.selectedOption ? this.selectedOption.label : this.filter);
    }

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
  };

  updateFilter = (value: string) => {
    this.filter = value;
    this.debouncedChangeFilter(this.filter);
  }

  debouncedChangeFilter = debounce((filter: string) => {
    this.changeFilter.emit(filter);
  }, this.filterDebounceMs);

  handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.updateFilter(value);
  }

  render() {
    return (
      <Host>
        <form>
          <label htmlFor={this.label}>{this.label}</label>
          <div class="search-wrapper">
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
              onInput={this.handleInput}
              value={this.selectedOption?.label || this.filter}
            />
          </div>
          <ul class={clsx('options', { active: this.active })} role="listbox" id={`listbox-${this.label}`}>
            <slot></slot>
          </ul>
        </form>
      </Host>
    );
  }
}
