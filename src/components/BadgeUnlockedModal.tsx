import React from 'react';
import { Badge } from '../types';
import { Award, Compass, ShieldAlert, HeartHandshake, Gem, ShoppingBag, Trees, Landmark, Crown, X, Check, Sparkles } from 'lucide-react';

interface BadgeModalProps {
  badge: Badge | null;
  onClose: () => void;
  onViewPassport: () => void;
}

export const BadgeUnlockedModal: React.FC<BadgeModalProps> = ({
  badge,
  onClose,
  onViewPassport
}) => {
  if (!badge) return null;

  const renderIcon = (iconName: string) => {
    const props = { className: 'w-12 h-12 text-saffron-500' };
    switch (iconName) {
      case 'Compass':
        return <Compass {...props} />;
      case 'ShieldAlert':
        return <ShieldAlert {...props} />;
      case 'HeartHandshake':
        return <HeartHandshake {...props} />;
      case 'Gem':
        return <Gem {...props} />;
      case 'ShoppingBag':
        return <ShoppingBag {...props} />;
      case 'Trees':
        return <Trees {...props} />;
      case 'Landmark':
        return <Landmark {...props} />;
      case 'Crown':
        return <Crown {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      default:
        return <Award {...props} />;
    }
  };

  const encouragingMessages: Record<string, string> = {
    'badge-first-explorer': 'Congratulations on taking your first step! Ambala’s untold stories and hidden sanctuaries are officially beginning to unfold for you.',
    'badge-heritage-hunter': 'Remarkable historical curiosity! You have journeyed through 3 authentic heritage monuments, uncovering centuries of Haryana’s storied past.',
    'badge-culture-explorer': 'A true sensory immersion! From buzzing bazaar alleys to century-old sweet shops, you are experiencing the authentic heartbeat of Ambala.',
    'badge-spiritual-seeker': 'Profound peace attained! Visiting 3 sacred shrines connects you deeply with the footsteps of four Sikh Gurus and ancient deities.',
    'badge-local-legend': 'Distinguished milestone! You have explored 5 distinct destinations across Ambala. You now know Ambala far deeper than standard highway travelers!',
    'badge-hidden-gem-hunter': 'True adventurer spirit! You looked beyond the obvious landmarks to uncover Ambala’s best-kept secrets.',
    'badge-grand-anveshak': 'Sovereign explorer mastery! You have documented 8 or more treasures. You are an official Grand Anveshak of Ambala territory!'
  };

  const encouragingMsg = encouragingMessages[badge.id] || 'Outstanding milestone! Keep discovering the rich history and cultural treasures of Ambala.';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/65 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="badge-modal-title"
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border-2 border-saffron-300 text-center transform transition-all animate-scale-up">
        <button
          onClick={onClose}
          aria-label="Close celebration modal"
          className="absolute top-5 right-5 p-2 rounded-full text-charcoal-400 hover:text-charcoal-800 hover:bg-ivory-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge Icon Emblem */}
        <div className="w-24 h-24 mx-auto mb-4 rounded-3xl bg-gradient-to-tr from-saffron-100 via-amber-50 to-saffron-100 border-2 border-saffron-400 flex items-center justify-center shadow-gold animate-bounce">
          {renderIcon(badge.iconName)}
        </div>

        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
          <span>New Milestone Badge Unlocked!</span>
        </div>

        <h3 id="badge-modal-title" className="text-2xl font-serif font-black text-forest-950 mb-2">
          {badge.title}
        </h3>

        <p className="text-charcoal-600 text-sm mb-4 leading-relaxed font-sans">
          {badge.description}
        </p>

        {/* Encouraging Message Card */}
        <div className="bg-forest-50 rounded-2xl p-3.5 mb-4 text-xs text-forest-900 leading-relaxed border border-forest-200 text-center italic">
          “{encouragingMsg}”
        </div>

        <div className="bg-ivory-100 rounded-xl p-2.5 mb-6 text-xs text-charcoal-600 flex items-center justify-center space-x-2 border border-ivory-300 font-mono">
          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Requirement: <strong>{badge.criteriaDescription}</strong></span>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-charcoal-300 text-charcoal-700 text-xs sm:text-sm font-semibold hover:bg-ivory-100 transition-colors"
          >
            Keep Exploring
          </button>
          <button
            onClick={() => {
              onClose();
              onViewPassport();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs sm:text-sm font-semibold shadow-md transition-all hover:shadow-lg"
          >
            Open Passport &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
