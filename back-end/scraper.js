//var casper = require('casper').create();
var casper = require('casper').create({
    pageSettings: {
        loadImages:  false,        // do not load images
        loadPlugins: false         // do not load NPAPI plugins (Flash, Silverlight, ...)
    }
});

var currentURL = null;
var inStock = null;
var timeStamp = null;
var resultString = null;
var readSuccess = null;

casper.start();






// currentURL = 'https://www.target.com/p/xbox-one-s-1tb-battlefield-153-1-special-edition-bundle/-/A-51353852#lnk=sametab'
// currentURL = 'https://www.target.com/p/nintendo-switch-with-gray-joy-con/-/A-52052007'
casper.thenOpen('https://www.target.com/p/nintendo-switch-with-gray-joy-con/-/A-52052007', function () {
    //this.echo(this.getTitle());
    if (this.exists('p.card--title > span.h-text-orangeDark')) {
        //this.echo('success');
        resultString = this.getHTML('p.card--title > span.h-text-orangeDark')
        //this.echo(resultString)


        if (resultString === 'temporarily out of stock') {
            inStock = false
            readSuccess = true
            //console.log('In Stock: ' + inStock);
            //console.log('Successfully Read: ' + readSuccess);
        } else {
            inStock = null
            readSuccess = false
            //console.log('In Stock: ' + inStock);
            //console.log('Successfully Read: ' + readSuccess);
        }

    } else if (this.exists('p.card--title > span.h-text-lowercase')) {
        //this.echo('success');
        resultString = this.getHTML('p.card--title > span.h-text-lowercase')
        //this.echo(resultString.slice(0,13))


        if (resultString.slice(0, 13) === ' Shipping to ') {
            inStock = true
            readSuccess = true
            //console.log('In Stock: ' + inStock);
            //console.log('Successfully Read: ' + readSuccess);
        } else {
            inStock = null
            readSuccess = false
            //console.log('In Stock: ' + inStock);
            //console.log('Successfully Read: ' + readSuccess);
        }

    } else {

        //this.echo('Not Found')
        readSuccess = false;
        inStock = null
        //console.log('In Stock: ' + inStock);
        //console.log('Successfully Read: ' + readSuccess);
    }
    // this.echo(this.getTitle());

    casper.thenOpen('http://localhost:4001/updateInventoryData', {

        method: 'POST',
        data: {
            'inStock': inStock,
            'readSuccess': readSuccess,
            'url': 'https://www.target.com/p/nintendo-switch-with-gray-joy-con/-/A-52052007'
        }
    });

});


// currentURL = 'https://www.walmart.com/ip/PlayStation-4-Pro-1TB-Gaming-Console/52901919?action=product_interest&action_type=title&beacon_version=1.0.2&bucket_id=irsbucketdefault&client_guid=fac95e3d-f0d4-44e9-8f5f-9de7ee590ea5&config_id=105&customer_id_enc&findingMethod=p13n&guid=fac95e3d-f0d4-44e9-8f5f-9de7ee590ea5&item_id=52901919&parent_anchor_item_id=169399081&parent_item_id=169399081&placement_id=irs-105-t1&reporter=recommendations&source=new_site&strategy=PWVUB&visitor_id=WJSYahbSr40KBVO5x-KSWQ'
// currentURL = 'https://www.walmart.com/ip/Nintendo-Switch-Gaming-Console-with-Neon-Blue-and-Neon-Red-Joy-Con/55449981'
casper.thenOpen('https://www.walmart.com/ip/Nintendo-Switch-Gaming-Console-with-Neon-Blue-and-Neon-Red-Joy-Con/55449981', function () {
    //this.echo(this.getTitle());
    if (this.exists('button[data-tl-id="cta_oos_button"]')) {
        //this.echo('success');
        resultString = this.getHTML('button[data-tl-id="cta_oos_button"]')
        //this.echo(resultString)


        if (resultString === 'Get In-Stock Alert') {
            inStock = false
            readSuccess = true
            //console.log('In Stock: ' + inStock);
            //console.log('Successfully Read: ' + readSuccess);
        } else {
            inStock = null
            readSuccess = false
            //console.log('In Stock: ' + inStock);
            //console.log('Successfully Read: ' + readSuccess);
        }

    } else if (this.exists('button[data-tl-id="ProductPrimaryCTA-cta_add_to_cart_button"]')) {
        //this.echo('success');
        resultString = this.getHTML('button[data-tl-id="ProductPrimaryCTA-cta_add_to_cart_button"]')
        //this.echo(resultString)
        //console.log(resultString.indexOf('Add to Cart'))


        if (resultString.indexOf('Add to Cart') !== -1) {
            inStock = true
            readSuccess = true
            //console.log('In Stock: ' + inStock);
            //console.log('Successfully Read: ' + readSuccess);
        } else {
            inStock = null
            readSuccess = false
            //console.log('In Stock: ' + inStock);
            //console.log('Successfully Read: ' + readSuccess);
        }

    } else {

        //this.echo('Not Found')
        readSuccess = false;
        inStock = null
        //console.log('In Stock: ' + inStock);
        //console.log('Successfully Read: ' + readSuccess);
    }

    casper.thenOpen('http://localhost:4001/updateInventoryData', {

        method: 'POST',
        data: {
            'inStock': inStock,
            'readSuccess': readSuccess,
            'url': 'https://www.walmart.com/ip/Nintendo-Switch-Gaming-Console-with-Neon-Blue-and-Neon-Red-Joy-Con/55449981'
        }
    });
});


