import { Component, Host, h, Event, EventEmitter, Prop, Listen, Element, State } from '@stencil/core';
import { Option } from '../../utils/models';

/**
 * Custom option element for use with the custom-dropdown element. Acts similarly to the browser's
 * built in option element. Only to be used inside of custom-dropdown
 */
@Component({
  tag: 'custom-option',
  styleUrl: 'custom-option.css',
  shadow: true
})
export class CustomOption {
  @Element() el: HTMLElement;
  /**
   * Fired when clicking on an option
   */
  @Event() selectOption: EventEmitter<Option>;

  /**
   * Determines whether the option will be rendered
   */
  @State() filter: string = '';

  /**
   * The value that will emitted when the custom-dropdown changes
   */
  @Prop() value: string;

  @Listen('changeFilter', { target: 'body' })
  handleChangeFilter(newValue: CustomEvent<string>) {
    this.filter = newValue.detail;
  }

  private onSelect = () => {
    this.selectOption.emit({ value: this.value, label: this.el.innerHTML });
  };

  @Listen('click')
    handleClick() {
    this.onSelect();
  }

  isVisible() {
    const optionLabel = this.el.innerHTML.toLowerCase();
    const filter = this.filter.toLowerCase();
    return (this.filter === '' || optionLabel.includes(filter));
  }

  render() {
    return this.isVisible() && (
      <Host>
        <li role="option" tabIndex={0}>
          <slot></slot>
        </li>
      </Host>
    );
  }
}
