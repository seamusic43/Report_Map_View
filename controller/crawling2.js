const { forEach } = require('lodash');
const puppeteer = require('puppeteer');

async function main() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const pageUrl = 'https://xn--939au0g4vj8sq.net/cp/?ca=20&loca_prt=%EC%A0%9C%EC%A3%BC&local_1=%EC%A0%84%EC%B2%B4&local_2=%EC%A0%9C%EC%A3%BC';
    await page.goto(pageUrl, {
        waitUntil: 'networkidle0',
    })
    console.log('Start!')

    let originalOffset = 0;
    while (true) {
        await page.evaluate("window.scrollBy(0, document.body.scrollHeight)");
        await new Promise((page) => setTimeout(page, 1000));
        let newOffset = await page.evaluate("window.pageYOffset");
        if (originalOffset === newOffset) {
            break;
        }
        originalOffset = newOffset;
    }

    console.log('last height', originalOffset)



    await page.waitForSelector('#gall_ul div.imgArea > a');
    const elements = await page.$$('#gall_ul div.imgArea > a')

    console.log('element count', elements.length)
    elements.forEach(function (v) {
        console.log(v);
    })
}

main();