// currentURL = 'http://www.gamestop.com/xbox-one/consoles/xbox-one-s-gears-of-war-4-blue-special-edition-500gb-console/136010'
// currentURL = 'http://www.gamestop.com/nintendo-switch/consoles/nintendo-switch-console-with-gray-joy-con/141820'
casper.thenOpen('http://www.gamestop.com/nintendo-switch/consoles/nintendo-switch-console-with-gray-joy-con/141820', function () {
    //this.echo(this.getTitle());
    if (this.exists('div.buttonna > a.ats-prodBuy-notAvail > span')) {
        //this.echo('success');
        resultString = this.getHTML('div.buttonna > a.ats-prodBuy-notAvail > span');

        if (resultString.indexOf('Not Available') !== -1) {
            inStock = false
            readSuccess = true
            //console.log('In Stock: ' + inStock);
            //console.log('Successfully Read: ' + readSuccess);
        } else {
            inStock = null
            readSuccess = false
            //console.log('In Stock: ' + inStock);
            //console.log('Successfully Read: ' + readSuccess);
        }

    } else if (this.exists('div.button > div#nudetectaddclickevent > a > span')) {
        //this.echo('ping')
        resultString = this.getHTML('div.button > div#nudetectaddclickevent > a > span');
        //this.echo(resultString)

        if (resultString.indexOf('Add to Cart') !== -1) {
            inStock = true
            readSuccess = true
            //console.log('In Stock: ' + inStock);
            //console.log('Successfully Read: ' + readSuccess);
        } else {
            inStock = null
            readSuccess = false
            //console.log('In Stock: ' + inStock);
            //console.log('Successfully Read: ' + readSuccess);
        }
    } else {
        readSuccess = false;
        inStock = null
        //console.log('In Stock: ' + inStock);
        //console.log('Successfully Read: ' + readSuccess);
    }

    casper.thenOpen('http://localhost:4001/updateInventoryData', {

        method: 'POST',
        data: {
            'inStock': inStock,
            'readSuccess': readSuccess,
            'url': 'http://www.gamestop.com/nintendo-switch/consoles/nintendo-switch-console-with-gray-joy-con/141820'
        }
    });
});


