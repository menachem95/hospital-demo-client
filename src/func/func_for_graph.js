export function aggregateDataByWeek(data) {
  if (!data || data.length === 0) return [];
  let result = [];
  let currentWeek = null;
  let weekData = [];

  for (const item of data) {
    const itemDate = new Date(item.date);
    const itemWeek = getWeekNumber(itemDate);

    if (currentWeek === null) {
      currentWeek = itemWeek;
    }

    if (itemWeek !== currentWeek) {
      const weekAverage = calculateAverage(weekData);
      const weekServerRunning = calculateServerRunning(weekData);

      result.push({
        date: item.date,
        average: weekAverage,
        serverRunning: weekServerRunning,
        first: true,
      });

      currentWeek = itemWeek;
      weekData = [];
    }

    weekData.push(item);
  }
  return result;
}

export function aggregateDataByDay(data) {
  if (!data || data.length === 0) return [];
  let result = [];

  let currentDay = null;
  let dayData = [];

  for (const item of data) {
    const itemDay = new Date(item.date).toLocaleDateString();

    if (currentDay === null) {
      currentDay = itemDay;
    }

    if (itemDay !== currentDay) {
      const dayAverage = calculateAverage(dayData);
      const dayServerRunning = calculateServerRunning(dayData);

      result.push({
        date: item.date,
        average: dayAverage,
        serverRunning: dayServerRunning,
        first: true,
      });

      currentDay = itemDay;
      dayData = [];
    }

    dayData.push(item);
  }
  
// debugger
  return result;
}

export function aggregateDataByHour(data) {
  let result = [];

  let currentHour = null;
  let hourData = [];

  for (const item of data) {
    const itemHour = new Date(item.date).getHours();

    if (currentHour === null) {
      currentHour = itemHour;
    }

    if (itemHour !== currentHour) {
      const hourAverage = calculateAverage(hourData);
      const hourServerRunning = calculateServerRunning(hourData);

      result.push({
        date: item.date,
        average: hourAverage,
        serverRunning: hourServerRunning,
        first: true,
      });

      currentHour = itemHour;
      hourData = [];
    }

    hourData.push(item);
  }
  // debugger
  return result;
}

export function aggregateDataByFiveMinutes(data) {
  let result = [];

  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  let currentInterval = null;
  let intervalData = [];

  for (const item of data) {
    const itemTime = new Date(item.date);
    const itemMinutes = itemTime.getMinutes();
    const currentMinutes = itemMinutes - (itemMinutes % 5);

    if (currentInterval === null) {
      currentInterval = currentMinutes;
    }

    if (currentMinutes !== currentInterval) {
      const intervalAverage = calculateAverage(intervalData);
      const intervalServerRunning = calculateServerRunning(intervalData);

      result.push({
        date: item.date,
        average: intervalAverage,
        serverRunning: intervalServerRunning,
        first: true,
      });

      currentInterval = currentMinutes;
      intervalData = [];
    }

    intervalData.push(item);
  }

  return result;
}

export function aggregateData(data, intervalFormat) {
  if (!data || data.length === 0 || !intervalFormat) return [];

  let result = [];
  let currentInterval = null;
  let intervalData = [];

  const getInterval = (date) => {
    if (intervalFormat === "minutes") return date.getMinutes() - (date.getMinutes() % 5);
    if (intervalFormat === "hour") return date.getHours();
    if (intervalFormat === "day") return date.toLocaleDateString();
    if (intervalFormat === "week") return getWeekNumber(date);
  };

  for (const item of data) {
    const itemInterval = getInterval(new Date(item.date));

    if (currentInterval === null) {
      currentInterval = itemInterval;
    }

    if (itemInterval !== currentInterval) {
      const intervalAverage = calculateAverage(intervalData);
      const intervalServerRunning = calculateServerRunning(intervalData);

      result.push({
        date: item.date,
        average: intervalAverage,
        serverRunning: intervalServerRunning,
        first: true,
      });

      currentInterval = itemInterval;
      intervalData = [];
    }

    intervalData.push(item);
  }

  return result;
}

// Usage
// const test = () => {
//   const data = aggregateData(logs, getIntervalFormat());
//   return add10milisec(data);
// };


function calculateAverage(data) {
  const trueCount = data.filter((obj) => obj.online === true).length;
  const falseCount = data.filter((obj) => obj.online === false).length;
  const total = trueCount + falseCount;

  return total === 0 ? 0 : ((trueCount / total) * 100).toFixed(2);
}

function calculateServerRunning(data) {
  const totalServer = data.length;
  const filterdArr = data.filter((obj) => obj.isTheServerRunning);

  return totalServer === 0
    ? 0
    : ((filterdArr.length / totalServer) * 100).toFixed(2);
}


