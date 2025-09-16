import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, Shield, Database, Bell, Mail, Users, MapPin, Clock, Save } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  const categories = [
    "Pothole", "Streetlight", "Graffiti", "Trash Collection", "Water Leak",
    "Traffic Signal", "Road Damage", "Noise Complaint", "Illegal Dumping", "Other"
  ];

  const departments = [
    { id: 1, name: "Roads & Transport", enabled: true },
    { id: 2, name: "Utilities", enabled: true },
    { id: 3, name: "Parks & Recreation", enabled: true },
    { id: 4, name: "Sanitation", enabled: true },
    { id: 5, name: "Code Enforcement", enabled: false },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
          <p className="text-muted-foreground">Configure system preferences and administrative settings</p>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5" />
                Application Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="app-name">Application Name</Label>
                  <Input id="app-name" defaultValue="CivicTracker" />
                </div>
                <div>
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input id="org-name" defaultValue="City Municipal Services" />
                </div>
                <div>
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" defaultValue="contact@cityservices.gov" />
                </div>
                <div>
                  <Label htmlFor="support-phone">Support Phone</Label>
                  <Input id="support-phone" defaultValue="(555) 311-CITY" />
                </div>
              </div>

              <div>
                <Label htmlFor="app-description">Application Description</Label>
                <Textarea 
                  id="app-description" 
                  defaultValue="Municipal issue reporting and tracking system for citizens to report and track city service requests."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timezone">Default Timezone</Label>
                  <Select defaultValue="America/New_York">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="default-language">Default Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Feature Toggles</h3>
                <div className="space-y-3">
                  {[
                    { id: "anonymous-reporting", label: "Allow Anonymous Reporting", defaultChecked: true },
                    { id: "public-map", label: "Public Report Map", defaultChecked: true },
                    { id: "auto-routing", label: "Automatic Report Routing", defaultChecked: true },
                    { id: "duplicate-detection", label: "Duplicate Detection", defaultChecked: false },
                    { id: "citizen-updates", label: "Citizen Status Updates", defaultChecked: true },
                    { id: "mobile-uploads", label: "Mobile Photo/Video Upload", defaultChecked: true },
                  ].map((feature) => (
                    <div key={feature.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <Label htmlFor={feature.id}>{feature.label}</Label>
                      <Switch id={feature.id} defaultChecked={feature.defaultChecked} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories */}
        <TabsContent value="categories" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Report Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Add new category" className="flex-1" />
                  <Button>Add Category</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span>{category}</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Category Routing Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.slice(0, 5).map((category, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="flex-1">
                      <span className="font-medium">{category}</span>
                    </div>
                    <div className="flex-1">
                      <Select defaultValue={["roads", "utilities", "parks", "sanitation", "roads"][index]}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="roads">Roads & Transport</SelectItem>
                          <SelectItem value="utilities">Utilities</SelectItem>
                          <SelectItem value="parks">Parks & Recreation</SelectItem>
                          <SelectItem value="sanitation">Sanitation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <Select defaultValue={["high", "medium", "low", "medium", "high"][index]}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High Priority</SelectItem>
                          <SelectItem value="medium">Medium Priority</SelectItem>
                          <SelectItem value="low">Low Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Departments */}
        <TabsContent value="departments" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Department Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departments.map((dept) => (
                  <div key={dept.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Switch defaultChecked={dept.enabled} />
                      <span className="font-medium">{dept.name}</span>
                      <Badge variant={dept.enabled ? "default" : "secondary"}>
                        {dept.enabled ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>SLA Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="sla-high">High Priority SLA (hours)</Label>
                  <Input id="sla-high" type="number" defaultValue="4" />
                </div>
                <div>
                  <Label htmlFor="sla-medium">Medium Priority SLA (hours)</Label>
                  <Input id="sla-medium" type="number" defaultValue="24" />
                </div>
                <div>
                  <Label htmlFor="sla-low">Low Priority SLA (hours)</Label>
                  <Input id="sla-low" type="number" defaultValue="72" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email-from">From Email Address</Label>
                  <Input id="email-from" defaultValue="noreply@cityservices.gov" />
                </div>
                <div>
                  <Label htmlFor="email-from-name">From Name</Label>
                  <Input id="email-from-name" defaultValue="City Services" />
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Email Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="smtp-host">SMTP Host</Label>
                    <Input id="smtp-host" defaultValue="smtp.cityservices.gov" />
                  </div>
                  <div>
                    <Label htmlFor="smtp-port">SMTP Port</Label>
                    <Input id="smtp-port" type="number" defaultValue="587" />
                  </div>
                  <div>
                    <Label htmlFor="smtp-user">SMTP Username</Label>
                    <Input id="smtp-user" defaultValue="notifications@cityservices.gov" />
                  </div>
                  <div>
                    <Label htmlFor="smtp-pass">SMTP Password</Label>
                    <Input id="smtp-pass" type="password" placeholder="••••••••" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">SMS Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sms-provider">SMS Provider</Label>
                    <Select defaultValue="twilio">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="twilio">Twilio</SelectItem>
                        <SelectItem value="aws-sns">AWS SNS</SelectItem>
                        <SelectItem value="nexmo">Nexmo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="sms-from">From Number</Label>
                    <Input id="sms-from" defaultValue="+15551234567" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Authentication</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <Label htmlFor="require-2fa">Require Two-Factor Authentication</Label>
                    <Switch id="require-2fa" />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <Label htmlFor="sso-enabled">Enable SSO Integration</Label>
                    <Switch id="sso-enabled" />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <Label htmlFor="password-expiry">Password Expiration (days)</Label>
                    <Input className="w-24" type="number" defaultValue="90" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">API Security</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rate-limit">Rate Limit (requests/minute)</Label>
                    <Input id="rate-limit" type="number" defaultValue="100" />
                  </div>
                  <div>
                    <Label htmlFor="api-key-expiry">API Key Expiry (days)</Label>
                    <Input id="api-key-expiry" type="number" defaultValue="365" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Data Retention</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="report-retention">Report Retention (years)</Label>
                    <Input id="report-retention" type="number" defaultValue="7" />
                  </div>
                  <div>
                    <Label htmlFor="media-retention">Media Retention (years)</Label>
                    <Input id="media-retention" type="number" defaultValue="3" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integration */}
        <TabsContent value="integration" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>External Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Mapping Services
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="mapbox-token">Mapbox Access Token</Label>
                    <Input id="mapbox-token" placeholder="pk.ey..." />
                  </div>
                  <div>
                    <Label htmlFor="geocoding-service">Geocoding Service</Label>
                    <Select defaultValue="mapbox">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mapbox">Mapbox</SelectItem>
                        <SelectItem value="google">Google Maps</SelectItem>
                        <SelectItem value="opencage">OpenCage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Database Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="backup-retention">Backup Retention (days)</Label>
                    <Input id="backup-retention" type="number" defaultValue="30" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Third-Party Services</h3>
                <div className="space-y-3">
                  {[
                    { name: "Analytics (Google Analytics)", enabled: false },
                    { name: "Error Tracking (Sentry)", enabled: true },
                    { name: "Performance Monitoring", enabled: true },
                    { name: "Customer Support (Zendesk)", enabled: false },
                  ].map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <Label>{service.name}</Label>
                      <Switch defaultChecked={service.enabled} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;