import * as echarts from "echarts";
import { useEffect, useRef } from "react";

 function BarChar(props) {
  let { title = '周子琰' } = props;
  // 生成 ref 对象
  let inputRef = useRef(null);

  useEffect(() => {
    const chartDom = inputRef.current;
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: title,
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
        },
      ],
    };

    option && myChart.setOption(option);
  }, []);

  return (
    <div>
      <div id="main" style={{ width: 500, height: 400 }} ref={inputRef}></div>
    </div>
  );
}

export default BarChar;
