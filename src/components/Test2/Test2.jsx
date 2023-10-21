// import "./styles.css";
// import data from "./data.json";

// import React from "react";
// import { Heatmap } from "react-hour-heatmap";

// export default function Test2() {
//   return (
//     <div className="Test2">
//       <Heatmap
//         data={data}
//         dateColumn="created"
//         dataRow="created"
//         colors={[
//           "#edf8e9",
//           "#c7e9c0",
//           "#a1d99b",
//           "#74c476",
//           "#41ab5d",
//           "#238b45",
//           "#005a32"
//         ]}
//       />
//     </div>
//   );
// }
// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/heatmap
import { ResponsiveHeatMap } from '@nivo/heatmap'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const data = [
  {
    "id": "28",
    "data": [
      {
        "x": "12:00",
        "y": 100
      },
      {
        "x": "12:30",
        "y": 100
      },
      {
        "x": "01:00",
        "y": 0
      },
      {
        "x": "01:30",
        "y": 0
      },
      {
        "x": "02:00",
        "y": 100
      },
      {
        "x": "02:30",
        "y": 0
      },
      {
        "x": "03:00",
        "y": 0
      },
      {
        "x": "03:30",
        "y": 0
      },
      {
        "x": "04:00",
        "y": 0
      }
    ]
  },
  {
    "id": "29",
    "data": [
      {
        "x": "12:00",
        "y": 100
      },
      {
        "x": "12:30",
        "y": 100
      },
      {
        "x": "01:00",
        "y": 100
      },
      {
        "x": "01:30",
        "y": 100
      },
      {
        "x": "02:00",
        "y": 100
      },
      {
        "x": "02:30",
        "y": 100
      },
      {
        "x": "03:00",
        "y": 100
      },
      {
        "x": "03:30",
        "y": 100
      },
      {
        "x": "04:00",
        "y": 0
      }
    ]
  },
  {
    "id": "30",
    "data": [
      {
        "x": "12:00",
        "y": 0
      },
      {
        "x": "12:30",
        "y": 0
      },
      {
        "x": "01:00",
        "y": 0
      },
      {
        "x": "01:30",
        "y": 0
      },
      {
        "x": "02:00",
        "y": 0
      },
      {
        "x": "02:30",
        "y": 100
      },
      {
        "x": "03:00",
        "y": 100
      },
      {
        "x": "03:30",
        "y": 100
      },
      {
        "x": "04:00",
        "y": 100
      }
    ]
  },
  {
    "id": "01",
    "data": [
      {
        "x": "12:00",
        "y": 100
      },
      {
        "x": "12:30",
        "y": 100
      },
      {
        "x": "01:00",
        "y": 100
      },
      {
        "x": "01:30",
        "y": 100
      },
      {
        "x": "02:00",
        "y": 100
      },
      {
        "x": "02:30",
        "y": 100
      },
      {
        "x": "03:00",
        "y": 0
      },
      {
        "x": "03:30",
        "y": 0
      },
      {
        "x": "04:00",
        "y": 0
      }
    ]
  },
  {
    "id": "02",
    "data": [
      {
        "x": "12:00",
        "y": 100
      },
      {
        "x": "12:30",
        "y": 100
      },
      {
        "x": "01:00",
        "y": 100
      },
      {
        "x": "01:30",
        "y": 100
      },
      {
        "x": "02:00",
        "y": 100
      },
      {
        "x": "02:30",
        "y": 100
      },
      {
        "x": "03:00",
        "y": 100
      },
      {
        "x": "03:30",
        "y": 100
      },
      {
        "x": "04:00",
        "y": 0
      }
    ]
  },
  {
    "id": "03",
    "data": [
      {
        "x": "12:00",
        "y": 0
      },
      {
        "x": "12:30",
        "y": 0
      },
      {
        "x": "01:00",
        "y": 0
      },
      {
        "x": "01:30",
        "y": 0
      },
      {
        "x": "02:00",
        "y": 0
      },
      {
        "x": "02:30",
        "y": 100
      },
      {
        "x": "03:00",
        "y": 100
      },
      {
        "x": "03:30",
        "y": 100
      },
      {
        "x": "04:00",
        "y": 100
      }
    ]
  },
  {
    "id": "04",
    "data": [
      {
        "x": "12:00",
        "y": 100
      },
      {
        "x": "12:30",
        "y": 100
      },
      {
        "x": "01:00",
        "y": 0
      },
      {
        "x": "01:30",
        "y": 0
      },
      {
        "x": "02:00",
        "y": 0
      },
      {
        "x": "02:30",
        "y": 0
      },
      {
        "x": "03:00",
        "y": 0
      },
      {
        "x": "03:30",
        "y": 0
      },
      {
        "x": "04:00",
        "y": 0
      }
    ]
  },
  {
    "id": "05",
    "data": [
      {
        "x": "12:00",
        "y": 100
      },
      {
        "x": "12:30",
        "y": 100
      },
      {
        "x": "01:00",
        "y": 100
      },
      {
        "x": "01:30",
        "y": 0
      },
      {
        "x": "02:00",
        "y": 0
      },
      {
        "x": "02:30",
        "y": 100
      },
      {
        "x": "03:00",
        "y": 100
      },
      {
        "x": "03:30",
        "y": 100
      },
      {
        "x": "04:00",
        "y": 0
      }
    ]
  }
]
const data2 = () => (
    <ResponsiveHeatMap
        data={data}
        margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
        valueFormat=">-.2s"
        axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -0,
            legend: '',
            legendOffset: 46
        }}
        // axisRight={{
        //     tickSize: 5,
        //     tickPadding: 5,
        //     tickRotation: 0,
        //     legend: 'country',
        //     legendPosition: 'middle',
        //     legendOffset: 70
        // }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: -72
        }}
        colors={{
            type: 'diverging',
            scheme: 'red_yellow_blue',
            // divergeAt: 0.5,
            minValue: 0,
            maxValue: 100
        }}
        emptyColor="#555555"
        // legends={[
        //     {
        //         anchor: 'bottom',
        //         translateX: 0,
        //         translateY: 30,
        //         length: 400,
        //         thickness: 8,
        //         direction: 'row',
        //         tickPosition: 'after',
        //         tickSize: 3,
        //         tickSpacing: 4,
        //         tickOverlap: false,
        //         tickFormat: '>-.2s',
        //         title: 'Value →',
        //         titleAlign: 'start',
        //         titleOffset: 4
        //     }
        // ]}
    />
)
export default data2;