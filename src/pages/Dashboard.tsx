import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeroButton } from "@/components/ui/button-variants";
import { 
  Droplets, 
  Heart, 
  TrendingUp, 
  AlertTriangle, 
  Calendar,
  MapPin
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import cattleHero from "@/assets/cattle-hero.jpg";

// Sample data
const milkYieldData = [
  { day: "Mon", yield: 25.2 },
  { day: "Tue", yield: 26.1 },
  { day: "Wed", yield: 24.8 },
  { day: "Thu", yield: 27.3 },
  { day: "Fri", yield: 26.7 },
  { day: "Sat", yield: 25.9 },
  { day: "Sun", yield: 24.5 },
];

const feedConsumptionData = [
  { feed: "Hay", amount: 45 },
  { feed: "Corn", amount: 30 },
  { feed: "Protein", amount: 15 },
  { feed: "Supplements", amount: 10 },
];

const healthStatusData = [
  { name: "Healthy", value: 85, color: "hsl(var(--success))" },
  { name: "Monitor", value: 12, color: "hsl(var(--warning))" },
  { name: "At Risk", value: 3, color: "hsl(var(--destructive))" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl shadow-strong">
        <div 
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${cattleHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
          <div className="relative h-full flex items-center px-8">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-2">Welcome to CattleWatch</h1>
              <p className="text-xl opacity-90">AI-powered livestock monitoring for modern farming</p>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Dashboard Overview</h2>
          <p className="text-muted-foreground">
            Monitor your cattle's health and productivity in real-time
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            Last updated: Today, 9:30 AM
          </Badge>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="gradient-card shadow-soft hover:shadow-medium transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Cattle
            </CardTitle>
            <MapPin className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">127</div>
            <p className="text-xs text-success">+3 from last month</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-soft hover:shadow-medium transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Daily Milk Yield
            </CardTitle>
            <Droplets className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3,247L</div>
            <p className="text-xs text-success">+5.2% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-soft hover:shadow-medium transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Health Alerts
            </CardTitle>
            <Heart className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3</div>
            <p className="text-xs text-warning">2 require attention</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-soft hover:shadow-medium transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Productivity
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">94.3%</div>
            <p className="text-xs text-success">+2.1% from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Milk Yield Trend */}
        <Card className="gradient-card shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Droplets className="h-5 w-5 text-primary" />
              Weekly Milk Yield Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={milkYieldData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="yield" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Health Status Distribution */}
        <Card className="gradient-card shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Heart className="h-5 w-5 text-primary" />
              Health Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={healthStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {healthStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Feed Consumption Chart */}
      <Card className="gradient-card shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <TrendingUp className="h-5 w-5 text-primary" />
            Daily Feed Consumption (kg)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={feedConsumptionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="feed" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar 
                dataKey="amount" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="gradient-card shadow-soft">
        <CardHeader>
          <CardTitle className="text-foreground">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <HeroButton className="w-full">
              <Droplets className="w-4 h-4 mr-2" />
              Predict Milk Yield
            </HeroButton>
            <HeroButton className="w-full">
              <Heart className="w-4 h-4 mr-2" />
              Health Check
            </HeroButton>
            <HeroButton className="w-full">
              <TrendingUp className="w-4 h-4 mr-2" />
              Generate Report
            </HeroButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}