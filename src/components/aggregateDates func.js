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
  console.log("result day", result);

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


function getWeekNumber(date) {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + startOfYear.getDay() + 1) / 7);
}

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
