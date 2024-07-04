import PropTypes from "prop-types";

const AdHocTable = ({ data }) => {
  // Function to format time (assuming usedTime is in minutes)
  const formatTime = (minutes) => {
    if (!minutes) return "---";
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    const secs = Math.floor((minutes * 60) % 60);
    return `${hours}h ${mins}m ${secs}s`;
  };

  // Function to generate a random percentage for the graph
  const getRandomPercentage = () => Math.floor(Math.random() * 100);

  return (
    <div className="ad-hoc-table">
      <table>
        <thead>
          <tr>
            <th>Bucket</th>
            <th>Op-Code</th>
            <th>Hours Used</th>
            <th>Total Hours</th>
            <th>Graphs</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.taskDesc}</td>
              <td>
                {item.opCode ? `${item.opCode} - ${item.opCodeDesc}` : "---"}
              </td>
              <td>{formatTime(item.usedTime)}</td>
              <td>{formatTime(item.yearlyMinsSetAside)}</td>
              <td>
                <div
                  className="graph-bar"
                  style={{ width: `${getRandomPercentage()}%` }}></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
AdHocTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      opCode: PropTypes.string,
      opCodeDesc: PropTypes.string,
      taskDesc: PropTypes.string.isRequired,
      buildingName: PropTypes.string,
      yearlyMinsSetAside: PropTypes.number,
      usedTime: PropTypes.number,
      specialties: PropTypes.string,
      isManual: PropTypes.bool,
      supWorkId: PropTypes.string,
    })
  ).isRequired,
};

export default AdHocTable;
