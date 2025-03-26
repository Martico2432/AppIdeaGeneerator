import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] flex flex-col">
        <DialogHeader className="px-6 py-4 border-b border-gray-200">
          <DialogTitle className="text-lg font-semibold text-gray-900">How to Use This Tool</DialogTitle>
        </DialogHeader>
        
        <div className="px-6 py-4 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Generating Ideas</h4>
              <p className="text-gray-700 text-sm">
                Use the filters on the left to set parameters for your app ideas. Click "Generate New Idea" to create ideas based on your selections.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Complexity Levels</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="material-icons text-primary-500 mr-2 text-sm">star_outline</span>
                  <span><strong>Simple:</strong> Basic functionality, suitable for beginner developers</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-primary-500 mr-2 text-sm">star</span>
                  <span><strong>Moderate:</strong> Intermediate complexity with some advanced features</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-primary-500 mr-2 text-sm">stars</span>
                  <span><strong>Complex:</strong> Advanced functionality requiring significant development expertise</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Saving Ideas</h4>
              <p className="text-gray-700 text-sm">
                Click the bookmark icon on any idea card to save it to your collection. Saved ideas will be stored locally in your browser.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Sharing Ideas</h4>
              <p className="text-gray-700 text-sm">
                Use the copy button to copy an idea to your clipboard. You can then paste it into any document or messaging app.
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="px-6 py-4 border-t border-gray-200">
          <Button 
            onClick={onClose} 
            className="w-full inline-flex justify-center items-center bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