// currentURL = 'http://www.gamestop.com/nintendo-switch/consoles/nintendo-switch-console-with-neon-blue-and-neon-red-joy-con/141887'
casper.thenOpen('http://www.gamestop.com/nintendo-switch/consoles/nintendo-switch-console-with-neon-blue-and-neon-red-joy-con/141887', function () {
    //this.echo(this.getTitle());
    if (this.exists('div.buttonna > a.ats-prodBuy-notAvail > span')) {
        //this.echo('success');
        resultString = this.getHTML('div.buttonna > a.ats-prodBuy-notAvail > span');

        if (resultString.indexOf('Not Available') !== -1) {
            inStock = false
            readSuccess = true
            //console.log('In Stock: ' + inStock);
            //console.log('Successfully Read: ' + readSuccess);
        } else {
            inStock = null
            readSuccess = false
            //console.log('In Stock: ' + inStock);
            //console.log('Successfully Read: ' + readSuccess);
        }

    } else if (this.exists('div.button > div#nudetectaddclickevent > a > span')) {
        //this.echo('ping')
        resultString = this.getHTML('div.button > div#nudetectaddclickevent > a > span');
        //this.echo(resultString)

        if (resultString.indexOf('Add to Cart') !== -1) {
            inStock = true
            readSuccess = true
            //console.log('In Stock: ' + inStock);
            //console.log('Successfully Read: ' + readSuccess);
        } else {
            inStock = null
            readSuccess = false
            //console.log('In Stock: ' + inStock);
            //console.log('Successfully Read: ' + readSuccess);
        }
    } else {
        readSuccess = false;
        inStock = null
        //console.log('In Stock: ' + inStock);
        //console.log('Successfully Read: ' + readSuccess);
    }

    casper.thenOpen('http://localhost:4001/updateInventoryData', {

        method: 'POST',
        data: {
            'inStock': inStock,
            'readSuccess': readSuccess,
            'url': 'http://www.gamestop.com/nintendo-switch/consoles/nintendo-switch-console-with-neon-blue-and-neon-red-joy-con/141887'
        }
    });
});

// currentURL = 'http://www.bestbuy.com/site/nintendo-switch-32gb-console-gray-joy-con/5670003.p'
// currentURL = 'http://www.bestbuy.com/site/microsoft-xbox-one-s-500gb-forza-horizon-3-console-bundle-with-pdp-talon-media-remote/9999281200050000.p?skuId=9999281200050000'
casper.thenOpen('http://www.bestbuy.com/site/nintendo-switch-32gb-console-gray-joy-con/5670003.p', function () {
    //this.echo(this.getTitle());
    if (this.exists('div[class="cart-button"]')) {
        resultString = this.getElementAttribute('div[class="cart-button"]', 'data-purchasable')

        if (resultString === 'true') {
            inStock = true
            readSuccess = true
            //console.log('In Stock: ' + inStock);
            //console.log('Successfully Read: ' + readSuccess);
        } else {
            inStock = false
            readSuccess = true
            //console.log('In Stock: ' + inStock);
            //console.log('Successfully Read: ' + readSuccess);
        }

    } else {
        readSuccess = false;
        inStock = null
        //console.log('In Stock: ' + inStock);
        //console.log('Successfully Read: ' + readSuccess);
    }

    casper.thenOpen('http://localhost:4001/updateInventoryData', {

        method: 'POST',
        data: {
            'inStock': inStock,
            'readSuccess': readSuccess,
            'url': 'http://www.bestbuy.com/site/nintendo-switch-32gb-console-gray-joy-con/5670003.p'
        }
    });
});

// currentURL = 'http://www.bestbuy.com/site/nintendo-switch-32gb-console-neon-red-neon-blue-joy-con/5670100.p'
casper.thenOpen('http://www.bestbuy.com/site/nintendo-switch-32gb-console-neon-red-neon-blue-joy-con/5670100.p', function () {
    //this.echo(this.getTitle());
    if (this.exists('div[class="cart-button"]')) {
        resultString = this.getElementAttribute('div[class="cart-button"]', 'data-purchasable')

        if (resultString === 'true') {
            inStock = true
            readSuccess = true
            //console.log('In Stock: ' + inStock);
            //console.log('Successfully Read: ' + readSuccess);
        } else {
            inStock = false
            readSuccess = true
            //console.log('In Stock: ' + inStock);
            //console.log('Successfully Read: ' + readSuccess);
        }

    } else {
        readSuccess = false;
        inStock = null
        //console.log('In Stock: ' + inStock);
        //console.log('Successfully Read: ' + readSuccess);
    }

    casper.thenOpen('http://localhost:4001/updateInventoryData', {

        method: 'POST',
        data: {
            'inStock': inStock,
            'readSuccess': readSuccess,
            'url': 'http://www.bestbuy.com/site/nintendo-switch-32gb-console-neon-red-neon-blue-joy-con/5670100.p'
        }
    });
});

