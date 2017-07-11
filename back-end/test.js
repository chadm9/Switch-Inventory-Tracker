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

casper.start('https://www.target.com/p/nintendo-switch-with-gray-joy-con/-/A-52052007', function() {
    this.echo(this.getTitle());
    if (this.exists('span.h-text-lowercase')) {
        this.echo(this.getHTML('.price'));
        this.echo(this.getHTML('.js-shipping-block'));
        //this.echo(this.getHTML('span.h-text-lowercase'));

    }else{
        this.echo('Not Found')
    }
    // this.echo(this.getTitle());
});
//
// casper.thenOpen('https://www.walmart.com/ip/Nintendo-Switch-Gaming-Console-with-Neon-Blue-and-Neon-Red-Joy-Con/55449981', function() {
//     this.echo(this.getTitle());
//     if (this.exists('.prod-fulfillment-messaging-text')) {
//         this.echo(this.getHTML('.prod-fulfillment-messaging-text'));
//
//
//     }else{
//         this.echo('Not Found')
//     }
// });
//
//
// casper.thenOpen('http://www.gamestop.com/nintendo-switch/consoles/nintendo-switch-console-with-gray-joy-con/141820', function() {
//     this.echo(this.getTitle());
//     if (this.exists('.buttonna')) {
//         this.echo(this.getHTML('.buttonna'));
//
//
//     }else{
//         this.echo(this.getHTML('.button .qq'));
//     }
// });
//
//
// casper.thenOpen('http://www.gamestop.com/nintendo-switch/consoles/nintendo-switch-console-with-neon-blue-and-neon-red-joy-con/141887', function() {
//     this.echo(this.getTitle());
//     if (this.exists('.buttonna')) {
//         this.echo(this.getHTML('.buttonna'));
//
//
//     }else{
//         this.echo(this.getHTML('a[data-availability="A"]'));
//     }
// });


// casper.thenOpen('http://www.bestbuy.com/site/nintendo-switch-32gb-console-gray-joy-con/5670003.p', function() {
//     this.echo(this.getTitle());
//     if (this.exists('div[class="cart-button"]')) {
//         this.echo(this.getElementAttribute('div[class="cart-button"]', 'data-add-to-cart-message'));
//         console.log('hello')
//
//
//     }else{
//         this.echo('not found');
//     }
// });
//
//
// casper.thenOpen('http://www.bestbuy.com/site/nintendo-switch-32gb-console-neon-red-neon-blue-joy-con/5670100.p', function() {
//     this.echo(this.getTitle());
//     if (this.exists('div[class="cart-button"]')) {
//         this.echo(this.getElementAttribute('div[class="cart-button"]', 'data-add-to-cart-message'));
//
//
//     }else{
//         this.echo('not found');
//     }
// });

currentURL = 'http://www.toysrus.com/product/index.jsp?productId=119513636&cp=2255974.119659196&fg=Category&fg=Price&fv=2254197&fv=00010001~-~09999999&ff=Taxonomy&ff=StorePrice&fd=%24100.00+and+up&parentPage=search'
casper.thenOpen(currentURL, function() {
    this.echo(this.getTitle());
    if (this.exists('div[id="productOOS"]')) {
        //this.echo(this.getHTML('div[id="productOOS"]'));
        inStock = false
        readSuccess = true
        console.log('In Stock: ' + inStock);
        console.log('Successfully Read: ' + readSuccess);



    }else if (this.exists('a[name="Add To Cart"]')){
        //this.echo(this.getElementAttribute('a[name="Add To Cart"]', 'class'));
        resultString = this.getElementAttribute('a[name="Add To Cart"]', 'class');
        if(resultString === 'truAddToCart  '){
            inStock = true
            readSuccess = true
            console.log('In Stock: ' + inStock);
            console.log('Successfully Read: ' + readSuccess);
        }


    }else{
        readSuccess = false;
        inStock = null
        console.log('In Stock: ' + inStock);
        console.log('Successfully Read: ' + readSuccess);
    }

});

// currentURL = 'http://www.toysrus.com/product/index.jsp?productId=119513666&cp=2255974.119659196&fg=Category&fg=Price&fv=2254197&fv=00010001~-~09999999&ff=Taxonomy&ff=StorePrice&fd=%24100.00+and+up&parentPage=search'
currentURL = 'http://www.toysrus.com/product/index.jsp?productId=111913616&cp=2255974.22197846.22198136&parentPage=family'
casper.thenOpen(currentURL, function() {
    this.echo(this.getTitle());
    if (this.exists('div[id="productOOS"]')) {
        //this.echo(this.getHTML('div[id="productOOS"]'));
        inStock = false
        readSuccess = true
        console.log('In Stock: ' + inStock);
        console.log('Successfully Read: ' + readSuccess);



    }else if (this.exists('a[name="Add To Cart"]')){
        //this.echo(this.getElementAttribute('a[name="Add To Cart"]', 'class'));
        resultString = this.getElementAttribute('a[name="Add To Cart"]', 'class');
        if(resultString === 'truAddToCart  '){
            inStock = true
            readSuccess = true
            console.log('In Stock: ' + inStock);
            console.log('Successfully Read: ' + readSuccess);
        }


    }else{
        readSuccess = false;
        inStock = null
        console.log('In Stock: ' + inStock);
        console.log('Successfully Read: ' + readSuccess);
    }

});

casper.run();
