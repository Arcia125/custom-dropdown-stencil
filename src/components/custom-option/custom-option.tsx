import { Component, Host, h, Event, EventEmitter, Prop, Listen, Element, State } from '@stencil/core';
import { Option } from '../../utils/models';

@Component({
  tag: 'custom-option',
  styleUrl: 'custom-option.css',
  shadow: true,
})
export class CustomOption {
  @Element() el: HTMLElement;
  @Event() selectOption: EventEmitter<Option>;
  @State() filter: string = '';

  @Prop() value: string;

  @Listen('changeFilter', { target: 'body' })
  handleChangeFilter(newValue: CustomEvent<string>) {
    this.filter = newValue.detail;
  }

  private onSelect = () => {
    this.selectOption.emit({ value: this.value });
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
        <li role="option">
          <slot></slot>
        </li>
      </Host>
    );
  }
}
