import { privateDecrypt } from "node:crypto";

const S3Bucket = require('../../AWS/AWSDetails');
var SQL = require('../../DBConnection');
var Axios = require('axios');

interface Post {
    data: any
}

type Thumbnail = false | string;
type Price = string | number;

const posts = {
    grabNewPosts: async () => {
        await Axios.get('https://www.reddit.com/r/buildapcsales/new.json')
        .then((resp:any) => {
            const Data = resp.data.data.children;
            let count = 1
            Data.map((post:Post, i:number) => {
                const {data} = post;
                const {
                    title, link_flair_text, thumbnail, url,
                    created, domain, name
                } = data;
                const postid = name; // reference ID variable for the query, this will make it more understandable over name variable from reddit.

                // Cleans thumbnails, if thumbnails don't exist, set to false. Takes in the thumbnail key's value of a post.
                const cleanThumbnails = (thumbnail:string):Thumbnail => {
                    const linkRegex = /http/gi;
                    if (linkRegex.test(thumbnail)) return thumbnail
                    if (!linkRegex.test(thumbnail)) return false
                }

                // Pulls price from post titles
                const pullPrice = (title:string) => {
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
                                Number(match.replace(/\$/gi, ''))
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

                // Clean Categories -- if expired, it will remove reddit emotes within the flair category to just 'EXPIRED'
                const cleanCategory = (category:string):string => {
                    const ExpiredRegex = /expired/gi;
                    const ExpRegexTest = ExpiredRegex.test(category);
                    if (ExpRegexTest) return 'EXPIRED'
                    if (!ExpRegexTest) return category
                }

                // Contains INSERT query for SQL Database -- sends each row of data into the db.l
                const insertQuery = (postid:string, title:string, category:string, image:Thumbnail, url:string, urldomain:string, tstamp:number, price:Price) => {
                    const QUERY = `INSERT IGNORE INTO posts(postid, title, category, image, url, urldomain, tstamp, price) VALUES ('${postid}','${title}','${category}','${image}','${url}','${urldomain}','${tstamp}', '${price}')`
                    SQL.query(QUERY, (err:any, results:any) => {

                        if (err) console.log(err);
                        if (!err) console.log(`Post #${count++} data entered to DB.`)
                    })
                }

                insertQuery(
                    postid, title, cleanCategory(link_flair_text),
                    cleanThumbnails(thumbnail), url, domain, created, pullPrice(title)
                )
            })
        })
    }
}

module.exports = posts;