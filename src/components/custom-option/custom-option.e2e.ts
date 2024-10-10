import { newE2EPage } from '@stencil/core/testing';

describe('custom-option', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<custom-option></custom-option>');

    const element = await page.find('custom-option');
    expect(element).toHaveClass('hydrated');
  });
});
