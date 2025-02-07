const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// 定义新闻来源
const NEWS_SOURCES = [
    {
        name: '通信世界网',
        url: 'http://www.cww.net.cn/search?key=短信',
        selector: {
            container: '.news-list li',
            title: 'h3 a',
            date: '.date',
            excerpt: '.excerpt'
        }
    },
    // 可以添加更多新闻源
];

async function crawlNews() {
    let allNews = [];
    
    for (const source of NEWS_SOURCES) {
        try {
            const response = await axios.get(source.url);
            const $ = cheerio.load(response.data);
            
            $(source.selector.container).each((i, elem) => {
                if (i < 5) { // 每个来源取前5条
                    const news = {
                        title: $(elem).find(source.selector.title).text().trim(),
                        url: $(elem).find(source.selector.title).attr('href'),
                        date: $(elem).find(source.selector.date).text().trim(),
                        excerpt: $(elem).find(source.selector.excerpt).text().trim(),
                        source: source.name
                    };
                    allNews.push(news);
                }
            });
        } catch (error) {
            console.error(`Error crawling ${source.name}:`, error);
        }
    }
    
    // 保存到 JSON 文件
    fs.writeFileSync('public/data/news.json', JSON.stringify(allNews, null, 2));
}

// 每天凌晨2点执行爬虫
const CronJob = require('cron').CronJob;
new CronJob('0 2 * * *', crawlNews, null, true);

// 首次运行
crawlNews(); 