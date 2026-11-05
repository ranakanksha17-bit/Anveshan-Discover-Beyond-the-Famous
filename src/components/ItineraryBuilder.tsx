import React, { useState, useEffect } from 'react';
import {
  ItineraryPreference,
  ItineraryDuration,
  ItineraryPace,
  ItineraryBudget,
  TravelMode,
  Category,
  Zone,
  Destination,
  GeneratedItinerary,
  ItineraryStop
} from '../types';
import { DESTINATIONS } from '../data/destinations';
import {
  generateItinerary,
  recalculateStopsTimeline,
  parseStartTimeToMinutes
} from '../utils/itineraryEngine';
import { getMultiStopRouteUrl, getSingleDestinationMapUrl } from '../utils/geo';
import {
  Clock,
  Compass,
  MapPin,
  Calendar,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Trash2,
  Plus,
  ExternalLink,
  BookmarkCheck,
  Printer,
  RotateCcw,
  Check,
  AlertCircle,
  Car,
  Footprints,
  Info
} from 'lucide-react';

interface ItineraryBuilderProps {
  initialDestination?: Destination | null;
  onSaveToPassport: (itinerary: GeneratedItinerary) => void;
  onViewDestinationDetails: (dest: Destination) => void;
}

export const ItineraryBuilder: React.FC<ItineraryBuilderProps> = ({
  initialDestination,
  onSaveToPassport,
  onViewDestinationDetails
}) => {
  // Form State
  const [duration, setDuration] = useState<ItineraryDuration>('4h');
  const [selectedInterests, setSelectedInterests] = useState<Category[]>([
    'Heritage',
    'Spiritual'
  ]);
  const [budget, setBudget] = useState<ItineraryBudget>('all');
  const [pace, setPace] = useState<ItineraryPace>('relaxed');
  const [zone, setZone] = useState<'all' | Zone>('all');
  const [travelMode, setTravelMode] = useState<TravelMode>('car-taxi');
  const [startTime, setStartTime] = useState<string>('09:00');

  // Generated Itinerary State
  const [currentItinerary, setCurrentItinerary] = useState<GeneratedItinerary | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedAddId, setSelectedAddId] = useState<string>('');

  // Initial generation on mount or when initialDestination is passed
  useEffect(() => {
    handleGenerate();
  }, []);

  const handleInterestToggle = (interest: Category) => {
    if (selectedInterests.includes(interest)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter(i => i !== interest));
      }
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleGenerate = () => {
    const prefs: ItineraryPreference = {
      duration,
      interests: selectedInterests,
      pace,
      preferredZone: zone,
      budget,
      travelMode,
      startTime
    };

    const result = generateItinerary(prefs);
    setCurrentItinerary(result);
    setIsSaved(false);
  };

  // Reordering stops
  const handleMoveStop = (index: number, direction: 'up' | 'down') => {
    if (!currentItinerary) return;
    const stops = [...currentItinerary.stops];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= stops.length) return;

    // Swap destinations
    const currentDestinations = stops.map(s => s.destination);
    const temp = currentDestinations[index];
    currentDestinations[index] = currentDestinations[targetIndex];
    currentDestinations[targetIndex] = temp;

    // Recalculate
    const startMins = parseStartTimeToMinutes(startTime);
    const newStops = recalculateStopsTimeline(currentDestinations, startMins, travelMode);

    updateItineraryWithStops(newStops);
  };

  // Removing a stop
  const handleRemoveStop = (index: number) => {
    if (!currentItinerary) return;
    if (currentItinerary.stops.length <= 1) {
      alert('An itinerary requires at least one destination.');
      return;
    }

    const currentDestinations = currentItinerary.stops.map(s => s.destination);
    currentDestinations.splice(index, 1);

    const startMins = parseStartTimeToMinutes(startTime);
    const newStops = recalculateStopsTimeline(currentDestinations, startMins, travelMode);

    updateItineraryWithStops(newStops);
  };

  // Adding a new stop
  const handleAddStop = (destId: string) => {
    if (!destId || !currentItinerary) return;
    const dest = DESTINATIONS.find(d => d.id === destId);
    if (!dest) return;

    const currentDestinations = currentItinerary.stops.map(s => s.destination);
    if (currentDestinations.some(d => d.id === dest.id)) {
      alert('This destination is already part of your itinerary.');
      return;
    }

    currentDestinations.push(dest);
    const startMins = parseStartTimeToMinutes(startTime);
    const newStops = recalculateStopsTimeline(currentDestinations, startMins, travelMode);

    updateItineraryWithStops(newStops);
    setSelectedAddId('');
  };

  const updateItineraryWithStops = (newStops: ItineraryStop[]) => {
    if (!currentItinerary) return;
    const newDestinations = newStops.map(s => s.destination);
    const totalVisit = newStops.reduce((a, s) => a + s.visitDurationMinutes, 0);
    const totalTravel = newStops.reduce((a, s) => a + (s.travelTimeToNextMinutes || 0), 0);
    const newRouteUrl = getMultiStopRouteUrl(newDestinations);
    const primaryZone = Array.from(new Set(newDestinations.map(d => d.zone))).join(' & ');

    setCurrentItinerary({
      ...currentItinerary,
      stops: newStops,
      totalDurationMinutes: totalVisit + totalTravel,
      totalTravelMinutes: totalTravel,
      googleMapsRouteUrl: newRouteUrl,
      primaryZone
    });
    setIsSaved(false);
  };

  const handleSaveItinerary = () => {
    if (!currentItinerary) return;
    onSaveToPassport(currentItinerary);
    setIsSaved(true);
  };

  const handlePrint = () => {
    window.print();
  };

  // Filter available destinations to add
  const existingIds = currentItinerary?.stops.map(s => s.destination.id) || [];
  const availableToAdd = DESTINATIONS.filter(d => !existingIds.includes(d.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Title Header */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-saffron-100 text-saffron-700 text-xs font-semibold uppercase tracking-wider mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Transparent Rule-Based Generator</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950 mb-3">
          Smart Ambala Itinerary Builder
        </h2>
        <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed">
          Ambala Cantt and Ambala City are distinct clusters separated by ~8 kilometers. Our engine uses real Haversine distances to arrange destinations sequentially, eliminating wasteful backtracking.
        </p>
      </div>

      {/* Control Panel Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-ivory-300 mb-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 1. Time Budget */}
          <div>
            <label className="block text-xs font-bold text-charcoal-800 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-forest-700" />
              <span>1. Available Time</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: '2h', label: '2 Hours', sub: 'Express' },
                { id: '4h', label: '4 Hours', sub: 'Half Day' },
                { id: 'full-day', label: 'Full Day', sub: '8 Hours' }
              ].map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setDuration(t.id as ItineraryDuration)}
                  className={`p-2.5 rounded-xl text-center border transition-all ${
                    duration === t.id
                      ? 'bg-forest-800 text-white border-forest-900 shadow-sm'
                      : 'bg-ivory-50 text-charcoal-700 border-ivory-300 hover:bg-ivory-100'
                  }`}
                >
                  <div className="text-xs font-bold">{t.label}</div>
                  <div className={`text-[10px] ${duration === t.id ? 'text-ivory-200' : 'text-charcoal-500'}`}>{t.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Interests Multi-select */}
          <div>
            <label className="block text-xs font-bold text-charcoal-800 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
              <span>2. Interests</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {(['Heritage', 'Spiritual', 'Culture', 'Shopping', 'Nature'] as Category[]).map(cat => {
                const active = selectedInterests.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleInterestToggle(cat)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      active
                        ? 'bg-saffron-600 text-white border-saffron-700 shadow-sm'
                        : 'bg-ivory-50 text-charcoal-600 border-ivory-300 hover:bg-ivory-100'
                    }`}
                  >
                    {active ? '✓ ' : '+ '}{cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Zone & Budget */}
          <div>
            <label className="block text-xs font-bold text-charcoal-800 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-forest-700" />
              <span>3. Zone &amp; Budget</span>
            </label>
            <div className="space-y-2">
              <select
                value={zone}
                onChange={e => setZone(e.target.value as any)}
                aria-label="Filter by zone"
                className="w-full p-2 bg-ivory-50 border border-ivory-300 rounded-xl text-xs font-semibold text-charcoal-800 focus:ring-2 focus:ring-forest-700"
              >
                <option value="all">Any Zone (Smart Clustered)</option>
                <option value="Ambala Cantt">Ambala Cantt Only</option>
                <option value="Ambala City">Ambala City Only</option>
                <option value="Ambala Rural">Ambala Rural Only</option>
              </select>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setBudget('all')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold border text-center ${
                    budget === 'all'
                      ? 'bg-forest-800 text-white border-forest-900'
                      : 'bg-ivory-50 text-charcoal-600 border-ivory-300'
                  }`}
                >
                  Any Budget
                </button>
                <button
                  type="button"
                  onClick={() => setBudget('free-only')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold border text-center ${
                    budget === 'free-only'
                      ? 'bg-emerald-700 text-white border-emerald-800'
                      : 'bg-ivory-50 text-charcoal-600 border-ivory-300'
                  }`}
                >
                  100% Free
                </button>
              </div>
            </div>
          </div>

          {/* 4. Start Time & Mode */}
          <div>
            <label className="block text-xs font-bold text-charcoal-800 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-forest-700" />
              <span>4. Start Time &amp; Mode</span>
            </label>
            <div className="space-y-2">
              <input
                type="time"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                aria-label="Itinerary start time"
                className="w-full p-2 bg-ivory-50 border border-ivory-300 rounded-xl text-xs font-bold text-charcoal-900 focus:ring-2 focus:ring-forest-700"
              />

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setTravelMode('car-taxi')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium border flex items-center justify-center space-x-1 ${
                    travelMode === 'car-taxi'
                      ? 'bg-forest-800 text-white border-forest-900 font-semibold'
                      : 'bg-ivory-50 text-charcoal-600 border-ivory-300'
                  }`}
                >
                  <Car className="w-3 h-3" />
                  <span>Car / Cab</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTravelMode('walking-rickshaw')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium border flex items-center justify-center space-x-1 ${
                    travelMode === 'walking-rickshaw'
                      ? 'bg-forest-800 text-white border-forest-900 font-semibold'
                      : 'bg-ivory-50 text-charcoal-600 border-ivory-300'
                  }`}
                >
                  <Footprints className="w-3 h-3" />
                  <span>Rickshaw</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Generate CTA Button */}
        <div className="mt-6 pt-5 border-t border-ivory-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-charcoal-500 flex items-center space-x-1.5">
            <Info className="w-4 h-4 text-saffron-600 flex-shrink-0" />
            <span>All estimates derive from empirical local transit times and official site timings.</span>
          </div>

          <button
            onClick={handleGenerate}
            className="px-6 py-3 rounded-2xl bg-saffron-600 hover:bg-saffron-700 text-white text-sm font-bold shadow-gold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
          >
            <Compass className="w-4 h-4" />
            <span>Generate Optimized Sequence</span>
          </button>
        </div>

      </div>

      {/* Generated Itinerary Display */}
      {currentItinerary && (
        <div className="space-y-6">
          
          {/* Itinerary Summary Header */}
          <div className="bg-forest-900 text-white rounded-3xl p-6 sm:p-8 shadow-card border border-forest-800">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-forest-800">
              <div>
                <span className="text-xs uppercase tracking-widest text-saffron-400 font-mono">
                  Optimized Sequence • {currentItinerary.stops.length} Stops
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-ivory-100">
                  {currentItinerary.title}
                </h3>
                <p className="text-xs sm:text-sm text-ivory-300 mt-2 max-w-2xl leading-relaxed">
                  {currentItinerary.summary}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={currentItinerary.googleMapsRouteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-saffron-600 hover:bg-saffron-500 text-white text-xs sm:text-sm font-semibold shadow-md flex items-center space-x-2 transition-all"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Open Full Route in Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={handleSaveItinerary}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all flex items-center space-x-2 ${
                    isSaved
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : 'bg-forest-800 hover:bg-forest-700 border-forest-700 text-ivory-100'
                  }`}
                >
                  <BookmarkCheck className="w-4 h-4" />
                  <span>{isSaved ? 'Saved to Passport ✓' : 'Save Itinerary'}</span>
                </button>

                <button
                  onClick={handlePrint}
                  aria-label="Print or export itinerary"
                  className="p-2.5 rounded-xl bg-forest-800 hover:bg-forest-700 border border-forest-700 text-ivory-100 transition-colors"
                  title="Print friendly view"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs sm:text-sm">
              <div>
                <span className="text-forest-300 block text-[11px] uppercase tracking-wider">Total Duration</span>
                <span className="font-serif text-lg sm:text-xl font-bold text-white">
                  {Math.floor(currentItinerary.totalDurationMinutes / 60)}h {currentItinerary.totalDurationMinutes % 60}m
                </span>
              </div>
              <div>
                <span className="text-forest-300 block text-[11px] uppercase tracking-wider">Estimated Transit</span>
                <span className="font-serif text-lg sm:text-xl font-bold text-white">
                  ~{currentItinerary.totalTravelMinutes} minutes
                </span>
              </div>
              <div>
                <span className="text-forest-300 block text-[11px] uppercase tracking-wider">Estimated Entry Tariff</span>
                <span className="font-serif text-lg sm:text-xl font-bold text-saffron-400">
                  {currentItinerary.estimatedCost}
                </span>
              </div>
              <div>
                <span className="text-forest-300 block text-[11px] uppercase tracking-wider">Starting Departure</span>
                <span className="font-serif text-lg sm:text-xl font-bold text-white">
                  {currentItinerary.stops[0]?.startTime || startTime}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline Sequence of Stops */}
          <div className="space-y-4">
            {currentItinerary.stops.map((stop, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === currentItinerary.stops.length - 1;

              return (
                <div key={stop.destination.id} className="relative">
                  
                  {/* Stop Item Card */}
                  <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-card border border-ivory-300 transition-all hover:border-forest-600/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    
                    {/* Left: Stop Number & Timing */}
                    <div className="flex items-start space-x-4 min-w-[200px]">
                      <div className="w-12 h-12 rounded-2xl bg-forest-800 text-ivory-100 flex flex-col items-center justify-center flex-shrink-0 shadow-md">
                        <span className="text-[10px] font-bold tracking-widest text-saffron-400 uppercase">Stop</span>
                        <span className="font-serif text-base font-black leading-none">{stop.stopNumber}</span>
                      </div>

                      <div>
                        <div className="text-xs font-mono font-bold text-forest-900">
                          {stop.startTime} – {stop.endTime}
                        </div>
                        <div className="text-[11px] text-charcoal-500 mt-0.5">
                          Stay: ~{stop.visitDurationMinutes} minutes
                        </div>
                        <div className="mt-1">
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-ivory-200 text-charcoal-700">
                            {stop.destination.zone}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Destination Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-semibold text-saffron-700">
                          {stop.destination.category}
                        </span>
                        {stop.destination.isGem && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                            Hidden Gem
                          </span>
                        )}
                      </div>

                      <h4
                        onClick={() => onViewDestinationDetails(stop.destination)}
                        className="font-serif text-lg sm:text-xl font-bold text-forest-950 hover:text-saffron-600 cursor-pointer transition-colors mt-0.5"
                      >
                        {stop.destination.name}
                      </h4>

                      <p className="text-xs text-charcoal-600 mt-1 leading-relaxed line-clamp-2">
                        {stop.curatorNote}
                      </p>

                      <div className="text-[11px] text-charcoal-500 mt-2 flex items-center space-x-3">
                        <span>Fee: <strong className="text-charcoal-800">{stop.destination.practicalInfo.entryFee}</strong></span>
                        <span>•</span>
                        <span>Timings: <strong className="text-charcoal-800">{stop.destination.practicalInfo.timings}</strong></span>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center space-x-2 self-end md:self-center">
                      {/* Reorder Buttons */}
                      <button
                        onClick={() => handleMoveStop(idx, 'up')}
                        disabled={isFirst}
                        aria-label="Move stop earlier"
                        className={`p-2 rounded-xl border ${
                          isFirst
                            ? 'text-charcoal-300 border-ivory-200 cursor-not-allowed'
                            : 'text-charcoal-700 border-ivory-300 hover:bg-ivory-200'
                        }`}
                        title="Move earlier"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleMoveStop(idx, 'down')}
                        disabled={isLast}
                        aria-label="Move stop later"
                        className={`p-2 rounded-xl border ${
                          isLast
                            ? 'text-charcoal-300 border-ivory-200 cursor-not-allowed'
                            : 'text-charcoal-700 border-ivory-300 hover:bg-ivory-200'
                        }`}
                        title="Move later"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleRemoveStop(idx)}
                        aria-label={`Remove ${stop.destination.name} from itinerary`}
                        className="p-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                        title="Remove stop"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <a
                        href={getSingleDestinationMapUrl(stop.destination)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-ivory-100 hover:bg-ivory-200 border border-ivory-300 text-charcoal-700 transition-colors"
                        title="Directions to this stop"
                      >
                        <MapPin className="w-4 h-4 text-forest-700" />
                      </a>
                    </div>

                  </div>

                  {/* Transit Connector between stops */}
                  {!isLast && stop.travelTimeToNextMinutes && (
                    <div className="my-2 ml-6 sm:ml-8 pl-6 border-l-2 border-dashed border-forest-300 py-2">
                      <div className="bg-ivory-100 rounded-2xl p-3 border border-ivory-300 text-xs text-charcoal-700 flex items-center justify-between gap-3">
                        <div className="flex items-center space-x-2">
                          <Car className="w-4 h-4 text-saffron-600 flex-shrink-0" />
                          <span>
                            Transit to Stop {idx + 2}: <strong>~{stop.travelTimeToNextMinutes} min</strong> ({stop.distanceToNextKm} km)
                          </span>
                        </div>
                        {stop.transitTip && (
                          <span className="text-[11px] text-charcoal-500 hidden sm:inline italic">
                            {stop.transitTip}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          {/* Add Additional Stop Selector */}
          {availableToAdd.length > 0 && (
            <div className="bg-ivory-50 rounded-3xl p-6 border border-ivory-300 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <h4 className="text-sm font-bold text-forest-900 flex items-center space-x-1.5">
                  <Plus className="w-4 h-4 text-saffron-600" />
                  <span>Custom Add: Insert another destination</span>
                </h4>
                <p className="text-xs text-charcoal-600 mt-0.5">
                  Select an authentic Ambala site to append to this itinerary. Timeline recalculates automatically.
                </p>
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <select
                  value={selectedAddId}
                  onChange={e => setSelectedAddId(e.target.value)}
                  className="p-2.5 rounded-xl border border-ivory-300 bg-white text-xs font-semibold text-charcoal-800 flex-1 sm:w-64"
                >
                  <option value="">-- Choose destination to add --</option>
                  {availableToAdd.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.zone})
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => handleAddStop(selectedAddId)}
                  disabled={!selectedAddId}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    selectedAddId
                      ? 'bg-forest-800 text-white hover:bg-forest-900 shadow-sm'
                      : 'bg-ivory-200 text-charcoal-400 cursor-not-allowed'
                  }`}
                >
                  Add Stop
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
