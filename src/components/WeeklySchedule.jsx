import DayColumn from "./DayColumn";
import PropTypes from "prop-types";
import { format, addDays } from "date-fns";

const WeeklySchedule = ({ routineData }) => {
  const currentDate = new Date();
  const days = Array.from({ length: 7 }, (_, i) => addDays(currentDate, i));

  return (
    <div className="weekly-schedule">
      {days.map((day, index) => {
        const dayAbbrev = format(day, "EE").slice(0, 2);

        const dayTasks = routineData.filter((task) =>
          task.friendlySchedule.includes(dayAbbrev)
        );

        return (
          <DayColumn
            key={index}
            day={format(day, "EEEE")}
            date={format(day, "dd")}
            tasks={dayTasks}
            isCurrentDay={index === 0}
          />
        );
      })}
    </div>
  );
};

WeeklySchedule.propTypes = {
  routineData: PropTypes.arrayOf(
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
};

export default WeeklySchedule;
