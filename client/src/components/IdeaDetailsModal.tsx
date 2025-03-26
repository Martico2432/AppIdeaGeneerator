import { Fragment } from "react";
import { AppIdea } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookmarkCheck, Bookmark, Copy, XCircle } from "lucide-react";

interface IdeaDetailsModalProps {
  idea: AppIdea;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onCopy: () => void;
  getComplexityText: (complexity: number) => string;
}

export default function IdeaDetailsModal({ 
  idea, 
  isOpen, 
  onClose, 
  onSave, 
  onCopy,
  getComplexityText
}: IdeaDetailsModalProps) {
  const copyFullDetails = () => {
    const featuresList = idea.features ? idea.features.map(feature => `• ${feature}`).join('\n') : '';
    const technicalList = idea.technicalConsiderations ? idea.technicalConsiderations.map(tech => `• ${tech}`).join('\n') : '';
    
    const fullText = `
App Idea: ${idea.title}
Category: ${idea.category}
Complexity: ${getComplexityText(idea.complexity)}
Tech Stack: ${idea.techStack.join(', ')}
Target Audience: ${idea.audience}

Description:
${idea.description}

Key Features:
${featuresList}

Technical Considerations:
${technicalList}

Tags: ${idea.tags ? idea.tags.map(tag => `#${tag}`).join(' ') : ''}
    `.trim();
    
    navigator.clipboard.writeText(fullText);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] flex flex-col">
        <DialogHeader className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <DialogTitle className="text-lg font-semibold text-gray-900">Idea Details</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XCircle className="h-5 w-5" />
          </Button>
        </DialogHeader>
        
        <div className="px-6 py-4 overflow-y-auto">
          <div className="mb-4">
            <h4 className="text-xl font-bold text-gray-900 mb-2">{idea.title}</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary-800 rounded-full text-xs font-medium flex items-center">
                <span className="material-icons text-xs mr-1">category</span>
                {idea.category}
              </Badge>
              <Badge variant="outline" className="bg-gray-100 text-gray-800 rounded-full text-xs font-medium flex items-center">
                <span className="material-icons text-xs mr-1">star</span>
                {getComplexityText(idea.complexity)} Complexity
              </Badge>
            </div>
          </div>
          
          <div className="mb-4">
            <h5 className="font-medium text-gray-900 mb-2">Description</h5>
            <p className="text-gray-700">{idea.description}</p>
          </div>
          
          {idea.features && idea.features.length > 0 && (
            <div className="mb-4">
              <h5 className="font-medium text-gray-900 mb-2">Key Features</h5>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                {idea.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          {idea.technicalConsiderations && idea.technicalConsiderations.length > 0 && (
            <div className="mb-4">
              <h5 className="font-medium text-gray-900 mb-2">Technical Considerations</h5>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                {idea.technicalConsiderations.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mb-4">
            <h5 className="font-medium text-gray-900 mb-2">Target Audience</h5>
            <p className="text-gray-700">{idea.audience}</p>
          </div>
          
          {idea.tags && idea.tags.length > 0 && (
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Tags</h5>
              <div className="flex flex-wrap gap-2">
                {idea.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="px-6 py-4 border-t border-gray-200 flex justify-between">
          <Button variant="ghost" onClick={copyFullDetails} className="text-gray-700 hover:text-gray-900 text-sm font-medium">
            <Copy className="h-4 w-4 mr-1" />
            Copy All
          </Button>
          <Button 
            onClick={onSave} 
            className={`flex items-center ${idea.saved ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-primary/90'} text-white px-4 py-2 rounded-md text-sm font-medium`}
          >
            {idea.saved ? (
              <Fragment>
                <BookmarkCheck className="h-4 w-4 mr-1" />
                Saved
              </Fragment>
            ) : (
              <Fragment>
                <Bookmark className="h-4 w-4 mr-1" />
                Save Idea
              </Fragment>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
