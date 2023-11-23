export function aggregateDataByWeek(data) {
  if (!data || data.length === 0) return [];
  let result = [];

  // מיון המערך לפי התאריכים
  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  // אתחול משתנים לצורך אגרגציה לפי שבועות
  let currentWeek = null;
  let weekData = [];

  for (const item of data) {
    const itemDate = new Date(item.date);
    const itemWeek = getWeekNumber(itemDate);
    // debugger

    if (currentWeek === null) {
      currentWeek = itemWeek;
    }

    if (itemWeek !== currentWeek) {
      // חישוב סטטיסטיקות והוספתן לתוצאה
      const weekAverage = calculateAverage(weekData);
      const weekServerRunning = calculateServerRunning(weekData);

      result.push({
        date: item.date,
        average: weekAverage,
        serverRunning: weekServerRunning,
        first: true,
      });

      // אתחול לשבוע הבא
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

  // מיון המערך לפי התאריכים
  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  // אתחול משתנים לצורך אגרגציה לפי ימים
  let currentDay = null;
  let dayData = [];

  for (const item of data) {
    const itemDay = new Date(item.date).toLocaleDateString();

    if (currentDay === null) {
      currentDay = itemDay;
    }

    if (itemDay !== currentDay) {
      // חישוב סטטיסטיקות והוספתן לתוצאה
      const dayAverage = calculateAverage(dayData);
      const dayServerRunning = calculateServerRunning(dayData);

      result.push({
        date: item.date,
        average: dayAverage,
        serverRunning: dayServerRunning,
        first: true,
      });

      // אתחול ליום הבא
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

  // סידור המערך לפי התאריכים
  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  // קצאת המידע לשעה
  let currentHour = null;
  let hourData = [];

  for (const item of data) {
    const itemHour = new Date(item.date).getHours();

    if (currentHour === null) {
      currentHour = itemHour;
    }

    if (itemHour !== currentHour) {
      // חישוב סטטיסטיקות והוספתן לתוצאה
      const hourAverage = calculateAverage(hourData);
      const hourServerRunning = calculateServerRunning(hourData);

      result.push({
        date: item.date,
        average: hourAverage,
        serverRunning: hourServerRunning,
        first: true,
      });

      // אתחול לשעה הבאה
      currentHour = itemHour;
      hourData = [];
    }

    hourData.push(item);
  }
}

export function aggregateDataByFiveMinutes(data) {
  let result = [];

  // סידור המערך לפי התאריכים
  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  // קצאת המידע ליחידות של חמישה דקות
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
      // חישוב סטטיסטיקות והוספתן לתוצאה
      const intervalAverage = calculateAverage(intervalData);
      const intervalServerRunning = calculateServerRunning(intervalData);

      result.push({
        date: item.date,
        average: intervalAverage,
        serverRunning: intervalServerRunning,
        first: true,
      });

      // אתחול ליחידת הזמן הבאה
      currentInterval = currentMinutes;
      intervalData = [];
    }

    intervalData.push(item);
  }



  return result;
}

function getWeekNumber(date) {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + startOfYear.getDay() + 1) / 7);
}

function calculateAverage(data) {
  const trueCount = data.filter((obj) => obj.online === true).length;
  const falseCount = data.filter((obj) => obj.online === false).length;
  const total = trueCount + falseCount;

  return total === 0 ? 0 : Number(((trueCount / total) * 100).toFixed(2));
}

function calculateServerRunning(data) {
  const totalServer = data.length;
  const filterdArr = data.filter((obj) => obj.isTheServerRunning);

  return totalServer === 0
    ? 0
    : Number(((filterdArr.length / totalServer) * 100).toFixed(2));
}
