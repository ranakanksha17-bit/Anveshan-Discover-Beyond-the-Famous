import React, { useState } from 'react';
import { Destination } from '../types';
import { getSingleDestinationMapUrl } from '../utils/geo';
import { Heart, Check, MapPin, Clock, Ticket, ExternalLink, Gem, ArrowRight, Plus } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
  isFavorite: boolean;
  isVisited: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleVisited: (destination: Destination) => void;
  onSelect: (destination: Destination) => void;
  onAddToItinerary?: (destination: Destination) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  isFavorite,
  isVisited,
  onToggleFavorite,
  onToggleVisited,
  onSelect,
  onAddToItinerary
}) => {
  const [imgError, setImgError] = useState(false);

  const fallbackImages: Record<string, string> = {
    Heritage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    Spiritual: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
    Culture: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    Shopping: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80',
    Nature: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
  };

  const currentImg = imgError ? fallbackImages[destination.category] : destination.image;

  return (
    <article className="group bg-white rounded-3xl overflow-hidden border border-ivory-300 shadow-card hover:shadow-lift transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      
      {/* Visual Photography Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-ivory-300">
        <img
          src={currentImg}
          alt={destination.imageAlt}
          onError={() => setImgError(true)}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-black/30 pointer-events-none" />

        {/* Top Floating Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-auto">
          <div className="flex items-center space-x-1.5 flex-wrap gap-1">
            {destination.isGem && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500/95 text-white text-[11px] font-bold tracking-wide shadow-md backdrop-blur-sm">
                <Gem className="w-3 h-3 fill-white" />
                <span>Hidden Gem</span>
              </span>
            )}
            <span className="px-2.5 py-1 rounded-full bg-charcoal-900/75 text-ivory-100 text-[11px] font-semibold backdrop-blur-sm border border-white/20">
              {destination.category}
            </span>
          </div>

          {/* Quick Action: Heart Favorite */}
          <button
            onClick={e => {
              e.stopPropagation();
              onToggleFavorite(destination.id);
            }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-charcoal-700 hover:scale-110 shadow-md transition-all focus:outline-none"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite ? 'text-saffron-600 fill-saffron-600' : 'text-charcoal-600'
              }`}
            />
          </button>
        </div>

        {/* Bottom Floating Bar on Image */}
        <div className="absolute bottom-3 left-4 right-4 z-10 text-white pointer-events-none flex items-center justify-between">
          <span className="inline-flex items-center space-x-1 text-xs font-medium text-ivory-200 bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-md">
            <MapPin className="w-3.5 h-3.5 text-saffron-400" />
            <span>{destination.zone}</span>
          </span>
          <span className="text-[11px] font-mono text-ivory-300 bg-black/40 px-2 py-0.5 rounded">
            ★ {destination.rating.toFixed(1)} ({destination.reviewsCount})
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Hindi Name & Title */}
          <div className="text-[11px] font-medium text-saffron-700 tracking-wide font-sans mb-1">
            {destination.hindiName}
          </div>
          <h3 className="font-serif text-xl font-bold text-forest-950 mb-2 leading-snug group-hover:text-forest-700 transition-colors">
            {destination.name}
          </h3>

          <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed mb-4 line-clamp-2">
            {destination.tagline}
          </p>

          {/* Quick Practical Meta Dossier */}
          <div className="space-y-1.5 py-3 border-y border-ivory-200 text-xs text-charcoal-600">
            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-1.5 text-charcoal-500">
                <Clock className="w-3.5 h-3.5 text-forest-700" />
                <span>Timings:</span>
              </span>
              <span className="font-medium text-charcoal-800 truncate max-w-[170px]" title={destination.practicalInfo.timings}>
                {destination.practicalInfo.timings}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-1.5 text-charcoal-500">
                <Ticket className="w-3.5 h-3.5 text-saffron-600" />
                <span>Entry:</span>
              </span>
              <span className="font-semibold text-forest-800">
                {destination.practicalInfo.entryFee}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 mt-2">
          {/* Visited Checkbox Indicator */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => onToggleVisited(destination)}
              className={`flex items-center space-x-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                isVisited
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold'
                  : 'bg-ivory-100 text-charcoal-600 border-ivory-300 hover:bg-ivory-200'
              }`}
            >
              <Check className={`w-3.5 h-3.5 ${isVisited ? 'text-emerald-700 stroke-[3]' : 'text-charcoal-400'}`} />
              <span>{isVisited ? 'Visited' : 'Mark Visited'}</span>
            </button>

            <a
              href={getSingleDestinationMapUrl(destination)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Directions to ${destination.name} in Google Maps`}
              className="text-xs text-charcoal-600 hover:text-forest-800 flex items-center space-x-1 p-1 hover:underline"
            >
              <span>Map</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Primary View Details Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onSelect(destination)}
              className="flex-1 py-2.5 px-4 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center justify-center space-x-1.5 group-hover:bg-forest-900"
            >
              <span>Explore Story</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>

            {onAddToItinerary && (
              <button
                onClick={() => onAddToItinerary(destination)}
                title="Add to Itinerary Builder"
                aria-label={`Add ${destination.name} to Itinerary`}
                className="p-2.5 rounded-xl border border-ivory-300 bg-ivory-100 hover:bg-saffron-50 hover:border-saffron-300 text-charcoal-700 hover:text-saffron-700 transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>

    </article>
  );
};
