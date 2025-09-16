import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapComponent } from "@/components/admin/MapComponent";
import { MapPin, Filter, Download, Layers } from "lucide-react";

const MapView = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [mapStyle, setMapStyle] = useState("streets");
  const [showHeatmap, setShowHeatmap] = useState(false);

  const reportCounts = {
    total: 1247,
    pending: 89,
    assigned: 156,
    inProgress: 98,
    resolved: 904
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Interactive Map</h1>
          <p className="text-muted-foreground">Geographic view of all reports with filtering and clustering</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowHeatmap(!showHeatmap)}>
            <Layers className="w-4 h-4 mr-2" />
            {showHeatmap ? "Hide" : "Show"} Heatmap
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-municipal-blue">{reportCounts.total}</div>
            <p className="text-xs text-muted-foreground">Total Reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-status-pending">{reportCounts.pending}</div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-status-assigned">{reportCounts.assigned}</div>
            <p className="text-xs text-muted-foreground">Assigned</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-status-in-progress">{reportCounts.inProgress}</div>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-status-resolved">{reportCounts.resolved}</div>
            <p className="text-xs text-muted-foreground">Resolved</p>
          </CardContent>
        </Card>
      </div>

      {/* Map Controls */}
      <div className="flex gap-4 flex-wrap">
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reports</SelectItem>
            <SelectItem value="pending">Pending Only</SelectItem>
            <SelectItem value="assigned">Assigned Only</SelectItem>
            <SelectItem value="in-progress">In Progress Only</SelectItem>
            <SelectItem value="resolved">Resolved Only</SelectItem>
          </SelectContent>
        </Select>

        <Select value={mapStyle} onValueChange={setMapStyle}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Map style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="streets">Streets</SelectItem>
            <SelectItem value="satellite">Satellite</SelectItem>
            <SelectItem value="terrain">Terrain</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Badge variant="outline" className="bg-status-pending/10 text-status-pending border-status-pending/20">
            <div className="w-2 h-2 rounded-full bg-status-pending mr-2"></div>
            Pending
          </Badge>
          <Badge variant="outline" className="bg-status-assigned/10 text-status-assigned border-status-assigned/20">
            <div className="w-2 h-2 rounded-full bg-status-assigned mr-2"></div>
            Assigned
          </Badge>
          <Badge variant="outline" className="bg-status-in-progress/10 text-status-in-progress border-status-in-progress/20">
            <div className="w-2 h-2 rounded-full bg-status-in-progress mr-2"></div>
            In Progress
          </Badge>
          <Badge variant="outline" className="bg-status-resolved/10 text-status-resolved border-status-resolved/20">
            <div className="w-2 h-2 rounded-full bg-status-resolved mr-2"></div>
            Resolved
          </Badge>
        </div>
      </div>

      {/* Map */}
      <Card className="shadow-card">
        <CardContent className="p-0">
          <div className="relative">
            <MapComponent />
            <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm p-4 rounded-lg border shadow-lg">
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Quick Stats
              </h3>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Visible:</span>
                  <span className="font-medium">247 reports</span>
                </div>
                <div className="flex justify-between">
                  <span>Clusters:</span>
                  <span className="font-medium">12 areas</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Response:</span>
                  <span className="font-medium">2.3h</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Map Legend & Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">Marker Types</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>High Priority Issues</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>Medium Priority Issues</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Low Priority Issues</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Cluster Sizes</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 border-2 border-primary text-xs flex items-center justify-center">2</div>
                  <span>2-5 reports</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-primary text-xs flex items-center justify-center">8</div>
                  <span>6-10 reports</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary text-xs flex items-center justify-center">15</div>
                  <span>11+ reports</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Interaction</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>• Click markers to view report details</p>
                <p>• Click clusters to zoom in</p>
                <p>• Use mouse wheel to zoom</p>
                <p>• Drag to pan around the map</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapView;