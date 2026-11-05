import React, { useState } from 'react';
import { Destination } from '../types';
import { DESTINATIONS } from '../data/destinations';
import { getSingleDestinationMapUrl } from '../utils/geo';
import { MapPin, Navigation, ExternalLink, Gem, Compass, Info, ArrowUpRight } from 'lucide-react';

interface InteractiveMapProps {
  onSelectDestination: (dest: Destination) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  onSelectDestination
}) => {
  const [selectedPinId, setSelectedPinId] = useState<string>('european-cemetery');
  const [zoneFilter, setZoneFilter] = useState<'All' | 'Ambala Cantt' | 'Ambala City' | 'Ambala Rural'>('All');

  const selectedDest = DESTINATIONS.find(d => d.id === selectedPinId) || DESTINATIONS[0];

  const filteredDestinations = zoneFilter === 'All'
    ? DESTINATIONS
    : DESTINATIONS.filter(d => d.zone === zoneFilter);

  // Convert real lat/lng to normalized SVG/Visual canvas percentages (Ambala bounds roughly 30.29 to 30.40 N, 76.72 to 76.90 E)
  const minLat = 30.30;
  const maxLat = 30.395;
  const minLng = 76.73;
  const maxLng = 76.90;

  const getPinPosition = (lat: number, lng: number) => {
    // Map lng to X (76.73 -> 10%, 76.90 -> 90%)
    const x = ((lng - minLng) / (maxLng - minLng)) * 80 + 10;
    // Map lat to Y inverted (30.395 -> 15% North/Top, 30.30 -> 85% South/Bottom)
    const y = ((maxLat - lat) / (maxLat - minLat)) * 70 + 15;
    return { x: Math.max(8, Math.min(92, x)), y: Math.max(12, Math.min(88, y)) };
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-ivory-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-ivory-200">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Spatial Geography of Ambala</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
            Interactive Ambala Cultural Map
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
            Understand the relationship between the 1843 Cantonment (East) and the ancient fortified City (West).
          </p>
        </div>

        {/* Filter Zone */}
        <div className="flex items-center space-x-2">
          {(['All', 'Ambala Cantt', 'Ambala City', 'Ambala Rural'] as const).map(z => (
            <button
              key={z}
              onClick={() => setZoneFilter(z)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                zoneFilter === z
                  ? 'bg-forest-800 text-white border-forest-900 shadow-sm'
                  : 'bg-ivory-100 text-charcoal-700 border-ivory-300 hover:bg-ivory-200'
              }`}
            >
              {z === 'All' ? 'All Areas' : z}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        
        {/* Schematic Interactive Canvas */}
        <div className="lg:col-span-8 bg-ivory-100 rounded-3xl border border-ivory-300 p-4 sm:p-6 relative min-h-[460px] overflow-hidden flex flex-col justify-between">
          
          {/* Subtle Grid & Regional Labels */}
          <div className="absolute inset-0 bg-[radial-gradient(#142F25_0.75px,transparent_0.75px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

          {/* Background Regional Clusters indicator */}
          <div className="absolute top-8 left-8 p-3 rounded-2xl bg-white/70 backdrop-blur-sm border border-ivory-300/80 pointer-events-none">
            <div className="text-[11px] font-bold text-forest-950 uppercase tracking-wider">Ambala City Cluster</div>
            <div className="text-[10px] text-charcoal-500">Ancient core • Cloth Market • Badshahi Bagh</div>
          </div>

          <div className="absolute bottom-8 right-8 p-3 rounded-2xl bg-white/70 backdrop-blur-sm border border-ivory-300/80 pointer-events-none text-right">
            <div className="text-[11px] font-bold text-forest-950 uppercase tracking-wider">Ambala Cantt Cluster</div>
            <div className="text-[10px] text-charcoal-500">1843 Garrison • Cemetery • Sadar Bazaar • St. Paul's</div>
          </div>

          {/* NH-44 Connecting Corridor Visual */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <line
              x1="30%"
              y1="45%"
              x2="70%"
              y2="55%"
              stroke="#D96B27"
              strokeWidth="2.5"
              strokeDasharray="4 4"
              opacity="0.4"
            />
            <text x="50%" y="48%" textAnchor="middle" fill="#C3532B" fontSize="10" fontWeight="bold">
              NH-44 Corridor (~8.5 km)
            </text>
          </svg>

          {/* Interactive Pins */}
          <div className="relative w-full h-full min-h-[380px]" style={{ zIndex: 5 }}>
            {filteredDestinations.map(dest => {
              const pos = getPinPosition(
                dest.location.coordinates.lat,
                dest.location.coordinates.lng
              );
              const isSelected = selectedPinId === dest.id;

              return (
                <button
                  key={dest.id}
                  onClick={() => setSelectedPinId(dest.id)}
                  aria-label={`Select ${dest.name} on map`}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className={`absolute group flex items-center justify-center transition-all ${
                    isSelected ? 'z-30 scale-125' : 'z-10 hover:scale-110'
                  }`}
                >
                  <div className={`p-2 rounded-full shadow-md border-2 transition-all ${
                    isSelected
                      ? 'bg-saffron-600 border-white text-white shadow-gold ring-4 ring-saffron-400/40'
                      : dest.isGem
                      ? 'bg-amber-500 border-white text-white'
                      : 'bg-forest-800 border-white text-white'
                  }`}>
                    {dest.isGem ? <Gem className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                  </div>

                  {/* Hover Pill */}
                  <span className={`absolute bottom-full mb-1.5 whitespace-nowrap text-[10px] font-bold px-2 py-1 rounded-lg pointer-events-none transition-all shadow-md ${
                    isSelected
                      ? 'bg-forest-950 text-white opacity-100 scale-100'
                      : 'bg-white text-charcoal-800 border border-ivory-300 opacity-0 group-hover:opacity-100'
                  }`}>
                    {dest.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Map Legend */}
          <div className="relative z-10 pt-4 border-t border-ivory-300 flex flex-wrap items-center justify-between gap-3 text-[11px] text-charcoal-600 bg-white/80 backdrop-blur-sm p-3 rounded-2xl">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-forest-800 inline-block" />
                <span>Heritage &amp; Spiritual Landmark</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span>Hidden Gem</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-saffron-600 inline-block" />
                <span>Selected Destination</span>
              </span>
            </div>
            <span>Click any pin to inspect dossier</span>
          </div>

        </div>

        {/* Selected Destination Preview Dossier */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-ivory-300 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-ivory-200 mb-4 shadow-sm relative">
              <img
                src={selectedDest.image}
                alt={selectedDest.name}
                className="w-full h-full object-cover"
              />
              {selectedDest.isGem && (
                <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow">
                  Hidden Gem
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2 text-xs font-semibold text-saffron-700">
              <span>{selectedDest.category}</span>
              <span>•</span>
              <span>{selectedDest.zone}</span>
            </div>

            <h4 className="font-serif text-xl font-bold text-forest-950 mt-1">
              {selectedDest.name}
            </h4>

            <p className="text-xs text-charcoal-600 mt-2 leading-relaxed">
              {selectedDest.tagline}
            </p>

            <div className="my-4 py-3 border-y border-ivory-200 space-y-1.5 text-xs text-charcoal-600">
              <div className="flex justify-between">
                <span className="text-charcoal-500">Timings:</span>
                <span className="font-semibold text-charcoal-800">{selectedDest.practicalInfo.timings}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Entry:</span>
                <span className="font-semibold text-forest-800">{selectedDest.practicalInfo.entryFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Stay Duration:</span>
                <span className="font-semibold text-charcoal-800">~{selectedDest.practicalInfo.suggestedDurationMinutes} min</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => onSelectDestination(selectedDest)}
              className="w-full py-2.5 px-4 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
            >
              View Full Story &amp; History
            </button>

            <a
              href={getSingleDestinationMapUrl(selectedDest)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl border border-ivory-300 hover:bg-ivory-100 text-charcoal-800 text-xs sm:text-sm font-semibold flex items-center justify-center space-x-1.5 transition-all"
            >
              <Navigation className="w-4 h-4 text-saffron-600" />
              <span>Directions in Google Maps</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
