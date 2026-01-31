
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Search } from 'lucide-react';
import { DogPost } from '../types';
import { translations, Lang } from '../translations';

const MOCK_POSTS: DogPost[] = [
  { id: '1', author: 'רוני כהן', dogName: 'לוקה', content: 'מישהו בגינת הכלבים ברחוב הרצל? לוקה מחפשת חברים למשחקים!', image: 'https://picsum.photos/seed/dog1/600/400', timestamp: 'לפני 15 דקות', likes: 12, comments: 3 },
  { id: '2', author: 'מיכל לוי', dogName: 'צ׳ארלי', content: 'מצאנו את המותג אוכל הזה בחנות החדשה בפינה, צ׳ארלי פשוט עף על זה!', image: 'https://picsum.photos/seed/dog2/600/400', timestamp: 'לפני שעה', likes: 45, comments: 8 },
  { id: '3', author: 'דניאל גרין', dogName: 'רקס', content: 'טיפ יומי: אל תשכחו למלא מים טריים לפני היציאה לגינה היום, חם מאוד בחוץ!', timestamp: 'לפני 3 שעות', likes: 89, comments: 12 }
];

interface FeedProps { lang: Lang; }

const Feed: React.FC<FeedProps> = ({ lang }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const t = translations[lang];

  const filteredPosts = MOCK_POSTS.filter(post => 
    post.dogName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShare = async (post: DogPost) => {
    const shareData = {
      title: t.appTitle,
      text: `${post.dogName}: ${post.content}`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error("Error sharing:", err);
        }
      }
    } else {
      const shareMsg = lang === 'he' ? 'שיתוף פוסט של' : 'Sharing post by';
      alert(`${shareMsg} ${post.dogName}: \n\n${post.content}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Filter */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 sticky top-20 z-10">
        <div className="relative">
          <Search className={`absolute ${lang === 'he' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400`} />
          <input 
            type="text" 
            placeholder={t.searchDog}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full bg-slate-100 dark:bg-slate-800 rounded-xl py-3 ${lang === 'he' ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all dark:text-white dark:border-slate-700 border border-transparent`}
          />
        </div>
      </div>

      {/* Posts List */}
      {filteredPosts.length > 0 ? filteredPosts.map((post) => (
        <article key={post.id} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center font-bold text-orange-600 dark:text-orange-400">
                {post.author[0]}
              </div>
              <div>
                <h3 className="font-semibold text-sm leading-none dark:text-slate-100">{post.author}</h3>
                <span className="text-xs text-slate-500 mt-1 block">{post.dogName} • {post.timestamp}</span>
              </div>
            </div>
          </div>
          
          <div className="px-4 pb-3">
            <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed">{post.content}</p>
          </div>

          {post.image && (
            <img src={post.image} className="w-full aspect-video object-cover" alt="Post" loading="lazy" />
          )}

          <div className="px-4 py-3 flex items-center justify-between border-t border-slate-50 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 text-slate-500 hover:text-red-500 dark:hover:text-red-400" aria-label={t.likes}>
                <Heart className="w-5 h-5" />
                <span className="text-xs font-medium">{post.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 text-slate-500 hover:text-blue-500 dark:hover:text-blue-400" aria-label={t.comments}>
                <MessageCircle className="w-5 h-5" />
                <span className="text-xs font-medium">{post.comments}</span>
              </button>
            </div>
            <button 
              onClick={() => handleShare(post)}
              className="text-slate-500 hover:text-orange-500 dark:hover:text-orange-400"
              aria-label="Share post"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </article>
      )) : (
        <div className="text-center py-12 text-slate-400">
          <p>{lang === 'he' ? `לא נמצאו כלבים בשם "${searchTerm}"` : `No dogs found named "${searchTerm}"`}</p>
        </div>
      )}
    </div>
  );
};

export default Feed;
