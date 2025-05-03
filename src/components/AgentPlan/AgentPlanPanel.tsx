
import React, { useState } from "react";
import { Check, Clock, X, SkipForward, Play, Code, RotateCcw, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import PlanStep from "./PlanStep";
import { StepStatus, PlanStepType } from "./types";

const AgentPlanPanel: React.FC = () => {
  // Example plan data
  const [goal] = useState("Build CIFAR-10 Image Classifier");
  const [steps, setSteps] = useState<PlanStepType[]>([
    {
      id: "1",
      title: "Data Preparation",
      status: StepStatus.InProgress,
      isParent: true,
      children: [
        { id: "1.1", title: "Download CIFAR-10 Dataset", status: StepStatus.Pending, isParent: false },
        { id: "1.2", title: "Define Transforms (Normalize, ToTensor)", status: StepStatus.Completed, isParent: false },
        { id: "1.3", title: "Create DataLoader (Batch Size: 64)", status: StepStatus.Completed, isParent: false },
      ],
    },
    {
      id: "2",
      title: "Model Definition",
      status: StepStatus.Completed,
      isParent: true,
      children: [
        { id: "2.1", title: "Define CNN Architecture (Conv -> ReLU -> Pool ...)", status: StepStatus.Completed, isParent: false },
        { id: "2.2", title: "Initialize Model Weights", status: StepStatus.Completed, isParent: false },
      ],
    },
    {
      id: "3",
      title: "Training Phase",
      status: StepStatus.InProgress,
      isParent: true,
      children: [
        { id: "3.1", title: "Setup Optimizer (Adam, LR=0.001)", status: StepStatus.Completed, isParent: false },
        { id: "3.2", title: "Setup Loss Function (CrossEntropyLoss)", status: StepStatus.Completed, isParent: false },
        { 
          id: "3.3", 
          title: "Run Training Loop (Epoch 5/20)", 
          status: StepStatus.InProgress, 
          isParent: true,
          children: [
            { id: "3.3.1", title: "Forward Pass", status: StepStatus.InProgress, isParent: false },
            { id: "3.3.2", title: "Calculate Loss", status: StepStatus.InProgress, isParent: false },
            { id: "3.3.3", title: "Backward Pass", status: StepStatus.InProgress, isParent: false },
            { id: "3.3.4", title: "Optimizer Step", status: StepStatus.InProgress, isParent: false },
          ]
        },
        { id: "3.4", title: "Evaluate on Validation Set", status: StepStatus.Pending, isParent: false },
        { id: "3.5", title: "Save Checkpoint", status: StepStatus.Pending, isParent: false },
      ],
    },
    {
      id: "4",
      title: "Evaluation",
      status: StepStatus.Pending,
      isParent: true,
      children: [
        { id: "4.1", title: "Load Best Checkpoint", status: StepStatus.Pending, isParent: false },
        { id: "4.2", title: "Run Inference on Test Set", status: StepStatus.Pending, isParent: false },
        { id: "4.3", title: "Calculate Final Metrics", status: StepStatus.Pending, isParent: false },
      ],
    },
  ]);

  const handleRunPlan = () => {
    console.log("Run plan clicked");
    // Implementation would go here
  };

  const handleGenerateCode = () => {
    console.log("Generate code clicked");
    // Implementation would go here
  };

  const handleReset = () => {
    console.log("Reset clicked");
    // Implementation would go here
  };

  return (
    <div className="agent-plan-panel flex flex-col h-full w-full rounded-lg border border-blue-900/50 bg-dark-blue text-white">
      {/* Panel Header */}
      <div className="plan-header border-b border-blue-900/50 p-4">
        <h2 className="text-xl font-semibold mb-1">Agent Plan</h2>
        <div className="goal-display mt-1">
          <span className="text-muted-text">Goal: </span>
          <span className="goal-text">{goal}</span>
        </div>
      </div>

      {/* Plan Hierarchy */}
      <div className="plan-content flex-1 p-4 overflow-y-auto">
        {steps.map((step) => (
          <PlanStep key={step.id} step={step} depth={0} />
        ))}
      </div>

      {/* Control Buttons */}
      <div className="plan-controls border-t border-blue-900/50 p-4 flex justify-between">
        <div className="flex gap-4">
          <button
            onClick={handleRunPlan}
            className="run-plan-btn flex items-center gap-2 px-4 py-2 rounded"
          >
            <Play size={16} />
            <span>Run Plan</span>
          </button>
          <button
            onClick={handleGenerateCode}
            className="generate-code-btn flex items-center gap-2 px-4 py-2 rounded"
          >
            <Code size={16} />
            <span>Generate Code</span>
          </button>
        </div>
        <button
          onClick={handleReset}
          className="reset-btn flex items-center gap-2 px-4 py-2 rounded"
        >
          <RotateCcw size={16} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};

export default AgentPlanPanel;
