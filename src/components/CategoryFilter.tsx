import React from 'react';
import { Category, Zone } from '../types';
import { Landmark, HeartHandshake, Sparkles, ShoppingBag, Trees, Compass, MapPin, Gem, RotateCcw } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: Category | 'All';
  onSelectCategory: (cat: Category | 'All') => void;
  selectedZone: Zone | 'All';
  onSelectZone: (zone: Zone | 'All') => void;
  gemsOnly: boolean;
  onToggleGemsOnly: () => void;
  matchingCount: number;
  totalCount: number;
  onResetFilters: () => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedZone,
  onSelectZone,
  gemsOnly,
  onToggleGemsOnly,
  matchingCount,
  totalCount,
  onResetFilters
}) => {
  const categories: Array<{ id: Category | 'All'; label: string; icon: React.ReactNode }> = [
    { id: 'All', label: 'All Places', icon: <Compass className="w-4 h-4" /> },
    { id: 'Heritage', label: 'Heritage', icon: <Landmark className="w-4 h-4" /> },
    { id: 'Spiritual', label: 'Spiritual', icon: <HeartHandshake className="w-4 h-4" /> },
    { id: 'Culture', label: 'Culture & Food', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'Shopping', label: 'Bazaars', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'Nature', label: 'Nature & Lakes', icon: <Trees className="w-4 h-4" /> }
  ];

  const zones: Array<Zone | 'All'> = ['All', 'Ambala Cantt', 'Ambala City', 'Ambala Rural'];

  const hasActiveFilters = selectedCategory !== 'All' || selectedZone !== 'All' || gemsOnly;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-card border border-ivory-300 mb-8 transition-all">
      
      {/* Category Pills Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-ivory-200">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-bold text-saffron-600 block mb-1">
            Curated Taxonomy
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-forest-900">
            Explore Ambala by Interest
          </h2>
        </div>

        {/* Results count & reset */}
        <div className="flex items-center space-x-3">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-ivory-200 text-charcoal-700">
            Showing <strong>{matchingCount}</strong> of {totalCount} destinations
          </span>
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-xs text-saffron-600 hover:text-saffron-700 font-medium flex items-center space-x-1 p-1 hover:underline"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Buttons */}
      <div className="py-4 flex flex-wrap gap-2">
        {categories.map(cat => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                isSelected
                  ? 'bg-forest-800 text-white shadow-md scale-[1.02]'
                  : 'bg-ivory-100 text-charcoal-700 hover:bg-ivory-200 hover:text-forest-900 border border-ivory-300/80'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Secondary Bar: Zone Selector & Hidden Gems Switch */}
      <div className="pt-4 border-t border-ivory-200 flex flex-wrap items-center justify-between gap-4 text-xs">
        
        {/* Zone Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-charcoal-600 font-semibold flex items-center space-x-1 mr-1">
            <MapPin className="w-3.5 h-3.5 text-forest-700" />
            <span>Zone:</span>
          </span>
          {zones.map(z => (
            <button
              key={z}
              onClick={() => onSelectZone(z)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedZone === z
                  ? 'bg-saffron-600 text-white shadow-sm'
                  : 'bg-white text-charcoal-600 border border-ivory-300 hover:bg-ivory-100'
              }`}
            >
              {z === 'All' ? 'All Ambala' : z}
            </button>
          ))}
        </div>

        {/* Hidden Gems Toggle */}
        <button
          onClick={onToggleGemsOnly}
          className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl font-semibold border transition-all ${
            gemsOnly
              ? 'bg-amber-100 text-amber-900 border-amber-400 shadow-sm'
              : 'bg-white text-charcoal-700 border-ivory-300 hover:bg-ivory-100'
          }`}
          aria-pressed={gemsOnly}
        >
          <Gem className={`w-4 h-4 ${gemsOnly ? 'text-amber-700 fill-amber-500' : 'text-charcoal-500'}`} />
          <span>Hidden Gems Only</span>
          {gemsOnly && <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />}
        </button>

      </div>

    </div>
  );
};
