
import React from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { DogPost } from '../types';

const MOCK_POSTS: DogPost[] = [
  {
    id: '1',
    author: 'רוני כהן',
    dogName: 'לוקה',
    content: 'מישהו בגינת הכלבים ברחוב הרצל? לוקה מחפשת חברים למשחקים!',
    image: 'https://picsum.photos/seed/dog1/600/400',
    timestamp: 'לפני 15 דקות',
    likes: 12,
    comments: 3
  },
  {
    id: '2',
    author: 'מיכל לוי',
    dogName: 'צ׳ארלי',
    content: 'מצאנו את המותג אוכל הזה בחנות החדשה בפינה, צ׳ארלי פשוט עף על זה!',
    image: 'https://picsum.photos/seed/dog2/600/400',
    timestamp: 'לפני שעה',
    likes: 45,
    comments: 8
  },
  {
    id: '3',
    author: 'דניאל גרין',
    dogName: 'רקס',
    content: 'טיפ יומי: אל תשכחו למלא מים טריים לפני היציאה לגינה היום, חם מאוד בחוץ!',
    timestamp: 'לפני 3 שעות',
    likes: 89,
    comments: 12
  }
];

const Feed: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Create Post Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <div className="flex gap-3">
          <img src="https://picsum.photos/seed/me/100" className="w-10 h-10 rounded-full bg-slate-200" alt="avatar" />
          <div className="flex-1">
            <input 
              type="text" 
              placeholder="מה הכלב שלך עושה היום?" 
              className="w-full bg-slate-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Posts List */}
      {MOCK_POSTS.map((post) => (
        <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600">
                {post.author[0]}
              </div>
              <div>
                <h3 className="font-semibold text-sm leading-none">{post.author}</h3>
                <span className="text-xs text-slate-500 mt-1 block">עם {post.dogName} • {post.timestamp}</span>
              </div>
            </div>
            <button className="text-slate-400">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          
          <div className="px-4 pb-3">
            <p className="text-slate-800 text-sm leading-relaxed">{post.content}</p>
          </div>

          {post.image && (
            <img src={post.image} className="w-full aspect-video object-cover" alt="Post content" />
          )}

          <div className="px-4 py-3 flex items-center justify-between border-t border-slate-50 mt-1">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 text-slate-500 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
                <span className="text-xs font-medium">{post.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 text-slate-500 hover:text-blue-500 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="text-xs font-medium">{post.comments}</span>
              </button>
            </div>
            <button className="text-slate-500 hover:text-orange-500 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Feed;
