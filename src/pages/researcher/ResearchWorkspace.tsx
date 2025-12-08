import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import NIRAChatbot from "@/components/NIRAChatbot";
import { BarChart3, Code2, Globe, LinkIcon, Beaker, Activity, Users, Clipboard, FileText, Settings } from "lucide-react";
import { WorkspaceHeader } from "@/components/researcher/ResearchWorkspace/WorkspaceHeader";
import { OverviewMetrics } from "@/components/researcher/ResearchWorkspace/OverviewMetrics";
import { TeamMembersList } from "@/components/researcher/ResearchWorkspace/TeamMembersList";
import { WhiteboardPanel } from "@/components/researcher/ResearchWorkspace/WhiteboardPanel";
import { ResearchNotesPanel } from "@/components/researcher/ResearchWorkspace/ResearchNotesPanel";
import { teamMembers, recentActivities, researchNotes } from "@/components/researcher/ResearchWorkspace/workspaceData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const navItems = [
  { title: "Overview", path: "/researcher/overview", icon: <BarChart3 className="w-5 h-5" /> },
  { title: "Dataset Links", path: "/researcher/datasets", icon: <LinkIcon className="w-5 h-5" /> },
  { title: "APIs", path: "/researcher/apis", icon: <Code2 className="w-5 h-5" /> },
  { title: "Workspace", path: "/researcher/workspace", icon: <Beaker className="w-5 h-5" /> },
  { title: "Geo-Map", path: "/researcher/geo-map", icon: <Globe className="w-5 h-5" /> },
  { title: "Settings", path: "/profile", icon: <Settings className="w-5 h-5" /> },
];

const ResearchWorkspace = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [whiteboardContent, setWhiteboardContent] = useState("Research Hypothesis: Industrial proximity increases HMPI by 40%");

  const filteredTeamMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === "online" ? "bg-green-500" : "bg-yellow-500";
  };

  const getRoleBadgeColor = (role: string) => {
    const colors = {
      "Research Lead": "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
      "Contributor": "bg-gradient-to-r from-blue-500 to-cyan-500 text-white", 
      "Analyst": "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
    };
    return colors[role as keyof typeof colors] || "bg-slate-500 text-white";
  };

  const getTagColor = (tag: string) => {
    const colors = {
      "HMPI": "bg-red-50 text-red-700 border-red-200",
      "Arsenic": "bg-orange-50 text-orange-700 border-orange-200",
      "Gujarat": "bg-blue-50 text-blue-700 border-blue-200",
      "Seasonal": "bg-green-50 text-green-700 border-green-200",
      "Monsoon": "bg-blue-50 text-blue-700 border-blue-200",
      "Surface Water": "bg-cyan-50 text-cyan-700 border-cyan-200"
    };
    return colors[tag as keyof typeof colors] || "bg-slate-50 text-slate-700 border-slate-200";
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "team", label: "Team", icon: Users },
    { id: "whiteboard", label: "Whiteboard", icon: Clipboard },
    { id: "notes", label: "Research Notes", icon: FileText }
  ];

  return (
    <DashboardLayout navItems={navItems} userRole="researcher">
      <div className="min-h-screen bg-slate-50">
        <WorkspaceHeader />

        {/* Sub-navigation Tabs */}
        <div className="mb-6">
          <div className="w-full bg-white border border-slate-200 p-1 rounded-lg">
            <div className="grid grid-cols-4 gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-brand text-white'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            <OverviewMetrics 
              teamCount={teamMembers.length}
              notesCount={researchNotes.length}
              whiteboardCount={1}
              discussionsCount={12}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-white border border-slate-200 rounded-lg">
                <CardHeader className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-semibold text-slate-900">Team Members</h3>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  {teamMembers.slice(0, 3).map((member) => (
                    <div key={member.id} className="flex items-center gap-3 p-2 rounded-md border border-slate-200 hover:border-slate-300 transition-colors">
                      <div className="w-9 h-9 bg-brand rounded-lg flex items-center justify-center">
                        <span className="text-xs font-semibold text-white">{member.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{member.name}</p>
                        <p className="text-xs text-slate-500">{member.designation}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white border border-slate-200 rounded-lg">
                <CardHeader className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-semibold text-slate-900">Recent Activity</h3>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-2 rounded-md border border-slate-200 hover:border-slate-300 transition-colors">
                      <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-white">{activity.avatar}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700">
                          <span className="font-medium text-slate-900">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-slate-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "team" && (
          <TeamMembersList
            members={teamMembers}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredMembers={filteredTeamMembers}
            getStatusColor={getStatusColor}
            getRoleBadgeColor={getRoleBadgeColor}
          />
        )}

        {activeTab === "whiteboard" && (
          <WhiteboardPanel
            whiteboardContent={whiteboardContent}
            setWhiteboardContent={setWhiteboardContent}
          />
        )}

        {activeTab === "notes" && (
          <ResearchNotesPanel
            notes={researchNotes}
            getTagColor={getTagColor}
          />
        )}

        <NIRAChatbot />
      </div>
    </DashboardLayout>
  );
};

export default ResearchWorkspace;
