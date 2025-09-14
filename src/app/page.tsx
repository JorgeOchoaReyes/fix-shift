"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Clock, Users, DollarSign, Calendar, Star, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation"; 

export default function HomePage() {
  const router = useRouter();

  const handleRedirectToSignIn = () => {
    router.push("/api/auth/signin", {
      
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">ScheduleAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transit  ion-colors">
              Features
            </a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Reviews
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
          </nav>
          <Button variant="outline" onClick={handleRedirectToSignIn} className="hidden md:inline-flex bg-transparent">
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            AI-Powered Restaurant Scheduling
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Effortless Scheduling for <span className="text-primary">Restaurants</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
            Let AI handle your staff scheduling complexities. Optimize shifts, reduce labor costs, and keep your team
            happy with intelligent automation built for restaurants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" onClick={handleRedirectToSignIn}>
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" onClick={handleRedirectToSignIn}>
              Watch Demo
            </Button>
          </div> 
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Restaurant Operations</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI understands the unique challenges of restaurant scheduling and delivers solutions that work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Smart Shift Management</CardTitle>
                <CardDescription>
                  AI automatically creates optimal schedules based on historical data, peak hours, and staff
                  preferences.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Real-Time Availability</CardTitle>
                <CardDescription>
                  Staff can update availability instantly. AI adjusts schedules automatically to prevent conflicts and
                  gaps.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <DollarSign className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Labor Cost Optimization</CardTitle>
                <CardDescription>
                  Reduce overtime costs and optimize staffing levels with intelligent forecasting and budget controls.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Restaurant Managers</h2>
            <p className="text-xl text-muted-foreground">See how ScheduleAI is transforming restaurant operations</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[new Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  {"\""}ScheduleAI cut our scheduling time from 3 hours to 15 minutes. The AI suggestions are spot-on and our
                  staff loves the flexibility.{"\""}
                </p>
                <div className="flex items-center gap-3"> 
                  <div>
                    <p className="font-semibold">Sarah Chen</p>
                    <p className="text-sm text-muted-foreground">Manager, Bistro 42</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[new Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  {"\""}We reduced labor costs by 18% while improving staff satisfaction. The predictive scheduling is a
                  game-changer for busy periods.{"\""}
                </p>
                <div className="flex items-center gap-3"> 
                  <div>
                    <p className="font-semibold">Mike Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Owner, The Local Kitchen</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[new Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  {"\""}Finally, a scheduling tool that understands restaurants. No more last-minute scrambling or
                  understaffed shifts.{"\""}
                </p>
                <div className="flex items-center gap-3"> 
                  <div>
                    <p className="font-semibold">Lisa Thompson</p>
                    <p className="text-sm text-muted-foreground">GM, Coastal Grill</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Scheduling?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of restaurants already saving time and money with AI-powered scheduling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm opacity-75">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Setup in minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-muted/30 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Calendar className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">ScheduleAI</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Support
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2024 ScheduleAI. All rights reserved. Built for restaurants, by restaurant technology experts.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
