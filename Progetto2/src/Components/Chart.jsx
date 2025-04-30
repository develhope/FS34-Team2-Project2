import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const Chart = () => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    const root = am5.Root.new(chartRef.current);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        layout: root.verticalLayout,
        paddingLeft: 0,
      })
    );

    const data = [
      { year: "2015", value: 600000 },
      { year: "2016", value: 900000 },
      { year: "2017", value: 180000 },
      { year: "2018", value: 600000 },
      { year: "2019", value: 350000 },
      { year: "2020", value: 600000 },
      { year: "2021", value: 670000 },
    ];

    for (let i = 0; i < data.length - 1; i++) {
      data[i].valueNext = data[i + 1].value;
    }

    const xRenderer = am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9,
      minGridDistance: 30,
      minorGridEnabled: true,
    });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );
    xRenderer.grid.template.setAll({ location: 1 });
    xAxis.data.setAll(data);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueYField: "value",
        categoryXField: "year",
      })
    );

    series.columns.template.setAll({
      tooltipText: "{categoryX}: {valueY}",
      width: am5.percent(90),
      tooltipY: 0,
    });
    series.data.setAll(data);

    const series2 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueYField: "valueNext",
        openValueYField: "value",
        categoryXField: "year",
        fill: am5.color(0x555555),
        stroke: am5.color(0x555555),
      })
    );

    series2.columns.template.setAll({ width: 1 });
    series2.data.setAll(data);

    function getVariancePercent(dataItem) {
      if (dataItem) {
        const value = dataItem.get("valueY");
        const openValue = dataItem.get("openValueY");
        const change = value - openValue;
        return Math.round((change / openValue) * 100);
      }
      return 0;
    }

    series2.bullets.push(() => {
      const label = am5.Label.new(root, {
        text: "{valueY}",
        fontWeight: "500",
        fill: am5.color(0x00cc00),
        centerY: am5.p100,
        centerX: am5.p50,
        populateText: true,
      });

      label.adapters.add("text", (text, target) => {
        const percent = getVariancePercent(target.dataItem);
        return percent ? percent + "%" : text;
      });

      label.adapters.add("centerY", (center, target) =>
        getVariancePercent(target.dataItem) < 0 ? 0 : center
      );

      label.adapters.add("fill", (fill, target) =>
        getVariancePercent(target.dataItem) < 0 ? am5.color(0xcc0000) : fill
      );

      return am5.Bullet.new(root, {
        locationY: 1,
        sprite: label,
      });
    });

    series2.bullets.push(() => {
      const arrow = am5.Graphics.new(root, {
        rotation: -90,
        centerX: am5.p50,
        centerY: am5.p50,
        dy: 3,
        fill: am5.color(0x555555),
        stroke: am5.color(0x555555),
        draw(display) {
          display.moveTo(0, -3);
          display.lineTo(8, 0);
          display.lineTo(0, 3);
          display.lineTo(0, -3);
        },
      });

      arrow.adapters.add("rotation", (rotation, target) =>
        getVariancePercent(target.dataItem) < 0 ? 90 : rotation
      );
      arrow.adapters.add("dy", (dy, target) =>
        getVariancePercent(target.dataItem) < 0 ? -3 : dy
      );

      return am5.Bullet.new(root, {
        locationY: 1,
        sprite: arrow,
      });
    });

    series.appear();
    chart.appear(1000, 100);

    return () => {
      root.dispose(); // pulizia
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

export default Chart;
