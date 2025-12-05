import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Square, Upload, Trash2, Type } from "lucide-react";

interface WhiteboardNote {
  id: string;
  type: 'hypothesis' | 'finding' | 'idea' | 'question';
  content: string;
  x: number;
  y: number;
  color: string;
}

interface WhiteboardPanelProps {
  whiteboardContent: string;
  setWhiteboardContent: (value: string) => void;
}

export const WhiteboardPanel = ({ whiteboardContent, setWhiteboardContent }: WhiteboardPanelProps) => {
  const [notes, setNotes] = useState<WhiteboardNote[]>([
    {
      id: '1',
      type: 'hypothesis',
      content: 'Research Hypothesis: Industrial proximity increases HMPI by 40%',
      x: 60,
      y: 80,
      color: 'bg-amber-100 border-amber-300'
    },
    {
      id: '2',
      type: 'finding',
      content: 'Key Finding: Arsenic levels correlate with depth >50m in Gujarat region',
      x: 400,
      y: 120,
      color: 'bg-green-100 border-green-300'
    },
    {
      id: '3',
      type: 'idea',
      content: 'Idea: Use ML model to predict contamination spread patterns',
      x: 700,
      y: 80,
      color: 'bg-blue-100 border-blue-300'
    },
    {
      id: '4',
      type: 'question',
      content: 'Question: What is the seasonal variation impact on fluoride levels?',
      x: 150,
      y: 280,
      color: 'bg-purple-100 border-purple-300'
    },
    {
      id: '5',
      type: 'finding',
      content: 'Data shows 23% increase in lead contamination near industrial zones',
      x: 500,
      y: 300,
      color: 'bg-green-100 border-green-300'
    },
    {
      id: '6',
      type: 'hypothesis',
      content: 'H2: Monsoon season dilutes heavy metal concentration by 15-20%',
      x: 850,
      y: 250,
      color: 'bg-amber-100 border-amber-300'
    },
    {
      id: '7',
      type: 'idea',
      content: 'Consider GIS-based clustering for identifying contamination hotspots',
      x: 300,
      y: 420,
      color: 'bg-blue-100 border-blue-300'
    },
    {
      id: '8',
      type: 'question',
      content: 'Need to verify: WHO guidelines for chromium-6 vs total chromium',
      x: 650,
      y: 450,
      color: 'bg-purple-100 border-purple-300'
    }
  ]);

  const [selectedTool, setSelectedTool] = useState<'select' | 'text' | 'draw'>('select');

  const addNote = (type: 'hypothesis' | 'finding' | 'idea' | 'question') => {
    const colorMap = {
      hypothesis: 'bg-amber-100 border-amber-300',
      finding: 'bg-green-100 border-green-300',
      idea: 'bg-blue-100 border-blue-300',
      question: 'bg-purple-100 border-purple-300'
    };
    
    const newNote: WhiteboardNote = {
      id: Date.now().toString(),
      type,
      content: `New ${type}...`,
      x: Math.random() * 600 + 100,
      y: Math.random() * 300 + 100,
      color: colorMap[type]
    };
    setNotes([...notes, newNote]);
  };

  const clearWhiteboard = () => {
    setNotes([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Interactive Whiteboard</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className={`border-slate-300 rounded-md text-xs ${selectedTool === 'text' ? 'bg-teal-50 border-teal-300' : ''}`}
            onClick={() => setSelectedTool('text')}
          >
            <Type className="w-4 h-4 mr-1" />
            Text
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={`border-slate-300 rounded-md text-xs ${selectedTool === 'draw' ? 'bg-teal-50 border-teal-300' : ''}`}
            onClick={() => setSelectedTool('draw')}
          >
            <Pencil className="w-4 h-4 mr-1" />
            Draw
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-red-300 text-red-600 hover:bg-red-50 rounded-md text-xs"
            onClick={clearWhiteboard}
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </div>
      </div>

      <Card className="bg-white border border-slate-200 rounded-lg">
        <CardContent className="p-0">
          {/* Whiteboard Canvas */}
          <div 
            className="relative w-full h-[500px] bg-slate-50 overflow-hidden"
            style={{
              backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          >
            {/* Sticky Notes */}
            {notes.map((note) => (
              <div
                key={note.id}
                className={`absolute p-3 rounded border-2 ${note.color} cursor-move max-w-[280px] text-sm`}
                style={{ left: note.x, top: note.y }}
                draggable
              >
                <p className="text-slate-700 leading-relaxed">{note.content}</p>
              </div>
            ))}

            {/* Center Instructions (shown when empty or as watermark) */}
            {notes.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                <Pencil className="w-12 h-12 mb-4 opacity-30" />
                <p className="text-lg font-medium">Interactive Whiteboard</p>
                <p className="text-sm">Click and drag to add notes, shapes, and diagrams</p>
                <div className="flex gap-2 mt-4">
                  <Button 
                    size="sm" 
                    className="bg-teal-600 text-white hover:bg-teal-700 rounded-md"
                    onClick={() => addNote('hypothesis')}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Text
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-slate-300 rounded-md"
                    onClick={() => setSelectedTool('draw')}
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Draw
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Toolbar at bottom */}
          <div className="flex items-center justify-between border-t border-slate-200 p-3 bg-white">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-slate-300 rounded-md text-xs"
                onClick={() => addNote('hypothesis')}
              >
                <Type className="w-4 h-4 mr-1" />
                Text
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-slate-300 rounded-md text-xs"
              >
                <Square className="w-4 h-4 mr-1" />
                Shape
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-slate-300 rounded-md text-xs"
              >
                <Upload className="w-4 h-4 mr-1" />
                Image
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-slate-300 rounded-md text-xs"
                onClick={clearWhiteboard}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear
              </Button>
            </div>
            
            {/* Color Legend */}
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-amber-200 rounded border border-amber-400"></div>
                <span>Hypothesis</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-200 rounded border border-green-400"></div>
                <span>Finding</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-200 rounded border border-blue-400"></div>
                <span>Idea</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-purple-200 rounded border border-purple-400"></div>
                <span>Question</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Add Panel */}
      <div className="grid grid-cols-4 gap-3">
        <Button 
          variant="outline" 
          className="bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100 rounded-md text-sm h-12"
          onClick={() => addNote('hypothesis')}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Hypothesis
        </Button>
        <Button 
          variant="outline" 
          className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 rounded-md text-sm h-12"
          onClick={() => addNote('finding')}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Finding
        </Button>
        <Button 
          variant="outline" 
          className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 rounded-md text-sm h-12"
          onClick={() => addNote('idea')}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Idea
        </Button>
        <Button 
          variant="outline" 
          className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 rounded-md text-sm h-12"
          onClick={() => addNote('question')}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Question
        </Button>
      </div>
    </div>
  );
};
