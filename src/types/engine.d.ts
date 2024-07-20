type EventName = 'MOUSE' | 'JOINT' | 'CREATE';

type MouseType = 'NONE' | 'DRAG' | 'JOINT' | 'CREATE' | 'EDIT';

type JointType = 'NONE' | 'FORCE' | 'SPRING' | 'REVERSE' | 'FIXED' | 'HINGE';

type CreateType =
  | 'NONE'
  | 'RECTANGLE'
  | 'CIRCLE'
  | 'WATERBLOCK'
  | 'BACONBLOCK'
  | 'BREADBLOCK'
  | 'ESCALATOR'
  | 'GRILL';

type EventType = MouseType | JointType | createType;

type CameraType = {
  x: number;
  y: number;
  scale: number;
};

type registryType = {
  createdId: number;
  selectedObjectId: number;
  engine: Engine | null;
  mouseEventType: MouseType;
  jointEventType: JointType;
  createEventType: CreateType;
  animationOffset: number;
};
