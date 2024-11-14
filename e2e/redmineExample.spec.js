import {test,expect} from '@playwright/test';

test('RedmineExample', async ({page}) => {
  
  await page.goto("https://support.credenceanalytics.com/login");

  //? provide username - css
  // await page.locator("#loginusername").fill("pavanol");
  // await page.type("#loginusername","pavanol");
  await page.fill("#username","akshayac");
  
  //? provide password - css
  // await page.locator("input[id='loginpassword']").fill("test@123");
  // await page.type("input[id='loginpassword']","test@123");
  await page.fill("#password","akshay1997");

  //? click on login button inside modal  - xpath
  await page.click("#login-submit");
  
  //? verify logout link presence - xpath
  const logoutLink = await page.locator("//a[normalize-space()='Sign out']");
  await expect(logoutLink).toBeVisible();

  await page.goto("https://support.credenceanalytics.com/issues");

  // Extract all links
  const Links = await page.$$("//div[@class='autoscroll']//table//tbody//tr//td[@class='project']/a");

  // Loop through each link and log the product names
  for (let link of Links) {
    const productName = await link.textContent();
    console.log(`Product Name: ${productName}`);
  }
  
  await page.close();
});