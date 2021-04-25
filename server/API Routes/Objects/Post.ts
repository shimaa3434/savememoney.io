const Axios = require("axios");
const Cheerio = require('cheerio');
var SQL = require('../../DBConnection');
var Request = require('request');

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
    }

    AddPostQuery = 'INSERT INTO posts(title, category, image, url, urldomain, tstamp, price) VALUES(?, ?, ?, ?, ?, ?, ?);';
    VerifyUserQuery = 'SELECT email FROM users WHERE email = ? AND username = ? ;';
    DeletePostQuery = 'DELETE FROM posts WHERE title = ? AND username = ? ;';
    GetUserPostsQuery = 'SELECT * FROM posts WHERE user_name = ? ;';
    InsertNewSourcePostsQuery = 'INSERT IGNORE INTO posts(postid, title, category, image, url, urldomain, tstamp, price) VALUES(?, ?, ?, ?, ?, ?, ?, ?);'; 

    create = (request:any, response:any) => {

        const requestBody:createBody = request.body;

        SQL.query(this.VerifyUserQuery, [
            
            requestBody.email, requestBody.username

        ], (err:any, results:any) => {
            if (err) response.send({message: 'There has been an error.'})
            if (!err) {
                if (results.length === 0) response.send({message: 'You are not a valid user.'});

                if (results.length === 1) {



                    SQL.query(this.AddPostQuery, [
                        
                        requestBody.title, requestBody.category, requestBody.image, requestBody.url,
                        this.getURLDomain(requestBody.url), Date.now(), requestBody.price
                        
                    ], (err:any, results:any) => {
                        if (err) response.send({message: 'There has been an error.'});
                        if (!err) response.send({message: 'Your post has been posted!'});
                    });
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
        if (!WWWTest) {return UncleanDomain[0]}

    }

    getProductTitleAndImage = (url:string) => {
        return Request(url, (err, response, html) => {
            if (err) console.log(err);
            if (!err) {
                const $Cheerio = Cheerio.load(html);
                const NeweggTest = /newegg\.com/g.test(url);
                const MonopriceTest = /monoprice\.com/g.test(url);
                const CyberpowerPCTest = /cyberpowerpc\.com/g.test(url);
                const DellTest = /dell\.com/g.test(url);
                const LenovoTest = /lenovo\.com/gi.test(url);
                const TargetTest = /target\.com/gi.test(url);
                const EbayTest = /ebay\.com/gi.test(url)
                const MicrocenterTest = /microcenter\.com/gi.test(url)
                const JBLTest = /jbl\.com/gi.test(url)
                const ZotacStoreTest = /zotacstore\.com/gi.test(url)
                const WalmartTest = /walmart\.com/gi.test(url);
                
                if (NeweggTest) {
                    return {
                        image: $Cheerio('.product-view-img-original').attr('src'),
                        title: $Cheerio('.product-title').text()
                    }
                    
                } else if (MonopriceTest) {
                    return {
                        image: $Cheerio('.img-responsive').attr('src'),
                        title: $Cheerio('.product-name').text()
                    }
                } else if (CyberpowerPCTest) {
                    const BaseURL = 'https://www.cyberpowerpc.com/'
                    return {
                        image: `${BaseURL}${$Cheerio('#showbigimg').attr('src')}`,
                        title: $Cheerio('.conf-sys-name').text()
                    }
                } else if (DellTest) {
                    return {
                        image: `${'https:'}${$Cheerio('#mgal-img-1').children().first().attr('src')}`,
                        title: $Cheerio('.pg-title').children().first().children().first().text()
                    }
                } else if (LenovoTest) {
                    return {
                        title: $Cheerio('.desktopHeader').text(),
                        image: $Cheerio('.hero-pc-img').children().first().attr('src')
                    }
                } else if (TargetTest) {
                    return {
                        title: $Cheerio('[itemprop=name]').children().first().text(),
                        image: $Cheerio('.slideDeckPicture').children().first().children().first().children().first().children().first().attr('src')
                    }
                } else if (EbayTest) {
                    return {
                        title: $Cheerio('#itemTitle').text().split(/Details about  /gi)[1],
                        image: $Cheerio('[itemprop=image]').attr('src')
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
                }
            }
        })
    }

};

export default Post;