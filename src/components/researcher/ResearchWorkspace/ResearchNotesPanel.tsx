import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, User } from "lucide-react";
import type { ResearchNote } from './types';

interface ResearchNotesPanelProps {
  notes: ResearchNote[];
  getTagColor: (tag: string) => string;
}

export const ResearchNotesPanel = ({ notes, getTagColor }: ResearchNotesPanelProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Research Notes</h2>
        <Button className="bg-teal-600 text-white hover:bg-teal-700 rounded-md text-sm">
          <Plus className="w-4 h-4 mr-2" />
          New Note
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {notes.map((note) => (
          <Card key={note.id} className="bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-white">{note.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-slate-900 mb-1">
                    {note.title}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {note.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className={`${getTagColor(tag)} text-xs px-1.5 py-0`}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500 mb-3 line-clamp-2">{note.description}</p>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{note.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{note.created}</span>
                  </div>
                </div>
                {note.updated && (
                  <span className="text-xs text-green-600">Updated</span>
                )}
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3 border-slate-300 text-slate-600 hover:bg-slate-50 rounded-md text-xs"
              >
                View Full Note
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
