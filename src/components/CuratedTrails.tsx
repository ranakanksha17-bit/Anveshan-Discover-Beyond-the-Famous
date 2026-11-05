import React from 'react';
import { CuratedTrail, Destination } from '../types';
import { CURATED_TRAILS, DESTINATIONS } from '../data/destinations';
import { Clock, MapPin, Sparkles, ArrowRight, Compass, ShieldCheck } from 'lucide-react';

interface CuratedTrailsProps {
  onSelectDestination: (dest: Destination) => void;
  onLoadTrailToItinerary: (trail: CuratedTrail) => void;
}

export const CuratedTrails: React.FC<CuratedTrailsProps> = ({
  onSelectDestination,
  onLoadTrailToItinerary
}) => {
  return (
    <section className="py-12 bg-ivory-50 border-t border-b border-ivory-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-saffron-100 text-saffron-700 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Thematic Trails</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
              Popular Local Experiences
            </h2>
            <p className="text-charcoal-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Explore Ambala along interconnected historical, spiritual, and sensory storylines designed to be experienced together.
            </p>
          </div>
        </div>

        {/* Trails Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CURATED_TRAILS.map(trail => {
            const stops = trail.destinationIds
              .map(id => DESTINATIONS.find(d => d.id === id))
              .filter((d): d is Destination => Boolean(d));

            return (
              <div
                key={trail.id}
                className="bg-white rounded-3xl overflow-hidden border border-ivory-300 shadow-card hover:shadow-lift transition-all duration-300 flex flex-col justify-between"
              >
                {/* Header banner */}
                <div className={`p-6 sm:p-8 bg-gradient-to-r ${trail.themeColor} text-white`}>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm font-semibold border border-white/20">
                      {trail.highlightTag}
                    </span>
                    <span className="font-mono text-ivory-200">
                      {trail.durationLabel} • {trail.distanceLabel}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                    {trail.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-ivory-200 font-light leading-relaxed">
                    {trail.subtitle}
                  </p>
                </div>

                {/* Trail Description & Stops */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed mb-6 font-sans">
                      {trail.description}
                    </p>

                    <h4 className="text-xs uppercase tracking-wider font-bold text-charcoal-500 mb-3">
                      Included Waypoints ({stops.length} Stops):
                    </h4>

                    <div className="space-y-2 mb-6">
                      {stops.map((stop, idx) => (
                        <div
                          key={stop.id}
                          onClick={() => onSelectDestination(stop)}
                          className="p-3 rounded-xl bg-ivory-100 hover:bg-ivory-200 border border-ivory-200 cursor-pointer transition-all flex items-center justify-between group"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="w-5 h-5 rounded-full bg-forest-800 text-white flex items-center justify-center text-[10px] font-bold">
                              {idx + 1}
                            </span>
                            <div>
                              <div className="text-xs font-bold text-forest-950 group-hover:text-saffron-600 transition-colors">
                                {stop.name}
                              </div>
                              <div className="text-[10px] text-charcoal-500">
                                {stop.zone} • {stop.category}
                              </div>
                            </div>
                          </div>

                          <ArrowRight className="w-3.5 h-3.5 text-charcoal-400 group-hover:translate-x-1 group-hover:text-saffron-600 transition-all" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-ivory-200">
                    <button
                      onClick={() => onLoadTrailToItinerary(trail)}
                      className="w-full py-3 px-4 rounded-2xl bg-forest-800 hover:bg-forest-900 text-white text-xs sm:text-sm font-semibold shadow-md flex items-center justify-center space-x-2 transition-all"
                    >
                      <Compass className="w-4 h-4 text-saffron-400" />
                      <span>Open in Smart Itinerary Builder</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
