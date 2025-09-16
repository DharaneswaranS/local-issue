import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, Edit, Shield, User, Mail, Phone, Calendar } from "lucide-react";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@city.gov",
      phone: "(555) 123-4567",
      role: "department_head",
      department: "Roads & Transport",
      status: "active",
      lastLogin: new Date(2024, 0, 15, 9, 30),
      reportsAssigned: 45,
      reportsResolved: 42,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@city.gov",
      phone: "(555) 234-5678",
      role: "department_head",
      department: "Utilities",
      status: "active",
      lastLogin: new Date(2024, 0, 15, 8, 15),
      reportsAssigned: 38,
      reportsResolved: 36,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Lisa Martinez",
      email: "lisa.martinez@city.gov",
      phone: "(555) 345-6789",
      role: "supervisor",
      department: "Parks & Recreation",
      status: "active",
      lastLogin: new Date(2024, 0, 14, 16, 20),
      reportsAssigned: 23,
      reportsResolved: 20,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Robert Kim",
      email: "robert.kim@city.gov",
      phone: "(555) 456-7890",
      role: "field_worker",
      department: "Sanitation",
      status: "active",
      lastLogin: new Date(2024, 0, 15, 7, 0),
      reportsAssigned: 67,
      reportsResolved: 59,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Amanda Wilson",
      email: "amanda.wilson@city.gov",
      phone: "(555) 567-8901",
      role: "admin",
      department: "IT Administration",
      status: "active",
      lastLogin: new Date(2024, 0, 15, 11, 45),
      reportsAssigned: 0,
      reportsResolved: 0,
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "David Brown",
      email: "david.brown@city.gov",
      phone: "(555) 678-9012",
      role: "field_worker",
      department: "Roads & Transport",
      status: "inactive",
      lastLogin: new Date(2024, 0, 10, 14, 30),
      reportsAssigned: 12,
      reportsResolved: 8,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: "bg-red-100 text-red-800 border-red-200",
      department_head: "bg-blue-100 text-blue-800 border-blue-200", 
      supervisor: "bg-purple-100 text-purple-800 border-purple-200",
      field_worker: "bg-green-100 text-green-800 border-green-200"
    };
    
    return (
      <Badge 
        variant="outline"
        className={`capitalize ${variants[role as keyof typeof variants]}`}
      >
        {role.replace("_", " ")}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge 
        variant={status === "active" ? "default" : "secondary"}
        className={status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
      >
        {status}
      </Badge>
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">Manage system users, roles, and permissions</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="user-name">Full Name</Label>
                <Input id="user-name" placeholder="Enter full name" />
              </div>
              <div>
                <Label htmlFor="user-email">Email</Label>
                <Input id="user-email" type="email" placeholder="Enter email address" />
              </div>
              <div>
                <Label htmlFor="user-phone">Phone</Label>
                <Input id="user-phone" placeholder="Enter phone number" />
              </div>
              <div>
                <Label htmlFor="user-role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="department_head">Department Head</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="field_worker">Field Worker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="user-dept">Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="roads">Roads & Transport</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="parks">Parks & Recreation</SelectItem>
                    <SelectItem value="sanitation">Sanitation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Create User</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="department_head">Department Head</SelectItem>
            <SelectItem value="supervisor">Supervisor</SelectItem>
            <SelectItem value="field_worker">Field Worker</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <Card className="shadow-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {user.phone}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getRoleBadge(user.role)}
                  </TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>
                    {getStatusBadge(user.status)}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>Assigned: {user.reportsAssigned}</div>
                      <div>Resolved: {user.reportsResolved}</div>
                      <div className="text-xs text-muted-foreground">
                        Success: {user.reportsAssigned > 0 ? Math.round((user.reportsResolved / user.reportsAssigned) * 100) : 0}%
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {user.lastLogin.toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedUser(user)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit User - {user.name}</DialogTitle>
                        </DialogHeader>
                        {selectedUser && (
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-16 w-16">
                                <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                                <AvatarFallback>
                                  {selectedUser.name.split(" ").map((n: string) => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <Button variant="outline" size="sm">
                                Change Photo
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Full Name</Label>
                                <Input defaultValue={selectedUser.name} />
                              </div>
                              <div>
                                <Label>Email</Label>
                                <Input defaultValue={selectedUser.email} />
                              </div>
                              <div>
                                <Label>Phone</Label>
                                <Input defaultValue={selectedUser.phone} />
                              </div>
                              <div>
                                <Label>Role</Label>
                                <Select defaultValue={selectedUser.role}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="department_head">Department Head</SelectItem>
                                    <SelectItem value="supervisor">Supervisor</SelectItem>
                                    <SelectItem value="field_worker">Field Worker</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                              <div className="text-center">
                                <div className="text-2xl font-bold">{selectedUser.reportsAssigned}</div>
                                <div className="text-xs text-muted-foreground">Assigned</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold">{selectedUser.reportsResolved}</div>
                                <div className="text-xs text-muted-foreground">Resolved</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold">
                                  {selectedUser.reportsAssigned > 0 ? Math.round((selectedUser.reportsResolved / selectedUser.reportsAssigned) * 100) : 0}%
                                </div>
                                <div className="text-xs text-muted-foreground">Success Rate</div>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-municipal-blue" />
              <div>
                <div className="text-2xl font-bold">{users.length}</div>
                <p className="text-xs text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{users.filter(u => u.status === "active").length}</div>
                <p className="text-xs text-muted-foreground">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{users.filter(u => u.role === "admin").length}</div>
                <p className="text-xs text-muted-foreground">Administrators</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{users.filter(u => u.role === "field_worker").length}</div>
                <p className="text-xs text-muted-foreground">Field Workers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Users;