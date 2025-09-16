import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Clock, CheckCircle, AlertTriangle, Download } from "lucide-react";
import { useState } from "react";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  // Sample data for charts
  const weeklyData = [
    { name: 'Mon', reports: 45, resolved: 38, pending: 7 },
    { name: 'Tue', reports: 52, resolved: 41, pending: 11 },
    { name: 'Wed', reports: 38, resolved: 35, pending: 3 },
    { name: 'Thu', reports: 61, resolved: 48, pending: 13 },
    { name: 'Fri', reports: 55, resolved: 52, pending: 3 },
    { name: 'Sat', reports: 28, resolved: 25, pending: 3 },
    { name: 'Sun', reports: 22, resolved: 20, pending: 2 },
  ];

  const categoryData = [
    { name: 'Potholes', value: 342, color: '#8b5cf6' },
    { name: 'Streetlights', value: 245, color: '#06b6d4' },
    { name: 'Graffiti', value: 189, color: '#10b981' },
    { name: 'Trash Collection', value: 156, color: '#f59e0b' },
    { name: 'Water Issues', value: 134, color: '#ef4444' },
    { name: 'Other', value: 181, color: '#6b7280' },
  ];

  const performanceData = [
    { name: 'Jan', avgResponse: 2.1, slaCompliance: 94 },
    { name: 'Feb', avgResponse: 1.9, slaCompliance: 96 },
    { name: 'Mar', avgResponse: 2.3, slaCompliance: 92 },
    { name: 'Apr', avgResponse: 2.0, slaCompliance: 95 },
    { name: 'May', avgResponse: 1.8, slaCompliance: 98 },
    { name: 'Jun', avgResponse: 2.2, slaCompliance: 93 },
  ];

  const departmentStats = [
    {
      name: "Roads & Transport",
      totalReports: 892,
      avgResponseTime: "2.3h",
      slaCompliance: 92,
      satisfaction: 4.2,
      trend: "up"
    },
    {
      name: "Utilities",
      totalReports: 567,
      avgResponseTime: "1.8h",
      slaCompliance: 95,
      satisfaction: 4.5,
      trend: "up"
    },
    {
      name: "Parks & Recreation",
      totalReports: 234,
      avgResponseTime: "4.2h",
      slaCompliance: 88,
      satisfaction: 4.1,
      trend: "down"
    },
    {
      name: "Sanitation",
      totalReports: 445,
      avgResponseTime: "3.1h",
      slaCompliance: 91,
      satisfaction: 4.3,
      trend: "up"
    }
  ];

  const metrics = [
    {
      title: "Total Reports",
      value: "2,138",
      change: "+12.5%",
      trend: "up",
      icon: AlertTriangle,
      color: "text-municipal-blue"
    },
    {
      title: "Avg Response Time",
      value: "2.3h",
      change: "-8.2%",
      trend: "up",
      icon: Clock,
      color: "text-status-in-progress"
    },
    {
      title: "Resolution Rate",
      value: "94.2%",
      change: "+3.1%",
      trend: "up",
      icon: CheckCircle,
      color: "text-status-resolved"
    },
    {
      title: "Customer Satisfaction",
      value: "4.25/5",
      change: "+0.2",
      trend: "up",
      icon: TrendingUp,
      color: "text-status-resolved"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Performance metrics and insights</p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select department" />
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
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className={`text-2xl font-bold ${metric.color}`}>
                      {metric.value}
                    </p>
                    <Badge 
                      variant={metric.trend === "up" ? "default" : "secondary"}
                      className={metric.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                    >
                      {metric.trend === "up" ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {metric.change}
                    </Badge>
                  </div>
                </div>
                <metric.icon className={`h-8 w-8 ${metric.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Reports Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Weekly Reports Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="reports" fill="hsl(var(--municipal-blue))" name="Total Reports" />
                <Bar dataKey="resolved" fill="hsl(var(--status-resolved))" name="Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Reports by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="avgResponse" 
                stroke="hsl(var(--status-in-progress))" 
                strokeWidth={2}
                name="Avg Response Time (hours)"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="slaCompliance" 
                stroke="hsl(var(--status-resolved))" 
                strokeWidth={2}
                name="SLA Compliance (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Department Performance */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Department Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentStats.map((dept) => (
              <div key={dept.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{dept.name}</h3>
                  <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                    <span>Reports: {dept.totalReports}</span>
                    <span>Avg Response: {dept.avgResponseTime}</span>
                    <span>SLA: {dept.slaCompliance}%</span>
                    <span>Rating: {dept.satisfaction}/5</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={dept.trend === "up" ? "default" : "secondary"}
                    className={dept.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                  >
                    {dept.trend === "up" ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {dept.trend === "up" ? "Improving" : "Declining"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">🎯 Key Insights</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Response times improved by 8.2% this month</li>
              <li>• Utilities dept leads in customer satisfaction</li>
              <li>• 94% of reports resolved within SLA</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">⚡ Recommendations</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Focus on Parks dept response times</li>
              <li>• Increase pothole repair resources</li>
              <li>• Implement proactive streetlight monitoring</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">📈 Trends</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• 12% increase in total reports</li>
              <li>• Weekend reports decreased by 18%</li>
              <li>• Mobile app usage up 34%</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;