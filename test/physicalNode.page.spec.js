const { login_page, valid_email, valid_password } = require('../utils');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path')
const parser = require('chrome-trace');
const resultsDir = 'results';

describe('FM Performance Improvement Test', () => {
  let page;

  before(async () => {
    page = await browser.newPage();
    await page.setViewport({
      width: 1520,
      height: 1080
    });
    // let traceFile = path.resolve(resultsDir + '/dashboard.trace.json')
    // await page.tracing.start({
    //   path: traceFile
    // });
    await page.goto(login_page);
  });

  it('After Login , Landing DashBoard Page', async function () {

    // let traceFile = path.resolve(resultsDir + '/dashboard.trace.json')

    await page.waitForSelector('form[class="form-signin"]');
    await page.type('#httpUserName', valid_email);
    await page.type('#httpUserPwd', valid_password);
    await page.click('#btnLogin');
    await page.waitForNavigation({
      waitUntil: 'networkidle2'
    });
    await page.waitFor('.fmTopLevelMenu');

    // await getPerformanceNumbers(page, 'Dashboard page');
    // await page.tracing.stop();
    // const parsedTrace = await parser.parseStream(fs.createReadStream(traceFile));
    // if (parsedTrace.mainThread)
    //   console.log(JSON.stringify(parsedTrace.eventCategoryTime[parsedTrace.mainThread]))
    // else
    //   console.log(JSON.stringify(Object.values(parsedTrace.eventCategoryTime)[0]));

  });
  it('PhyicalNode Page', async function () {
    let traceFile = path.resolve(resultsDir + '/nodes.trace_new_5501.json')
    await page.tracing.start({
      path: traceFile
    });

    await page.waitForSelector('.fmTopLevelMenu');
    await page.waitForSelector('[ng-click="setTopContext(\'topPhysical\',true)"]');

    await page.click('[ng-click="setTopContext(\'topPhysical\',true)"]'),

      await page.waitFor('.mat-paginator-page-size-label');
    await page.waitForSelector('.mat-paginator-page-size-label');

    await page.tracing.stop();
    const parsedTrace = await parser.parseStream(fs.createReadStream(traceFile));
    if (parsedTrace.mainThread)
      console.log(JSON.stringify(parsedTrace.eventCategoryTime[parsedTrace.mainThread]))
    else
      console.log(JSON.stringify(Object.values(parsedTrace.eventCategoryTime)[0]));

  });

  // it('Node Overview Page', async function () {

  //   await page.goto('https://192.71.0.2/app/#/node/192.71.0.44//dashboard');
  //   await page.waitForSelector('[ui-sref="node.allPorts({nodeId:\'192.71.0.44/\'})"]');
    
  // }); 

  // it('Port List Page', async function () {

  //   let traceFile = path.resolve(resultsDir + '/portslist.trace.json')
  //   await page.tracing.start({
  //   path: traceFile
  //   });
  //   await page.waitForSelector('[ui-sref="node.allPorts({nodeId:\'192.71.0.44/\'})"]');
  //   await page.click('[ui-sref="node.allPorts({nodeId:\'192.71.0.44/\'})"]');
  //   await page.waitFor('.mat-paginator-page-size-label');
  //   await page.waitForSelector('.mat-paginator-page-size-label');  
     
  //   await page.tracing.stop();

  //   const parsedTrace = await parser.parseStream(fs.createReadStream(traceFile));
  //   if (parsedTrace.mainThread)
  //   console.log(JSON.stringify(parsedTrace.eventCategoryTime[parsedTrace.mainThread]))
  //   else
  //   console.log(JSON.stringify(Object.values(parsedTrace.eventCategoryTime)[0]));
  // });   

  // it('Map List Page', async function () {

  //   let traceFile = path.resolve(resultsDir + '/maplist.trace.json')
  //   await page.tracing.start({
  //   path: traceFile
  //   });
  //   await page.waitForSelector('[ui-sref="node.maps({nodeId:\'10.115.110.46\'})"]');
  //   await page.click('[ui-sref="node.maps({nodeId:\'10.115.110.46\'})"]');
  //   await page.waitFor('.mat-paginator-page-size-label');
  //   await page.waitForSelector('.mat-paginator-page-size-label');  
     
  //   await page.tracing.stop();

  //   const parsedTrace = await parser.parseStream(fs.createReadStream(traceFile));
  //   if (parsedTrace.mainThread)
  //   console.log(JSON.stringify(parsedTrace.eventCategoryTime[parsedTrace.mainThread]))
  //   else
  //   console.log(JSON.stringify(Object.values(parsedTrace.eventCategoryTime)[0]));



  // });     


});
