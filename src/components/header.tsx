import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Bell, Search, User } from "lucide-react";
import { auth } from "~/server/auth";

export async function DashboardHeader() {
  const session = await auth();
  if (!session) {
    throw new Error("User is not authenticated");
  }
  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-foreground">Welcome {session.user.name}!</h2>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search..." className="pl-10 w-64" />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full"></span>
          </Button>

          {/* Profile */}
          <Button variant="ghost" size="sm">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
