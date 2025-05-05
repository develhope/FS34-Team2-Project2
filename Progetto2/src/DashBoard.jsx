import Chart from "./Components/Chart";
import NavBarDash from "./Components/NavBarDash";
import SpiralTimelineChart from "./Components/SpiralTimelineChart";

export default function DashBoard() {
  return (
    <div>
      <div className="dashBoard-all">
        <div className="dashBoard">
          <NavBarDash></NavBarDash>
          <div className="grafici">
            <Chart></Chart>
            <SpiralTimelineChart></SpiralTimelineChart>
          </div>
        </div>
      </div>
    </div>
  );
}
