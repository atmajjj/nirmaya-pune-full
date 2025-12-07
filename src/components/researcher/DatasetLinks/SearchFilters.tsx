import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import type { FilterCategory } from './types';

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  activeFilters: string[];
  filterCategories: FilterCategory[];
  toggleFilter: (filterId: string) => void;
  clearFilters: () => void;
}

export const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  activeFilters,
  filterCategories,
  toggleFilter,
  clearFilters
}: SearchFiltersProps) => {
  return (
    <Card className="bg-white border border-slate-200 rounded-lg mb-6">
      <CardContent className="p-5">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search datasets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border-slate-300 rounded-md text-slate-800 placeholder:text-slate-400 focus:border-brand transition-colors"
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div>
          <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Filter by:</h3>
          <div className="flex flex-wrap gap-2">
            {filterCategories.map((filter) => {
              const Icon = filter.icon;
              const isActive = activeFilters.includes(filter.id);
              return (
                <Button
                  key={filter.id}
                  variant="outline"
                  size="sm"
                  onClick={() => toggleFilter(filter.id)}
                  className={`rounded-md text-xs transition-colors ${
                    isActive
                      ? 'bg-brand text-white border-brand hover:bg-brand-light'
                      : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-600'
                  }`}
                >
                  <Icon className="w-3 h-3 mr-1.5" />
                  {filter.label}
                </Button>
              );
            })}
            {activeFilters.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md text-xs"
              >
                <X className="w-3 h-3 mr-1.5" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
