import React from 'react';
import { Search, Compass, Sparkles, MapPin, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onQuickFilterGem: () => void;
  onOpenItinerary: () => void;
  onScrollToDestinations: () => void;
  totalGemsCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onQuickFilterGem,
  onOpenItinerary,
  onScrollToDestinations,
  totalGemsCount
}) => {
  return (
    <div className="relative bg-gradient-to-b from-forest-950 via-forest-900 to-forest-800 text-ivory-100 overflow-hidden pt-12 pb-20 border-b border-forest-700">
      
      {/* Subtle Editorial Background Texture & Decorative Elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C3532B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-saffron-600/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-forest-600/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Magazine Masthead Tag */}
        <div className="flex items-center justify-between border-b border-forest-700/80 pb-4 mb-8 text-xs uppercase tracking-widest text-forest-200">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-saffron-500 animate-pulse" />
            <span className="font-semibold text-ivory-200">Ambala Cultural Heritage Survey</span>
          </div>
          <div className="hidden sm:block text-forest-300 font-mono text-[11px]">
            HARYANA, INDIA • 30.3782° N, 76.7767° E
          </div>
        </div>

        {/* Main Editorial Content */}
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-forest-800/80 border border-forest-600 text-saffron-400 text-xs font-semibold mb-6 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover Beyond the Famous — Authentic Ambala</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            Ambala’s Untold Stories, <br className="hidden sm:inline" />
            <span className="italic font-normal text-saffron-400">Sacred Waters</span> &amp; Living Bazaars.
          </h1>

          <p className="text-base sm:text-lg text-ivory-200/90 font-light max-w-2xl mx-auto leading-relaxed mb-8">
            Most travelers pass through Ambala on the Grand Trunk highway. Few discover the quiet 1843 cemetery harboring Boer War captives, the first spark of 1857 that ignited 9 hours before Meerut, or the childhood courtyard of Mata Gujri Ji.
          </p>

          {/* Interactive Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-charcoal-400 group-focus-within:text-saffron-500 transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={e => onSearchChange(e.target.value)}
                placeholder="Search European Cemetery, Cloth Market, Panjokhara Sahib, 1857 Mutiny..."
                className="w-full pl-12 pr-28 py-4 bg-white/95 text-charcoal-900 rounded-2xl placeholder-charcoal-500 shadow-2xl focus:outline-none focus:ring-4 focus:ring-saffron-500/30 text-sm sm:text-base border border-ivory-300 transition-all font-sans"
                aria-label="Search Ambala destinations by name, history or tags"
              />
              {searchQuery ? (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-charcoal-500 hover:text-charcoal-800 px-3 py-1 my-auto rounded-lg bg-ivory-200"
                >
                  Clear
                </button>
              ) : (
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <span className="text-[11px] font-medium text-charcoal-400 bg-ivory-100 border border-ivory-300 px-2 py-1 rounded">
                    Quick Search
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onQuickFilterGem}
              className="px-4 py-2.5 rounded-xl bg-forest-800/80 hover:bg-forest-700 text-ivory-100 border border-forest-600 text-xs sm:text-sm font-medium transition-all flex items-center space-x-2 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-saffron-500" />
              <span>Explore {totalGemsCount} Hidden Gems</span>
            </button>

            <button
              onClick={onOpenItinerary}
              className="px-5 py-2.5 rounded-xl bg-saffron-600 hover:bg-saffron-500 text-white text-xs sm:text-sm font-semibold shadow-gold hover:shadow-lg transition-all flex items-center space-x-2"
            >
              <Compass className="w-4 h-4" />
              <span>Plan My Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onScrollToDestinations}
              className="px-4 py-2.5 rounded-xl text-ivory-200 hover:text-white hover:bg-forest-800/50 text-xs sm:text-sm font-medium transition-all"
            >
              Browse All 14 Sites ↓
            </button>
          </div>

        </div>

        {/* Heritage Trust Marks */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-forest-700/60 text-center">
          <div className="p-3 rounded-xl bg-forest-900/40 border border-forest-700/40">
            <div className="text-xl sm:text-2xl font-serif font-bold text-saffron-400">1843 – Present</div>
            <div className="text-[11px] text-forest-200 uppercase tracking-wider mt-0.5">Verified Historic Context</div>
          </div>
          <div className="p-3 rounded-xl bg-forest-900/40 border border-forest-700/40">
            <div className="text-xl sm:text-2xl font-serif font-bold text-white">4 Sikh Gurus</div>
            <div className="text-[11px] text-forest-200 uppercase tracking-wider mt-0.5">Sanctified Shrines</div>
          </div>
          <div className="p-3 rounded-xl bg-forest-900/40 border border-forest-700/40">
            <div className="text-xl sm:text-2xl font-serif font-bold text-saffron-400">1,000+ Shops</div>
            <div className="text-[11px] text-forest-200 uppercase tracking-wider mt-0.5">Asia’s Textile Heart</div>
          </div>
          <div className="p-3 rounded-xl bg-forest-900/40 border border-forest-700/40">
            <div className="text-xl sm:text-2xl font-serif font-bold text-white">100% Free / Nominal</div>
            <div className="text-[11px] text-forest-200 uppercase tracking-wider mt-0.5">Public Access Heritage</div>
          </div>
        </div>

      </div>
    </div>
  );
};
