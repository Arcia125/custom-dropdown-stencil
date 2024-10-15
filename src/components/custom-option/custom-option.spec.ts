import { newSpecPage } from '@stencil/core/testing';
import { CustomOption } from './custom-option';

describe('custom-option', () => {
  it('renders correctly with a value', async () => {
    const page = await newSpecPage({
      components: [CustomOption],
      html: `<custom-option value="1">Option 1</custom-option>`,
    });

    expect(page.root.shadowRoot.innerHTML).toEqual(`<li role="option" tabindex="0"><slot></slot></li>`);
    expect(page.root.textContent.trim()).toBe('Option 1');
  });
});
