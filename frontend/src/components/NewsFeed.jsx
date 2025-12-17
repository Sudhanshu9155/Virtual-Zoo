import React, { useEffect, useState } from "react";

const RSS_FEEDS = [
  "https://theanimalrescuesite.com/blogs/news/tagged/the-animal-rescue-site.atom",
  "https://worldanimalnews.com/feed/",
  // "https://animalfriendlylife.com.au/feed/"
];

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

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

      try {
        for (const feed of RSS_FEEDS) {
          const res = await fetchRSS(feed);

          if (res.items) {
            all = [...all, ...res.items];
          }
        }

        all.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
        setArticles(all);
      } catch (err) {
        console.error("Failed to load news feed", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700/80 mb-1">
              Latest from the wild
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-amber-900">
              Animal News & Stories
            </h1>
            <p className="text-sm md:text-base text-gray-600 mt-1 max-w-xl">
              Stay updated with conservation stories, rescues, and wildlife news
              from around the globe.
            </p>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 text-sm">Loading latest news...</p>
        ) : articles.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">
            No news available at the moment. Please try again later.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((item, i) => (
              <article
                key={i}
                className="bg-white rounded-2xl shadow-md border border-amber-100 overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image section */}
                <div className="relative">
                  <img
                    src={getImage(item)}
                    className="w-full h-48 object-cover"
                    alt={item.title}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 flex justify-between items-end">
                    <span className="text-white text-[0.65rem] font-semibold tracking-wide uppercase">
                      {item.author || "News Source"}
                    </span>
                    <span className="text-amber-100 text-[0.65rem]">
                      {new Date(item.pubDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <h2 className="font-semibold text-base md:text-lg mb-2 line-clamp-2 text-gray-900">
                    {item.title}
                  </h2>

                  <p className="text-xs md:text-sm text-gray-600 line-clamp-3 flex-1">
                    {item.description?.replace(/<[^>]+>/g, "")}
                  </p>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-[0.7rem] text-gray-500">
                      {item.categories?.[0] || "Wildlife"}
                    </span>

                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-1.5 rounded-full text-xs md:text-sm bg-amber-700 text-white font-medium hover:bg-amber-800 transition"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsFeed;
