import PropTypes from "prop-types";
import TaskCard from "./TaskCard";

const DayColumn = ({ day, date, tasks, isCurrentDay }) => {
  console.log(date);
  return (
    <div
      className={`day-column ${
        isCurrentDay ? "current-day" : "not-current-day"
      }`}>
      <div className="day-header">
        <h3>{day}</h3>
      </div>
      <div
        className={`task-date ${
          isCurrentDay ? "current-day-p" : "not-current-day-p"
        }`}>
        <p className="task-date-p">{date}</p>
      </div>
      <div className="tasks-container">
        {tasks.map((task, index) =>
          task ? (
            <TaskCard key={task.cw_route_name} task={task} />
          ) : (
            <div key={index} className="task-placeholder"></div>
          )
        )}
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
};

export default DayColumn;
