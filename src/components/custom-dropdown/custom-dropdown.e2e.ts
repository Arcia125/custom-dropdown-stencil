import { newE2EPage } from '@stencil/core/testing';

describe('custom-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<custom-dropdown></custom-dropdown>');
    const element = await page.find('custom-dropdown');
    expect(element).toHaveClass('hydrated');
  });
});
