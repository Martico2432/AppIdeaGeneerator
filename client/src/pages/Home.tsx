import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { GenerationParams, AppIdea, type InsertAppIdea } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { generateIdea } from "@/lib/ideaGeneratorUtils";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilterPanel from "@/components/FilterPanel";
import IdeaCard from "@/components/IdeaCard";
import HelpModal from "@/components/HelpModal";
import IdeaDetailsModal from "@/components/IdeaDetailsModal";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronDown, Grid, List } from "lucide-react";

interface HomeProps {
  savedIdeas: AppIdea[];
  setSavedIdeas: (ideas: AppIdea[]) => void;
}

export default function Home({ savedIdeas, setSavedIdeas }: HomeProps) {
  const { toast } = useToast();
  
  // States
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<AppIdea | null>(null);
  const [generationParams, setGenerationParams] = useState<GenerationParams>({
    complexity: 3,
    category: "all",
    techFocus: ["web"],
    audience: "general"
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  
  // Queries
  const { data: ideas = [], isLoading } = useQuery({
    queryKey: ['/api/ideas'],
    refetchOnWindowFocus: false
  });
  
  // Create idea mutation
  const createIdeaMutation = useMutation({
    mutationFn: async (newIdea: InsertAppIdea) => {
      const response = await apiRequest('POST', '/api/ideas', newIdea);
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/ideas'] });
      toast({
        title: "Idea generated!",
        description: "Your new app idea has been created."
      });
    }
  });
  
  // Update idea mutation
  const updateIdeaMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number, updates: Partial<AppIdea> }) => {
      const response = await apiRequest('PATCH', `/api/ideas/${id}`, updates);
      const data = await response.json();
      return data;
    },
    onSuccess: (updatedIdea) => {
      queryClient.invalidateQueries({ queryKey: ['/api/ideas'] });
      
      // Update local savedIdeas state
      if (updatedIdea.saved) {
        setSavedIdeas([...savedIdeas.filter(i => i.id !== updatedIdea.id), updatedIdea]);
      } else {
        setSavedIdeas(savedIdeas.filter(i => i.id !== updatedIdea.id));
      }
      
      toast({
        title: updatedIdea.saved ? "Idea saved!" : "Idea unsaved",
        description: updatedIdea.saved ? "This idea has been added to your saved collection." : "This idea has been removed from your saved collection."
      });
    }
  });
  
  // Handle generating new idea
  const handleGenerateIdea = () => {
    const newIdea = generateIdea(generationParams);
    
    createIdeaMutation.mutate({
      ...newIdea,
      createdAt: new Date().toISOString()
    });
  };
  
  // Handle saving/unsaving idea
  const handleToggleSave = (idea: AppIdea) => {
    updateIdeaMutation.mutate({
      id: idea.id,
      updates: { saved: !idea.saved }
    });
  };
  
  // Handle copying idea to clipboard
  const handleCopyIdea = (idea: AppIdea) => {
    const ideaText = `App Idea: ${idea.title}\nCategory: ${idea.category}\nComplexity: ${getComplexityText(idea.complexity)}\nDescription: ${idea.description}`;
    navigator.clipboard.writeText(ideaText);
    
    toast({
      title: "Copied to clipboard",
      description: "Idea details have been copied to your clipboard."
    });
  };
  
  // Get complexity text from number
  const getComplexityText = (complexity: number): string => {
    switch (complexity) {
      case 1: return "Simple";
      case 2: return "Basic";
      case 3: return "Moderate";
      case 4: return "Challenging";
      case 5: return "Complex";
      default: return "Moderate";
    }
  };
  
  // Filter and sort ideas
  const filteredAndSortedIdeas = [...ideas].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortOrder === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortOrder === "complexity") {
      return b.complexity - a.complexity;
    }
    return 0;
  });
  
  // Paginate ideas
  const paginatedIdeas = filteredAndSortedIdeas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredAndSortedIdeas.length / itemsPerPage);
  
  // Generate pagination numbers
  const paginationNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationNumbers.push(i);
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header onHelpClick={() => setShowHelpModal(true)} />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row gap-6">
        <FilterPanel 
          params={generationParams}
          setParams={setGenerationParams}
          onGenerate={handleGenerateIdea}
          isGenerating={createIdeaMutation.isPending}
        />
        
        <div className="flex-grow">
          {/* Ideas Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <h2 className="text-xl font-bold">Generated Ideas</h2>
            
            <div className="flex items-center gap-2">
              <div className="relative inline-block">
                <Select 
                  value={sortOrder} 
                  onValueChange={(value) => setSortOrder(value)}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="complexity">By Complexity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
              >
                {viewMode === "grid" ? <List /> : <Grid />}
              </Button>
            </div>
          </div>
          
          {/* Ideas Grid/List */}
          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 h-64 animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-20 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : paginatedIdeas.length > 0 ? (
            <div 
              className={`grid grid-cols-1 ${viewMode === "grid" ? "lg:grid-cols-2" : "lg:grid-cols-1"} gap-5`}
            >
              {paginatedIdeas.map((idea) => (
                <IdeaCard 
                  key={idea.id}
                  idea={idea}
                  onSave={() => handleToggleSave(idea)}
                  onCopy={() => handleCopyIdea(idea)}
                  onDetails={() => setSelectedIdea(idea)}
                  getComplexityText={getComplexityText}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
              <div className="flex flex-col items-center justify-center">
                <span className="material-icons text-5xl text-gray-400 mb-3">lightbulb</span>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No ideas generated yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Set your parameters and click the generate button to create app ideas.
                </p>
                <Button 
                  onClick={handleGenerateIdea} 
                  className="mt-6 inline-flex items-center"
                  disabled={createIdeaMutation.isPending}
                >
                  <span className="material-icons text-sm mr-2">auto_awesome</span>
                  Generate First Idea
                </Button>
              </div>
            </div>
          )}
          
          {/* Pagination */}
          {filteredAndSortedIdeas.length > itemsPerPage && (
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {paginationNumbers.map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === currentPage}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </main>
      
      <Footer />
      
      {/* Mobile Generate Button */}
      <Button 
        onClick={handleGenerateIdea} 
        className="md:hidden fixed right-6 bottom-6 bg-primary hover:bg-primary/90 text-white p-4 rounded-full shadow-lg"
        size="icon"
        disabled={createIdeaMutation.isPending}
      >
        <span className="material-icons">auto_awesome</span>
      </Button>
      
      {/* Modals */}
      <HelpModal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />
      
      {selectedIdea && (
        <IdeaDetailsModal
          idea={selectedIdea}
          isOpen={!!selectedIdea}
          onClose={() => setSelectedIdea(null)}
          onSave={() => handleToggleSave(selectedIdea)}
          onCopy={() => handleCopyIdea(selectedIdea)}
          getComplexityText={getComplexityText}
        />
      )}
    </div>
  );
}
