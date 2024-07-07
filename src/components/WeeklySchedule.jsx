import DayColumn from "./DayColumn";
import PropTypes from "prop-types";
import { format, addDays, startOfWeek } from "date-fns";

import { useMemo } from "react";

const WeeklySchedule = ({ routineData }) => {
  const currentDate = new Date();
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 6 }); // 6 represents Saturday
  const days = Array.from({ length: 7 }, (_, i) =>
    addDays(startOfCurrentWeek, i)
  );

  const maxTasks = useMemo(() => {
    return days.reduce((max, day) => {
      const dayAbbrev = format(day, "EE").slice(0, 2);
      const dayTasks = routineData.filter((task) =>
        task.friendlySchedule.includes(dayAbbrev)
      );
      return Math.max(max, dayTasks.length);
    }, 0);
  }, [routineData, days]);

  return (
    <div className="weekly-schedule">
      {days.map((day, index) => {
        const dayAbbrev = format(day, "EE").slice(0, 2);
        const isWeekend = index === 0 || index === 1; // Saturday or Sunday

        const dayTasks = routineData.filter((task) =>
          task.friendlySchedule.includes(dayAbbrev)
        );

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
            maxTasks={maxTasks}
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
