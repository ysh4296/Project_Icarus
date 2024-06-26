export type EventName = "Mouse" | "Joint";

export type MouseType = "NONE" | "DRAG" | "JOINT";

export type JointType = "NONE" | "FORCE" | "SPRING" | "REVERSE" | "FIXED";

export type EventType = MouseType | JointType;

export const getEventLabel = (eventType?: EventType) => {
  switch (eventType) {
    case "NONE":
      return "none";
    case "DRAG":
      return "drag";
    case "JOINT":
      return "joint";
    case "FORCE":
      return "force";
    case "SPRING":
      return "spring";
    case "REVERSE":
      return "reverse";
    case "FIXED":
      return "fixed";
    default:
      return "no data";
  }
};

export const getEventList = (eventName?: EventName): EventType[] => {
  switch (eventName) {
    case "Mouse":
      return ["NONE", "DRAG", "JOINT"];
    case "Joint":
      return ["NONE", "FORCE", "SPRING", "REVERSE", "FIXED"];
    default:
      return [];
  }
};
