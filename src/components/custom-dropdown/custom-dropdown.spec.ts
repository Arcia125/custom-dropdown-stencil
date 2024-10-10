import { newSpecPage } from '@stencil/core/testing';
import { CustomDropdown } from './custom-dropdown';
import { CustomOption } from '../custom-option/custom-option';

describe('custom-dropdown', () => {
  it('renders with label', async () => {
    const page = await newSpecPage({
      components: [CustomDropdown],
      html: `<custom-dropdown label="Test Label"></custom-dropdown>`,
    });

    expect(page.root.shadowRoot.innerHTML).toEqual(`<form><label htmlfor="Test Label">Test Label</label><div class="search-wrapper"><input class="search" type="text" placeholder="Select" id="Test Label" role="combobox" aria-controls="listbox-Test Label" aria-haspopup="listbox-Test Label" tabindex="0" aria-expanded="false" value=""></div><ul class="options" role="listbox" id="listbox-Test Label"><slot></slot></ul></form>`);
  });

  it('fires changeDropdown event on option select', async () => {
    const page = await newSpecPage({
      components: [CustomDropdown, CustomOption],
      html: `
        <custom-dropdown label="Test Label">
          <custom-option value="1">Option 1</custom-option>
          <custom-option value="2">Option 2</custom-option>
        </custom-dropdown>
      `,
    });

    const option = page.root.querySelector('custom-option');
    const changeDropdownSpy = jest.fn();

    page.root.addEventListener('changeDropdown', changeDropdownSpy);
    option.click();
    await page.waitForChanges();

    expect(changeDropdownSpy).toHaveBeenCalledWith(expect.objectContaining({ detail: '1' }));
  });
});
