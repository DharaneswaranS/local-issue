import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Edit, MessageSquare, Clock, MapPin, User, AlertTriangle } from "lucide-react";
import { ReportsList } from "@/components/admin/ReportsList";

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [newComment, setNewComment] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const sampleReport = {
    id: "R-2024-001",
    category: "Pothole",
    location: "Main St & 5th Ave, Downtown",
    status: "pending",
    priority: "high",
    reporter: "Anonymous",
    department: "Roads & Transport",
    createdAt: new Date(2024, 0, 15, 9, 30),
    updatedAt: new Date(2024, 0, 15, 9, 30),
    description: "Large pothole causing traffic issues. The hole is approximately 3 feet wide and causing vehicles to swerve into oncoming traffic.",
    images: ["https://picsum.photos/400/300?random=1", "https://picsum.photos/400/300?random=2"],
    comments: [
      {
        id: 1,
        author: "System",
        message: "Report automatically assigned to Roads & Transport department",
        timestamp: new Date(2024, 0, 15, 9, 35),
        internal: true
      },
      {
        id: 2,
        author: "Mike Johnson",
        message: "Inspection scheduled for tomorrow morning",
        timestamp: new Date(2024, 0, 15, 14, 20),
        internal: false
      }
    ]
  };

  const handleStatusUpdate = () => {
    console.log("Updating status to:", newStatus);
    setNewStatus("");
  };

  const handleAddComment = () => {
    console.log("Adding comment:", newComment);
    setNewComment("");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports Management</h1>
          <p className="text-muted-foreground">View, manage, and track all citizen reports</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            Export CSV
          </Button>
          <Button>
            Bulk Actions
          </Button>
        </div>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-0">
          <ReportsList />
        </CardContent>
      </Card>

      {/* Report Detail Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setSelectedReport(sampleReport)}
            className="hidden"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span>Report Details - {sampleReport.id}</span>
              <Badge variant="secondary">{sampleReport.status}</Badge>
            </DialogTitle>
          </DialogHeader>
          
          {selectedReport && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Report Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Report Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Category:</span> {selectedReport.category}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Location:</span> {selectedReport.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Reporter:</span> {selectedReport.reporter}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Created:</span> {selectedReport.createdAt.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground">{selectedReport.description}</p>
                </div>

                {/* Images */}
                <div>
                  <h3 className="font-semibold mb-2">Attached Images</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedReport.images.map((img: string, idx: number) => (
                      <img 
                        key={idx}
                        src={img} 
                        alt={`Report image ${idx + 1}`}
                        className="rounded-lg border"
                      />
                    ))}
                  </div>
                </div>

                {/* Status Update */}
                <div>
                  <h3 className="font-semibold mb-2">Update Status</h3>
                  <div className="flex gap-2">
                    <Select value={newStatus} onValueChange={setNewStatus}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select new status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="assigned">Assigned</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleStatusUpdate} disabled={!newStatus}>
                      Update
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Column - Comments */}
              <div className="space-y-4">
                <h3 className="font-semibold">Comments & Updates</h3>
                
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {selectedReport.comments.map((comment: any) => (
                    <div key={comment.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <div className="flex items-center gap-2">
                          {comment.internal && (
                            <Badge variant="outline" className="text-xs">Internal</Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {comment.timestamp.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm">{comment.message}</p>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="space-y-2">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment or update..."
                    className="min-h-20"
                  />
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="internal" className="rounded" />
                      <label htmlFor="internal" className="text-sm">Internal comment</label>
                    </div>
                    <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Add Comment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reports;