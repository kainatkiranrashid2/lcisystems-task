import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const TaskCard = ({ task }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const cardRef = useRef(null);
  const tooltipRef = useRef(null);

  const tooltipContent = `
    Day: ${task.day}
    Route Name: ${task.cw_route_name}
    Rooms: ${task.rooms}
    Schedule: ${task.friendlySchedule}
    Specialties: ${task.specialties}
    Cleaning Time: ${task.cleaning_Time_Min} minutes
    Actual Time: ${task.actualTimeMin || "N/A"}
    Work Records: ${task.nbrWorkRecords}
    Future: ${task.future === "1" ? "Yes" : "No"}
    Color: ${task.color}
    Row Number: ${task.rowNumber}
  `;

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (tooltipRef.current && cardRef.current) {
        const cardRect = cardRef.current.getBoundingClientRect();
        tooltipRef.current.style.left = `${e.clientX - cardRect.left}px`;
        tooltipRef.current.style.top = `${e.clientY - cardRect.top - 10}px`;
      }
    };

    if (showTooltip) {
      document.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [showTooltip]);

  return (
    <div className="task-card-parent" ref={cardRef}>
      <div
        className={`task-card ${task.future === "1" ? "future" : ""}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}>
        <div className="task-content">
          <h4 className="text-[10px]">{task.cw_route_name}</h4>
          <p className="text-[10px]">
            {Math.floor(task.cleaning_Time_Min / 60)}h{" "}
            {Math.round(task.cleaning_Time_Min % 60)}m
          </p>
        </div>
        {task.specialties && <div className="specialty-indicator"></div>}
      </div>
      {showTooltip && (
        <div className="custom-tooltip" ref={tooltipRef}>
          <pre>{tooltipContent}</pre>
        </div>
      )}
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    d: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    cw_route_name: PropTypes.string.isRequired,
    rooms: PropTypes.string.isRequired,
    friendlySchedule: PropTypes.string.isRequired,
    specialties: PropTypes.string.isRequired,
    cleaning_Time_Min: PropTypes.number.isRequired,
    actualTimeMin: PropTypes.any,
    nbrWorkRecords: PropTypes.number.isRequired,
    future: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    rowNumber: PropTypes.number.isRequired,
  }).isRequired,
};

export default TaskCard;
