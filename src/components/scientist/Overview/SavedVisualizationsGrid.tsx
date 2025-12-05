import React from 'react';
import { SavedVisualization } from './dashboardTypes';
import SavedVisualizationCard from './SavedVisualizationCard';
import { Plus, LayoutGrid } from 'lucide-react';

interface SavedVisualizationsGridProps {
  visualizations: SavedVisualization[];
  onUpdate: () => void;
  onAddNew?: () => void;
}

const SavedVisualizationsGrid: React.FC<SavedVisualizationsGridProps> = ({
  visualizations,
  onUpdate,
  onAddNew,
}) => {
  // Filter only visible visualizations and sort by position
  const visibleVisualizations = visualizations
    .filter(v => v.isVisible)
    .sort((a, b) => a.position - b.position);

  if (visibleVisualizations.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
            <LayoutGrid className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-700 mb-2">
            No Visualizations Added
          </h3>
          <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
            No visualizations are enabled for this dashboard. Click "Add Visualization" to create charts or "Customize" to enable hidden ones.
          </p>
          {onAddNew && (
            <button
              onClick={onAddNew}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand text-white hover:bg-brand-light transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Your First Visualization
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {visibleVisualizations.map((viz) => (
        <SavedVisualizationCard
          key={viz.id}
          visualization={viz}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default SavedVisualizationsGrid;
