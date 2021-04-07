

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
    id: number,
    username: string,
    email: string
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
        this.savepost = this.savepost.bind(this);
        this.unsavepost = this.unsavepost.bind(this);
    }

    state:State = { title: null, image: null };

    AddPostQuery = 'INSERT INTO posts(title, category, image, url, urldomain, tstamp, price, user_name, descript, upvotes, downvotes) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
    CheckUserExistenceQuery = 'SELECT email, username FROM users WHERE email = ? OR username = ? ;';
    DeletePostQuery = 'DELETE FROM posts WHERE id = ? AND user_name = ? ;';
    GetUserPostsQuery = 'SELECT * FROM posts WHERE user_name = ? ;';
    InsertNewSourcePostsQuery = 'INSERT IGNORE INTO posts(postid, title, category, image, url, urldomain, tstamp, price) VALUES(?, ?, ?, ?, ?, ?, ?, ?);';
    GetNewPostIDQuery = 'SELECT id from POSTS WHERE user_name = ? AND tstamp = ? ;'
    AddSavePostQuery = 'INSERT INTO savedposts(post_id, post_user_name, savetousername) VALUES(?, ?, ?);'
    RemoveSavedPostQuery = 'DELETE FROM savedposts WHERE post_id = ? AND post_user_name = ? AND savetousername = ? ;';

    create = (request:any, response:any) => {

        const { body: { email, username, url, category, price, descript } } = request.body;

        SQL.query(this.CheckUserExistenceQuery, [
            
            email, username

        ], async (err:any, results:any) => {
            if (err) response.send({message: 'There has been an error.'})
            if (!err) {
                if (results.length === 0) response.send({message: 'You are not a valid user.'});

                if (results.length === 1) {
                    const PostedTime = Date.now();

                    await this.scrapeProduct(url).then((resp) => {
                        
                        SQL.query(this.AddPostQuery, [
                            // title, the other one is for the image. this is efficient though. Ihave to develop a sort of state like react.
                            this.state.title, category, this.state.image, url,
                            this.getURLDomain(url), PostedTime, price, username,
                            descript, 0, 0
                            
                        ], (err:any, results:any) => {
                            if (err) response.send({message: 'There has been an error.', err:null });
                            if (!err) {
                                SQL.query(this.GetNewPostIDQuery, [

                                    username, PostedTime

                                ], (err, results:{id:number}) => {
                                    if (err) response.send({message: 'There has been an error.', err: err, status: 400})
                                    if (!err) {
                                        response.send({message: 'Post has been created.', status: 210, redirecturl:`http://localhost:3000/users/${username}/${results[0].id}`});
                                    } 
                                })
                            }
                        });
                    })
                }
            }
        })
    }

    delete = (request:any, response:any) => {

        const requestBody:deleteBody = request.body;

        SQL.query(this.CheckUserExistenceQuery, [

            requestBody.email, requestBody.username

        ], (err, results: any) => {
            if (err) response.send({message: 'There has been an error.' , err: err, status: 400});
            if (!err) {
                if (results.length === 0) response.send({message: 'You are not a vlaid user!', err:null, status: 400});
                if (results.length === 1) {
                    SQL.query(this.DeletePostQuery, [

                        requestBody.id, requestBody.username

                    ], (err:any, results:any) => {
                        if (err) response.send({message: 'There has been an error.', err: err, status: 400});
                        if(!err) response.send({message: 'Post successsfully created!', err: null, status: 210, redirecturl: `https://localhost:3000/users${requestBody.username}`})
                    })
                }
            }
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
                }).then((ScrapedData:{title:string, image:string}) => {
                    Browser.close();
                    this.state = ScrapedData;
                })

            } else if (WalmartTest) {
                await Page.evaluate(() => {
                    const title = document.querySelector('.hf-Bot').children[1].innerHTML;
                    const image = 'https:' + document.querySelector('.hover-zoom-hero-image').getAttribute('src');
                    return { title, image };
                }).then((ScrapedData:{title:string, image:string}) => {
                    Browser.close();
                    this.state = ScrapedData;
                })
                
                
            } else if (StaplesTest) {
                console.log(url)
                await Page.evaluate( () => {
                    const title = document.querySelector<HTMLElement>('#product_title').innerText;
                    const image = document.querySelector<HTMLImageElement>('.image-gallery-ux2dot0__image_element').currentSrc
                    return { title, image }
                }).then((ScrapedData) => {
                    Browser.close();
                    this.state = ScrapedData;
                })
                
            } else if (BHphotovideoTest) {
                await Page.evaluate(() => {
                    const title = document.querySelector('[data-selenium=productTitle]').innerHTML
                    const image = document.querySelector('[data-selenium=inlineMediaMainImage]').getAttribute('src');
                    return { title, image };
                }).then((ScrapedData:{title:string, image:string}) => {
                    Browser.close();
                    this.state = ScrapedData;
                })
                
            } else if (OfficedepotTest) {
                await Page.evaluate(() => {
                    const title = document.querySelector<HTMLElement>('.fn').innerText.trim();
                    const image = document.querySelector('[itemprop=image]').getAttribute('src');
                    return { title, image };
                }).then((ScrapedData:{title:string, image:string}) => {
                    Browser.close();
                    this.state = ScrapedData;
                })
                
            }

        } else {
            await Axios.get(url)
            .then((html) => {
                const $Cheerio = Cheerio.load(html.data);
                    
                if (NeweggTest) {
                    return {
                        image: $Cheerio('.product-view-img-original').attr('src'),
                        title: $Cheerio('.product-title').text()
                    }
                } else if (MonopriceTest) {
                    return {
                        image: $Cheerio('#mono4').attr('src'),
                        title: $Cheerio('.product-name').text()
                    }
                } else if (CyberpowerPCTest) {
                    const BaseURL = 'https://www.cyberpowerpc.com/'
                    return {
                        image: `${BaseURL}${$Cheerio('#showbigimg').attr('src')}`,
                        title: $Cheerio('.conf-sys-name').text()
                    }
                } else if (DellTest) {
                    const primarytitlevariant = $Cheerio('.pg-title').children('div').children('h1').children('span').text()
                    const secondarytitlevariant = $Cheerio('.cf-pg-title').children('span').text()
                    const HandleTitleVariants = primarytitlevariant ? primarytitlevariant : secondarytitlevariant

                    return {
                        image: `https:${$Cheerio('[data-testid=sharedPolarisHeroPdImage]').attr('src')}`,
                        title: HandleTitleVariants
                    }
                } else if (LenovoTest) {
                    return {
                        title: $Cheerio('[itemprop=name]').text(),
                        image: `https://www.lenovo.com${$Cheerio('.subSeries-Hero').attr('src')}`
                    }
                } else if (TargetTest) {
                    return {
                        title: $Cheerio('[data-test=product-title]').text(),
                        image: $Cheerio('.slideDeckPicture').children().first().children().first().children().first().children().first().attr('src')
                    }
                } else if (EbayTest) {
                    return {
                        title: $Cheerio('#itemTitle').text().replace(/Details about  /gi, '').trim(),
                        image: $Cheerio('#icImg').attr('src')
                    }
                } else if (MicrocenterTest) {
                    return {
                        title: $Cheerio('#details').children('h1').children('span').children('span').text(),
                        image: $Cheerio('.productImageZoom').attr('src')
                    }
                } else if (JBLTest) {
                    return {
                        title: $Cheerio('[itemprop=name]').text(),
                        image: $Cheerio('[itemprop=image]').attr('src')
                    }
                } else if (WootTest) {
                    return {
                        title: $Cheerio('#attribute-selector').children('header').children('h1').text(),
                        image: $Cheerio('#gallery').children().first().children('img').attr('src')
                    }
                } else if (BestbuyTest) {
                    return {
                        title: $Cheerio('[itemprop=name]').children('h1').text(),
                        image: $Cheerio('.primary-image').attr('src')
                    }
                }
            })
            .then((ScrapedData) => {
                this.state = ScrapedData
            })
            .catch((err) => {console.log(err)})
        }


    }

    unsavepost = (request, response) => {

        const { email, post_id, post_user_name, username } = request.body

        SQL.query(this.CheckUserExistenceQuery, [

            email, username

        ], (err, results) => {
            if (err) response.send({ message: 'There has been an error.', err: err })
            if (!err) {
                SQL.query(this.RemoveSavedPostQuery, [

                    post_id, post_user_name, username

                ], (err, results) => {
                    if (err) response.send({ message: 'There has been an error.', err: err, status: 400 })
                    if (!err) response.send({ message: 'The post has been unsaved.', err:null, status: 210 })
                })
            }
        })
    }

    savepost = (request, response) => {

        const { email, post_id, post_user_name, username } = request.body

        SQL.query(this.CheckUserExistenceQuery, [

            email, username

        ], (err, results) => {
            if (err) response.send({ message: 'There has been an error' })
            if (!err) {
                SQL.query(this.AddSavePostQuery, [

                    post_id, post_user_name, username

                ], (err, results) => {
                    if (err) response.send({ message: 'There has been an error.', err: err, status: 400 })
                    if (!err) response.send({ message: 'The post has been saved.', err:null, status: 210 })
                })
            }
        })
    }

    


};

export default Post;