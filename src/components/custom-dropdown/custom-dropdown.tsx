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
  shadow: true,
})
export class CustomDropdown implements ComponentInterface {
  /**
   * Label above the dropdown
   */
  @Prop() label: string;

  itemContainerRef!: HTMLUListElement;

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
   * Fires whenever the value of the dropdown changes
   */
  @Event() changeDropdown: EventEmitter<string>;

  /**
   * Time in milliseconds to debounce the handleChangeFilterDebounced
   */
  private filterDebounceMs = 200;

  componentDidLoad() {
    this.updateOptionVisibility(this.filter);
  }

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
    const optEl = options.find(o => document.activeElement === o);
    this.selectedOption = optEl ? { value: optEl.value, label: optEl.innerHTML } : this.selectedOption;
    this.changeDropdown.emit(this.selectedOption ? this.selectedOption.value : '');
  };

  @Listen('selectOption')
  handleSelectOption(event: CustomEvent<Option>) {
    this.selectedOption = event.detail;
    this.updateOption();
    this.toggleDropdown();
  }

  getAllOptions = () => {
    return Array.from(this.el.querySelectorAll('custom-option'));
  };

  getVisibleOptions = () => {
    return this.getAllOptions();
  };

  setOptionFocus = (option: Option | HTMLCustomOptionElement) => {
    const optEl = 'label' in option ? this.getVisibleOptions().find(o => o.value === option.value) : option;
    const li = optEl?.shadowRoot.querySelector('li');
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
    const index = options.findIndex(o => document.activeElement === o);
    const option = index === options.length - 1 ? options[0] : options[index + 1];
    this.setOptionFocus(option);
  };

  focusPrevOption = () => {
    if (!this.active) {
      this.changeActiveState(true);
    }
    const options = this.getVisibleOptions();
    const index = options.findIndex(o => document.activeElement === o);
    const option = index === 0 || index === -1 ? options[options.length - 1] : options[index - 1];
    this.setOptionFocus(option);
  };

  private changeActiveState = (active: boolean) => {
    if (!this.active) {
      this.el.shadowRoot.querySelector('input').focus();
    }
    if (!active) {
      this.el.focus();
    }
    this.active = active;
  };

  private toggleDropdown = () => {
    const active = !this.active;
    this.changeActiveState(active);
  };

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.active) {
          this.updateOption();
        }
        this.toggleDropdown();
        if (this.selectedOption) {
          this.focusSelectedOption();
        }
        break;
      case 'Escape':
        if (this.active) {
          this.changeActiveState(false);
          this.updateFilter(this.selectedOption ? this.selectedOption.label : this.filter);
        }
        break;
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

  updateFilter = (value: string) => {
    this.filter = value;
    this.handleChangeFilterDebounced(this.filter);
  };

  updateOptionVisibility = (filter: string) => {
    const options = this.getAllOptions();
    options.forEach(option => {
      if (filter === '' || option.innerHTML.toLowerCase().includes(filter)) {
        option.classList.add('visible');
      } else {
        option.classList.remove('visible');
      }
    });
  };

  handleChangeFilterDebounced = debounce((filter: string) => {
    this.updateOptionVisibility(filter);
  }, this.filterDebounceMs);

  handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.updateFilter(value);
  };

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