////
export const returnTimeString = (timestamp) => {
  const date = new Date(timestamp).toLocaleString("en-GB", { timeZone: "UTC" });
  return {
    day: date.substring(0, 5),
    hour: date.substring(12, 17),
  };
};

export function getWeekNumber(date) {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + startOfYear.getDay() + 1) / 7);
}



export const add10milisec = (result) => {
  const newResult = [];
  for (let i = 0; i < result?.length; i++) {
    newResult.push(result[i]);
    let date = result[i].date + 10;
    let obj = { ...result[i + 1], date, first: false };
    newResult.push(obj);
  }
  return newResult;
};



////




// function splitAndAverageArray(arr) {
//   // debugger

//   // const arr = arr1.filter(obj => obj.isTheServerRunning)

//   const result = [];

//   const step = Math.ceil(arr.length / 9);
//   const remainder = arr.length % step;

//   for (let i = 0; i < arr.length; i += step) {
//     // const chunk = arr.slice(i, i + step);
//     const chunk = arr.slice(i, i + step + (i + step === arr.length ? remainder : 0));
//     const filterdArr = chunk.filter((obj) => obj.isTheServerRunning);

//     if (chunk.length > 0) {
//       // debugger;
//       console.log("chunk:", chunk);
//       console.log(filterdArr);
//       console.log("filterdArr.length", filterdArr.length);
//       console.log("chunk.length", chunk.length);
//       const totalServer = chunk.length + filterdArr.length;
//       let serverRunning =
//         totalServer === 0
//           ? null
//           : ((filterdArr.length / chunk.length) * 100).toFixed(2);
//       console.log("serverRunning:", serverRunning);
//       let time = chunk[0].date;
//       const trueCount = chunk.filter((obj) => obj.online === true).length;
//       const falseCount = chunk.filter((obj) => obj.online === false).length;
//       const total = trueCount + falseCount;
//       const average = total === 0 ? 0 : ((trueCount / total) * 100).toFixed(2);

//       time = new Date(time).toISOString();
//       const dateStinrg = `${time?.substring(8, 10)}/${time?.substring(
//         5,
//         7
//       )},${time?.substring(11, 16)}`;
//       let date = new Date(time);
//       date = date.getTime();
//       // serverRunning = serverRunning > 0 ? serverRunning : null;
//       result.push({ date, average, dateStinrg, serverRunning });
//       if (i + step === arr.length) {
//         date = arr[arr.length - 1].date;
//         result.push({ date, average, dateStinrg, serverRunning });
//       }
//     }
//   }
//   console.log(result);
//   return result;
// }

// const getAllDates = (arr) => {
//   const arr1 = arr.map((obj) => {
//     let newDate = new Date(obj.date);
//     newDate.setSeconds(0);
//     newDate.setMilliseconds(0);
//     newDate.getTime();
//     return {
//       // date: obj,//: newDate,//.toISOString().substring(0, 16),
//       // online: obj.online ? true : false,
//       ...obj,
//       date: newDate,
//       isTheServerRunning: true,
//     };
//   });

//   let lastMinute = new Date(arr1[0].date).getTime();

//   const newArr = [
//     {
//       date: lastMinute,
//       isTheServerRunning: true,
//       online: arr1[0].online,
//     },
//   ];

//   const theLastInOriginalArr = new Date(arr1[arr1.length - 1].date).getTime();
//   let fromTheLastOneInTheOriginal = 0;
//   while (lastMinute <= theLastInOriginalArr) {
//     // console.log("lastMinute:", lastMinute);
//     // console.log("theLastInOriginalArr:", theLastInOriginalArr);
//     const next5Minute = lastMinute + 1000 * 60; //*5;

//     const foundItem = arr1.find(
//       (item) =>
//         new Date(item.date).toISOString().substring(0, 16) ===
//         new Date(next5Minute).toISOString().substring(0, 16)
//     );

//     let isTheServerRunning = foundItem ? true : false;
//     const online = foundItem ? foundItem.online : null;
//     fromTheLastOneInTheOriginal++;
//     if (isTheServerRunning) {
//       fromTheLastOneInTheOriginal = 0;
//     }
//     if (!isTheServerRunning && fromTheLastOneInTheOriginal < 5) {
//       isTheServerRunning = true;
//     }

//     // if (fromTheLastOneInTheOriginal <= 5 && !isTheServerRunning) {
//     //   isTheServerRunning = true;
//     //   // if (fromTheLastOneInTheOriginal === 5){

//     //   // }
//     // } else{
//     //   fromTheLastOneInTheOriginal = 0
//     // }

//     const obj = {
//       date: next5Minute,
//       isTheServerRunning,
//       online,
//     };
//     newArr.push(obj);

//     lastMinute = obj.date;
//   }

//   console.log("newArr", newArr);
//   return newArr;
// };
