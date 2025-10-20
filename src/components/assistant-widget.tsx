'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { Bot, Send } from 'lucide-react';
import { askAssistant } from '@/ai/flows/assistant-flow';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await askAssistant({ query: currentInput, history: messages });
      const assistantMessage: Message = { role: 'assistant', content: response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling assistant flow:', error);
       const errorMessage: Message = { role: 'assistant', content: "Désolé, une erreur s'est produite. Veuillez réessayer." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Ouvrir l'assistant IA"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Assistant IA</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1 my-4 pr-4">
            <div className="space-y-4">
            {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                    className={`max-w-xs rounded-lg px-4 py-2 ${
                    message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                    }`}
                >
                    <p className="text-sm">{message.content}</p>
                </div>
                </div>
            ))}
            {isLoading && (
                 <div className="flex justify-start">
                     <div className="max-w-xs rounded-lg px-4 py-2 bg-secondary">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse"></div>
                            <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse [animation-delay:0.2s]"></div>
                            <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse [animation-delay:0.4s]"></div>
                        </div>
                     </div>
                 </div>
            )}
            </div>
        </ScrollArea>
        <SheetFooter>
            <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                <Input
                    type="text"
                    placeholder="Posez une question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    className="flex-1"
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                </Button>
            </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
