import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Bell, Send, Eye, Clock, Users, Mail, Smartphone, AlertTriangle, CheckCircle, Plus } from "lucide-react";

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("inbox");

  const notifications = [
    {
      id: 1,
      title: "High Priority Report - Water Leak",
      message: "New high priority report R-2024-015 requires immediate attention in downtown area.",
      type: "alert",
      timestamp: new Date(2024, 0, 15, 10, 30),
      read: false,
      reportId: "R-2024-015",
      department: "Utilities",
      priority: "high"
    },
    {
      id: 2,
      title: "SLA Breach Warning",
      message: "Report R-2024-012 is approaching SLA deadline (2 hours remaining).",
      type: "warning",
      timestamp: new Date(2024, 0, 15, 9, 15),
      read: false,
      reportId: "R-2024-012",
      department: "Roads & Transport",
      priority: "medium"
    },
    {
      id: 3,
      title: "Weekly Performance Report",
      message: "Your weekly performance summary is ready for review.",
      type: "info",
      timestamp: new Date(2024, 0, 15, 8, 0),
      read: true,
      department: "System",
      priority: "low"
    },
    {
      id: 4,
      title: "New User Registration",
      message: "New field worker has been registered and requires approval.",
      type: "info",
      timestamp: new Date(2024, 0, 14, 16, 45),
      read: true,
      department: "Administration",
      priority: "medium"
    },
    {
      id: 5,
      title: "System Maintenance Scheduled",
      message: "Scheduled maintenance window: Saturday 2AM - 4AM EST.",
      type: "system",
      timestamp: new Date(2024, 0, 14, 14, 20),
      read: true,
      department: "IT",
      priority: "low"
    }
  ];

  const templates = [
    {
      id: 1,
      name: "Report Assignment",
      subject: "New Report Assigned: {REPORT_ID}",
      body: "A new report has been assigned to your department. Please review and take appropriate action.\n\nReport ID: {REPORT_ID}\nCategory: {CATEGORY}\nLocation: {LOCATION}\nPriority: {PRIORITY}",
      channels: ["email", "push"]
    },
    {
      id: 2,
      name: "Status Update",
      subject: "Report Status Updated: {REPORT_ID}",
      body: "The status of your report has been updated.\n\nReport ID: {REPORT_ID}\nNew Status: {STATUS}\nUpdated by: {UPDATED_BY}",
      channels: ["email", "sms", "push"]
    },
    {
      id: 3,
      name: "SLA Warning",
      subject: "SLA Deadline Approaching: {REPORT_ID}",
      body: "URGENT: Report {REPORT_ID} is approaching its SLA deadline.\n\nTime remaining: {TIME_REMAINING}\nPlease take immediate action to resolve this report.",
      channels: ["email", "push"]
    }
  ];

  const getNotificationIcon = (type: string) => {
    const icons = {
      alert: <AlertTriangle className="w-5 h-5 text-red-500" />,
      warning: <Clock className="w-5 h-5 text-yellow-500" />,
      info: <Bell className="w-5 h-5 text-blue-500" />,
      system: <CheckCircle className="w-5 h-5 text-green-500" />
    };
    return icons[type as keyof typeof icons] || <Bell className="w-5 h-5 text-gray-500" />;
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: "bg-red-100 text-red-800 border-red-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      low: "bg-green-100 text-green-800 border-green-200"
    };
    
    return (
      <Badge variant="outline" className={variants[priority as keyof typeof variants]}>
        {priority}
      </Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications Center</h1>
          <p className="text-muted-foreground">Manage alerts, messages, and communication templates</p>
        </div>
        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Send className="w-4 h-4 mr-2" />
                Send Broadcast
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Broadcast Notification</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="broadcast-title">Title</Label>
                  <Input id="broadcast-title" placeholder="Enter notification title" />
                </div>
                <div>
                  <Label htmlFor="broadcast-message">Message</Label>
                  <Textarea id="broadcast-message" placeholder="Enter your message" className="min-h-20" />
                </div>
                <div>
                  <Label>Recipients</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="dept_heads">Department Heads</SelectItem>
                      <SelectItem value="field_workers">Field Workers</SelectItem>
                      <SelectItem value="roads">Roads & Transport Dept</SelectItem>
                      <SelectItem value="utilities">Utilities Dept</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Channels</Label>
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email" defaultChecked />
                      <Label htmlFor="email">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="push" defaultChecked />
                      <Label htmlFor="push">Push</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sms" />
                      <Label htmlFor="sms">SMS</Label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Send Notification</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted p-1 rounded-lg w-fit">
        {[
          { id: "inbox", label: "Inbox", count: notifications.filter(n => !n.read).length },
          { id: "templates", label: "Templates", count: templates.length },
          { id: "settings", label: "Settings", count: 0 }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 text-xs">
                {tab.count}
              </Badge>
            )}
          </button>
        ))}
      </div>

      {/* Inbox Tab */}
      {activeTab === "inbox" && (
        <div className="space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-municipal-blue" />
                  <div>
                    <div className="text-2xl font-bold">{notifications.length}</div>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <div>
                    <div className="text-2xl font-bold">{notifications.filter(n => !n.read).length}</div>
                    <p className="text-xs text-muted-foreground">Unread</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-yellow-500" />
                  <div>
                    <div className="text-2xl font-bold">{notifications.filter(n => n.priority === "high").length}</div>
                    <p className="text-xs text-muted-foreground">High Priority</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="text-2xl font-bold">{notifications.filter(n => n.read).length}</div>
                    <p className="text-xs text-muted-foreground">Read</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications List */}
          <Card className="shadow-card">
            <CardContent className="p-0">
              <div className="space-y-0">
                {notifications.map((notification, index) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors ${
                      !notification.read ? "bg-blue-50/50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-medium ${!notification.read ? "font-semibold" : ""}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                          {notification.priority && getPriorityBadge(notification.priority)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {notification.timestamp.toLocaleString()}
                          </span>
                          <span>{notification.department}</span>
                          {notification.reportId && (
                            <span className="font-mono">
                              {notification.reportId}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {!notification.read && (
                          <Button variant="ghost" size="sm">
                            Mark Read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === "templates" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Notification Templates</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Template
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Notification Template</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="template-name">Template Name</Label>
                    <Input id="template-name" placeholder="Enter template name" />
                  </div>
                  <div>
                    <Label htmlFor="template-subject">Subject</Label>
                    <Input id="template-subject" placeholder="Enter email subject" />
                  </div>
                  <div>
                    <Label htmlFor="template-body">Message Body</Label>
                    <Textarea id="template-body" placeholder="Enter message content" className="min-h-24" />
                  </div>
                  <div>
                    <Label>Available Variables</Label>
                    <div className="text-sm text-muted-foreground">
                      {"{REPORT_ID}, {CATEGORY}, {LOCATION}, {PRIORITY}, {STATUS}, {UPDATED_BY}, {TIME_REMAINING}"}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Create Template</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">Subject: {template.subject}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-lg mb-4">
                    <p className="text-sm whitespace-pre-line">{template.body}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Channels:</span>
                    {template.channels.map((channel) => (
                      <Badge key={channel} variant="outline" className="flex items-center gap-1">
                        {channel === "email" && <Mail className="w-3 h-3" />}
                        {channel === "sms" && <Smartphone className="w-3 h-3" />}
                        {channel === "push" && <Bell className="w-3 h-3" />}
                        {channel}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Notification Settings</h2>
          
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Default Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Report Events</h3>
                <div className="space-y-3">
                  {[
                    "New high priority reports",
                    "SLA deadline approaching",
                    "Report status changes",
                    "Assignment notifications"
                  ].map((event) => (
                    <div key={event} className="flex items-center justify-between p-3 border rounded-lg">
                      <span>{event}</span>
                      <div className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id={`${event}-email`} defaultChecked />
                          <Label htmlFor={`${event}-email`}>Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id={`${event}-push`} defaultChecked />
                          <Label htmlFor={`${event}-push`}>Push</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id={`${event}-sms`} />
                          <Label htmlFor={`${event}-sms`}>SMS</Label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Quiet Hours</h3>
                <div className="flex gap-4">
                  <div>
                    <Label>Start Time</Label>
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="22:00" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                            {`${i.toString().padStart(2, '0')}:00`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>End Time</Label>
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="08:00" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                            {`${i.toString().padStart(2, '0')}:00`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Notifications;