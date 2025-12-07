import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink, Quote, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import type { Publication } from './types';

interface PublicationsListProps {
  publications: Publication[];
}

export const PublicationsList = ({ publications }: PublicationsListProps) => {
  const getStatusBadge = (status: string, color: string) => {
    const colorClasses = {
      green: 'bg-brand/10 text-brand border-brand/30',
      yellow: 'bg-amber-50 text-amber-700 border-amber-200',
      red: 'bg-red-50 text-red-700 border-red-200'
    };
    
    return (
      <Badge variant="outline" className={`${colorClasses[color as keyof typeof colorClasses]} flex items-center gap-1 text-xs`}>
        {status === 'Published' && <CheckCircle className="w-3 h-3" />}
        {status === 'Under Review' && <Clock className="w-3 h-3" />}
        {status === 'Rejected' && <AlertTriangle className="w-3 h-3" />}
        {status}
      </Badge>
    );
  };

  return (
    <Card className="bg-white border-2 border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-brand" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Recent Publications</h3>
          </div>
          <Button variant="outline" size="sm" className="bg-white/70 border-brand/30 text-brand hover:bg-brand/10">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {publications.map((pub) => (
            <div 
              key={pub.id} 
              className="p-4 rounded-md border border-slate-200 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-medium text-slate-900 flex-1 pr-3">
                  {pub.title}
                </h4>
                {getStatusBadge(pub.status, pub.statusColor)}
              </div>
              
              <p className="text-sm text-slate-500 mb-2">{pub.journal}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>{pub.publishedDate}</span>
                  <div className="flex items-center gap-1">
                    <Quote className="w-3 h-3" />
                    <span>{pub.citations} citations</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-brand hover:text-brand-light hover:bg-brand/10 h-7 text-xs">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
