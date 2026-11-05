import React from 'react';
import { Compass, ExternalLink, ArrowUp, Heart, ShieldCheck } from 'lucide-react';
import { ActiveTab } from './Navbar';

interface FooterProps {
  onSelectTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-forest-950 text-ivory-100 border-t border-forest-800 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-forest-800">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-forest-800 text-ivory-100 flex items-center justify-center border border-forest-700 shadow-sm">
                <Compass className="w-6 h-6 text-saffron-400" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-wide text-white">
                  ANVESHAN
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-saffron-400 block">
                  Discover Beyond the Famous
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-forest-200/80 leading-relaxed max-w-md font-sans">
              Dedicated to chronicling the lesser-known historical, spiritual, and vernacular treasures of Ambala, Haryana. Designed for mindful travelers, historians, and local citizens seeking authentic discovery.
            </p>

            <div className="flex items-center space-x-2 text-xs text-forest-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero sponsored listings • 100% verified public domain history</span>
            </div>
          </div>

          {/* Navigation Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-saffron-400 mb-4">
              Explore Sections
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-forest-200">
              <li>
                <button
                  onClick={() => onSelectTab('discover')}
                  className="hover:text-white transition-colors"
                >
                  All 14 Ambala Destinations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('itinerary')}
                  className="hover:text-white transition-colors"
                >
                  Plan My Journey (Smart Itinerary)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('trails')}
                  className="hover:text-white transition-colors"
                >
                  Curated Thematic Trails
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('map-food')}
                  className="hover:text-white transition-colors"
                >
                  Interactive Map &amp; Culinary Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('passport')}
                  className="hover:text-white transition-colors"
                >
                  Travel Passport &amp; Milestone Badges
                </button>
              </li>
            </ul>
          </div>

          {/* Official References */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-saffron-400 mb-4">
              Official Archives
            </h4>
            <ul className="space-y-2 text-xs text-forest-300">
              <li>
                <a
                  href="https://ambala.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center space-x-1"
                >
                  <span>District Administration Ambala</span>
                  <ExternalLink className="w-3 h-3 text-saffron-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://haryanatourism.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center space-x-1"
                >
                  <span>Haryana Tourism Official Portal</span>
                  <ExternalLink className="w-3 h-3 text-saffron-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://ambala.cantt.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center space-x-1"
                >
                  <span>Ambala Cantonment Board</span>
                  <ExternalLink className="w-3 h-3 text-saffron-400" />
                </a>
              </li>
              <li>
                <span className="text-forest-400 text-[11px] block pt-2">
                  Ambala District Gazetteers (1883-84, 1923-24)
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-forest-300">
          <div>
            <span>© {new Date().getFullYear()} ANVESHAN – Discover Beyond the Famous. Crafted for Ambala, Haryana.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-ivory-200 hover:text-white border border-forest-700 transition-colors"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
