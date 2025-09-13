import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HeroButton, SuccessButton } from "@/components/ui/button-variants";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Droplets, 
  TrendingUp, 
  Lightbulb,
  BarChart3,
  Zap
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const predictionData = [
  { day: "Day 1", actual: 24.5, predicted: 25.2 },
  { day: "Day 2", actual: 25.1, predicted: 25.8 },
  { day: "Day 3", actual: 24.8, predicted: 24.9 },
  { day: "Day 4", actual: 26.2, predicted: 26.1 },
  { day: "Day 5", actual: 25.7, predicted: 25.9 },
  { day: "Day 6", actual: null, predicted: 26.3 },
  { day: "Day 7", actual: null, predicted: 26.0 },
];

interface FormData {
  breed: string;
  age: string;
  weight: string;
  lactationStage: string;
  parity: string;
  feedType: string;
  feedQuantity: string;
  grazingDuration: string;
  walkingDistance: string;
  temperature: string;
  humidity: string;
  historicalYield: string;
}

export default function MilkPrediction() {
  const [formData, setFormData] = useState<FormData>({
    breed: "",
    age: "",
    weight: "",
    lactationStage: "",
    parity: "",
    feedType: "",
    feedQuantity: "",
    grazingDuration: "",
    walkingDistance: "",
    temperature: "",
    humidity: "",
    historicalYield: "",
  });

  const [prediction, setPrediction] = useState<{
    dailyYield: number;
    confidence: number;
    suggestions: string[];
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePredict = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock prediction results
    const mockPrediction = {
      dailyYield: 25.8 + Math.random() * 2 - 1, // Random between 24.8 and 26.8
      confidence: 87 + Math.random() * 10, // Random between 87-97%
      suggestions: [
        "Increase protein content in feed by 5% to optimize milk production",
        "Extend grazing time to 6-7 hours for better nutrition absorption",
        "Monitor water intake - ensure 40-50L daily consumption",
        "Consider adding vitamin supplements during current lactation stage",
      ],
    };
    
    setPrediction(mockPrediction);
    setIsLoading(false);
  };

  const isFormValid = () => {
    return formData.breed && formData.age && formData.weight && formData.lactationStage;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Milk Yield Prediction</h1>
          <p className="text-muted-foreground">
            Use AI to predict daily milk yield and get optimization suggestions
          </p>
        </div>
        <Badge variant="outline" className="text-sm w-fit">
          <Zap className="w-4 h-4 mr-1" />
          AI-Powered Analytics
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-2">
          <Card className="gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <BarChart3 className="h-5 w-5 text-primary" />
                Cattle & Environment Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Cattle Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Cattle Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="breed">Breed</Label>
                    <Select value={formData.breed} onValueChange={(value) => handleInputChange("breed", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select breed" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="holstein">Holstein</SelectItem>
                        <SelectItem value="jersey">Jersey</SelectItem>
                        <SelectItem value="guernsey">Guernsey</SelectItem>
                        <SelectItem value="angus">Angus</SelectItem>
                        <SelectItem value="brahman">Brahman</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Age (years)</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="e.g., 4"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="e.g., 650"
                      value={formData.weight}
                      onChange={(e) => handleInputChange("weight", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lactationStage">Lactation Stage</Label>
                    <Select value={formData.lactationStage} onValueChange={(value) => handleInputChange("lactationStage", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="early">Early (0-100 days)</SelectItem>
                        <SelectItem value="peak">Peak (100-200 days)</SelectItem>
                        <SelectItem value="mid">Mid (200-300 days)</SelectItem>
                        <SelectItem value="late">Late (300+ days)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parity">Parity (Number of calvings)</Label>
                    <Input
                      id="parity"
                      type="number"
                      placeholder="e.g., 2"
                      value={formData.parity}
                      onChange={(e) => handleInputChange("parity", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Feed & Activity */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Feed & Activity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="feedType">Primary Feed Type</Label>
                    <Select value={formData.feedType} onValueChange={(value) => handleInputChange("feedType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select feed type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grass">Grass</SelectItem>
                        <SelectItem value="hay">Hay</SelectItem>
                        <SelectItem value="silage">Silage</SelectItem>
                        <SelectItem value="concentrate">Concentrate Mix</SelectItem>
                        <SelectItem value="mixed">Mixed Feed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feedQuantity">Feed Quantity (kg/day)</Label>
                    <Input
                      id="feedQuantity"
                      type="number"
                      placeholder="e.g., 25"
                      value={formData.feedQuantity}
                      onChange={(e) => handleInputChange("feedQuantity", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="grazingDuration">Grazing Duration (hours)</Label>
                    <Input
                      id="grazingDuration"
                      type="number"
                      placeholder="e.g., 6"
                      value={formData.grazingDuration}
                      onChange={(e) => handleInputChange("grazingDuration", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="walkingDistance">Walking Distance (km)</Label>
                    <Input
                      id="walkingDistance"
                      type="number"
                      placeholder="e.g., 2.5"
                      value={formData.walkingDistance}
                      onChange={(e) => handleInputChange("walkingDistance", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Environment & History */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Environment & History</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature (°C)</Label>
                    <Input
                      id="temperature"
                      type="number"
                      placeholder="e.g., 24"
                      value={formData.temperature}
                      onChange={(e) => handleInputChange("temperature", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="humidity">Humidity (%)</Label>
                    <Input
                      id="humidity"
                      type="number"
                      placeholder="e.g., 65"
                      value={formData.humidity}
                      onChange={(e) => handleInputChange("humidity", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="historicalYield">Historical Average Yield (L/day)</Label>
                    <Input
                      id="historicalYield"
                      type="number"
                      placeholder="e.g., 24.5"
                      value={formData.historicalYield}
                      onChange={(e) => handleInputChange("historicalYield", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <HeroButton
                  onClick={handlePredict}
                  disabled={!isFormValid() || isLoading}
                  className="w-full md:w-auto"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Droplets className="w-4 h-4 mr-2" />
                      Predict Milk Yield
                    </>
                  )}
                </HeroButton>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {/* Prediction Results */}
          {prediction && (
            <Card className="gradient-card shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Prediction Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {prediction.dailyYield.toFixed(1)}L
                  </div>
                  <p className="text-sm text-muted-foreground">Predicted daily yield</p>
                  <Badge variant="outline" className="mt-2">
                    {prediction.confidence.toFixed(0)}% confidence
                  </Badge>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                    <Lightbulb className="h-4 w-4 text-accent" />
                    Optimization Tips
                  </h4>
                  <div className="space-y-2">
                    {prediction.suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="text-sm p-3 bg-secondary/50 rounded-lg border-l-2 border-primary"
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Historical Trends */}
          <Card className="gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <BarChart3 className="h-5 w-5 text-primary" />
                Yield Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={predictionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="day" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
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
                    dataKey="actual" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Actual"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Predicted"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}