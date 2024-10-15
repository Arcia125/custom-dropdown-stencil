import { Component, Host, h, Event, EventEmitter, Prop, Listen, Element } from '@stencil/core';
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
   * The value that will emitted when the custom-dropdown changes
   */
  @Prop() value: string;

  private onSelect = () => {
    this.selectOption.emit({ value: this.value, label: this.el.innerHTML });
  };

  @Listen('click')
    handleClick() {
    this.onSelect();
  }

  render() {
    return (
      <Host>
        <li role="option" tabIndex={0}>
          <slot></slot>
        </li>
      </Host>
    );
  }
}
