const Axios = require("axios");

var SQL = require('../../DBConnection');

interface createBody {
    title: string,
    category: string,
    image: string | null,
    url: string,
    urldomain: string,
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
    }

    AddPostQuery = 'INSERT INTO posts(title, category, image, url, urldomain, tstamp, price, email) VALUES(?, ?, ?, ?, ?, ?, ?, ?);';
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
                if (results.length === 1) SQL.query(this.AddPostQuery, [

                    requestBody.title, requestBody.category, requestBody.image, requestBody.url,
                    requestBody.urldomain, requestBody.tstamp, requestBody.price, requestBody.email

                ], (err:any, results:any) => {
                    if (err) response.send({message: 'There has been an error.'})
                    if (!err) response.send({message: 'Your post has been posted!'})
                });
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
                })

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

    
};


export default Post;