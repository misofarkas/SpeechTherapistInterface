import { TaskType } from "../types/enums";

// Converts task type enum values to their respective display name
export function taskTypeName({ taskType }: { taskType: TaskType }) {
  switch (taskType) {
    case TaskType.ConnectPairsTextImage:
      return "Connect Pairs (text-image)";
    case TaskType.ConnectPairsTextText:
      return "Connect Pairs (text-text)";
    case TaskType.FourChoicesImage:
      return "Four Choices Texts";
    case TaskType.FourChoicesText:
      return "Four Choices Images";
    default:
      return "Unknown type";
  }
}


