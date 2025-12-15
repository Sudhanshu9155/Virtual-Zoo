import React, { useEffect, useState } from "react";

const RSS_FEEDS = [
  "https://theanimalrescuesite.com/blogs/news/tagged/the-animal-rescue-site.atom",
  "https://worldanimalnews.com/feed/",
  // "https://animalfriendlylife.com.au/feed/"
];

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);

  const fetchRSS = async (url) => {
    const apiURL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
      url
    )}`;
    const response = await fetch(apiURL);
    return response.json();
  };

  // Extract image
  const getImage = (item) => {
    if (item.thumbnail) return item.thumbnail;
    if (item.enclosure?.link) return item.enclosure.link;
    if (item.enclosure?.thumbnail) return item.enclosure.thumbnail;

    const descImg = item.description?.match(/<img[^>]+src="([^">]+)"/);
    if (descImg?.[1]) return descImg[1];

    const contentImg = item.content?.match(/<img[^>]+src="([^">]+)"/);
    if (contentImg?.[1]) return contentImg[1];

    return "https://via.placeholder.com/600x400?text=No+Image";
  };

  useEffect(() => {
    const load = async () => {
      let all = [];

      for (const feed of RSS_FEEDS) {
        const res = await fetchRSS(feed);

        if (res.items) {
          all = [...all, ...res.items];
        }
      }

      all.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
      setArticles(all);
    };

    load();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-2" >
        📰 <span className=" bg-gradient-to-r from-amber-800 to-amber-800 bg-clip-text text-transparent"> Latest Animal News</span>
      </h1>
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="w-[100px] h-0.5 bg-amber-600"></span>
        <span className="text-amber-700 text-2xl">🍃</span>
        <span className="w-[100px] h-0.5 bg-amber-600"></span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((item, i) => (
          <div
            key={i}
            className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl border border-gray-200"
          >
            {/* Image section */}
            <div className="relative">
              <img
                src={getImage(item)}
                className="w-full h-52 object-cover"
                alt={item.title}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <span className="text-white text-xs font-semibold tracking-wide uppercase">
                  {item.author || "News Source"}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900">
                {item.title}
              </h2>

              <p className="text-sm text-gray-600 line-clamp-3">
                {item.description?.replace(/<[^>]+>/g, "")}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {new Date(item.pubDate).toLocaleDateString()}
                </span>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-1.5 rounded-full text-sm bg-amber-800 text-white font-medium hover:bg-amber-700 transition"
                >
                  Read More →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
