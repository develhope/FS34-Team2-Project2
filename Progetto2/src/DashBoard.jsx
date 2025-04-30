import Chart from "./Components/Chart";
import NavBarDash from "./Components/NavBarDash";
import SpiralTimelineChart from "./Components/SpiralTimelineChart";

export default function DashBoard() {
  return (
    <>
      <div className="dashBoard-all">
        <div className="dashBoard">
          <div className="grafici">
            <NavBarDash></NavBarDash>
            <Chart></Chart>
            <SpiralTimelineChart></SpiralTimelineChart>
          </div>
        </div>
      </div>
    </>
  );
}
