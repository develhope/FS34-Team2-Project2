import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5timeline from "@amcharts/amcharts5/timeline";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const SpiralTimelineChart = () => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5timeline.SpiralChart.new(root, {
        levelCount: 2,
        wheelY: "zoomX",
      })
    );

    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, { orientation: "horizontal" })
    );

    const yRenderer = am5timeline.AxisRendererCurveY.new(root, {});
    yRenderer.labels.template.setAll({
      centerY: am5.p50,
      centerX: am5.p100,
      fontSize: 11,
    });
    yRenderer.grid.template.set("forceHidden", true);

    const xRenderer = am5timeline.AxisRendererCurveX.new(root, {
      yRenderer,
      strokeDasharray: [2, 3],
      strokeOpacity: 0.5,
      stroke: am5.color(0x000000),
    });

    xRenderer.labels.template.setAll({
      centerY: am5.p50,
      fontSize: 11,
      minPosition: 0.01,
    });

    xRenderer.labels.template.setup = (target) => {
      target.set("layer", 30);
      target.set(
        "background",
        am5.Rectangle.new(root, {
          fill: am5.color(0xffffff),
          fillOpacity: 1,
        })
      );
    };

    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: yRenderer,
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const colorSet = chart.get("colors");

    const data = [
      {
        category: "Module #1",
        start: new Date("2019-01-10").getTime(),
        end: new Date("2019-01-13").getTime(),
        task: "Gathering requirements",
      },
      {
        category: "Module #1",
        start: new Date("2019-02-05").getTime(),
        end: new Date("2019-04-18").getTime(),
        task: "Development",
      },
      {
        category: "Module #2",
        start: new Date("2019-01-08").getTime(),
        end: new Date("2019-01-10").getTime(),
        task: "Gathering requirements",
      },
      {
        category: "Module #2",
        start: new Date("2019-01-12").getTime(),
        end: new Date("2019-01-15").getTime(),
        task: "Producing specifications",
      },
      {
        category: "Module #2",
        start: new Date("2019-01-16").getTime(),
        end: new Date("2019-02-05").getTime(),
        task: "Development",
      },
      {
        category: "Module #2",
        start: new Date("2019-02-10").getTime(),
        end: new Date("2019-02-18").getTime(),
        task: "Testing and QA",
      },
      { category: "" },
      {
        category: "Module #3",
        start: new Date("2019-01-01").getTime(),
        end: new Date("2019-01-19").getTime(),
        task: "Gathering requirements",
      },
      {
        category: "Module #3",
        start: new Date("2019-02-01").getTime(),
        end: new Date("2019-02-10").getTime(),
        task: "Producing specifications",
      },
      {
        category: "Module #3",
        start: new Date("2019-03-10").getTime(),
        end: new Date("2019-04-15").getTime(),
        task: "Development",
      },
      {
        category: "Module #3",
        start: new Date("2019-04-20").getTime(),
        end: new Date("2019-04-30").getTime(),
        task: "Testing and QA",
      },
      {
        category: "Module #4",
        start: new Date("2019-01-15").getTime(),
        end: new Date("2019-02-12").getTime(),
        task: "Gathering requirements",
      },
      {
        category: "Module #4",
        start: new Date("2019-02-25").getTime(),
        end: new Date("2019-03-10").getTime(),
        task: "Development",
      },
      {
        category: "Module #4",
        start: new Date("2019-03-23").getTime(),
        end: new Date("2019-04-29").getTime(),
        task: "Testing and QA",
      },
    ];

    const series = chart.series.push(
      am5timeline.CurveColumnSeries.new(root, {
        xAxis,
        yAxis,
        baseAxis: yAxis,
        valueXField: "end",
        openValueXField: "start",
        categoryYField: "category",
        layer: 30,
      })
    );

    series.columns.template.setAll({
      height: am5.percent(10),
      strokeOpacity: 0,
    });

    series.bullets.push((root, series, dataItem) =>
      am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 4,
          fill: chart
            .get("colors")
            .getIndex(series.dataItems.indexOf(dataItem)),
          strokeWidth: 2,
          strokeOpacity: 0.5,
        }),
        locationX: 0,
        locationY: 0.5,
      })
    );

    series.bullets.push((root, series, dataItem) =>
      am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 4,
          fill: chart
            .get("colors")
            .getIndex(series.dataItems.indexOf(dataItem)),
          strokeWidth: 2,
          strokeOpacity: 0.5,
        }),
        locationX: 1,
        locationY: 0.5,
      })
    );

    series.columns.template.adapters.add("fill", (fill, target) =>
      chart.get("colors").getIndex(series.dataItems.indexOf(target.dataItem))
    );

    const lineSeries = chart.series.push(
      am5timeline.CurveLineSeries.new(root, {
        xAxis,
        yAxis,
        categoryYField: "category",
        valueXField: "date",
      })
    );

    lineSeries.strokes.template.set("forceHidden", true);

    lineSeries.bullets.push((root, series, dataItem) => {
      const flag = am5.Tooltip.new(root, {
        centerY: 28,
        paddingBottom: 4,
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 4,
      });

      flag.get("background").setAll({
        stroke: am5.color(0x000000),
        cornerRadius: 0,
      });

      flag.label.setAll({
        fill: am5.color(0x000000),
        text: dataItem.dataContext.letter,
        fontSize: "0.8em",
      });

      return am5.Bullet.new(root, {
        sprite: flag,
        locationX: 0.5,
        locationY: 0.5,
      });
    });

    lineSeries.data.setAll([
      { category: "", date: new Date("2019-01-15").getTime(), letter: "A" },
      { category: "", date: new Date("2019-01-23").getTime(), letter: "B" },
      { category: "", date: new Date("2019-02-10").getTime(), letter: "C" },
      { category: "", date: new Date("2019-02-29").getTime(), letter: "D" },
      { category: "", date: new Date("2019-03-06").getTime(), letter: "E" },
      { category: "", date: new Date("2019-03-12").getTime(), letter: "F" },
      { category: "", date: new Date("2019-03-22").getTime(), letter: "G" },
    ]);

    chart.set(
      "cursor",
      am5timeline.CurveCursor.new(root, {
        behavior: "zoomX",
        xAxis,
        yAxis,
      })
    );

    series.data.setAll(data);

    yAxis.data.setAll([
      { category: "Module #1" },
      { category: "Module #2" },
      { category: "" },
      { category: "Module #3" },
      { category: "Module #4" },
    ]);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose(); // Pulizia quando il componente si smonta
    };
  }, []);

  return (
    <div
      id="chartdiv"
      ref={chartRef}
      style={{ width: "100%", height: "500px" }}
    />
  );
};

export default SpiralTimelineChart;
