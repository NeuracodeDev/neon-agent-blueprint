
export enum StepStatus {
  Pending = "pending",
  InProgress = "in-progress",
  Completed = "completed",
  Failed = "failed",
  Skipped = "skipped"
}

export interface PlanStepType {
  id: string;
  title: string;
  status: StepStatus;
  isParent: boolean;
  children?: PlanStepType[];
}
