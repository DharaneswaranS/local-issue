import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, CheckCircle, AlertTriangle, Users, TrendingUp } from "lucide-react";
import { MapComponent } from "@/components/admin/MapComponent";
import { ReportsList } from "@/components/admin/ReportsList";
import { MetricsCard } from "@/components/admin/MetricsCard";

const Dashboard = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [timeRange, setTimeRange] = useState("24h");

  // Mock data - in real app, this would come from API
  const metrics = {
    totalReports: 1247,
    pendingReports: 89,
    inProgressReports: 156,
    resolvedToday: 45,
    avgResponseTime: "2.3h",
    departments: 8
  };

  const recentReports = [
    {
      id: "R-2024-001",
      category: "Pothole",
      location: "Main St & 5th Ave",
      status: "pending",
      priority: "high",
      timestamp: "15 min ago",
      reporter: "Anonymous"
    },
    {
      id: "R-2024-002", 
      category: "Streetlight",
      location: "Park Avenue",
      status: "assigned",
      priority: "medium",
      timestamp: "32 min ago",
      reporter: "John D."
    },
    {
      id: "R-2024-003",
      category: "Graffiti",
      location: "City Hall",
      status: "in-progress",
      priority: "low",
      timestamp: "1h ago",
      reporter: "Sarah M."
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Municipal issue tracking overview</p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="roads">Roads & Transport</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
              <SelectItem value="parks">Parks & Recreation</SelectItem>
              <SelectItem value="sanitation">Sanitation</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricsCard
          title="Total Reports"
          value={metrics.totalReports.toLocaleString()}
          icon={MapPin}
          color="municipal-blue"
        />
        <MetricsCard
          title="Pending"
          value={metrics.pendingReports}
          icon={Clock}
          color="status-pending"
        />
        <MetricsCard
          title="In Progress"
          value={metrics.inProgressReports}
          icon={AlertTriangle}
          color="status-in-progress"
        />
        <MetricsCard
          title="Resolved Today"
          value={metrics.resolvedToday}
          icon={CheckCircle}
          color="status-resolved"
        />
        <MetricsCard
          title="Avg Response"
          value={metrics.avgResponseTime}
          icon={TrendingUp}
          color="municipal-blue"
        />
        <MetricsCard
          title="Departments"
          value={metrics.departments}
          icon={Users}
          color="municipal-blue"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-municipal-blue" />
              Live Report Map
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <MapComponent />
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-municipal-blue" />
                Recent Reports
              </span>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="border-l-4 border-status-pending pl-4 py-2">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-sm">{report.id}</span>
                  <Badge 
                    variant={
                      report.status === "pending" ? "secondary" :
                      report.status === "assigned" ? "default" :
                      report.status === "in-progress" ? "outline" : "secondary"
                    }
                    className="text-xs"
                  >
                    {report.status}
                  </Badge>
                </div>
                <p className="text-sm font-medium">{report.category}</p>
                <p className="text-xs text-muted-foreground">{report.location}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">{report.timestamp}</span>
                  <Badge 
                    variant={report.priority === "high" ? "destructive" : "outline"}
                    className="text-xs"
                  >
                    {report.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>All Reports</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ReportsList />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;