
import React, { useState } from "react";
import { Check, Clock, X, SkipForward, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { StepStatus, PlanStepType } from "./types";

interface PlanStepProps {
  step: PlanStepType;
  depth: number;
}

const PlanStep: React.FC<PlanStepProps> = ({ step, depth }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  // Calculate padding and border styling based on depth
  const paddingLeft = `${depth * 2 + 0.75}rem`;

  const statusIcon = () => {
    switch (step.status) {
      case StepStatus.Completed:
        return <Check size={14} className="status-icon status-completed" />;
      case StepStatus.Failed:
        return <X size={14} className="status-icon status-failed" />;
      case StepStatus.InProgress:
        return <LoaderCircle size={14} className="status-icon status-running animate-spin" />;
      case StepStatus.Skipped:
        return <SkipForward size={14} className="status-icon status-skipped" />;
      default:
        return <Clock size={14} className="status-icon status-pending" />;
    }
  };

  const handleToggle = () => {
    if (step.children && step.children.length > 0) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    // In a real implementation, we would update the status based on the checked state
    // and also update children's status if appropriate
  };

  return (
    <div className="step-container">
      <div
        className={cn(
          "step-item group flex items-center py-1.5 px-3 rounded-md transition-colors",
          step.status === StepStatus.InProgress && "is-current"
        )}
        style={{ paddingLeft }}
      >
        <div className="flex items-center">
          <div className="checkbox-container mr-2">
            <input
              type="checkbox"
              checked={isChecked || step.status === StepStatus.Completed}
              onChange={handleCheck}
              className="step-checkbox sr-only"
              id={`step-${step.id}`}
            />
            <label 
              htmlFor={`step-${step.id}`} 
              className={cn(
                "flex items-center justify-center w-4 h-4 border rounded transition-all",
                step.status === StepStatus.Completed ? "checkbox-checked" : "checkbox-unchecked"
              )}
            >
              {step.status === StepStatus.Completed && <Check size={10} className="checkbox-mark" />}
            </label>
          </div>
          
          {statusIcon()}

          <span 
            className={cn(
              "step-title ml-2 truncate", 
              step.isParent && "font-medium",
              step.status === StepStatus.InProgress && "step-current-title",
              step.status === StepStatus.Completed && "step-completed-title",
              step.status === StepStatus.Failed && "step-failed-title",
              step.status === StepStatus.Skipped && "step-skipped-title"
            )}
          >
            {step.title}
          </span>

          {step.children && step.children.length > 0 && (
            <button 
              className="expand-toggle ml-auto text-blue-300 hover:text-blue-100"
              onClick={handleToggle}
            >
              {isExpanded ? "−" : "+"}
            </button>
          )}
        </div>
      </div>
      
      {step.children && step.children.length > 0 && isExpanded && (
        <div className="step-children pl-1 relative">
          <div className="hierarchy-line"></div>
          {step.children.map((child) => (
            <PlanStep key={child.id} step={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlanStep;
