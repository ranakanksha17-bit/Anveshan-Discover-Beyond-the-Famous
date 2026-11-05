import React from 'react';
import { LOCAL_FOOD_SPOTS } from '../data/destinations';
import { Utensils, MapPin, Clock, Sparkles, ExternalLink } from 'lucide-react';

export const FoodGuide: React.FC = () => {
  return (
    <section className="py-12 bg-white rounded-3xl p-6 sm:p-10 shadow-card border border-ivory-300">
      
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-saffron-100 text-saffron-700 text-xs font-semibold uppercase tracking-wider mb-2">
          <Utensils className="w-3.5 h-3.5" />
          <span>Heritage Flavors of Ambala</span>
        </div>
        <h3 className="font-serif text-3xl font-bold text-forest-950">
          The Culinary Heartbeat: Jalebis, Chhole &amp; Khurchan
        </h3>
        <p className="text-charcoal-600 text-sm sm:text-base mt-2 leading-relaxed">
          Ambala's legendary gastronomy evolved alongside the 1843 Cantonment and the historic Grand Trunk Road trade routes. Don't leave Ambala without experiencing these verified local culinary staples.
        </p>
      </div>

      {/* Food Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {LOCAL_FOOD_SPOTS.map(spot => {
          const mapQuery = encodeURIComponent(`${spot.name}, ${spot.location}`);
          const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

          return (
            <div
              key={spot.id}
              className="p-6 rounded-3xl bg-ivory-50 border border-ivory-300 hover:border-saffron-300 shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-saffron-700 bg-saffron-50 px-2.5 py-0.5 rounded border border-saffron-200">
                    {spot.zone}
                  </span>
                  <span className="font-bold text-forest-800">{spot.estimatedCost}</span>
                </div>

                <h4 className="font-serif text-xl font-bold text-forest-950 mb-1">
                  {spot.name}
                </h4>

                <div className="text-xs font-semibold text-charcoal-800 mb-3 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Must Try: {spot.specialty}</span>
                </div>

                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-sans mb-4">
                  {spot.historicalContext}
                </p>
              </div>

              <div className="pt-4 border-t border-ivory-200 text-xs text-charcoal-600 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1 text-charcoal-500">
                    <Clock className="w-3.5 h-3.5 text-forest-700" />
                    <span>Serving Hours:</span>
                  </span>
                  <span className="font-medium text-charcoal-800">{spot.timings}</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="flex items-center space-x-1 text-charcoal-500 truncate max-w-[200px]">
                    <MapPin className="w-3.5 h-3.5 text-saffron-600" />
                    <span>{spot.location}</span>
                  </span>

                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forest-800 hover:text-saffron-600 font-bold flex items-center space-x-1"
                  >
                    <span>Find on Map</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
