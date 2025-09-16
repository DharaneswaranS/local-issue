import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  // Mock report data - in real app, this would come from API
  const reports = [
    { id: 1, lng: -74.006, lat: 40.7128, category: "pothole", status: "pending", priority: "high" },
    { id: 2, lng: -74.0059, lat: 40.7589, category: "streetlight", status: "assigned", priority: "medium" },
    { id: 3, lng: -73.9857, lat: 40.7484, category: "graffiti", status: "resolved", priority: "low" },
    { id: 4, lng: -73.9776, lat: 40.7614, category: "pothole", status: "in-progress", priority: "high" },
    { id: 5, lng: -74.0014, lat: 40.7505, category: "trash", status: "pending", priority: "medium" }
  ];

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-74.006, 40.7128], // NYC coordinates
      zoom: 12,
      pitch: 0,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    map.current.on('load', () => {
      if (!map.current) return;

      // Add reports as markers
      reports.forEach((report) => {
        const el = document.createElement('div');
        el.className = 'report-marker';
        el.style.cssText = `
          width: 20px;
          height: 20px;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          background-color: ${
            report.status === 'pending' ? '#f59e0b' :
            report.status === 'assigned' ? '#3b82f6' :
            report.status === 'in-progress' ? '#8b5cf6' :
            '#10b981'
          };
        `;

        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div class="p-2">
              <h3 class="font-semibold">Report #${report.id}</h3>
              <p class="text-sm text-gray-600">Category: ${report.category}</p>
              <p class="text-sm text-gray-600">Status: ${report.status}</p>
              <p class="text-sm text-gray-600">Priority: ${report.priority}</p>
            </div>
          `);

        new mapboxgl.Marker(el)
          .setLngLat([report.lng, report.lat])
          .setPopup(popup)
          .addTo(map.current!);
      });
    });

    setShowTokenInput(false);
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      initializeMap(mapboxToken);
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Card className="p-6 max-w-md w-full mx-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Mapbox Token Required</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Please enter your Mapbox public token to display the map. You can get one from{' '}
                <a 
                  href="https://mapbox.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  mapbox.com
                </a>
              </p>
            </div>
            <div className="space-y-3">
              <Input
                type="text"
                placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbG..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="font-mono text-xs"
              />
              <Button 
                onClick={handleTokenSubmit}
                disabled={!mapboxToken.trim()}
                className="w-full"
              >
                Load Map
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative h-96 w-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-b-lg" />
      
      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-card border rounded-lg p-3 shadow-card">
        <h4 className="text-sm font-semibold mb-2">Report Status</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <span>Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-status-assigned"></div>
            <span>Assigned</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-status-in-progress"></div>
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-status-resolved"></div>
            <span>Resolved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MapComponent };