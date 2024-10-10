import { newSpecPage } from '@stencil/core/testing';
import { CustomOption } from './custom-option';

describe('custom-option', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CustomOption],
      html: `<custom-option></custom-option>`,
    });
    expect(page.root).toEqualHtml(`
      <custom-option>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </custom-option>
    `);
  });
});
