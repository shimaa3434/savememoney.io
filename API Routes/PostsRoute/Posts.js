const SQL = require('../../DBConnection');
const Axios = require('axios');

const Posts = {
    grabNewPosts: async () => {
        const Response = await Axios.get('https://www.reddit.com/r/buildapcsales/new.json')
        .then((resp) => {
            const Data = resp.data.data.children;
            let count = 1
            Data.map((post, i) => {
                const {data} = post;
                const {
                    title, link_flair_text, thumbnail, url,
                    created, domain, name
                } = data;
                const postid = name; // reference ID variable for the query, this will make it more understandable over name variable from reddit.

                // Cleans thumbnails, if thumbnails don't exist, set to false. Takes in the thumbnail key's value of a post.
                const cleanThumbnails = (thumbnail) => {
                    const linkRegex = /http/gi;
                    if (linkRegex.test(thumbnail)) return thumbnail
                    if (!linkRegex.test(thumbnail)) return false
                }

                // Pulls price from post titles
                const pullPrice = (title) => {
                    const PriceRegexF = /\$[0-9]*\.[0-9]*/gi;
                    const PriceRegexS = /[0-9]*\.[0-9]*\$/gi;
                    const DollarRegex  = /\$/gi;
                    if (PriceRegexF.test(title)) {
                        const conditionMatch = title.match(PriceRegexF)
                        console.log(conditionMatch)
                        if (conditionMatch.length === 1) return Number(conditionMatch[0].replace(/\$/gi, ''));
                        if (conditionMatch.length > 1) {
                            const cleanMatches = conditionMatch.map((match) => {
                                Number(match.replace(/\$/gi, ''))
                                    return Number(match.replace(/\$/gi, ''))
                            })
                            return `${cleanMatches.sort()[0]}`
                        }
                    } else if (PriceRegexS.test(title)) {
                        const conditionMatch = title.match(PriceRegexS)

                        if (conditionMatch.length === 1) return Number(conditionMatch[0].replace(/$/gi, ''));
                        if (conditionMatch.length > 1) {
                            const cleanMatches = conditionMatch.map((match) => {
                                return Number(match.replace(/\$/gi, ''))
                            })
                            return `${cleanMatches.sort()[0]}`
                        }
                    } else if (!PriceRegexF.test(title) && !PriceRegexS.test(title)) return 'CHECK TITLE'
                }

                // Clean Categories -- if expired, it will remove reddit emotes within the flair category to just 'EXPIRED'
                const cleanCategory = (category) => {
                    const ExpiredRegex = /expired/gi;
                    const ExpRegexTest = ExpiredRegex.test(category);
                    if (ExpRegexTest) return 'EXPIRED'
                    if (!ExpRegexTest) return category
                }

                // Contains INSERT query for SQL Database -- sends each row of data into the db.
                const insertQuery = (postid, title, category, image, url, urldomain, tstamp, price) => {
                    const QUERY = `INSERT IGNORE INTO posts(postid, title, category, image, url, urldomain, tstamp, price) VALUES ('${postid}','${title}','${category}','${image}','${url}','${urldomain}','${tstamp}', '${price}')`
                    SQL.query(QUERY, (err, results) => {

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

module.exports = Posts;