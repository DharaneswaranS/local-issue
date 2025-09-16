import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Users, Clock, TrendingUp, Edit, Plus, Phone, Mail } from "lucide-react";

const Departments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);

  const departments = [
    {
      id: 1,
      name: "Roads & Transport",
      head: "Sarah Johnson",
      contact: {
        phone: "(555) 123-4567",
        email: "roads@city.gov"
      },
      staff: 45,
      activeReports: 89,
      avgResponseTime: "2.5h",
      totalResolved: 342,
      categories: ["Pothole", "Road Damage", "Traffic Lights", "Signs"],
      performance: {
        slaCompliance: 92,
        satisfaction: 4.2
      }
    },
    {
      id: 2,
      name: "Utilities",
      head: "Mike Chen",
      contact: {
        phone: "(555) 234-5678",
        email: "utilities@city.gov"
      },
      staff: 32,
      activeReports: 67,
      avgResponseTime: "1.8h",
      totalResolved: 298,
      categories: ["Water Leak", "Power Outage", "Streetlights", "Gas Issues"],
      performance: {
        slaCompliance: 95,
        satisfaction: 4.5
      }
    },
    {
      id: 3,
      name: "Parks & Recreation",
      head: "Lisa Martinez",
      contact: {
        phone: "(555) 345-6789",
        email: "parks@city.gov"
      },
      staff: 28,
      activeReports: 34,
      avgResponseTime: "4.2h",
      totalResolved: 156,
      categories: ["Playground Issues", "Graffiti", "Landscaping", "Park Maintenance"],
      performance: {
        slaCompliance: 88,
        satisfaction: 4.1
      }
    },
    {
      id: 4,
      name: "Sanitation",
      head: "Robert Kim",
      contact: {
        phone: "(555) 456-7890",
        email: "sanitation@city.gov"
      },
      staff: 38,
      activeReports: 45,
      avgResponseTime: "3.1h",
      totalResolved: 267,
      categories: ["Trash Collection", "Recycling", "Street Cleaning", "Litter"],
      performance: {
        slaCompliance: 91,
        satisfaction: 4.3
      }
    }
  ];

  const filteredDepartments = departments.filter(dept => 
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Department Management</h1>
          <p className="text-muted-foreground">Manage departments, staff, and performance metrics</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Department</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="dept-name">Department Name</Label>
                <Input id="dept-name" placeholder="Enter department name" />
              </div>
              <div>
                <Label htmlFor="dept-head">Department Head</Label>
                <Input id="dept-head" placeholder="Enter department head name" />
              </div>
              <div>
                <Label htmlFor="dept-email">Contact Email</Label>
                <Input id="dept-email" type="email" placeholder="Enter contact email" />
              </div>
              <div>
                <Label htmlFor="dept-phone">Phone Number</Label>
                <Input id="dept-phone" placeholder="Enter phone number" />
              </div>
              <div>
                <Label htmlFor="dept-desc">Description</Label>
                <Textarea id="dept-desc" placeholder="Enter department description" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Create Department</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <Input
          placeholder="Search departments..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDepartments.map((dept) => (
          <Card key={dept.id} className="shadow-card">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-municipal-blue" />
                    {dept.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Head: {dept.head}
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedDepartment(dept)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Department Details - {dept.name}</DialogTitle>
                    </DialogHeader>
                    {selectedDepartment && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Department Head</Label>
                            <Input defaultValue={selectedDepartment.head} />
                          </div>
                          <div>
                            <Label>Staff Count</Label>
                            <Input defaultValue={selectedDepartment.staff} />
                          </div>
                          <div>
                            <Label>Phone</Label>
                            <Input defaultValue={selectedDepartment.contact.phone} />
                          </div>
                          <div>
                            <Label>Email</Label>
                            <Input defaultValue={selectedDepartment.contact.email} />
                          </div>
                        </div>
                        
                        <div>
                          <Label>Handled Categories</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {selectedDepartment.categories.map((cat: string) => (
                              <Badge key={cat} variant="secondary">{cat}</Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>SLA Compliance</Label>
                            <div className="text-2xl font-bold text-municipal-blue">
                              {selectedDepartment.performance.slaCompliance}%
                            </div>
                          </div>
                          <div>
                            <Label>Customer Satisfaction</Label>
                            <div className="text-2xl font-bold text-municipal-blue">
                              {selectedDepartment.performance.satisfaction}/5
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button>Save Changes</Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{dept.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{dept.contact.email}</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                      <Users className="w-3 h-3" />
                      Staff
                    </div>
                    <div className="text-lg font-bold">{dept.staff}</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                      <Clock className="w-3 h-3" />
                      Avg Response
                    </div>
                    <div className="text-lg font-bold">{dept.avgResponseTime}</div>
                  </div>
                </div>

                {/* Active Reports */}
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span className="text-sm font-medium">Active Reports</span>
                  <Badge variant="default" className="bg-status-pending text-status-pending-foreground">
                    {dept.activeReports}
                  </Badge>
                </div>

                {/* Performance */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>SLA Compliance</span>
                    <span className="font-medium">{dept.performance.slaCompliance}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Customer Rating</span>
                    <span className="font-medium">{dept.performance.satisfaction}/5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Resolved</span>
                    <span className="font-medium">{dept.totalResolved}</span>
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <div className="text-sm font-medium mb-2">Handled Categories</div>
                  <div className="flex flex-wrap gap-1">
                    {dept.categories.map((category) => (
                      <Badge key={category} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Departments;