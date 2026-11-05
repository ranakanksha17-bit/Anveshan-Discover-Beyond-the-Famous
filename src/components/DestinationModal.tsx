import React, { useState, useEffect } from 'react';
import { Destination, VisitedRecord } from '../types';
import { getSingleDestinationMapUrl } from '../utils/geo';
import {
  X,
  MapPin,
  Clock,
  Ticket,
  Heart,
  Check,
  ExternalLink,
  Gem,
  Camera,
  Shirt,
  Calendar,
  Compass,
  Star,
  Info,
  BookOpen,
  Share2
} from 'lucide-react';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  visitedRecord?: VisitedRecord;
  onSaveVisitedRecord: (destId: string, record: VisitedRecord) => void;
  onRemoveVisitedRecord: (destId: string) => void;
  onAddToItinerary: (destination: Destination) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  isFavorite,
  onToggleFavorite,
  visitedRecord,
  onSaveVisitedRecord,
  onRemoveVisitedRecord,
  onAddToItinerary
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'practical' | 'my-log'>('overview');
  const [visitedNote, setVisitedNote] = useState('');
  const [visitedRating, setVisitedRating] = useState<number>(5);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (visitedRecord) {
      setVisitedNote(visitedRecord.note || '');
      setVisitedRating(visitedRecord.rating || 5);
    } else {
      setVisitedNote('');
      setVisitedRating(5);
    }
    setActiveTab('overview');
  }, [destination, visitedRecord]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!destination) return null;

  const isVisited = Boolean(visitedRecord);

  const handleMarkVisitedSubmit = () => {
    onSaveVisitedRecord(destination.id, {
      date: visitedRecord?.date || new Date().toISOString().split('T')[0],
      note: visitedNote.trim() || undefined,
      rating: visitedRating
    });
    setIsEditingNote(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${destination.name} - ANVESHAN Ambala`,
        text: destination.tagline,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${destination.name} in Ambala, Haryana - ${window.location.href}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-charcoal-900/70 backdrop-blur-md overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-dest-title"
    >
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-ivory-300 overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto animate-scale-up">
        
        {/* Top Floating Control Bar */}
        <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
          <button
            onClick={handleShare}
            aria-label="Share destination"
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-charcoal-700 hover:text-charcoal-950 hover:bg-white flex items-center justify-center shadow-lg transition-all"
            title="Share destination"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => onToggleFavorite(destination.id)}
            aria-label={isFavorite ? 'Remove favorite' : 'Add favorite'}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-charcoal-700 hover:text-charcoal-950 hover:bg-white flex items-center justify-center shadow-lg transition-all"
            title="Save to Favourites"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'text-saffron-600 fill-saffron-600' : 'text-charcoal-600'}`} />
          </button>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-10 h-10 rounded-full bg-charcoal-900/80 backdrop-blur-md text-white hover:bg-charcoal-900 flex items-center justify-center shadow-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto flex-1">
          
          {/* Hero Image Section */}
          <div className="relative aspect-[21/9] sm:aspect-[24/10] bg-charcoal-900">
            <img
              src={destination.image}
              alt={destination.imageAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-black/20" />

            <div className="absolute bottom-4 left-6 right-6 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {destination.isGem && (
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold shadow-md">
                    <Gem className="w-3.5 h-3.5 fill-white" />
                    <span>Lesser-Known Hidden Gem</span>
                  </span>
                )}
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold border border-white/30">
                  {destination.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium border border-white/30 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-saffron-400" />
                  <span>{destination.zone}</span>
                </span>
              </div>

              <div className="text-xs text-saffron-300 font-sans tracking-wide">
                {destination.hindiName}
              </div>
              <h2 id="modal-dest-title" className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
                {destination.name}
              </h2>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="bg-ivory-100 border-b border-ivory-300 px-6 pt-3 flex space-x-6 text-sm font-semibold text-charcoal-600">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 border-b-2 transition-all ${
                activeTab === 'overview'
                  ? 'border-forest-800 text-forest-900'
                  : 'border-transparent hover:text-charcoal-900'
              }`}
            >
              Overview &amp; Highlights
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`pb-3 border-b-2 transition-all ${
                activeTab === 'history'
                  ? 'border-forest-800 text-forest-900'
                  : 'border-transparent hover:text-charcoal-900'
              }`}
            >
              Historical Significance
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`pb-3 border-b-2 transition-all ${
                activeTab === 'practical'
                  ? 'border-forest-800 text-forest-900'
                  : 'border-transparent hover:text-charcoal-900'
              }`}
            >
              Visitor Practical Dossier
            </button>
            <button
              onClick={() => setActiveTab('my-log')}
              className={`pb-3 border-b-2 transition-all flex items-center space-x-1.5 ${
                activeTab === 'my-log'
                  ? 'border-forest-800 text-forest-900'
                  : 'border-transparent hover:text-charcoal-900'
              }`}
            >
              <Check className={`w-4 h-4 ${isVisited ? 'text-emerald-600' : ''}`} />
              <span>{isVisited ? 'Visited Log' : 'Log Visit'}</span>
            </button>
          </div>

          {/* Tab Panes */}
          <div className="p-6 sm:p-8">
            
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm uppercase tracking-wider font-bold text-saffron-600 mb-2">
                    Essence &amp; Atmosphere
                  </h3>
                  <p className="text-base sm:text-lg text-charcoal-800 font-serif leading-relaxed">
                    {destination.tagline}
                  </p>
                </div>

                {/* Key Highlights Grid */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-charcoal-500 mb-3">
                    Curated Key Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {destination.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200 flex items-start space-x-3"
                      >
                        <span className="w-5 h-5 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                          {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-charcoal-700 leading-snug">
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Address & Neighborhood */}
                <div className="p-4 rounded-2xl bg-white border border-ivory-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-saffron-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-charcoal-900">{destination.location.neighborhood}</div>
                      <div className="text-xs text-charcoal-600">{destination.location.address}</div>
                    </div>
                  </div>
                  <a
                    href={getSingleDestinationMapUrl(destination)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold shadow-sm self-start sm:self-auto"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {destination.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-ivory-200 text-charcoal-700 text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 2. HISTORY TAB */}
            {activeTab === 'history' && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-2 text-saffron-600 mb-2">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider font-bold">Documented Heritage Chronicle</span>
                  </div>
                  <p className="text-sm sm:text-base text-charcoal-800 leading-relaxed font-sans text-justify">
                    {destination.historicalSignificance}
                  </p>
                </div>

                {destination.architecturalStyle && (
                  <div className="p-4 rounded-2xl bg-ivory-100 border border-ivory-300">
                    <span className="text-xs font-bold text-forest-900 uppercase tracking-wider block mb-1">
                      Architectural Legacy &amp; Period:
                    </span>
                    <p className="text-sm text-charcoal-700">{destination.architecturalStyle}</p>
                  </div>
                )}

                {/* Source Verification Badge */}
                <div className="p-4 rounded-2xl bg-white border border-forest-200 flex items-start space-x-3">
                  <Info className="w-5 h-5 text-forest-700 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-forest-900 block">Verified Official Source:</span>
                    <p className="text-charcoal-600 mt-0.5">
                      Information verified against {destination.source.name}.
                    </p>
                    <a
                      href={destination.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-saffron-600 hover:text-saffron-700 font-semibold mt-1.5 hover:underline"
                    >
                      <span>Visit Official Portal ({destination.source.url})</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* 3. PRACTICAL DOSSIER TAB */}
            {activeTab === 'practical' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200">
                    <div className="flex items-center space-x-2 text-forest-800 font-bold text-xs uppercase tracking-wider mb-2">
                      <Clock className="w-4 h-4" />
                      <span>Opening Hours &amp; Timings</span>
                    </div>
                    <p className="text-sm font-semibold text-charcoal-900">{destination.practicalInfo.timings}</p>
                    <p className="text-xs text-charcoal-500 mt-1">Recommended Duration: ~{destination.practicalInfo.suggestedDurationMinutes} minutes</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200">
                    <div className="flex items-center space-x-2 text-forest-800 font-bold text-xs uppercase tracking-wider mb-2">
                      <Ticket className="w-4 h-4 text-saffron-600" />
                      <span>Entry Tariff &amp; Hospitality</span>
                    </div>
                    <p className="text-sm font-semibold text-charcoal-900">{destination.practicalInfo.entryFee}</p>
                    <p className="text-xs text-charcoal-500 mt-1">No hidden charges or mandatory guide fees.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200">
                    <div className="flex items-center space-x-2 text-forest-800 font-bold text-xs uppercase tracking-wider mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>Optimal Time to Visit</span>
                    </div>
                    <p className="text-sm text-charcoal-800">{destination.practicalInfo.bestTimeToVisit}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200">
                    <div className="flex items-center space-x-2 text-forest-800 font-bold text-xs uppercase tracking-wider mb-2">
                      <Camera className="w-4 h-4" />
                      <span>Photography Policy</span>
                    </div>
                    <p className="text-sm text-charcoal-800">{destination.practicalInfo.photography}</p>
                  </div>

                </div>

                {destination.practicalInfo.dressCode && (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start space-x-3">
                    <Shirt className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                        Cultural Dress Code &amp; Etiquette:
                      </span>
                      <p className="text-xs sm:text-sm text-amber-800 mt-0.5">
                        {destination.practicalInfo.dressCode}
                      </p>
                    </div>
                  </div>
                )}

                <div className="p-4 rounded-2xl bg-ivory-100 border border-ivory-300">
                  <span className="text-xs font-bold text-charcoal-800 uppercase tracking-wider block mb-1">
                    Terrain &amp; Accessibility:
                  </span>
                  <p className="text-xs sm:text-sm text-charcoal-700">{destination.practicalInfo.accessibility}</p>
                </div>

                <div>
                  <span className="text-xs font-bold text-charcoal-600 uppercase tracking-wider block mb-2">
                    Ideal Traveler Profile:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {destination.practicalInfo.idealFor.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-forest-100 text-forest-900 text-xs font-semibold"
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* 4. MY LOG & NOTES TAB */}
            {activeTab === 'my-log' && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-ivory-50 border border-ivory-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Check className={`w-5 h-5 ${isVisited ? 'text-emerald-600' : 'text-charcoal-400'}`} />
                      <span className="text-base font-bold text-forest-950">
                        {isVisited ? 'Destination Marked as Visited' : 'Log this Visit to Your Passport'}
                      </span>
                    </div>
                    {isVisited && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                        Logged on {visitedRecord?.date}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-charcoal-600 mb-4">
                    Marking destinations logs them in your Travel Passport, helps calculate your Ambala discovery progress, and unlocks special collector badges.
                  </p>

                  {/* Rating Selector */}
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1.5">
                      Your Personal Experience Rating:
                    </label>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setVisitedRating(star)}
                          className="p-1 focus:outline-none"
                          aria-label={`Rate ${star} stars`}
                        >
                          <Star
                            className={`w-6 h-6 transition-colors ${
                              star <= visitedRating
                                ? 'text-amber-500 fill-amber-500'
                                : 'text-charcoal-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-charcoal-700 ml-2">
                        {visitedRating} / 5 Stars
                      </span>
                    </div>
                  </div>

                  {/* Personal Note */}
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1.5">
                      Personal Traveler's Note / Memory (Stored locally):
                    </label>
                    <textarea
                      value={visitedNote}
                      onChange={e => setVisitedNote(e.target.value)}
                      placeholder="e.g. Savoring the quiet sunset behind the Gothic bell tower, magnificent hospitality at langar..."
                      rows={3}
                      className="w-full p-3 rounded-xl border border-ivory-300 bg-white text-sm text-charcoal-800 focus:ring-2 focus:ring-forest-700 focus:outline-none"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleMarkVisitedSubmit}
                      className="px-5 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center space-x-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>{isVisited ? 'Update Visit Log' : 'Save Visit & Check Badges'}</span>
                    </button>

                    {isVisited && (
                      <button
                        onClick={() => onRemoveVisitedRecord(destination.id)}
                        className="px-4 py-2.5 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 text-xs sm:text-sm font-medium transition-colors"
                      >
                        Remove from Visited
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Modal Bottom Sticky Action Bar */}
        <div className="bg-ivory-100 border-t border-ivory-300 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleFavorite(destination.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all flex items-center space-x-1.5 ${
                isFavorite
                  ? 'bg-saffron-50 text-saffron-700 border-saffron-300'
                  : 'bg-white text-charcoal-700 border-ivory-300 hover:bg-ivory-200'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'text-saffron-600 fill-saffron-600' : ''}`} />
              <span>{isFavorite ? 'Saved in Favourites' : 'Save to Favourites'}</span>
            </button>

            <button
              onClick={() => onAddToItinerary(destination)}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white border border-ivory-300 hover:bg-ivory-200 text-charcoal-800 transition-all flex items-center space-x-1.5"
            >
              <Compass className="w-4 h-4 text-forest-700" />
              <span>Add to Itinerary</span>
            </button>
          </div>

          <a
            href={getSingleDestinationMapUrl(destination)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs sm:text-sm font-semibold shadow-md flex items-center space-x-2"
          >
            <MapPin className="w-4 h-4 text-saffron-400" />
            <span>Open Directions in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>

      </div>
    </div>
  );
};
