import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Eye, MapPin, Clock, User, AlertTriangle } from "lucide-react";
import { format } from "date-fns";

interface Report {
  id: string;
  category: string;
  location: string;
  status: "pending" | "assigned" | "in-progress" | "resolved";
  priority: "low" | "medium" | "high";
  reporter: string;
  assignedTo?: string;
  department: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
}

export const ReportsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Mock data - in real app, this would come from API
  const reports: Report[] = [
    {
      id: "R-2024-001",
      category: "Pothole",
      location: "Main St & 5th Ave, Downtown",
      status: "pending",
      priority: "high",
      reporter: "Anonymous",
      department: "Roads & Transport",
      createdAt: new Date(2024, 0, 15, 9, 30),
      updatedAt: new Date(2024, 0, 15, 9, 30),
      description: "Large pothole causing traffic issues"
    },
    {
      id: "R-2024-002",
      category: "Streetlight",
      location: "Park Avenue, Block 200",
      status: "assigned",
      priority: "medium",
      reporter: "John D. (john@email.com)",
      assignedTo: "Mike Johnson",
      department: "Utilities",
      createdAt: new Date(2024, 0, 15, 8, 15),
      updatedAt: new Date(2024, 0, 15, 10, 45),
      description: "Streetlight not working, area is dark at night"
    },
    {
      id: "R-2024-003",
      category: "Graffiti",
      location: "City Hall, East Wall",
      status: "in-progress",
      priority: "low",
      reporter: "Sarah M. (sarah@email.com)",
      assignedTo: "Clean Team Alpha",
      department: "Parks & Recreation",
      createdAt: new Date(2024, 0, 14, 16, 20),
      updatedAt: new Date(2024, 0, 15, 9, 0),
      description: "Graffiti on public building wall"
    },
    {
      id: "R-2024-004",
      category: "Trash Collection",
      location: "Elm Street Residential Area",
      status: "resolved",
      priority: "medium",
      reporter: "Mark Wilson (mark@email.com)",
      assignedTo: "Sanitation Unit 3",
      department: "Sanitation",
      createdAt: new Date(2024, 0, 13, 14, 10),
      updatedAt: new Date(2024, 0, 14, 11, 30),
      description: "Missed trash collection for entire block"
    },
    {
      id: "R-2024-005",
      category: "Water Leak",
      location: "Commerce Blvd & 2nd St",
      status: "pending",
      priority: "high",
      reporter: "Emergency Services",
      department: "Utilities",
      createdAt: new Date(2024, 0, 15, 11, 0),
      updatedAt: new Date(2024, 0, 15, 11, 0),
      description: "Major water leak affecting traffic"
    }
  ];

  const getStatusBadge = (status: Report["status"]) => {
    const variants: Record<Report["status"], any> = {
      pending: { variant: "secondary", className: "bg-warning/10 text-warning border-warning/20" },
      assigned: { variant: "default", className: "bg-status-assigned/10 text-status-assigned border-status-assigned/20" },
      "in-progress": { variant: "outline", className: "bg-status-in-progress/10 text-status-in-progress border-status-in-progress/20" },
      resolved: { variant: "secondary", className: "bg-status-resolved/10 text-status-resolved border-status-resolved/20" }
    };
    
    return (
      <Badge 
        {...variants[status]}
        className={`capitalize ${variants[status].className}`}
      >
        {status.replace("-", " ")}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: Report["priority"]) => {
    const variants: Record<Report["priority"], any> = {
      low: { variant: "outline", className: "text-muted-foreground" },
      medium: { variant: "secondary", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
      high: { variant: "destructive", className: "bg-red-100 text-red-800 border-red-200" }
    };
    
    return (
      <Badge 
        {...variants[priority]}
        className={`capitalize ${variants[priority].className}`}
      >
        <AlertTriangle className="w-3 h-3 mr-1" />
        {priority}
      </Badge>
    );
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || report.category.toLowerCase().includes(categoryFilter.toLowerCase());
    const matchesPriority = priorityFilter === "all" || report.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 border-b">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="pothole">Pothole</SelectItem>
              <SelectItem value="streetlight">Streetlight</SelectItem>
              <SelectItem value="graffiti">Graffiti</SelectItem>
              <SelectItem value="trash">Trash Collection</SelectItem>
              <SelectItem value="water">Water Leak</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report ID</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Reporter</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id} className="hover:bg-muted/50">
                <TableCell className="font-mono font-medium">
                  {report.id}
                </TableCell>
                <TableCell>{report.category}</TableCell>
                <TableCell className="max-w-xs">
                  <div className="flex items-start gap-1">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{report.location}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(report.status)}
                </TableCell>
                <TableCell>
                  {getPriorityBadge(report.priority)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{report.reporter}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{report.department}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      {format(report.createdAt, "MMM d, HH:mm")}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Results summary */}
      <div className="flex justify-between items-center px-4 py-2 text-sm text-muted-foreground">
        <span>
          Showing {filteredReports.length} of {reports.length} reports
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};