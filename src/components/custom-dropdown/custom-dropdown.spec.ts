import { newSpecPage } from '@stencil/core/testing';
import { CustomDropdown } from './custom-dropdown';

describe('custom-dropdown', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [CustomDropdown],
      html: '<custom-dropdown></custom-dropdown>',
    });
    expect(root).toEqualHtml(`
      <custom-dropdown>
        <mock:shadow-root>
          <div>
            Hello, World!
          </div>
        </mock:shadow-root>
      </custom-dropdown>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [CustomDropdown],
      html: `<custom-dropdown></custom-dropdown>`,
    });
    expect(root).toEqualHtml(`
      <custom-dropdown>
        <mock:shadow-root>
          <div>
            Hello, World!
          </div>
        </mock:shadow-root>
      </custom-dropdown>
    `);
  });
});
