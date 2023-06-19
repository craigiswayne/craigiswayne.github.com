// const puppeteer = require('puppeteer');
//
// // const profileURL = 'https://www.linkedin.com/in/craigiswayne/';
// const profileURL = 'https://www.linkedin.com/login';
// // const profileURL = 'https://craigiswayne.github.io/';
//
// (async () => {
//   let browser, page;
//
//
//   try {
//     browser = await puppeteer.launch({
//       headless: true,
//       args: [
//         '--no-sandbox',
//         '--disable-dev-shm-usage', // <-- add this one
//       ],
//       browserContext: "default"
//     });
//     page = await browser.newPage();
//     await page.goto(profileURL);
//
//     let currentURL;
//     page
//     .waitForSelector('img')
//     .then(() => console.log('First URL with image: ' + currentURL))
//     .catch((error) => {
//       console.log('promise error', error);
//       done();
//     });
//
//     // // const links = await page.$$eval('a', elements => elements.filter(element => {
//     // //   return element;
//     // //   // const parensRegex = /^((?!\().)*$/;
//     // //   // return element.href.includes('.mid') && parensRegex.test(element.textContent);
//     // // }));
//     // // // .map(element => element.href));
//     // const hrefElement = await page.$('a');
//     // console.log(hrefElement);
//
//   } catch(exception) {
//     console.log('exception:', exception);
//   }
//
//
//
//   //
//   // links.forEach(link => console.log(link));
//
//   // const name = await page.$$( 'main#main .text-heading-xlarge');
//
//   // console.log(name);
//
//   await browser.close();
// })();
