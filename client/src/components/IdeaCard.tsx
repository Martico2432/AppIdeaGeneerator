import { AppIdea } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck, Copy, ArrowRight, Star } from "lucide-react";

interface IdeaCardProps {
  idea: AppIdea;
  onSave: () => void;
  onCopy: () => void;
  onDetails: () => void;
  getComplexityText: (complexity: number) => string;
}

export default function IdeaCard({ idea, onSave, onCopy, onDetails, getComplexityText }: IdeaCardProps) {
  return (
    <Card className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-200">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg text-gray-900">{idea.title}</h3>
          <div className="flex items-center bg-primary/10 text-primary-700 px-2 py-1 rounded text-xs font-medium">
            <Star className="w-3.5 h-3.5 mr-1" />
            {getComplexityText(idea.complexity)}
          </div>
        </div>

        <div className="text-sm text-gray-500 mb-2">
          <span className="inline-flex items-center mr-3">
            <span className="material-icons text-xs mr-1">category</span>
            {idea.category}
          </span>
          <span className="inline-flex items-center">
            <span className="material-icons text-xs mr-1">memory</span>
            {idea.techStack.join(' / ')}
          </span>
        </div>

        <p className="text-gray-700 mb-4 line-clamp-3">
          {idea.description}
        </p>

        <div className="border-t border-gray-100 pt-4 mt-2">
          <div className="flex flex-wrap gap-2 mb-4">
            {idea.tags && idea.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                #{tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onSave}
                className="p-1.5 rounded hover:bg-gray-100"
                aria-label={idea.saved ? "Idea saved" : "Save idea"}
              >
                {idea.saved ? 
                  <BookmarkCheck className="h-5 w-5 text-primary-500" /> : 
                  <Bookmark className="h-5 w-5 text-gray-500" />
                }
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onCopy}
                className="p-1.5 rounded hover:bg-gray-100 text-gray-500" 
                aria-label="Copy idea to clipboard"
              >
                <Copy className="h-5 w-5" />
              </Button>
            </div>

            <Button 
              variant="link" 
              onClick={onDetails} 
              className="inline-flex items-center text-primary hover:text-primary/90 text-sm font-medium p-0"
            >
              Details
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
