

const Axios = require("axios");
const Cheerio = require('cheerio');
var SQL = require('../../DBConnection');
var Request = require('request');
const Puppeteer = require('puppeteer-extra')

interface createBody {
    title: string,
    category: string,
    image: string | null,
    url: string,
    tstamp: Date,
    price: number | string,
    email: string,
    username: string
}

interface deleteBody {
    email: string,
    username: string,
    title: string
}

interface getuserpostsBody {
    username: string,
    email: string
}

interface State {
    title: null | string,
    image: null | string
}

class Post {
    constructor() {
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
        this.getUserPosts = this.getUserPosts.bind(this);
        this.getNewPosts = this.getNewPosts.bind(this);
        this.cleanThumbnails = this.cleanThumbnails.bind(this);
        this.cleanCategory = this.cleanCategory.bind(this);
        this.findPrice = this.findPrice.bind(this);
        this.getURLDomain = this.getURLDomain.bind(this);
        this.scrapeProduct = this.scrapeProduct.bind(this);
    }

    state:State = { title: null, image: null };

    AddPostQuery = 'INSERT INTO posts(title, category, image, url, urldomain, tstamp, price, user_name) VALUES(?, ?, ?, ?, ?, ?, ?, ?);';
    CheckUserExistenceQuery = 'SELECT email FROM users WHERE email = ? OR username = ? ;';l
    DeletePostQuery = 'DELETE FROM posts WHERE title = ? AND username = ? ;';
    GetUserPostsQuery = 'SELECT * FROM posts WHERE user_name = ? ;';
    InsertNewSourcePostsQuery = 'INSERT IGNORE INTO posts(postid, title, category, image, url, urldomain, tstamp, price) VALUES(?, ?, ?, ?, ?, ?, ?, ?);'; 

    create = (request:any, response:any) => {

        const requestBody:createBody = request.body;

        SQL.query(this.CheckUserExistenceQuery, [
            
            requestBody.email, requestBody.username

        ], async (err:any, results:any) => {
            if (err) response.send({message: 'There has been an error.'})
            if (!err) {
                if (results.length === 0) response.send({message: 'You are not a valid user.'});

                if (results.length === 1) {

                    await this.scrapeProduct(requestBody.url).then((resp) => {
                        
                        SQL.query(this.AddPostQuery, [
                            // title, the other one is for the image. this is efficient though. Ihave to develop a sort of state like react.
                            this.state.title, requestBody.category, this.state.image, requestBody.url,
                            this.getURLDomain(requestBody.url), Date.now(), requestBody.price, requestBody.username
                            
                        ], (err:any, results:any) => {
                            if (err) response.send({message: 'There has been an error.'});
                            if (!err) response.send({message: 'Your post has been posted!'});
                        });
                    })
                }
            }
        })
    }

    delete = (request:any, response:any) => {

        const requestBody:deleteBody = request.body;

        SQL.query(this.DeletePostQuery, [

            requestBody.title, requestBody.username

        ], (err:any, results:any) => {
            if (err) response.send({message: 'There has been an error.'})
            if (!err) response.send({message: 'Your post has been deleted.'})
        })
    }

    getUserPosts = (request:any, response:any) => {

        const requestBody:getuserpostsBody = request.body;

        SQL.query(this.GetUserPostsQuery, [

            requestBody.username

        ], (err:any, results:any) => {
            if (err) response.send({message: 'There has been an error.'});
            if (!err) response.send(results);
        })
    }

    getNewPosts = async () => {
        await Axios.get('https://www.reddit.com/r/buildapcsales/new.json')
        .then((response:any) => {
            const Posts = response.data.data.children;
            let count = 1;
            Posts.map((Post:any) => {
                
                const { data } = Post;
                const {
                    title, link_flair_text, thumbnail, url, created, domain, name
                } = data;
                const postid = name;

                SQL.query(this.InsertNewSourcePostsQuery, [

                    postid, title, this.cleanCategory(link_flair_text),
                    this.cleanThumbnails(thumbnail), url, domain, created,
                    this.findPrice(title)

                ], (err:any, results:any) => {
                    if (err) console.log(err);
                    if (!err) console.log(`Post #${count++} data entered into the Database.`);
                });

            });
        });
    };

    cleanThumbnails = (thumbnailsrc:string):false | string => {
        const LinkRegex = /http/gi;
        if (LinkRegex.test(thumbnailsrc)) return thumbnailsrc;
        if (!LinkRegex.test(thumbnailsrc)) return false;
    };

