import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Lightbulb, Heart, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const quickReplies = [
  { icon: "🥛", text: "Milk Yield Tips", action: "milk-tips" },
  { icon: "🏥", text: "Common Diseases", action: "diseases" },
  { icon: "📅", text: "Daily Schedule", action: "schedule" },
  { icon: "🌱", text: "Feed Optimization", action: "feed" },
];

const botResponses: Record<string, string> = {
  "milk-tips": "🥛 To optimize milk yield:\n• Ensure 3-4 balanced meals daily\n• Provide 30-50 liters of clean water\n• Maintain stress-free environment\n• Regular milking schedule (2-3 times daily)\n• Monitor body condition score",
  "diseases": "🏥 Watch for these common signs:\n• Mastitis: Swollen udder, abnormal milk\n• Foot rot: Limping, swollen hooves\n• Bloat: Swollen left flank\n• Ketosis: Sweet breath, reduced appetite\n• Always consult a veterinarian for diagnosis",
  "schedule": "📅 Daily cattle care routine:\n• 6 AM: First milking, fresh feed\n• 9 AM: Grazing/exercise\n• 12 PM: Water check, shade access\n• 4 PM: Second milking, evening feed\n• 7 PM: Final health check\n• Night: Secure shelter",
  "feed": "🌱 Feed optimization tips:\n• 60% roughage, 40% concentrate\n• Add minerals & vitamins\n• Fresh green fodder daily\n• Monitor feed intake\n• Adjust based on milk production stage",
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! 👋 I'm your AI cattle care assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleQuickReply = (action: string) => {
    const reply = quickReplies.find(r => r.action === action);
    if (reply) {
      handleSendMessage(reply.text);
    }
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const action = quickReplies.find(r => r.text === messageText)?.action;
      let botResponse = "Thank you for your question! I'm still learning about cattle care. For specific health concerns, please consult your veterinarian.";
      
      if (action && botResponses[action]) {
        botResponse = botResponses[action];
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        size="icon"
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-strong gradient-primary transition-spring hover:scale-105 z-50 ${
          isOpen ? "hidden" : "flex"
        }`}
      >
        <MessageCircle className="h-6 w-6 text-primary-foreground" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-strong border-border z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gradient-primary text-primary-foreground">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-xl">🤖</span>
              Cattle Care Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-primary-foreground hover:bg-primary-glow/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm transition-smooth ${
                      message.isBot
                        ? "bg-secondary text-secondary-foreground"
                        : "gradient-primary text-primary-foreground"
                    }`}
                  >
                    {message.text.split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Replies */}
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-1">
                {quickReplies.map((reply) => (
                  <Badge
                    key={reply.action}
                    variant="outline"
                    className="cursor-pointer transition-smooth hover:bg-primary hover:text-primary-foreground text-xs py-1"
                    onClick={() => handleQuickReply(reply.action)}
                  >
                    {reply.icon} {reply.text}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about cattle care..."
                  className="flex-1 text-sm"
                />
                <Button
                  size="icon"
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className="h-10 w-10 gradient-primary"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}