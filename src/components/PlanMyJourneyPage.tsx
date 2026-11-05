import React, { useState, useEffect } from 'react';
import {
  ItineraryPreference,
  ItineraryDuration,
  ItineraryBudgetOption,
  TravelMode,
  Category,
  Destination,
  GeneratedItinerary,
  ItineraryStop,
  StartingLocation
} from '../types';
import { DESTINATIONS, STARTING_LOCATIONS } from '../data/destinations';
import {
  generateSmartItinerary,
  recalculateStopsTimelineWithStart,
  parseStartTimeToMinutes,
  ItineraryEngineResult
} from '../utils/itineraryEngine';
import { getMultiStopRouteUrl, getSingleDestinationMapUrl } from '../utils/geo';
import {
  Compass,
  Clock,
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
  Info,
  DollarSign,
  Navigation,
  Flag,
  Share2,
  ChevronRight
} from 'lucide-react';

interface PlanMyJourneyPageProps {
  initialDestination?: Destination | null;
  onSaveToPassport: (itinerary: GeneratedItinerary) => void;
  onViewDestinationDetails: (dest: Destination) => void;
  onExploreClick: () => void;
}

export const PlanMyJourneyPage: React.FC<PlanMyJourneyPageProps> = ({
  initialDestination,
  onSaveToPassport,
  onViewDestinationDetails,
  onExploreClick
}) => {
  // Preference Form State
  const [duration, setDuration] = useState<ItineraryDuration>('4h');
  const [selectedInterests, setSelectedInterests] = useState<Category[]>([
    'Heritage',
    'Spiritual'
  ]);
  const [budget, setBudget] = useState<ItineraryBudgetOption>('Flexible');
  const [startingLocationId, setStartingLocationId] = useState<string>('cantt-station');
  const [travelMode, setTravelMode] = useState<TravelMode>('car-taxi');
  const [startTime, setStartTime] = useState<string>('09:00');

  // Engine Output State
  const [engineResult, setEngineResult] = useState<ItineraryEngineResult | null>(null);
  const [currentItinerary, setCurrentItinerary] = useState<GeneratedItinerary | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedAddId, setSelectedAddId] = useState<string>('');

  // Initial generation on mount
  useEffect(() => {
    handleGenerate();
  }, []);

  const handleInterestToggle = (interest: Category) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleGenerate = () => {
    const prefs: ItineraryPreference = {
      duration,
      interests: selectedInterests,
      budget,
      startingLocationId,
      travelMode,
      startTime
    };

    const res = generateSmartItinerary(prefs);
    setEngineResult(res);

    if (res.success) {
      setCurrentItinerary(res.itinerary);
      setIsSaved(false);
    } else {
      setCurrentItinerary(null);
    }
  };

  const handleResetForm = () => {
    setDuration('4h');
    setSelectedInterests(['Heritage', 'Spiritual']);
    setBudget('Flexible');
    setStartingLocationId('cantt-station');
    setTravelMode('car-taxi');
    setStartTime('09:00');
  };

  // Move Stop Up or Down
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

    // Recalculate timeline with starting location
    const startMins = parseStartTimeToMinutes(startTime);
    const newStops = recalculateStopsTimelineWithStart(
      currentDestinations,
      currentItinerary.startingLocation,
      startMins,
      travelMode
    );

    updateItineraryWithStops(newStops);
  };

  // Remove Stop
  const handleRemoveStop = (index: number) => {
    if (!currentItinerary) return;
    if (currentItinerary.stops.length <= 1) {
      alert('Your itinerary requires at least one destination.');
      return;
    }

    const currentDestinations = currentItinerary.stops.map(s => s.destination);
    currentDestinations.splice(index, 1);

    const startMins = parseStartTimeToMinutes(startTime);
    const newStops = recalculateStopsTimelineWithStart(
      currentDestinations,
      currentItinerary.startingLocation,
      startMins,
      travelMode
    );

    updateItineraryWithStops(newStops);
  };

  // Add Stop
  const handleAddStop = (destId: string) => {
    if (!destId || !currentItinerary) return;
    const dest = DESTINATIONS.find(d => d.id === destId);
    if (!dest) return;

    const currentDestinations = currentItinerary.stops.map(s => s.destination);
    if (currentDestinations.some(d => d.id === dest.id)) {
      alert('This destination is already in your journey.');
      return;
    }

    currentDestinations.push(dest);
    const startMins = parseStartTimeToMinutes(startTime);
    const newStops = recalculateStopsTimelineWithStart(
      currentDestinations,
      currentItinerary.startingLocation,
      startMins,
      travelMode
    );

    updateItineraryWithStops(newStops);
    setSelectedAddId('');
  };

  const updateItineraryWithStops = (newStops: ItineraryStop[]) => {
    if (!currentItinerary) return;
    const newDestinations = newStops.map(s => s.destination);
    const totalVisit = newStops.reduce((a, s) => a + s.visitDurationMinutes, 0);
    const totalTravel = newStops.reduce((a, s) => a + (s.travelFromPrevious?.travelMinutes || 0), 0);
    const newRouteUrl = getMultiStopRouteUrl(newDestinations);
    const primaryZone = Array.from(new Set(newDestinations.map(d => d.zone))).join(' & ');

    setCurrentItinerary({
      ...currentItinerary,
      stops: newStops,
      totalDurationMinutes: totalVisit + totalTravel,
      totalVisitMinutes: totalVisit,
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

  const existingIds = currentItinerary?.stops.map(s => s.destination.id) || [];
  const availableToAdd = DESTINATIONS.filter(d => !existingIds.includes(d.id));

  const chosenStartLocation = STARTING_LOCATIONS.find(s => s.id === startingLocationId) || STARTING_LOCATIONS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      
      {/* Page Header */}
      <div className="mb-8 max-w-3xl">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-saffron-100 text-saffron-700 text-xs font-semibold uppercase tracking-wider mb-2">
          <Compass className="w-3.5 h-3.5" />
          <span>Smart Local Itinerary Engine</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest-950 tracking-tight">
          Plan My Journey
        </h1>
        <p className="text-charcoal-600 text-sm sm:text-base mt-2 leading-relaxed">
          Ambala's historic landmarks are clustered across Ambala Cantt, Ambala City, and rural precincts. Our rule-based algorithm sequences stops from your actual starting point to eliminate backtracking while strictly respecting your time and interests.
        </p>
      </div>

      {/* Trip Preference Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-ivory-300 mb-10">
        <div className="flex items-center justify-between pb-5 border-b border-ivory-200 mb-6">
          <h2 className="font-serif text-xl font-bold text-forest-900 flex items-center space-x-2">
            <span>Trip Preferences</span>
          </h2>
          <button
            onClick={handleResetForm}
            className="text-xs font-semibold text-charcoal-500 hover:text-saffron-600 flex items-center space-x-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Form</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 1. Available Time */}
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
            <p className="text-[11px] text-charcoal-500 mt-2">
              Limits total stay &amp; transit to prevent rushing.
            </p>
          </div>

          {/* 2. Interests Multi-select */}
          <div>
            <label className="block text-xs font-bold text-charcoal-800 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
              <span>2. Interests ({selectedInterests.length} selected)</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {(['Heritage', 'Spiritual', 'Culture', 'Shopping', 'Nature'] as Category[]).map(cat => {
                const active = selectedInterests.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleInterestToggle(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
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
            {selectedInterests.length === 0 && (
              <p className="text-[11px] text-red-600 mt-2 font-semibold">
                * Please choose at least one interest.
              </p>
            )}
          </div>

          {/* 3. Starting Location */}
          <div>
            <label className="block text-xs font-bold text-charcoal-800 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-forest-700" />
              <span>3. Starting Point in Ambala</span>
            </label>
            <select
              value={startingLocationId}
              onChange={e => setStartingLocationId(e.target.value)}
              aria-label="Select starting location"
              className="w-full p-2.5 bg-ivory-50 border border-ivory-300 rounded-xl text-xs font-semibold text-charcoal-800 focus:ring-2 focus:ring-forest-700"
            >
              {STARTING_LOCATIONS.map(loc => (
                <option key={loc.id} value={loc.id}>
                  {loc.label}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-charcoal-500 mt-2 truncate" title={chosenStartLocation.description}>
              {chosenStartLocation.description}
            </p>
          </div>

          {/* 4. Budget & Travel Mode */}
          <div>
            <label className="block text-xs font-bold text-charcoal-800 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <DollarSign className="w-3.5 h-3.5 text-forest-700" />
              <span>4. Budget &amp; Transport</span>
            </label>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-1">
                {(['Free', 'Low-cost', 'Flexible'] as ItineraryBudgetOption[]).map(b => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudget(b)}
                    className={`py-1.5 px-1 rounded-lg text-xs font-semibold border text-center transition-all ${
                      budget === b
                        ? 'bg-forest-800 text-white border-forest-900 shadow-sm'
                        : 'bg-ivory-50 text-charcoal-600 border-ivory-300'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setTravelMode('car-taxi')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium border flex items-center justify-center space-x-1 ${
                    travelMode === 'car-taxi'
                      ? 'bg-saffron-600 text-white border-saffron-700 font-semibold'
                      : 'bg-ivory-50 text-charcoal-600 border-ivory-300'
                  }`}
                >
                  <Car className="w-3 h-3" />
                  <span>Cab / Car</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTravelMode('walking-rickshaw')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium border flex items-center justify-center space-x-1 ${
                    travelMode === 'walking-rickshaw'
                      ? 'bg-saffron-600 text-white border-saffron-700 font-semibold'
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

        {/* Action Bar */}
        <div className="mt-6 pt-5 border-t border-ivory-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-charcoal-500 flex items-center space-x-2">
            <Info className="w-4 h-4 text-saffron-600 flex-shrink-0" />
            <span>Deterministic rule engine: No generative hallucination. Only verified Ambala sites.</span>
          </div>

          <button
            onClick={handleGenerate}
            disabled={selectedInterests.length === 0}
            className={`px-7 py-3 rounded-2xl text-sm font-bold shadow-md transition-all flex items-center justify-center space-x-2 ${
              selectedInterests.length > 0
                ? 'bg-saffron-600 hover:bg-saffron-700 text-white shadow-gold hover:shadow-lg'
                : 'bg-charcoal-200 text-charcoal-400 cursor-not-allowed'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Generate Itinerary Sequence</span>
          </button>
        </div>
      </div>

      {/* STATE 1: INCOMPLETE PREFERENCES */}
      {engineResult && !engineResult.success && engineResult.reason === 'incomplete_preferences' && (
        <div className="bg-amber-50 rounded-3xl p-8 border border-amber-300 text-center max-w-xl mx-auto my-8">
          <AlertCircle className="w-12 h-12 text-amber-600 mx-auto mb-3" />
          <h2 className="font-serif text-2xl font-bold text-amber-950 mb-2">Incomplete Trip Preferences</h2>
          <p className="text-sm text-amber-800 leading-relaxed mb-6">
            {engineResult.message}
          </p>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setSelectedInterests(['Heritage', 'Spiritual'])}
              className="px-4 py-2 rounded-xl bg-forest-800 text-white text-xs font-semibold"
            >
              Select Heritage &amp; Spiritual
            </button>
          </div>
        </div>
      )}

      {/* STATE 2: NO MATCHING DESTINATIONS */}
      {engineResult && !engineResult.success && engineResult.reason === 'no_matching_destinations' && (
        <div className="bg-white rounded-3xl p-10 border border-ivory-300 text-center max-w-xl mx-auto my-8 shadow-card">
          <AlertCircle className="w-12 h-12 text-saffron-500 mx-auto mb-3 opacity-80" />
          <h2 className="font-serif text-2xl font-bold text-forest-950 mb-2">No Matching Destinations</h2>
          <p className="text-sm text-charcoal-600 leading-relaxed mb-6">
            {engineResult.message}
          </p>
          <button
            onClick={() => {
              setBudget('Flexible');
              setSelectedInterests(['Heritage', 'Spiritual', 'Culture']);
              handleGenerate();
            }}
            className="px-6 py-2.5 rounded-xl bg-forest-800 text-white text-xs sm:text-sm font-semibold hover:bg-forest-900 shadow-sm"
          >
            Broaden Preferences (Flexible Budget)
          </button>
        </div>
      )}

      {/* STATE 3: INSUFFICIENT TIME */}
      {engineResult && !engineResult.success && engineResult.reason === 'insufficient_time' && (
        <div className="bg-white rounded-3xl p-10 border border-ivory-300 text-center max-w-xl mx-auto my-8 shadow-card">
          <Clock className="w-12 h-12 text-forest-700 mx-auto mb-3 opacity-80" />
          <h2 className="font-serif text-2xl font-bold text-forest-950 mb-2">Time Window Too Narrow</h2>
          <p className="text-sm text-charcoal-600 leading-relaxed mb-6">
            {engineResult.message}
          </p>
          <button
            onClick={() => {
              setDuration('4h');
              handleGenerate();
            }}
            className="px-6 py-2.5 rounded-xl bg-forest-800 text-white text-xs sm:text-sm font-semibold hover:bg-forest-900 shadow-sm"
          >
            Switch to 4 Hours (Half Day)
          </button>
        </div>
      )}

      {/* STATE 4: SUCCESSFUL ITINERARY GENERATION */}
      {currentItinerary && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Summary Banner */}
          <div className="bg-forest-950 text-white rounded-3xl p-6 sm:p-8 shadow-card border border-forest-800">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-forest-800 gap-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-saffron-500/20 text-saffron-300 text-xs font-mono font-bold border border-saffron-500/30">
                    {currentItinerary.stops.length} STOP SEQUENCE
                  </span>
                  <span className="text-xs text-forest-200">
                    Starts at {currentItinerary.startingLocation.name}
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory-100">
                  {currentItinerary.title}
                </h3>
                <p className="text-xs sm:text-sm text-ivory-300 mt-2 max-w-2xl leading-relaxed">
                  {currentItinerary.summary}
                </p>
              </div>

              {/* Action Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={currentItinerary.googleMapsRouteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-saffron-600 hover:bg-saffron-500 text-white text-xs sm:text-sm font-semibold shadow-md flex items-center space-x-2 transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open Complete Route in Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={handleSaveItinerary}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all flex items-center space-x-2 ${
                    isSaved
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : 'bg-forest-900 hover:bg-forest-800 border-forest-700 text-ivory-100'
                  }`}
                >
                  <BookmarkCheck className="w-4 h-4" />
                  <span>{isSaved ? 'Saved to Passport ✓' : 'Save Itinerary'}</span>
                </button>

                <button
                  onClick={handlePrint}
                  aria-label="Print friendly itinerary"
                  className="p-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 border border-forest-700 text-ivory-100 transition-colors"
                  title="Print friendly view"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs sm:text-sm">
              <div>
                <span className="text-forest-400 block text-[11px] uppercase tracking-wider">Total Duration</span>
                <span className="font-serif text-lg sm:text-xl font-bold text-white">
                  {Math.floor(currentItinerary.totalDurationMinutes / 60)}h {currentItinerary.totalDurationMinutes % 60}m
                </span>
                <span className="text-[10px] text-forest-300 block">
                  ({currentItinerary.totalVisitMinutes}m visits + {currentItinerary.totalTravelMinutes}m transit)
                </span>
              </div>

              <div>
                <span className="text-forest-400 block text-[11px] uppercase tracking-wider">Verified Entry Budget</span>
                <span className="font-serif text-lg sm:text-xl font-bold text-saffron-400">
                  {currentItinerary.estimatedCost}
                </span>
                <span className="text-[10px] text-forest-300 block">Official entrance rates only</span>
              </div>

              <div>
                <span className="text-forest-400 block text-[11px] uppercase tracking-wider">Starting Point</span>
                <span className="font-serif text-base sm:text-lg font-bold text-white truncate block">
                  {currentItinerary.startingLocation.name}
                </span>
                <span className="text-[10px] text-forest-300 block">Departure: {currentItinerary.stops[0]?.startTime || startTime}</span>
              </div>

              <div>
                <span className="text-forest-400 block text-[11px] uppercase tracking-wider">Regions Covered</span>
                <span className="font-serif text-base sm:text-lg font-bold text-white truncate block">
                  {currentItinerary.primaryZone}
                </span>
                <span className="text-[10px] text-forest-300 block">Proximity clustered</span>
              </div>
            </div>

            {/* Algorithm Transparency pill */}
            <div className="mt-6 pt-4 border-t border-forest-800 text-[11px] text-forest-300 font-mono flex items-center space-x-2">
              <Compass className="w-3.5 h-3.5 text-saffron-400 flex-shrink-0" />
              <span>{currentItinerary.algorithmSummary}</span>
            </div>
          </div>

          {/* VISUAL JOURNEY TIMELINE */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-ivory-300">
            <h3 className="font-serif text-2xl font-bold text-forest-950 mb-6 flex items-center justify-between">
              <span>Journey Sequence &amp; Visual Timeline</span>
              <span className="text-xs font-sans text-charcoal-500 font-normal">
                Use ↑ and ↓ to reorder • Timeline recalculates automatically
              </span>
            </h3>

            {/* 1. START NODE IN TIMELINE */}
            <div className="flex items-start space-x-4 pb-6">
              <div className="w-12 h-12 rounded-2xl bg-saffron-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <Flag className="w-5 h-5" />
              </div>
              <div className="bg-ivory-100 rounded-2xl p-4 border border-ivory-300 flex-1">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono font-bold text-saffron-700">STARTING POINT • {startTime}</span>
                  <span className="text-charcoal-500">{currentItinerary.startingLocation.zone}</span>
                </div>
                <h4 className="font-serif text-base font-bold text-forest-950">
                  {currentItinerary.startingLocation.name}
                </h4>
                <p className="text-xs text-charcoal-600 mt-0.5">
                  {currentItinerary.startingLocation.description}
                </p>
              </div>
            </div>

            {/* Connecting transit from start to stop 1 */}
            {currentItinerary.stops.length > 0 && currentItinerary.stops[0].travelFromPrevious && (
              <div className="ml-6 pl-6 border-l-2 border-dashed border-forest-300 py-2">
                <div className="bg-ivory-50 rounded-xl p-2.5 border border-ivory-200 text-xs text-charcoal-700 flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <Car className="w-3.5 h-3.5 text-forest-700 flex-shrink-0" />
                    <span>
                      Depart to Stop 1: <strong>~{currentItinerary.stops[0].travelFromPrevious.travelMinutes} mins</strong> ({currentItinerary.stops[0].travelFromPrevious.distanceKm} km)
                    </span>
                  </div>
                  <span className="text-[11px] text-charcoal-500 hidden sm:inline italic">
                    {currentItinerary.stops[0].travelFromPrevious.transitAdvice}
                  </span>
                </div>
              </div>
            )}

            {/* 2. SEQUENCE OF STOPS */}
            <div className="space-y-4">
              {currentItinerary.stops.map((stop, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === currentItinerary.stops.length - 1;

                return (
                  <div key={stop.destination.id} className="relative">
                    
                    {/* Destination Card on Timeline */}
                    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-ivory-300 hover:border-forest-600/50 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      
                      {/* Left: Stop Index & Timing */}
                      <div className="flex items-start space-x-4 min-w-[210px]">
                        <div className="w-12 h-12 rounded-2xl bg-forest-800 text-ivory-100 flex flex-col items-center justify-center flex-shrink-0 shadow-md">
                          <span className="text-[9px] font-bold tracking-widest text-saffron-400 uppercase">Stop</span>
                          <span className="font-serif text-lg font-black leading-none">{stop.stopNumber}</span>
                        </div>

                        <div>
                          <div className="text-xs font-mono font-bold text-forest-900">
                            {stop.startTime} – {stop.endTime}
                          </div>
                          <div className="text-[11px] text-charcoal-500 mt-0.5">
                            Visit duration: <strong>~{stop.visitDurationMinutes} mins</strong>
                          </div>
                          <div className="mt-1 flex items-center space-x-1.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-ivory-200 text-charcoal-700">
                              {stop.destination.zone}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Middle: Details & Selection Explanation */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-semibold text-saffron-700">
                            {stop.destination.category}
                          </span>
                          {stop.destination.isGem && (
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
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

                        {/* Why this place was selected explanation */}
                        <div className="bg-ivory-50 rounded-xl p-2.5 mt-2 border border-ivory-200 text-xs text-charcoal-700">
                          <span className="font-bold text-forest-900 block mb-0.5 flex items-center space-x-1">
                            <Compass className="w-3 h-3 text-saffron-600" />
                            <span>Why this was selected:</span>
                          </span>
                          <p className="text-[11px] text-charcoal-600 leading-relaxed">
                            {stop.selectionReason}
                          </p>
                        </div>

                        {/* Verified Budget Info Badge */}
                        <div className="mt-2 text-[11px] text-charcoal-600 flex items-center space-x-1.5">
                          <DollarSign className="w-3.5 h-3.5 text-forest-700 flex-shrink-0" />
                          <span className="font-semibold text-charcoal-800">{stop.verifiedBudgetInfo}</span>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center space-x-2 self-end md:self-center">
                        <button
                          onClick={() => onViewDestinationDetails(stop.destination)}
                          className="px-3 py-2 rounded-xl text-xs font-semibold bg-ivory-100 hover:bg-ivory-200 text-charcoal-800 border border-ivory-300"
                        >
                          Details
                        </button>

                        <button
                          onClick={() => handleMoveStop(idx, 'up')}
                          disabled={isFirst}
                          aria-label="Move stop up"
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
                          aria-label="Move stop down"
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
                          className="p-2 rounded-xl bg-ivory-100 hover:bg-ivory-200 border border-ivory-300 text-charcoal-700"
                          title="Directions to this stop"
                        >
                          <Navigation className="w-4 h-4 text-forest-700" />
                        </a>
                      </div>

                    </div>

                    {/* Connecting transit to next stop */}
                    {!isLast && stop.travelTimeToNextMinutes && (
                      <div className="my-2 ml-6 pl-6 border-l-2 border-dashed border-forest-300 py-2">
                        <div className="bg-ivory-50 rounded-xl p-2.5 border border-ivory-200 text-xs text-charcoal-700 flex items-center justify-between gap-3">
                          <div className="flex items-center space-x-2">
                            <Car className="w-3.5 h-3.5 text-saffron-600 flex-shrink-0" />
                            <span>
                              Transit to Stop {idx + 2}: <strong>~{stop.travelTimeToNextMinutes} mins</strong> ({stop.distanceToNextKm} km)
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

            {/* FINALE NODE */}
            <div className="mt-6 pt-4 border-t border-ivory-200 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-forest-900 text-saffron-400 flex items-center justify-center flex-shrink-0 shadow-md">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-forest-950">
                  Journey Completed
                </h4>
                <p className="text-xs text-charcoal-600 mt-0.5">
                  Approx. {Math.floor(currentItinerary.totalDurationMinutes / 60)}h {currentItinerary.totalDurationMinutes % 60}m total time invested in authentic Ambala heritage.
                </p>
              </div>
            </div>

            {/* Add Custom Stop Selector */}
            {availableToAdd.length > 0 && (
              <div className="mt-8 pt-6 border-t border-ivory-200 bg-ivory-50 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-forest-900 uppercase tracking-wider flex items-center space-x-1.5">
                    <Plus className="w-3.5 h-3.5 text-saffron-600" />
                    <span>Append another destination to this journey</span>
                  </h4>
                  <p className="text-xs text-charcoal-600 mt-0.5">
                    Select a verified Ambala destination. Route sequence and timings will readjust automatically.
                  </p>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <select
                    value={selectedAddId}
                    onChange={e => setSelectedAddId(e.target.value)}
                    className="p-2.5 rounded-xl border border-ivory-300 bg-white text-xs font-semibold text-charcoal-800 flex-1 sm:w-64"
                  >
                    <option value="">-- Choose destination --</option>
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

          {/* Bottom Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              onClick={handleGenerate}
              className="px-5 py-2.5 rounded-xl bg-ivory-200 hover:bg-ivory-300 text-charcoal-800 text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all"
            >
              <RotateCcw className="w-4 h-4 text-forest-700" />
              <span>Regenerate Recommendations</span>
            </button>

            <div className="flex items-center space-x-3">
              <button
                onClick={onExploreClick}
                className="text-xs font-semibold text-forest-800 hover:underline"
              >
                Browse All 14 Destinations →
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
