import { useState } from "react";
import {
  getEventLabel,
  getEventList,
} from "../engine/utils/eventLabelConverter";

type EventSelectProps = {
  eventName: EventName;
  setEventType: (eventType: EventType) => void;
};

const EventSelect = (props: EventSelectProps) => {
  const { eventName, setEventType } = props;

  const [label, setLabel] = useState<EventType>("NONE");

  return (
    <>
      <p>{eventName}</p>
      {getEventLabel(label)}
      {getEventList(eventName).map((event) => (
        <button
          key={`${label} ${event}`}
          onClick={() => {
            setLabel(event);
            setEventType(event);
          }}
        >
          {getEventLabel(event)}
        </button>
      ))}
    </>
  );
};

export default EventSelect;