    cleanCategory = (category:string):string => {
        const ExpiredRegexTest = /expired/gi.test(category);
        if (ExpiredRegexTest) return 'EXPIRED';
        if (!ExpiredRegexTest) return category;
    };

    findPrice = (title:string) => {
        const PriceRegexFV1 = /\$[0-9]*\.[0-9]*/gi;
        const PriceRegexFV2 = /\$[0-9]*\.[0-9]*/gi;
        const PriceRegexS = /[0-9]*\.[0-9]*\$/gi;
        const PriceRegexThousandsV1 = /\$[0-9],[0-9]{0,3}/gi;
        const NoDollarRegex = /\$[0-9]{0,4}/gi;
        const DollarRegex = /\$/gi;
        if (PriceRegexFV1.test(title)) {
            const conditionMatch = title.match(PriceRegexFV1)
            if (conditionMatch.length === 1) return Number(conditionMatch[0].replace(DollarRegex, ''));
            if (conditionMatch.length > 1) {
                const cleanMatches = conditionMatch.map((match) => {
                    return Number(match.replace(DollarRegex, ''))
                })
                return `${cleanMatches.sort()[0]}`
            }
        } else if (PriceRegexS.test(title)) {
            const conditionMatch = title.match(PriceRegexS)
            if (conditionMatch.length === 1) return Number(conditionMatch[0].replace(DollarRegex, ''));
            if (conditionMatch.length > 1) {
                const cleanMatches = conditionMatch.map((match) => {
                    return Number(match.replace(DollarRegex, ''))
                })
                return `${cleanMatches.sort()[0]}`
            }
        } else if (PriceRegexThousandsV1.test(title) || NoDollarRegex.test(title)) {
            const conditionMatch = PriceRegexThousandsV1.test(title) ? title.match(PriceRegexThousandsV1) : title.match(NoDollarRegex);
            if (conditionMatch.length === 1) return Number(conditionMatch[0].replace(DollarRegex, ''));
            if (conditionMatch.length > 1) {
                const cleanMatches = conditionMatch.map((match) => {
                    return Number(match.replace(DollarRegex, ''))
                })
                return `${cleanMatches.sort()[0]}`
            }
        } else if (!PriceRegexFV1.test(title) &&
            !PriceRegexS.test(title) &&
            !PriceRegexThousandsV1.test(title) &&
            !NoDollarRegex.test(title)
            )
            return 'CHECK TITLE'
    }

