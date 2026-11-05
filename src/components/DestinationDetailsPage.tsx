import React, { useState } from 'react';
import { Destination, VisitedRecord } from '../types';
import { getSingleDestinationMapUrl } from '../utils/geo';
import {
  ArrowLeft,
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
  Share2,
  BookOpen,
  Info,
  Star,
  Compass,
  CheckCircle2,
  Navigation
} from 'lucide-react';

interface DestinationDetailsPageProps {
  destination: Destination;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  visitedRecord?: VisitedRecord;
  onSaveVisitedRecord: (destId: string, record: VisitedRecord) => void;
  onRemoveVisitedRecord: (destId: string) => void;
  onAddToItinerary: (dest: Destination) => void;
}

export const DestinationDetailsPage: React.FC<DestinationDetailsPageProps> = ({
  destination,
  onBack,
  isFavorite,
  onToggleFavorite,
  visitedRecord,
  onSaveVisitedRecord,
  onRemoveVisitedRecord,
  onAddToItinerary
}) => {
  const [visitedNote, setVisitedNote] = useState(visitedRecord?.note || '');
  const [visitedRating, setVisitedRating] = useState<number>(visitedRecord?.rating || 5);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showLogForm, setShowLogForm] = useState(false);

  const isVisited = Boolean(visitedRecord);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${destination.name} – ANVESHAN Ambala`,
        text: destination.tagline,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${destination.name} - Ambala, Haryana | ${window.location.href}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveVisitedRecord(destination.id, {
      date: visitedRecord?.date || new Date().toISOString().split('T')[0],
      note: visitedNote.trim().slice(0, 500) || undefined,
      rating: Math.max(1, Math.min(5, Number(visitedRating) || 5))
    });
    setShowLogForm(false);
  };

  return (
    <div className="min-h-screen bg-ivory-100 py-8 animate-fade-in">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & Back Button */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-ivory-300">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-sm font-semibold text-charcoal-700 hover:text-forest-900 bg-white border border-ivory-300 hover:bg-ivory-200 px-4 py-2 rounded-xl transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-forest-800" />
            <span>← Back to Discovery</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-white border border-ivory-300 hover:bg-ivory-200 text-charcoal-700 transition-all shadow-sm flex items-center space-x-1.5 text-xs font-semibold"
              title="Share destination"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copiedLink ? 'Copied link!' : 'Share'}</span>
            </button>

            <button
              onClick={() => onToggleFavorite(destination.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all flex items-center space-x-2 shadow-sm ${
                isFavorite
                  ? 'bg-saffron-50 text-saffron-700 border-saffron-300'
                  : 'bg-white text-charcoal-700 border-ivory-300 hover:bg-ivory-200'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'text-saffron-600 fill-saffron-600' : 'text-charcoal-500'}`} />
              <span>{isFavorite ? 'Saved in Favourites' : 'Add to Favourites'}</span>
            </button>
          </div>
        </div>

        {/* Hero Visual Banner */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-card border border-ivory-300 mb-8 bg-charcoal-900">
          <img
            src={destination.image}
            alt={destination.imageAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />

          {/* Floating Badges */}
          <div className="absolute top-6 left-6 flex flex-wrap items-center gap-2">
            {destination.isGem && (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold shadow-md">
                <Gem className="w-3.5 h-3.5 fill-white" />
                <span>Hidden Gem</span>
              </span>
            )}
            <span className="px-3 py-1 rounded-full bg-charcoal-900/80 backdrop-blur-md text-ivory-100 text-xs font-semibold border border-white/20">
              {destination.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-charcoal-900/80 backdrop-blur-md text-ivory-100 text-xs font-medium border border-white/20 flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-saffron-400" />
              <span>{destination.zone}</span>
            </span>
          </div>

          {/* Bottom Title Overlay */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="text-sm font-medium text-saffron-300 tracking-wide font-sans mb-1">
              {destination.hindiName}
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-2 leading-tight">
              {destination.name}
            </h1>
            <p className="text-sm sm:text-base text-ivory-200/90 font-light max-w-3xl leading-relaxed">
              {destination.tagline}
            </p>
          </div>
        </div>

        {/* Quick Action Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-ivory-300 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-amber-500 font-bold text-sm">
              <span>★ {destination.rating.toFixed(1)}</span>
              <span className="text-charcoal-500 text-xs">({destination.reviewsCount} reviews)</span>
            </div>
            <span className="text-charcoal-300">•</span>
            <span className="text-xs font-semibold text-charcoal-700">
              Entry: <strong className="text-forest-900">{destination.practicalInfo.entryFee}</strong>
            </span>
            <span className="text-charcoal-300 hidden sm:inline">•</span>
            <span className="text-xs text-charcoal-600 hidden sm:inline">
              Suggested stay: ~{destination.practicalInfo.suggestedDurationMinutes} mins
            </span>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {isVisited ? (
              <button
                onClick={() => onRemoveVisitedRecord(destination.id)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs sm:text-sm font-semibold hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-all"
                title="Click to undo visited status"
              >
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span>Visited ✓ (Undo)</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onSaveVisitedRecord(destination.id, {
                    date: new Date().toISOString().split('T')[0]
                  });
                }}
                className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs sm:text-sm font-semibold shadow-md transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Mark as Visited</span>
              </button>
            )}

            <a
              href={getSingleDestinationMapUrl(destination)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-ivory-100 hover:bg-ivory-200 text-charcoal-800 border border-ivory-300 text-xs sm:text-sm font-semibold transition-all"
            >
              <Navigation className="w-4 h-4 text-saffron-600" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => onAddToItinerary(destination)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl border border-ivory-300 bg-ivory-100 hover:bg-ivory-200 text-charcoal-800 text-xs sm:text-sm font-semibold transition-all"
            >
              <Compass className="w-4 h-4 text-forest-700" />
              <span>Add to Itinerary</span>
            </button>
          </div>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Column (8 cols): Description & History */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Description & Overview */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-ivory-300">
              <div className="flex items-center space-x-2 text-saffron-600 mb-3">
                <Info className="w-4 h-4" />
                <h2 className="text-xs uppercase tracking-wider font-bold">Destination Overview</h2>
              </div>
              <p className="text-base sm:text-lg text-charcoal-800 font-serif leading-relaxed mb-6">
                {destination.tagline}
              </p>

              <h3 className="text-xs uppercase tracking-wider font-bold text-charcoal-500 mb-3">
                Curated Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destination.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200 flex items-start space-x-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-charcoal-700 leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Historical or Cultural Significance */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-ivory-300">
              <div className="flex items-center space-x-2 text-saffron-600 mb-3">
                <BookOpen className="w-4 h-4" />
                <h2 className="text-xs uppercase tracking-wider font-bold">Historical &amp; Cultural Significance</h2>
              </div>
              
              <div className="text-sm sm:text-base text-charcoal-800 leading-relaxed font-sans text-justify space-y-4">
                <p>{destination.historicalSignificance}</p>
              </div>

              {destination.architecturalStyle && (
                <div className="mt-6 p-4 rounded-2xl bg-ivory-100 border border-ivory-300">
                  <span className="text-xs font-bold text-forest-900 uppercase tracking-wider block mb-1">
                    Architectural Period &amp; Style:
                  </span>
                  <p className="text-sm text-charcoal-700">{destination.architecturalStyle}</p>
                </div>
              )}

              {/* Source Reference Link */}
              <div className="mt-6 p-4 rounded-2xl bg-forest-50 border border-forest-200 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-forest-700 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-forest-900 block">Verifiable Official Reference:</span>
                  <p className="text-charcoal-600 mt-0.5">
                    Verified through official records of {destination.source.name}.
                  </p>
                  <a
                    href={destination.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-saffron-600 hover:text-saffron-700 font-semibold mt-1.5 hover:underline"
                  >
                    <span>Inspect Source: {destination.source.url}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </section>

            {/* Traveler's Visited Log & Memory */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-ivory-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-serif text-xl font-bold text-forest-950">
                    {isVisited ? 'Your Travel Passport Entry' : 'Have you visited this place?'}
                  </h2>
                  <p className="text-xs text-charcoal-600 mt-0.5">
                    Log your visit to record memories, rate your experience, and earn Ambala discovery badges.
                  </p>
                </div>

                {isVisited ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Visited</span>
                  </span>
                ) : (
                  <button
                    onClick={() => setShowLogForm(true)}
                    className="px-4 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold shadow-sm"
                  >
                    Mark as Visited
                  </button>
                )}
              </div>

              {isVisited && !showLogForm && (
                <div className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-charcoal-500">Recorded on: <strong>{visitedRecord?.date}</strong></span>
                    {visitedRecord?.rating && (
                      <span className="text-amber-500 font-bold">
                        {'★'.repeat(visitedRecord.rating)} ({visitedRecord.rating}/5)
                      </span>
                    )}
                  </div>
                  {visitedRecord?.note && (
                    <p className="text-sm text-charcoal-800 italic mt-1 bg-white p-3 rounded-xl border border-ivory-300">
                      “{visitedRecord.note}”
                    </p>
                  )}
                  <div className="flex items-center space-x-3 mt-3 pt-3 border-t border-ivory-200 text-xs">
                    <button
                      onClick={() => setShowLogForm(true)}
                      className="font-semibold text-forest-800 hover:underline"
                    >
                      Edit Note / Rating
                    </button>
                    <span className="text-charcoal-300">•</span>
                    <button
                      onClick={() => onRemoveVisitedRecord(destination.id)}
                      className="font-semibold text-red-600 hover:underline"
                    >
                      Remove from Visited
                    </button>
                  </div>
                </div>
              )}

              {showLogForm && (
                <form onSubmit={handleLogSubmit} className="p-5 rounded-2xl bg-ivory-50 border border-ivory-300 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1.5">
                      Your Rating:
                    </label>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setVisitedRating(star)}
                          className="p-1 focus:outline-none"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= visitedRating ? 'text-amber-500 fill-amber-500' : 'text-charcoal-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-charcoal-700 ml-2">{visitedRating} Stars</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1.5">
                      Traveler's Note / Memory:
                    </label>
                    <textarea
                      value={visitedNote}
                      onChange={e => setVisitedNote(e.target.value)}
                      maxLength={500}
                      placeholder="Share what struck you about this landmark (max 500 characters)..."
                      rows={3}
                      className="w-full p-3 rounded-xl border border-ivory-300 bg-white text-sm text-charcoal-800 focus:ring-2 focus:ring-forest-700 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-forest-800 text-white text-xs font-semibold hover:bg-forest-900 shadow-sm"
                    >
                      Save to Passport
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowLogForm(false)}
                      className="px-4 py-2.5 rounded-xl border border-charcoal-300 text-charcoal-700 text-xs font-medium hover:bg-ivory-100"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </section>

          </div>

          {/* Sidebar Column (4 cols): Practical Dossier & Location */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Practical Visitor Dossier */}
            <div className="bg-white rounded-3xl p-6 shadow-card border border-ivory-300">
              <h2 className="font-serif text-lg font-bold text-forest-950 mb-4 pb-3 border-b border-ivory-200">
                Practical Visitor Information
              </h2>

              <div className="space-y-4 text-xs">
                
                <div className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200">
                  <div className="flex items-center space-x-2 text-forest-800 font-bold uppercase tracking-wider mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Opening Hours</span>
                  </div>
                  <p className="text-sm font-semibold text-charcoal-900">{destination.practicalInfo.timings}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200">
                  <div className="flex items-center space-x-2 text-forest-800 font-bold uppercase tracking-wider mb-1">
                    <Ticket className="w-3.5 h-3.5 text-saffron-600" />
                    <span>Entry Tariff</span>
                  </div>
                  <p className="text-sm font-semibold text-charcoal-900">{destination.practicalInfo.entryFee}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200">
                  <div className="flex items-center space-x-2 text-forest-800 font-bold uppercase tracking-wider mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Best Time to Visit</span>
                  </div>
                  <p className="text-charcoal-700 leading-relaxed">{destination.practicalInfo.bestTimeToVisit}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200">
                  <div className="flex items-center space-x-2 text-forest-800 font-bold uppercase tracking-wider mb-1">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Photography Policy</span>
                  </div>
                  <p className="text-charcoal-700 leading-relaxed">{destination.practicalInfo.photography}</p>
                </div>

                {destination.practicalInfo.dressCode && (
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                    <div className="flex items-center space-x-2 text-amber-900 font-bold uppercase tracking-wider mb-1">
                      <Shirt className="w-3.5 h-3.5" />
                      <span>Dress Code &amp; Etiquette</span>
                    </div>
                    <p className="text-amber-800 leading-relaxed">{destination.practicalInfo.dressCode}</p>
                  </div>
                )}

                <div className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200">
                  <span className="font-bold text-charcoal-800 uppercase tracking-wider block mb-1">
                    Terrain &amp; Accessibility:
                  </span>
                  <p className="text-charcoal-700 leading-relaxed">{destination.practicalInfo.accessibility}</p>
                </div>

              </div>
            </div>

            {/* Location & Navigation Card */}
            <div className="bg-white rounded-3xl p-6 shadow-card border border-ivory-300">
              <h2 className="font-serif text-lg font-bold text-forest-950 mb-3 pb-3 border-b border-ivory-200">
                Location &amp; Coordinates
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-saffron-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-charcoal-900 block">{destination.location.neighborhood}</span>
                    <p className="text-charcoal-600 mt-0.5">{destination.location.address}</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-ivory-100 font-mono text-[11px] text-charcoal-600">
                  Lat: {destination.location.coordinates.lat.toFixed(4)}° N, Lng: {destination.location.coordinates.lng.toFixed(4)}° E
                </div>

                <a
                  href={getSingleDestinationMapUrl(destination)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold shadow-sm flex items-center justify-center space-x-2 transition-all mt-3"
                >
                  <Navigation className="w-4 h-4 text-saffron-400" />
                  <span>Get Driving Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