// currentURL = 'http://www.toysrus.com/product/index.jsp?productId=119513636&cp=2255974.119659196&fg=Category&fg=Price&fv=2254197&fv=00010001~-~09999999&ff=Taxonomy&ff=StorePrice&fd=%24100.00+and+up&parentPage=search'
casper.thenOpen('http://www.toysrus.com/product/index.jsp?productId=119513636&cp=2255974.119659196&fg=Category&fg=Price&fv=2254197&fv=00010001~-~09999999&ff=Taxonomy&ff=StorePrice&fd=%24100.00+and+up&parentPage=search', function () {
    //this.echo(this.getTitle());
    if (this.exists('div[id="productOOS"]')) {
        //this.echo(this.getHTML('div[id="productOOS"]'));
        inStock = false
        readSuccess = true
        //console.log('In Stock: ' + inStock);
        //console.log('Successfully Read: ' + readSuccess);


    } else if (this.exists('a[name="Add To Cart"]')) {
        //this.echo(this.getElementAttribute('a[name="Add To Cart"]', 'class'));
        resultString = this.getElementAttribute('a[name="Add To Cart"]', 'class');
        if (resultString === 'truAddToCart  ') {
            inStock = true
            readSuccess = true
            //console.log('In Stock: ' + inStock);
            //console.log('Successfully Read: ' + readSuccess);
        }


    } else {
        readSuccess = false;
        inStock = null
        //console.log('In Stock: ' + inStock);
        //console.log('Successfully Read: ' + readSuccess);
    }

    casper.thenOpen('http://localhost:4001/updateInventoryData', {

        method: 'POST',
        data: {
            'inStock': inStock,
            'readSuccess': readSuccess,
            'url': 'http://www.toysrus.com/product/index.jsp?productId=119513636&cp=2255974.119659196&fg=Category&fg=Price&fv=2254197&fv=00010001~-~09999999&ff=Taxonomy&ff=StorePrice&fd=%24100.00+and+up&parentPage=search'
        }
    });

});

// currentURL = 'http://www.toysrus.com/product/index.jsp?productId=119513666&cp=2255974.119659196&fg=Category&fg=Price&fv=2254197&fv=00010001~-~09999999&ff=Taxonomy&ff=StorePrice&fd=%24100.00+and+up&parentPage=search'
// currentURL = 'http://www.toysrus.com/product/index.jsp?productId=111913616&cp=2255974.22197846.22198136&parentPage=family'
casper.thenOpen('http://www.toysrus.com/product/index.jsp?productId=119513666&cp=2255974.119659196&fg=Category&fg=Price&fv=2254197&fv=00010001~-~09999999&ff=Taxonomy&ff=StorePrice&fd=%24100.00+and+up&parentPage=search', function () {
    //this.echo(this.getTitle());
    if (this.exists('div[id="productOOS"]')) {
        //this.echo(this.getHTML('div[id="productOOS"]'));
        inStock = false
        readSuccess = true
        console.log('In Stock: ' + inStock);
        console.log('Successfully Read: ' + readSuccess);


    } else if (this.exists('a[name="Add To Cart"]')) {
        //this.echo(this.getElementAttribute('a[name="Add To Cart"]', 'class'));
        resultString = this.getElementAttribute('a[name="Add To Cart"]', 'class');
        if (resultString === 'truAddToCart  ') {
            inStock = true
            readSuccess = true
            //console.log('In Stock: ' + inStock);
            //console.log('Successfully Read: ' + readSuccess);
        }


    } else {
        readSuccess = false;
        inStock = null
        //console.log('In Stock: ' + inStock);
        //console.log('Successfully Read: ' + readSuccess);
    }

    casper.thenOpen('http://localhost:4001/updateInventoryData', {

        method: 'POST',
        data: {
            'inStock': inStock,
            'readSuccess': readSuccess,
            'url': 'http://www.toysrus.com/product/index.jsp?productId=119513666&cp=2255974.119659196&fg=Category&fg=Price&fv=2254197&fv=00010001~-~09999999&ff=Taxonomy&ff=StorePrice&fd=%24100.00+and+up&parentPage=search'
        }
    });

});


casper.run();
