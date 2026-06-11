import React, { useState } from 'react';
import { Book, Search, TrendingUp, Star, Users, Clock, ArrowRight, Sparkles, Award, BookOpen, Sun, Moon } from 'lucide-react';

export default function LibraryHomepage() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const featuredBooks = [
    { id: 1, title: "The Midnight Library", author: "Matt Haig", rating: 4.8, readers: "2.5M", cover: "bg-gradient-to-br from-purple-900 to-indigo-900" },
    { id: 2, title: "Atomic Habits", author: "James Clear", rating: 4.9, readers: "3.2M", cover: "bg-gradient-to-br from-orange-500 to-red-600" },
    { id: 3, title: "Project Hail Mary", author: "Andy Weir", rating: 4.7, readers: "1.8M", cover: "bg-gradient-to-br from-blue-600 to-cyan-500" },
    { id: 4, title: "The Silent Patient", author: "Alex Michaelides", rating: 4.6, readers: "2.1M", cover: "bg-gradient-to-br from-gray-800 to-gray-900" }
  ];

  const categories = [
    { name: "Fiction", icon: Book, count: "12.5K", color: "from-orange-400 to-pink-500" },
    { name: "Science", icon: Sparkles, count: "8.3K", color: "from-blue-400 to-cyan-500" },
    { name: "Biography", icon: Users, count: "5.7K", color: "from-purple-400 to-pink-500" },
    { name: "Self-Help", icon: TrendingUp, count: "6.2K", color: "from-green-400 to-emerald-500" }
  ];

  const stats = [
    { label: "Total Books", value: "50K+", icon: Book },
    { label: "Active Readers", value: "125K+", icon: Users },
    { label: "Hours Read", value: "2M+", icon: Clock }
  ];

  const theme = {
    dark: {
      bg: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
      text: 'text-white',
      textSecondary: 'text-gray-300',
      textMuted: 'text-gray-400',
      cardBg: 'bg-white/5',
      cardBorder: 'border-white/10',
      cardHover: 'hover:bg-white/10',
      searchBg: 'bg-white/10',
      searchBorder: 'border-white/20',
      heroGradient: 'from-orange-500/20 via-transparent to-purple-500/20'
    },
    light: {
      bg: 'bg-gradient-to-br from-orange-50 via-white to-orange-50',
      text: 'text-gray-900',
      textSecondary: 'text-gray-700',
      textMuted: 'text-gray-600',
      cardBg: 'bg-white',
      cardBorder: 'border-orange-100',
      cardHover: 'hover:bg-orange-50',
      searchBg: 'bg-white',
      searchBorder: 'border-orange-200',
      heroGradient: 'from-orange-100 via-transparent to-orange-100'
    }
  };

  const t = isDarkMode ? theme.dark : theme.light;

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} transition-colors duration-300`}>
      {/* Theme Toggle Button */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-3 rounded-xl ${t.cardBg} border ${t.cardBorder} ${t.cardHover} transition-all shadow-lg`}
        >
          {isDarkMode ? (
            <Sun className="w-6 h-6 text-orange-400" />
          ) : (
            <Moon className="w-6 h-6 text-orange-600" />
          )}
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${t.heroGradient}`}></div>
        <div className="absolute inset-0" style={{
          backgroundImage: isDarkMode 
            ? 'radial-gradient(circle at 20% 50%, rgba(251, 146, 60, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 50%, rgba(251, 146, 60, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)'
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center mb-16 space-y-6">
            <div className={`inline-flex items-center gap-2 px-4 py-2 ${isDarkMode ? 'bg-orange-500/10 border-orange-500/20' : 'bg-orange-100 border-orange-200'} border rounded-full mb-4`}>
              <Sparkles className={`w-4 h-4 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              <span className={`text-sm ${isDarkMode ? 'text-orange-300' : 'text-orange-700'}`}>Welcome to Your Digital Library</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-400 via-orange-300 to-orange-500 bg-clip-text text-transparent mb-6">
              Explore Infinite Stories
            </h1>
            <p className={`text-xl ${t.textSecondary} max-w-2xl mx-auto`}>
              Discover thousands of books, connect with readers worldwide, and embark on endless literary adventures
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mt-8">
              <div className="relative group">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${t.textMuted} w-5 h-5`} />
                <input
                  type="text"
                  placeholder="Search for books, authors, or genres..."
                  className={`w-full pl-12 pr-4 py-4 ${t.searchBg} backdrop-blur-sm border ${t.searchBorder} rounded-2xl ${t.text} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm`}
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-2 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all flex items-center gap-2 text-white">
                  Search <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {stats.map((stat, idx) => (
              <div key={idx} className={`${t.cardBg} backdrop-blur-sm border ${t.cardBorder} rounded-2xl p-6 ${t.cardHover} transition-all group cursor-pointer shadow-sm`}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl group-hover:scale-110 transition-transform">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-orange-500">{stat.value}</p>
                    <p className={t.textMuted}>{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Books */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Award className="w-8 h-8 text-orange-500" />
              Trending This Week
            </h2>
            <p className={t.textMuted}>Most popular books among our readers</p>
          </div>
          <button className="text-orange-500 hover:text-orange-600 flex items-center gap-2 transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <div
              key={book.id}
              onMouseEnter={() => setHoveredCard(book.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className={`${book.cover} aspect-[3/4] rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-lg`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-orange-500/90 rounded-full text-sm font-semibold text-white">
                      <Star className="w-4 h-4 fill-current" />
                      {book.rating}
                    </div>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-1 text-white">{book.title}</h3>
                    <p className="text-sm text-gray-200 mb-2">{book.author}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-200">
                      <Users className="w-4 h-4" />
                      {book.readers} readers
                    </div>
                  </div>
                </div>
                <div className={`mt-4 transition-all duration-300 ${hoveredCard === book.id ? 'opacity-100' : 'opacity-0'}`}>
                  <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center gap-2 text-white shadow-md">
                    <BookOpen className="w-4 h-4" />
                    Start Reading
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Book className="w-8 h-8 text-orange-500" />
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className={`group relative ${t.cardBg} backdrop-blur-sm border ${t.cardBorder} rounded-2xl p-8 ${t.cardHover} transition-all cursor-pointer overflow-hidden shadow-sm`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
              <div className="relative">
                <div className={`inline-flex p-4 bg-gradient-to-br ${cat.color} rounded-xl mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                  <cat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
                <p className={t.textMuted}>{cat.count} books</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-12 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-transparent"></div>
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-white">Start Your Reading Journey Today</h2>
            <p className="text-lg mb-8 text-orange-50">Join millions of readers and discover your next favorite book</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all flex items-center gap-2 shadow-lg">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all text-white shadow-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}