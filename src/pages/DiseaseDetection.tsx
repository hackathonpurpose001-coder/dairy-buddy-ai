import { useState, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeroButton, WarningButton, SuccessButton } from "@/components/ui/button-variants";
import { Separator } from "@/components/ui/separator";
import { 
  Camera, 
  Upload, 
  X, 
  AlertTriangle, 
  Shield, 
  Stethoscope,
  Calendar,
  Image as ImageIcon,
  CheckCircle,
  Clock
} from "lucide-react";

interface AnalysisResult {
  id: string;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  detectedIssues: string[];
  recommendations: string[];
  confidence: number;
  timestamp: Date;
  imageUrl: string;
}

const mockResults: AnalysisResult[] = [
  {
    id: "1",
    riskScore: 15,
    riskLevel: 'low',
    detectedIssues: [],
    recommendations: ["Continue regular monitoring", "Maintain current care routine"],
    confidence: 92,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    imageUrl: "/api/placeholder/200/150"
  },
  {
    id: "2", 
    riskScore: 68,
    riskLevel: 'medium',
    detectedIssues: ["Mild inflammation detected in udder area"],
    recommendations: ["Apply topical treatment", "Monitor for 48 hours", "Reduce milking frequency temporarily"],
    confidence: 87,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    imageUrl: "/api/placeholder/200/150"
  },
  {
    id: "3",
    riskScore: 89,
    riskLevel: 'high',
    detectedIssues: ["Possible hoof rot detected", "Significant swelling observed"],
    recommendations: ["Contact veterinarian immediately", "Isolate animal", "Apply antibiotic treatment", "Provide dry, clean environment"],
    confidence: 94,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    imageUrl: "/api/placeholder/200/150"
  }
];

export default function DiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisResult[]>(mockResults);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Prefer rear camera on mobile
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
            handleFileSelect(file);
            stopCamera();
          }
        }, 'image/jpeg', 0.8);
      }
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock analysis result
    const riskScore = Math.floor(Math.random() * 100);
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    if (riskScore > 70) riskLevel = 'high';
    else if (riskScore > 40) riskLevel = 'medium';
    
    const mockResult: AnalysisResult = {
      id: Date.now().toString(),
      riskScore,
      riskLevel,
      detectedIssues: riskLevel === 'low' ? [] : 
        riskLevel === 'medium' ? ["Minor skin irritation detected"] :
        ["Significant inflammation", "Possible infection signs"],
      recommendations: riskLevel === 'low' ? 
        ["Animal appears healthy", "Continue regular monitoring"] :
        riskLevel === 'medium' ? 
        ["Monitor for 24-48 hours", "Apply topical treatment if symptoms persist"] :
        ["Contact veterinarian immediately", "Isolate animal", "Begin treatment protocol"],
      confidence: 85 + Math.random() * 10,
      timestamp: new Date(),
      imageUrl: previewUrl || ""
    };
    
    setAnalysisResult(mockResult);
    setAnalysisHistory(prev => [mockResult, ...prev]);
    setIsAnalyzing(false);
  };

  const getRiskColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'destructive';
      default: return 'secondary';
    }
  };

  const getRiskIcon = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low': return <CheckCircle className="h-4 w-4" />;
      case 'medium': return <Clock className="h-4 w-4" />;
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Disease Detection</h1>
          <p className="text-muted-foreground">
            AI-powered photo analysis for early disease detection and health monitoring
          </p>
        </div>
        <Badge variant="outline" className="text-sm w-fit">
          <Stethoscope className="w-4 h-4 mr-1" />
          AI Health Analysis
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Image Upload & Analysis */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Input */}
          <Card className="gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Camera className="h-5 w-5 text-primary" />
                Photo Capture & Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!previewUrl && !isCameraActive && (
                <div
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center transition-smooth hover:border-primary/50 hover:bg-secondary/20"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-lg font-medium text-foreground">Upload or capture photo</p>
                      <p className="text-sm text-muted-foreground">
                        Drag and drop an image, or use the buttons below
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="transition-smooth"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Photo
                      </Button>
                      
                      <Button
                        onClick={startCamera}
                        variant="outline"
                        className="transition-smooth"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Take Photo
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Camera View */}
              {isCameraActive && (
                <div className="space-y-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full rounded-lg shadow-medium"
                  />
                  <canvas ref={canvasRef} style={{ display: 'none' }} />
                  
                  <div className="flex gap-3 justify-center">
                    <HeroButton onClick={capturePhoto}>
                      <Camera className="w-4 h-4 mr-2" />
                      Capture Photo
                    </HeroButton>
                    
                    <Button onClick={stopCamera} variant="outline">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Image Preview */}
              {previewUrl && (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Selected cattle photo"
                      className="w-full h-64 object-cover rounded-lg shadow-medium"
                    />
                    <Button
                      onClick={clearImage}
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex gap-3">
                    <HeroButton
                      onClick={analyzeImage}
                      disabled={isAnalyzing}
                      className="flex-1"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Stethoscope className="w-4 h-4 mr-2" />
                          Analyze Health
                        </>
                      )}
                    </HeroButton>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysisResult && (
            <Card className="gradient-card shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Risk Score */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-3">
                    <div className="text-4xl font-bold" style={{
                      color: analysisResult.riskLevel === 'low' ? 'hsl(var(--success))' :
                             analysisResult.riskLevel === 'medium' ? 'hsl(var(--warning))' :
                             'hsl(var(--destructive))'
                    }}>
                      {analysisResult.riskScore}%
                    </div>
                    <Badge 
                      variant={getRiskColor(analysisResult.riskLevel) as any}
                      className="text-sm"
                    >
                      {getRiskIcon(analysisResult.riskLevel)}
                      {analysisResult.riskLevel.toUpperCase()} RISK
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Analysis confidence: {analysisResult.confidence.toFixed(0)}%
                  </p>
                </div>

                <Separator />

                {/* Detected Issues */}
                {analysisResult.detectedIssues.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      Detected Issues
                    </h4>
                    <div className="space-y-2">
                      {analysisResult.detectedIssues.map((issue, index) => (
                        <div
                          key={index}
                          className="p-3 bg-warning/10 text-warning-foreground rounded-lg border-l-2 border-warning text-sm"
                        >
                          {issue}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                <div>
                  <h4 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                    <Shield className="h-4 w-4 text-primary" />
                    Recommendations
                  </h4>
                  <div className="space-y-2">
                    {analysisResult.recommendations.map((recommendation, index) => (
                      <div
                        key={index}
                        className="p-3 bg-primary/10 text-primary-foreground rounded-lg border-l-2 border-primary text-sm"
                      >
                        {recommendation}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Analysis History */}
        <div>
          <Card className="gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Calendar className="h-5 w-5 text-primary" />
                Analysis History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysisHistory.map((result) => (
                  <div
                    key={result.id}
                    className="p-3 border border-border rounded-lg hover:bg-secondary/20 transition-smooth"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge 
                        variant={getRiskColor(result.riskLevel) as any}
                        className="text-xs"
                      >
                        {getRiskIcon(result.riskLevel)}
                        {result.riskScore}%
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {result.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                    
                    {result.detectedIssues.length > 0 && (
                      <div className="text-xs text-muted-foreground mb-2">
                        Issues: {result.detectedIssues.length}
                      </div>
                    )}
                    
                    <div className="text-xs text-foreground">
                      Confidence: {result.confidence.toFixed(0)}%
                    </div>
                  </div>
                ))}
                
                {analysisHistory.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    <Camera className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No analysis history yet</p>
                    <p className="text-xs">Upload photos to start tracking</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}