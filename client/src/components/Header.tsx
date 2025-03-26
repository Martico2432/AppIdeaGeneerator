import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

interface HeaderProps {
  onHelpClick: () => void;
}

export default function Header({ onHelpClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-primary-600 flex items-center">
          <span className="material-icons mr-2 text-2xl">lightbulb</span>
          AI App Idea Generator
        </h1>
        <div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onHelpClick} 
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500" 
            aria-label="Help"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
