import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Destination,
  Category,
  Zone,
  PassportState,
  VisitedRecord,
  GeneratedItinerary,
  CuratedTrail,
  Badge
} from './types';
import { DESTINATIONS, CURATED_TRAILS, BADGES } from './data/destinations';
import { loadPassportState, savePassportState, evaluateBadges, INITIAL_PASSPORT_STATE } from './utils/storage';
import { fireConfetti } from './utils/confetti';
import { Navbar, ActiveTab } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { DestinationCard } from './components/DestinationCard';
import { DestinationDetailsPage } from './components/DestinationDetailsPage';
import { MyFavouritesPage } from './components/MyFavouritesPage';
import { PlanMyJourneyPage } from './components/PlanMyJourneyPage';
import { CuratedTrails } from './components/CuratedTrails';
import { TravelPassport } from './components/TravelPassport';
import { InteractiveMap } from './components/InteractiveMap';
import { FoodGuide } from './components/FoodGuide';
import { Footer } from './components/Footer';
import { Toast, ToastMessage } from './components/Toast';
import { BadgeUnlockedModal } from './components/BadgeUnlockedModal';
import { Gem, Sparkles, Compass, AlertCircle, Search, ArrowRight } from 'lucide-react';

export const App: React.FC = () => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<ActiveTab>('discover');
  const [previousTab, setPreviousTab] = useState<ActiveTab>('discover');

  // Currently viewed destination for the dedicated details page
  const [activeDestination, setActiveDestination] = useState<Destination | null>(null);

  // Passport & Persistence State (LocalStorage)
  const [passport, setPassport] = useState<PassportState>(() => loadPassportState());

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedZone, setSelectedZone] = useState<Zone | 'All'>('All');
  const [gemsOnly, setGemsOnly] = useState(false);

  // Modals & Celebrations State
  const [unlockedBadgeToShow, setUnlockedBadgeToShow] = useState<Badge | null>(null);
  const [itineraryInitialDest, setItineraryInitialDest] = useState<Destination | null>(null);

  // Notification Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Ref for scrolling to destinations on home
  const destinationsSectionRef = useRef<HTMLDivElement>(null);

  // Sync passport state to LocalStorage
  useEffect(() => {
    savePassportState(passport);
  }, [passport]);

  const addToast = (type: 'success' | 'info' | 'warning', title: string, description?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, type, title, description }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Filtered Destinations (Search & Category filtering)
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter(dest => {
      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const nameMatch = dest.name.toLowerCase().includes(query);
        const hindiMatch = dest.hindiName.includes(query);
        const taglineMatch = dest.tagline.toLowerCase().includes(query);
        const historyMatch = dest.historicalSignificance.toLowerCase().includes(query);
        const tagMatch = dest.tags.some(t => t.toLowerCase().includes(query));
        const zoneMatch = dest.zone.toLowerCase().includes(query);
        if (!nameMatch && !hindiMatch && !taglineMatch && !historyMatch && !tagMatch && !zoneMatch) {
          return false;
        }
      }

      // Category Filter
      if (selectedCategory !== 'All' && dest.category !== selectedCategory) {
        return false;
      }

      // Zone Filter
      if (selectedZone !== 'All' && dest.zone !== selectedZone) {
        return false;
      }

      // Hidden Gems Only
      if (gemsOnly && !dest.isGem) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedZone, gemsOnly]);

  // Featured Hidden Gems
  const hiddenGems = useMemo(() => {
    return DESTINATIONS.filter(d => d.isGem);
  }, []);

  // Handlers
  const handleToggleFavorite = (destId: string) => {
    setPassport(prev => {
      const isFav = prev.favorites.includes(destId);
      const newFavs = isFav
        ? prev.favorites.filter(id => id !== destId)
        : [...prev.favorites, destId];

      const dest = DESTINATIONS.find(d => d.id === destId);
      if (isFav) {
        addToast('info', 'Removed from Favourites', dest?.name);
      } else {
        addToast('success', 'Saved to Favourites', `${dest?.name} saved in your Travel Passport.`);
      }

      return { ...prev, favorites: newFavs };
    });
  };

  const handleSaveVisitedRecord = (destId: string, record: VisitedRecord) => {
    const dest = DESTINATIONS.find(d => d.id === destId);
    
    setPassport(prev => {
      const updatedVisited = {
        ...prev.visited,
        [destId]: record
      };

      const intermediateState: PassportState = {
        ...prev,
        visited: updatedVisited
      };

      // Check for newly earned badges
      const { updatedBadges, newlyUnlocked } = evaluateBadges(intermediateState);

      if (newlyUnlocked.length > 0) {
        fireConfetti();
        setUnlockedBadgeToShow(newlyUnlocked[0]);
        addToast(
          'success',
          `Milestone Reached: ${newlyUnlocked[0].title}!`,
          newlyUnlocked[0].description
        );
      } else {
        addToast('success', 'Visit Logged in Passport', `Marked ${dest?.name} as visited.`);
      }

      return {
        ...intermediateState,
        unlockedBadges: updatedBadges
      };
    });
  };

  const handleRemoveVisited = (destId: string) => {
    setPassport(prev => {
      const updatedVisited = { ...prev.visited };
      delete updatedVisited[destId];
      const dest = DESTINATIONS.find(d => d.id === destId);
      addToast('info', 'Visit Log Removed', dest?.name);
      return { ...prev, visited: updatedVisited };
    });
  };

  const handleSaveItinerary = (itinerary: GeneratedItinerary) => {
    setPassport(prev => {
      const existing = prev.customItineraries.filter(i => i.id !== itinerary.id);
      addToast('success', 'Itinerary Saved to Passport', itinerary.title);
      return {
        ...prev,
        customItineraries: [itinerary, ...existing]
      };
    });
  };

  const handleDeleteItinerary = (itineraryId: string) => {
    setPassport(prev => ({
      ...prev,
      customItineraries: prev.customItineraries.filter(i => i.id !== itineraryId)
    }));
    addToast('info', 'Itinerary Removed');
  };

  const handleResetPassport = () => {
    setPassport(INITIAL_PASSPORT_STATE);
    addToast('warning', 'Passport Reset', 'All visited logs, badges and favourites cleared.');
  };

  const handleOpenDestinationDetails = (dest: Destination) => {
    setPreviousTab(activeTab);
    setActiveDestination(dest);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromDetails = () => {
    setActiveDestination(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToItineraryFromCard = (dest: Destination) => {
    setItineraryInitialDest(dest);
    setActiveDestination(null);
    setActiveTab('itinerary');
    addToast('info', 'Destination Added to Builder', `${dest.name} ready for itinerary sequence.`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadTrailToItinerary = (trail: CuratedTrail) => {
    const stops = trail.destinationIds
      .map(id => DESTINATIONS.find(d => d.id === id))
      .filter((d): d is Destination => Boolean(d));

    if (stops.length > 0) {
      setItineraryInitialDest(stops[0]);
      setActiveDestination(null);
      setActiveTab('itinerary');
      addToast('success', 'Loaded Thematic Trail', `Configuring sequence for: ${trail.title}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedZone('All');
    setGemsOnly(false);
  };

  const handleScrollToDestinations = () => {
    destinationsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHeroSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setActiveTab('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-ivory-100 flex flex-col selection:bg-saffron-500 selection:text-white">
      
      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* Badge Celebration Modal */}
      <BadgeUnlockedModal
        badge={unlockedBadgeToShow}
        onClose={() => setUnlockedBadgeToShow(null)}
        onViewPassport={() => {
          setUnlockedBadgeToShow(null);
          setActiveDestination(null);
          setActiveTab('passport');
        }}
      />

      {/* Main Header / Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={tab => {
          setActiveDestination(null);
          setActiveTab(tab);
        }}
        passport={passport}
        onOpenItineraryBuilder={() => {
          setActiveDestination(null);
          setActiveTab('itinerary');
        }}
      />

      {/* Main View Area */}
      <main className="flex-1">
        
        {/* CASE A: DEDICATED DESTINATION DETAILS PAGE */}
        {activeDestination ? (
          <DestinationDetailsPage
            destination={activeDestination}
            onBack={handleBackFromDetails}
            isFavorite={passport.favorites.includes(activeDestination.id)}
            onToggleFavorite={handleToggleFavorite}
            visitedRecord={passport.visited[activeDestination.id]}
            onSaveVisitedRecord={handleSaveVisitedRecord}
            onRemoveVisitedRecord={handleRemoveVisited}
            onAddToItinerary={handleAddToItineraryFromCard}
          />
        ) : (
          /* CASE B: ACTIVE TAB SCREENS */
          <>
            {/* 1. DISCOVER (HOMEPAGE) */}
            {activeTab === 'discover' && (
              <div>
                {/* Hero Section */}
                <Hero
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onQuickFilterGem={() => {
                    setGemsOnly(true);
                    setActiveTab('explore');
                  }}
                  onOpenItinerary={() => setActiveTab('itinerary')}
                  onScrollToDestinations={handleScrollToDestinations}
                  totalGemsCount={hiddenGems.length}
                />

                {/* Featured Hidden Gems Showcase */}
                <section className="bg-ivory-50 border-b border-ivory-300 py-12">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                      <div>
                        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
                          <Gem className="w-3.5 h-3.5 fill-amber-500" />
                          <span>Curated Hidden Gems</span>
                        </div>
                        <h2 className="font-serif text-3xl font-bold text-forest-950">
                          Beyond the Famous Landmarks
                        </h2>
                        <p className="text-charcoal-600 text-sm mt-1">
                          Lesser-known historical sanctuaries and colonial relics often missed by transit visitors.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setGemsOnly(true);
                          setActiveTab('explore');
                        }}
                        className="text-sm font-semibold text-saffron-600 hover:text-saffron-700 flex items-center space-x-1 self-start sm:self-auto hover:underline"
                      >
                        <span>Explore All {hiddenGems.length} Hidden Gems</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {hiddenGems.slice(0, 3).map(dest => (
                        <DestinationCard
                          key={dest.id}
                          destination={dest}
                          isFavorite={passport.favorites.includes(dest.id)}
                          isVisited={Boolean(passport.visited[dest.id])}
                          onToggleFavorite={handleToggleFavorite}
                          onToggleVisited={() => handleOpenDestinationDetails(dest)}
                          onSelect={handleOpenDestinationDetails}
                          onAddToItinerary={handleAddToItineraryFromCard}
                        />
                      ))}
                    </div>
                  </div>
                </section>

                {/* Popular Local Experiences (Curated Trails) */}
                <CuratedTrails
                  onSelectDestination={handleOpenDestinationDetails}
                  onLoadTrailToItinerary={handleLoadTrailToItinerary}
                />

                {/* Preview Grid on Home */}
                <div ref={destinationsSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                  
                  <div className="text-center max-w-3xl mx-auto mb-10">
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-bold uppercase tracking-wider mb-2">
                      <Compass className="w-3.5 h-3.5" />
                      <span>The Complete Survey</span>
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
                      Explore Ambala’s 14 Documented Sanctuaries
                    </h2>
                    <p className="text-charcoal-600 text-sm sm:text-base mt-2">
                      Filter by Heritage, Spiritual, Culture, Shopping, or Nature across Ambala Cantt, City and Rural precincts.
                    </p>
                  </div>

                  {/* Filter Controls */}
                  <CategoryFilter
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                    selectedZone={selectedZone}
                    onSelectZone={setSelectedZone}
                    gemsOnly={gemsOnly}
                    onToggleGemsOnly={() => setGemsOnly(!gemsOnly)}
                    matchingCount={filteredDestinations.length}
                    totalCount={DESTINATIONS.length}
                    onResetFilters={handleResetFilters}
                  />

                  {/* Destinations Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDestinations.map(dest => (
                      <DestinationCard
                        key={dest.id}
                        destination={dest}
                        isFavorite={passport.favorites.includes(dest.id)}
                        isVisited={Boolean(passport.visited[dest.id])}
                        onToggleFavorite={handleToggleFavorite}
                        onToggleVisited={() => handleOpenDestinationDetails(dest)}
                        onSelect={handleOpenDestinationDetails}
                        onAddToItinerary={handleAddToItineraryFromCard}
                      />
                    ))}
                  </div>

                </div>

                {/* Interactive Map & Food Preview */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-12">
                  <InteractiveMap onSelectDestination={handleOpenDestinationDetails} />
                  <FoodGuide />
                </div>

              </div>
            )}

            {/* 2. EXPLORE (FULL DIRECTORY) */}
            {activeTab === 'explore' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
                
                {/* Explore Directory Header */}
                <div className="mb-8">
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-saffron-100 text-saffron-700 text-xs font-semibold uppercase tracking-wider mb-2">
                    <Search className="w-3.5 h-3.5" />
                    <span>Complete Cultural Directory</span>
                  </div>
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
                    Explore Destinations
                  </h1>
                  <p className="text-charcoal-600 text-sm sm:text-base mt-1 max-w-2xl">
                    Discover verified historical sites, sacred gurdwaras, temples, nature parks, and vibrant bazaars across Ambala district.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="bg-white rounded-2xl p-3 shadow-sm border border-ivory-300 mb-6 flex items-center space-x-3">
                  <Search className="w-5 h-5 text-forest-700 ml-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search by monument name, historical tag, locality or significance..."
                    className="flex-1 py-2 bg-transparent text-charcoal-900 placeholder-charcoal-500 text-sm focus:outline-none"
                    aria-label="Search destinations"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-3 py-1 text-xs font-semibold text-charcoal-600 hover:text-charcoal-900 bg-ivory-200 rounded-lg"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Filter Taxonomy */}
                <CategoryFilter
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  selectedZone={selectedZone}
                  onSelectZone={setSelectedZone}
                  gemsOnly={gemsOnly}
                  onToggleGemsOnly={() => setGemsOnly(!gemsOnly)}
                  matchingCount={filteredDestinations.length}
                  totalCount={DESTINATIONS.length}
                  onResetFilters={handleResetFilters}
                />

                {/* Grid or Empty State */}
                {filteredDestinations.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-ivory-300 shadow-card my-8">
                    <AlertCircle className="w-12 h-12 text-saffron-500 mx-auto mb-3 opacity-70" />
                    <h2 className="font-serif text-2xl font-bold text-forest-950 mb-2">
                      No matching destinations found
                    </h2>
                    <p className="text-sm text-charcoal-600 max-w-md mx-auto mb-6">
                      We couldn't find any destination matching "{searchQuery}" under the selected filters.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="px-6 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-sm font-semibold shadow-md transition-all"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDestinations.map(dest => (
                      <DestinationCard
                        key={dest.id}
                        destination={dest}
                        isFavorite={passport.favorites.includes(dest.id)}
                        isVisited={Boolean(passport.visited[dest.id])}
                        onToggleFavorite={handleToggleFavorite}
                        onToggleVisited={() => handleOpenDestinationDetails(dest)}
                        onSelect={handleOpenDestinationDetails}
                        onAddToItinerary={handleAddToItineraryFromCard}
                      />
                    ))}
                  </div>
                )}

              </div>
            )}

            {/* 3. MY FAVOURITES */}
            {activeTab === 'favourites' && (
              <MyFavouritesPage
                favoriteIds={passport.favorites}
                visitedIds={Object.keys(passport.visited)}
                onToggleFavorite={handleToggleFavorite}
                onToggleVisited={handleOpenDestinationDetails}
                onSelectDestination={handleOpenDestinationDetails}
                onAddToItinerary={handleAddToItineraryFromCard}
                onExploreClick={() => {
                  setActiveTab('explore');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {/* 4. MY PASSPORT */}
            {activeTab === 'passport' && (
              <TravelPassport
                passport={passport}
                onRemoveFavorite={handleToggleFavorite}
                onRemoveVisited={handleRemoveVisited}
                onUpdateVisitedNote={handleSaveVisitedRecord}
                onDeleteItinerary={handleDeleteItinerary}
                onReopenItinerary={itin => {
                  if (itin.stops.length > 0) {
                    setItineraryInitialDest(itin.stops[0].destination);
                  }
                  setActiveTab('itinerary');
                  addToast('info', 'Loaded Saved Journey', itin.title);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onResetPassport={handleResetPassport}
                onSelectDestination={handleOpenDestinationDetails}
                onExploreClick={() => {
                  setActiveTab('explore');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {/* 5. PLAN MY JOURNEY */}
            {activeTab === 'itinerary' && (
              <PlanMyJourneyPage
                initialDestination={itineraryInitialDest}
                onSaveToPassport={handleSaveItinerary}
                onViewDestinationDetails={handleOpenDestinationDetails}
                onExploreClick={() => {
                  setActiveTab('explore');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {/* 6. THEMATIC TRAILS */}
            {activeTab === 'trails' && (
              <div className="py-8">
                <CuratedTrails
                  onSelectDestination={handleOpenDestinationDetails}
                  onLoadTrailToItinerary={handleLoadTrailToItinerary}
                />
              </div>
            )}

            {/* 7. MAP & CULINARY FLAVORS */}
            {activeTab === 'map-food' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fade-in">
                <InteractiveMap onSelectDestination={handleOpenDestinationDetails} />
                <FoodGuide />
              </div>
            )}
          </>
        )}

      </main>

      {/* Editorial Footer */}
      <Footer onSelectTab={tab => {
        setActiveDestination(null);
        setActiveTab(tab);
      }} />

    </div>
  );
};

export default App;
