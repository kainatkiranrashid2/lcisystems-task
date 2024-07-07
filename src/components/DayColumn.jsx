import PropTypes from "prop-types";
import TaskCard from "./TaskCard";

const DayColumn = ({ day, date, tasks, isCurrentDay, isWeekend, maxTasks }) => {
  return (
    <div
      className={`day-column ${isWeekend ? "weekend" : ""} ${
        isCurrentDay ? "current-day" : "not-current-day"
      }`}>
      <div className="text-center py-2 text-[9px] sm:text-[11px] md:text-[13px] lg:text-[15px] font-bold">
        {day}
      </div>
      <div
        className={`task-date ${
          isCurrentDay ? "current-day-p" : "not-current-day-p"
        }`}>
        <p className="m-0 text-[8px] sm:text-[9px] md:text-[10px] lg:text-[12px]  pb-2">
          {date}
        </p>
      </div>
      <div className="tasks-container">
        {Array.from({ length: maxTasks }).map((_, index) => (
          <div
            key={index}
            className=" flex-1 border-b-2 border-gray-400 border-solid	">
            {tasks[index] ? (
              <TaskCard task={tasks[index]} />
            ) : (
              <div className="empty-task"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

DayColumn.propTypes = {
  day: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  isCurrentDay: PropTypes.bool.isRequired,
  isWeekend: PropTypes.bool.isRequired,
  maxTasks: PropTypes.number.isRequired,
};

export default DayColumn;
