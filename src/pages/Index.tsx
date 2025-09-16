import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, BarChart3, Users, FileText, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Municipal Issue Tracking System
          </Badge>
          <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
            Streamline Your City's
            <span className="text-primary block">Issue Management</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A comprehensive platform for managing civic issues, from pothole reports to streetlight repairs. 
            Empower your citizens and optimize your municipal response times.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/admin">
                Access Admin Portal
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="rounded-full bg-municipal-blue-light p-3 w-12 h-12 flex items-center justify-center mb-3">
                <MapPin className="h-6 w-6 text-municipal-blue" />
              </div>
              <CardTitle className="text-lg">Interactive Mapping</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Visualize all reports on a real-time map with clustering and filtering capabilities.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="rounded-full bg-municipal-blue-light p-3 w-12 h-12 flex items-center justify-center mb-3">
                <FileText className="h-6 w-6 text-municipal-blue" />
              </div>
              <CardTitle className="text-lg">Report Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Efficiently track, assign, and resolve citizen-reported issues with automated workflows.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="rounded-full bg-municipal-blue-light p-3 w-12 h-12 flex items-center justify-center mb-3">
                <BarChart3 className="h-6 w-6 text-municipal-blue" />
              </div>
              <CardTitle className="text-lg">Analytics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Monitor performance metrics, response times, and departmental efficiency.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="rounded-full bg-municipal-blue-light p-3 w-12 h-12 flex items-center justify-center mb-3">
                <Users className="h-6 w-6 text-municipal-blue" />
              </div>
              <CardTitle className="text-lg">Department Coordination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Seamlessly coordinate between departments with role-based access and notifications.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="bg-card rounded-2xl shadow-card p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">System Overview</h2>
            <p className="text-muted-foreground">Current system performance and statistics</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1,247</div>
              <div className="text-muted-foreground">Total Reports</div>
              <div className="text-sm text-success mt-1">
                <CheckCircle className="inline h-4 w-4 mr-1" />
                +15% this month
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2.3h</div>
              <div className="text-muted-foreground">Avg Response Time</div>
              <div className="text-sm text-success mt-1">
                <CheckCircle className="inline h-4 w-4 mr-1" />
                23% improvement
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">94%</div>
              <div className="text-muted-foreground">Resolution Rate</div>
              <div className="text-sm text-success mt-1">
                <CheckCircle className="inline h-4 w-4 mr-1" />
                Above target
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto shadow-elevated bg-gradient-primary text-primary-foreground">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="mb-6 opacity-90">
                Access the admin portal to start managing your municipal issues more effectively.
              </p>
              <Button asChild variant="secondary" size="lg">
                <Link to="/admin">
                  Launch Admin Portal
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
