import { useState } from "react";
import PropTypes from "prop-types";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns";

const Calendar = ({ periodicTasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  console.log(periodicTasks);
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const dateRange = eachDayOfInterval({ start: monthStart, end: monthEnd });
  console.log(dateRange);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const renderHeader = () => (
    <div className="header">
      <button
        className="mx-4"
        onClick={() =>
          setCurrentDate(
            (prevDate) =>
              new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
          )
        }>
        <FaChevronCircleLeft />
      </button>
      <h2 className="w-[160px] text-center">
        {format(currentDate, "MMMM yyyy")}
      </h2>
      <button
        className="mx-4"
        onClick={() =>
          setCurrentDate(
            (prevDate) =>
              new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
          )
        }>
        <FaChevronCircleRight />
      </button>
    </div>
  );

  const renderDays = () => (
    <div className="days">
      {weekdays.map((day) => (
        <div key={day} className="day-name">
          {day}
        </div>
      ))}
    </div>
  );

  const renderCells = () => (
    <div className="cells">
      {dateRange.map((day) => (
        <div
          key={day}
          className={`cell ${!isSameMonth(day, monthStart) ? "disabled" : ""}`}>
          <span className="number">{format(day, "d")}</span>
          {periodicTasks.map(
            (task) =>
              isSameDay(parseISO(task.dueDate), day) && (
                <div
                  key={task.task_Desc}
                  className="task-cal"
                  style={{ backgroundColor: task.color }}>
                  {task.task_Desc}
                </div>
              )
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="calendar-container w-100">
      {renderHeader()}
      <div className="calendar-grid">
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
};

export default Calendar;

Calendar.propTypes = {
  periodicTasks: PropTypes.arrayOf(
    PropTypes.shape({
      task_Desc: PropTypes.string.isRequired,
      rooM_NAME: PropTypes.string.isRequired,
      actual_Time_Min: PropTypes.number.isRequired,
      estimated_Time_Min: PropTypes.number.isRequired,
      dueDate: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
};
