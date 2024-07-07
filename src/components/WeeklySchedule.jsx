import DayColumn from "./DayColumn";
import PropTypes from "prop-types";
import { format, addDays, startOfWeek, parseISO, isEqual } from "date-fns";

const WeeklySchedule = ({ routineData }) => {
  const currentDate = new Date();
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 6 }); // 6 represents Saturday
  const days = Array.from({ length: 7 }, (_, i) =>
    addDays(startOfCurrentWeek, i)
  );

  const dayAbbreviations = ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"];

  return (
    <div className="weekly-schedule">
      {days.map((day, index) => {
        const isWeekend = index === 0 || index === 1; // Saturday or Sunday
        const dayAbbr = dayAbbreviations[index];

        const dayTasks = routineData.filter((task) => {
          const taskDate = parseISO(task.d);
          const isCurrentDayTask = isEqual(taskDate, day);
          return (
            task.friendlySchedule.includes(dayAbbr) &&
            (task.future === "0" || (task.future === "1" && isCurrentDayTask))
          );
        });

        return (
          <DayColumn
            key={index}
            day={format(day, "EEEE")}
            date={format(day, "dd")}
            tasks={dayTasks}
            isCurrentDay={
              format(day, "yyyy-MM-dd") === format(currentDate, "yyyy-MM-dd")
            }
            isWeekend={isWeekend}
          />
        );
      })}
    </div>
  );
};

WeeklySchedule.propTypes = {
  routineData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
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
