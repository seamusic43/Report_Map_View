const { forEach, add } = require('lodash');
const puppeteer = require('puppeteer');

async function main() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();


    await getDetailPage(browser, 'https://xn--939au0g4vj8sq.net/cp/?id=1286421')
    return false;

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

    //    console.log('last height', originalOffset)

    await page.waitForSelector('#gall_ul div.imgArea > a');
    const elements = await page.$$('#gall_ul div.imgArea')

    console.log('element count', elements.length)
    //async elements.forEach(function (v) {
    for (const v of elements) {
        const link = await v.$eval('a', (e) => e.href)
        console.log(link);
    }
}

async function getText(page, sel_text) {
    await page.waitForSelector(sel_text);
    const text_el = await page.evaluate(({ sel_text }) => {
        return $(sel_text).text().replace(/\t|\n/g, '');
    }, { sel_text });
    return text_el;
}

async function getDetailPage(browser, url) {
    const d_page = await browser.newPage();
    await d_page.goto(url, {
        waitUntil: 'networkidle0',
    })
    const id_chk = url.split('?id=');
    const id = parseInt(id_chk[1]);

    const title = await getText(d_page, '.c_info .tit');
    const title_chk = title.match(/\[(.+)\]/);
    const location = title_chk[1];
    //await page.waitForSelector('div.detail_info li:nth-child(4) dd div');
    await d_page.evaluate(() => {
        $('.detail_info li:nth-child(4) dd div').remove();
        // return $('.detail_info > ul > li:nth-child(4) > dl > dd').text().replace(/\t|\n/g, '');
    })
    const address = await getText(d_page, '.detail_info li:nth-child(4) dd')
    console.log(title, address);

    const apply = await getText(d_page, '.cmp_info > ul > li.on > dl > dd');
    const a_day = apply.split(' ~ ');
    const apply_start = a_day[0];
    const apply_end = a_day[1];
    console.log(apply, apply_start, apply_end)

    const selected_at = await getText(d_page, '.cmp_info > ul > li:nth-child(2) > dl > dd');
    const posting = await getText(d_page, '.cmp_info > ul > li:nth-child(3) > dl > dd');
    const p_day = posting.split(' ~ ');
    const posting_start = p_day[0];
    const posting_end = p_day[1];

    console.log('--- detail end---');

    /* 필요정보
    id => url 에서 추출
    title       .c_info .tit 
    address     .detail_info 
    $('.detail_info > ul > li:nth-child(4) > dl > dd div').remove();
    $('.detail_info > ul > li:nth-child(4) > dl > dd').text().replace(/\t|\n/g, '');

    .cmp_info 
    .cmp_info > ul > li.on > dl > dd 
    apply_started_at
    apply_ended_at
    .cmp_info > ul > li:nth-child(2) > dl > dd
    selected_at
    .cmp_info > ul > li:nth-child(3) > dl > dd
    posting_started_at
    posting_ended_at

    post_type
    */

}

main();