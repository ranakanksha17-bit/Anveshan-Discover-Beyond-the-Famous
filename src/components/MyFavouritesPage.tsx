import React from 'react';
import { Destination } from '../types';
import { DESTINATIONS } from '../data/destinations';
import { DestinationCard } from './DestinationCard';
import { Heart, Compass, ArrowRight } from 'lucide-react';

interface MyFavouritesPageProps {
  favoriteIds: string[];
  visitedIds: string[];
  onToggleFavorite: (id: string) => void;
  onToggleVisited: (destination: Destination) => void;
  onSelectDestination: (dest: Destination) => void;
  onAddToItinerary: (dest: Destination) => void;
  onExploreClick: () => void;
}

export const MyFavouritesPage: React.FC<MyFavouritesPageProps> = ({
  favoriteIds,
  visitedIds,
  onToggleFavorite,
  onToggleVisited,
  onSelectDestination,
  onAddToItinerary,
  onExploreClick
}) => {
  const favoriteDestinations = favoriteIds
    .map(id => DESTINATIONS.find(d => d.id === id))
    .filter((d): d is Destination => Boolean(d));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-ivory-300 gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-saffron-100 text-saffron-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 fill-saffron-600" />
            <span>Saved Collection</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
            My Favourites
          </h1>
          <p className="text-charcoal-600 text-sm sm:text-base mt-1">
            Handpicked destinations saved for your upcoming Ambala visit. Persisted locally on your device.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-forest-800 text-white">
            {favoriteDestinations.length} Places Bookmarked
          </span>
        </div>
      </div>

      {/* Grid or Empty State */}
      {favoriteDestinations.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-ivory-300 shadow-card my-8 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-saffron-50 text-saffron-600 flex items-center justify-center mx-auto mb-4 border border-saffron-200">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-forest-950 mb-2">
            Your collection is waiting for its first gem
          </h2>
          <p className="text-sm text-charcoal-600 mb-8 leading-relaxed">
            While exploring Ambala's destinations, click the heart icon on any card to bookmark places you want to visit or remember.
          </p>
          <button
            onClick={onExploreClick}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-forest-800 hover:bg-forest-900 text-white text-sm font-semibold shadow-md transition-all"
          >
            <Compass className="w-4 h-4 text-saffron-400" />
            <span>Discover Destinations Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteDestinations.map(dest => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              isFavorite={true}
              isVisited={visitedIds.includes(dest.id)}
              onToggleFavorite={onToggleFavorite}
              onToggleVisited={onToggleVisited}
              onSelect={onSelectDestination}
              onAddToItinerary={onAddToItinerary}
            />
          ))}
        </div>
      )}

    </div>
  );
};