    getURLDomain = (url:string) => {
        const UncleanDomain = url.split(/\//gi)[2];
        const WWWTest = (/www\./g).test(UncleanDomain);
        // Example of the split. ["https:", "", "www.newegg.com", "amd-ryzen-7-3700x", "p", "N82E16819113567?Item=N82E16819113567"]
        // The domain will always be the third result.
        if (WWWTest) {return UncleanDomain.split(/www\./gi)[1]}
        if (!WWWTest) {return UncleanDomain}

    }

    scrapeProduct = async (url:string) => {

        const StaplesTest = /staples\.com/gi.test(url)
        const WalmartTest = /walmart\.com/gi.test(url);
        const AmazonTest = /amazon\.com/gi.test(url);
        const BHphotovideoTest = /bhphotovideo\.com/gi.test(url);
        const BestbuyTest = /bestbuy\.com/gi.test(url);
        const OfficedepotTest = /officedepot\.com/gi.test(url);
        const NeweggTest = /newegg\.com/g.test(url);
        const MonopriceTest = /monoprice\.com/g.test(url);
        const CyberpowerPCTest = /cyberpowerpc\.com/g.test(url);
        const DellTest = /dell\.com/g.test(url);
        const LenovoTest = /lenovo\.com/gi.test(url);
        const TargetTest = /target\.com/gi.test(url);
        const EbayTest = /ebay\.com/gi.test(url)
        const MicrocenterTest = /microcenter\.com/gi.test(url)
        const JBLTest = /jbl\.com/gi.test(url)
        const WootTest = /woot\.com/gi.test(url)
        // Zotac Store is currently off limits due to cloudflare ray protections.
        const ZotacStoreTest = /zotacstore\.com/gi.test(url);

        if (OfficedepotTest || BHphotovideoTest || StaplesTest || WalmartTest || AmazonTest) {

            const Browser = await Puppeteer.launch({headless: true});
            const Page = await Browser.newPage();
            await Page.goto(url)
            if (AmazonTest) {
                await Page.evaluate(() => {
                    const title = document.querySelector('#productTitle').innerHTML.trim();
                    const image = document.querySelector('#imgTagWrapperId').children[0].getAttribute('src');
                    return { title, image };
                }).then((objectdata:{title:string, image:string}) => {
                    Browser.close();
                    this.state = objectdata;
                })

            } else if (WalmartTest) {
                await Page.evaluate(() => {
                    const title = document.querySelector('.hf-Bot').children[1].innerHTML;
                    const image = 'https:' + document.querySelector('.hover-zoom-hero-image').getAttribute('src');
                    return { title, image };
                }).then((objectdata:{title:string, image:string}) => {
                    Browser.close();
                    this.state = objectdata;
                })
                
                
            } else if (StaplesTest) {
                console.log(url)
                await Page.evaluate( () => {
                    console.log(document.body.innerHTML)
                    const title = document.querySelector<HTMLElement>('#product_title').innerText;
                    const image = document.querySelector<HTMLImageElement>('.image-gallery-ux2dot0__image_element').currentSrc
                    return { title, image }
                }).then((objectdata) => {
                    Browser.close();
                    this.state = objectdata;
                })
                
            } else if (BHphotovideoTest) {
                await Page.evaluate(() => {
                    const title = document.querySelector('[data-selenium=productTitle]').innerHTML
                    const image = document.querySelector('[data-selenium=inlineMediaMainImage]').getAttribute('src');
                    return { title, image };
                }).then((objectdata:{title:string, image:string}) => {
                    Browser.close();
                    this.state = objectdata;
                })
                
            } else if (OfficedepotTest) {
                await Page.evaluate(() => {
                    const title = document.querySelector<HTMLElement>('.fn').innerText.trim();
                    const image = document.querySelector('[itemprop=image]').getAttribute('src');
                    return { title, image };
                }).then((objectdata:{title:string, image:string}) => {
                    Browser.close();
                    this.state = objectdata;
                })
                
            }

        } else {
            await Axios.get(url)
            .then((html) => {
                const $Cheerio = Cheerio.load(html.data);
                    
                if (NeweggTest) {
                    this.state = {
                        image: $Cheerio('.product-view-img-original').attr('src'),
                        title: $Cheerio('.product-title').text()
                    }
                } else if (MonopriceTest) {
                    this.state = {
                        image: $Cheerio('#mono4').attr('src'),
                        title: $Cheerio('.product-name').text()
                    }
                } else if (CyberpowerPCTest) {
                    const BaseURL = 'https://www.cyberpowerpc.com/'
                    this.state = {
                        image: `${BaseURL}${$Cheerio('#showbigimg').attr('src')}`,
                        title: $Cheerio('.conf-sys-name').text()
                    }
                } else if (DellTest) {
                    const primarytitlevariant = $Cheerio('.pg-title').children('div').children('h1').children('span').text()
                    const secondarytitlevariant = $Cheerio('.cf-pg-title').children('span').text()
                    const HandleTitleVariants = primarytitlevariant ? primarytitlevariant : secondarytitlevariant

                    this.state = {
                        image: `${'https:'}${$Cheerio('[data-testid=sharedPolarisHeroPdImage]').attr('src')}`,
                        title: HandleTitleVariants
                    }
                } else if (LenovoTest) {
                    this.state = {
                        title: $Cheerio('.desktopHeader').text(),
                        image: $Cheerio('.hero-pc-img').children().first().attr('src')
                    }
                } else if (TargetTest) {
                    this.state = {
                        title: $Cheerio('[itemprop=name]').children().first().text(),
                        image: $Cheerio('.slideDeckPicture').children().first().children().first().children().first().children().first().attr('src')
                    }
                } else if (EbayTest) {
                    this.state = {
                        title: $Cheerio('#itemTitle').text().split(/Details about  /gi)[1],
                        image: $Cheerio('[itemprop=image]').attr('src')
                    }
                } else if (MicrocenterTest) {
                    this.state = {
                        title: $Cheerio('#details').children('h1').children('span').children('span').text(),
                        image: $Cheerio('.productImageZoom').attr('src')
                    }
                } else if (JBLTest) {
                    this.state = {
                        title: $Cheerio('[itemprop=name]').text(),
                        image: $Cheerio('[itemprop=image]').attr('src')
                    }
                } else if (WootTest) {
                    this.state = {
                        title: $Cheerio('#attribute-selector').children('header').children('h1').text(),
                        image: $Cheerio('#gallery').children().first().children('img').attr('src')
                    }
                } else if (BestbuyTest) {
                    this.state = {
                        title: $Cheerio('[itemprop=name]').children('h1').text(),
                        image: $Cheerio('.primary-image').attr('src')
                    }
                }
            })
            .catch((err) => {console.log(err)})
        }
    }

};

export default Post;