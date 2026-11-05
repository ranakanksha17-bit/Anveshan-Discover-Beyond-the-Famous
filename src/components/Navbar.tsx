import React, { useState } from 'react';
import { Compass, Search, Heart, Award, Menu, X, Calendar, Sparkles } from 'lucide-react';
import { PassportState } from '../types';

export type ActiveTab = 'discover' | 'explore' | 'favourites' | 'passport' | 'itinerary' | 'trails' | 'map-food';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  passport: PassportState;
  onOpenItineraryBuilder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  passport,
  onOpenItineraryBuilder
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const visitedCount = Object.keys(passport.visited).length;
  const badgesCount = Object.keys(passport.unlockedBadges).length;
  const favoritesCount = passport.favorites.length;

  const handleNavClick = (tab: ActiveTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-ivory-300 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <button
            onClick={() => handleNavClick('discover')}
            className="flex items-center space-x-3 text-left group focus:outline-none focus:ring-2 focus:ring-forest-700 rounded-lg p-1"
            aria-label="ANVESHAN Home"
          >
            <div className="w-11 h-11 rounded-2xl bg-forest-800 text-ivory-100 flex items-center justify-center shadow-md group-hover:bg-forest-900 group-hover:scale-105 transition-all">
              <Compass className="w-6 h-6 text-saffron-400 transform group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-serif text-2xl font-black tracking-wider text-forest-950">
                  ANVESHAN
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-saffron-600 bg-saffron-50 px-1.5 py-0.5 rounded border border-saffron-200">
                  Ambala
                </span>
              </div>
              <p className="text-[11px] font-medium tracking-wide text-charcoal-600 font-sans">
                Discover Beyond the Famous
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links (Discover, Explore, My Favourites, My Passport) */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
            <button
              onClick={() => handleNavClick('discover')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'discover'
                  ? 'bg-forest-800 text-white shadow-sm'
                  : 'text-charcoal-700 hover:text-forest-800 hover:bg-ivory-200'
              }`}
            >
              Discover
            </button>

            <button
              onClick={() => handleNavClick('explore')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center space-x-1.5 ${
                activeTab === 'explore'
                  ? 'bg-forest-800 text-white shadow-sm'
                  : 'text-charcoal-700 hover:text-forest-800 hover:bg-ivory-200'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Explore</span>
            </button>

            <button
              onClick={() => handleNavClick('itinerary')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center space-x-1.5 ${
                activeTab === 'itinerary'
                  ? 'bg-forest-800 text-white shadow-sm'
                  : 'text-charcoal-700 hover:text-forest-800 hover:bg-ivory-200'
              }`}
            >
              <Compass className="w-4 h-4 text-saffron-500" />
              <span>Plan My Journey</span>
            </button>

            <button
              onClick={() => handleNavClick('favourites')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center space-x-1.5 ${
                activeTab === 'favourites'
                  ? 'bg-forest-800 text-white shadow-sm'
                  : 'text-charcoal-700 hover:text-forest-800 hover:bg-ivory-200'
              }`}
            >
              <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'text-saffron-600 fill-saffron-600' : ''}`} />
              <span>My Favourites</span>
              {favoritesCount > 0 && (
                <span className={`px-2 py-0.5 text-xs rounded-full font-bold ${
                  activeTab === 'favourites' ? 'bg-saffron-500 text-white' : 'bg-saffron-100 text-saffron-700'
                }`}>
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('passport')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center space-x-2 ${
                activeTab === 'passport'
                  ? 'bg-forest-800 text-white shadow-sm'
                  : 'text-charcoal-700 hover:text-forest-800 hover:bg-ivory-200'
              }`}
            >
              <Award className="w-4 h-4 text-saffron-500" />
              <span>My Passport</span>
              {visitedCount > 0 && (
                <span className={`px-2 py-0.5 text-xs rounded-full font-bold ${
                  activeTab === 'passport' ? 'bg-saffron-500 text-white' : 'bg-saffron-100 text-saffron-700'
                }`}>
                  {visitedCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Action: Smart Itinerary CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => {
                handleNavClick('itinerary');
                onOpenItineraryBuilder();
              }}
              className="px-4 py-2.5 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white text-sm font-semibold shadow-gold hover:shadow-lg transition-all flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Plan My Journey</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => handleNavClick('favourites')}
              className="p-2 rounded-xl text-charcoal-700 hover:bg-ivory-200 relative"
              aria-label="Favourites"
            >
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'text-saffron-600 fill-saffron-600' : 'text-charcoal-600'}`} />
              {favoritesCount > 0 && (
                <span className="absolute top-0 right-0 bg-saffron-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-charcoal-800 hover:bg-ivory-200 focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-ivory-300 bg-white px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-xl">
          <button
            onClick={() => handleNavClick('discover')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'discover' ? 'bg-forest-800 text-white' : 'text-charcoal-800 hover:bg-ivory-100'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span>Discover (Home)</span>
          </button>

          <button
            onClick={() => handleNavClick('explore')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'explore' ? 'bg-forest-800 text-white' : 'text-charcoal-800 hover:bg-ivory-100'
            }`}
          >
            <Search className="w-5 h-5" />
            <span>Explore Destinations</span>
          </button>

          <button
            onClick={() => handleNavClick('itinerary')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'itinerary' ? 'bg-forest-800 text-white' : 'text-charcoal-800 hover:bg-ivory-100'
            }`}
          >
            <Compass className="w-5 h-5 text-saffron-500" />
            <span>Plan My Journey</span>
          </button>

          <button
            onClick={() => handleNavClick('favourites')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'favourites' ? 'bg-forest-800 text-white' : 'text-charcoal-800 hover:bg-ivory-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'text-saffron-600 fill-saffron-600' : ''}`} />
              <span>My Favourites</span>
            </div>
            {favoritesCount > 0 && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-saffron-100 text-saffron-700 font-bold">
                {favoritesCount} Saved
              </span>
            )}
          </button>

          <button
            onClick={() => handleNavClick('passport')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'passport' ? 'bg-forest-800 text-white' : 'text-charcoal-800 hover:bg-ivory-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Award className="w-5 h-5 text-saffron-500" />
              <span>My Passport &amp; Badges</span>
            </div>
            <span className="px-2 py-0.5 text-xs rounded-full bg-saffron-100 text-saffron-700 font-bold">
              {visitedCount} Visited
            </span>
          </button>

          <div className="pt-2">
            <button
              onClick={() => {
                handleNavClick('itinerary');
                onOpenItineraryBuilder();
              }}
              className="w-full py-3 rounded-xl bg-saffron-600 text-white font-semibold text-sm shadow-md text-center"
            >
              Smart Itinerary Builder
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
