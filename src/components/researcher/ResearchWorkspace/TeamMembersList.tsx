import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, UserPlus, Search } from "lucide-react";
import type { TeamMember } from './types';

interface TeamMembersListProps {
  members: TeamMember[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filteredMembers: TeamMember[];
  getStatusColor: (status: string) => string;
  getRoleBadgeColor: (role: string) => string;
}

export const TeamMembersList = ({ 
  members, 
  searchTerm, 
  setSearchTerm, 
  filteredMembers, 
  getStatusColor, 
  getRoleBadgeColor 
}: TeamMembersListProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Team</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border-slate-300 rounded-md w-64 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-3">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-11 h-11 bg-teal-600 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-semibold text-white">{member.avatar}</span>
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${getStatusColor(member.status)} border-2 border-white rounded-full`}></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900">{member.name}</h3>
                        <p className="text-xs text-slate-500">{member.designation}</p>
                      </div>
                      <Badge variant="outline" className="text-xs border-slate-300">
                        {member.role}
                      </Badge>
                    </div>
                    <div className="space-y-1 mt-2">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Mail className="w-3 h-3" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Phone className="w-3 h-3" />
                        <span>{member.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-slate-50 border border-slate-200 rounded-lg h-fit">
          <CardHeader className="border-b border-slate-200 pb-3">
            <h3 className="text-sm font-semibold text-slate-900">Invite Team Members</h3>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <Input
              placeholder="Email address"
              type="email"
              className="bg-white border-slate-300 rounded-md text-sm"
            />
            <Button className="w-full bg-teal-600 text-white hover:bg-teal-700 rounded-md text-sm">
              <UserPlus className="w-4 h-4 mr-2" />
              Send Invitation
            </Button>
            <p className="text-xs text-slate-500">
              Invited members will receive an email with access instructions
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
