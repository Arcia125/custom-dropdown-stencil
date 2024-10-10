import { newE2EPage } from '@stencil/core/testing';

describe('custom-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<custom-dropdown></custom-dropdown>');
    const element = await page.find('custom-dropdown');
    expect(element).toHaveClass('hydrated');
  });

  // it('renders changes to the name data', async () => {
  //   const page = await newE2EPage();

  //   await page.setContent('<custom-dropdown></custom-dropdown>');
  //   // const component = await page.find('custom-dropdown');
  //   const element = await page.find('custom-dropdown >>> div');
  //   expect(element.textContent).toEqual(`Hello, World!`);

  //   // component.setProperty('first', 'James');
  //   // await page.waitForChanges();
  //   // expect(element.textContent).toEqual(`Hello, World!`);

  //   // component.setProperty('last', 'Quincy');
  //   // await page.waitForChanges();
  //   // expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);

  //   // component.setProperty('middle', 'Earl');
  //   // await page.waitForChanges();
  //   // expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
  // });
});
