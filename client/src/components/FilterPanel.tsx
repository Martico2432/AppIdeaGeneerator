import { useState } from "react";
import { GenerationParams } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronUp, Sparkles, RotateCcw } from "lucide-react";

interface FilterPanelProps {
  params: GenerationParams;
  setParams: (params: GenerationParams) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export default function FilterPanel({ params, setParams, onGenerate, isGenerating }: FilterPanelProps) {
  const [collapsed, setCollapsed] = useState(false);
  
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "productivity", label: "Productivity" },
    { value: "social", label: "Social Media" },
    { value: "entertainment", label: "Entertainment" },
    { value: "education", label: "Education" },
    { value: "health", label: "Health & Wellness" },
    { value: "finance", label: "Finance" },
    { value: "utility", label: "Utility" }
  ];
  
  const technologies = [
    { id: "tech-ai", value: "ai", label: "Artificial Intelligence" },
    { id: "tech-ar", value: "ar", label: "AR/VR" },
    { id: "tech-mobile", value: "mobile", label: "Mobile" },
    { id: "tech-web", value: "web", label: "Web" },
    { id: "tech-iot", value: "iot", label: "IoT" }
  ];
  
  const audiences = [
    { value: "general", label: "General Users" },
    { value: "business", label: "Business" },
    { value: "developers", label: "Developers" },
    { value: "creative", label: "Creative Professionals" },
    { value: "education", label: "Education" },
    { value: "children", label: "Children" }
  ];
  
  const handleTechSelection = (tech: string, isChecked: boolean) => {
    if (isChecked) {
      setParams({
        ...params,
        techFocus: [...params.techFocus, tech]
      });
    } else {
      setParams({
        ...params,
        techFocus: params.techFocus.filter(t => t !== tech)
      });
    }
  };
  
  const handleReset = () => {
    setParams({
      complexity: 3,
      category: "all",
      techFocus: ["web"],
      audience: "general"
    });
  };
  
  return (
    <div className="md:w-80 shrink-0">
      <div className="bg-white rounded-lg shadow p-4 sticky top-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Idea Parameters</h2>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden p-1 rounded hover:bg-gray-100"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
          </Button>
        </div>
        
        <div className={collapsed ? "hidden md:block" : ""}>
          {/* Complexity Slider */}
          <div className="mb-6">
            <Label htmlFor="complexity" className="block text-sm font-medium text-gray-700 mb-1">
              Complexity
            </Label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Simple</span>
              <Slider
                id="complexity"
                min={1}
                max={5}
                step={1}
                value={[params.complexity]}
                onValueChange={(value) => setParams({ ...params, complexity: value[0] })}
                className="w-full"
              />
              <span className="text-xs text-gray-500">Complex</span>
            </div>
          </div>
          
          {/* Category Selector */}
          <div className="mb-6">
            <Label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </Label>
            <Select
              value={params.category}
              onValueChange={(value) => setParams({ ...params, category: value })}
            >
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Technology Focus */}
          <div className="mb-6">
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Technology Focus
            </Label>
            <div className="space-y-2">
              {technologies.map((tech) => (
                <div key={tech.id} className="flex items-center">
                  <Checkbox
                    id={tech.id}
                    checked={params.techFocus.includes(tech.value)}
                    onCheckedChange={(checked) => 
                      handleTechSelection(tech.value, checked as boolean)
                    }
                    className="h-4 w-4"
                  />
                  <label
                    htmlFor={tech.id}
                    className="ml-2 block text-sm text-gray-700"
                  >
                    {tech.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Audience Selector */}
          <div className="mb-6">
            <Label htmlFor="audience" className="block text-sm font-medium text-gray-700 mb-1">
              Target Audience
            </Label>
            <Select
              value={params.audience}
              onValueChange={(value) => setParams({ ...params, audience: value })}
            >
              <SelectTrigger id="audience" className="w-full">
                <SelectValue placeholder="Select audience" />
              </SelectTrigger>
              <SelectContent>
                {audiences.map((audience) => (
                  <SelectItem key={audience.value} value={audience.value}>
                    {audience.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Generate Controls */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={onGenerate}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition flex items-center justify-center"
              disabled={isGenerating}
            >
              <Sparkles className="h-4 w-4 mr-1" />
              {isGenerating ? "Generating..." : "Generate New Idea"}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleReset}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md border border-gray-300 transition"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
