interface ForecastObjProps {
  dt_txt: string;
  main: {
    temp_max: number;
    temp_min: number;
  }
}

export const calculateMinAndMaxTemps = (data: ForecastObjProps[]) => {
  // Create an object to store forecast data grouped by date
  const groupedByDate: { [date: string]: ForecastObjProps[] } = {};

  data.forEach((forecast) => {
    // Extract the date from the forecast object
    const date = forecast.dt_txt.split(' ')[0];

    // Check if the date already exists in the groupedByDate object
    if (!groupedByDate[date]) {
      // If the date does not exist, create a new array with the forecast data
      groupedByDate[date] = [forecast];
    } else {
      // If the date already exists, push the forecast data to the existing array
      groupedByDate[date].push(forecast);
    }
  });

  // Convert the groupedByDate object values to an array
  const resultArray: ForecastObjProps[][] = Object.values(groupedByDate);

  // Calculate max and min temperatures for each day
  const maxMinTemperaturesByDay: { date: string; max: number; min: number }[] =
    resultArray.map((dayData) => {
      const maxArr = dayData.map((item) => item.main.temp_max);
      const minArr = dayData.map((item) => item.main.temp_min);
      const maxTemp = Math.max(...maxArr);
      const minTemp = Math.min(...minArr);
      const currentDate = dayData[0].dt_txt.split(' ')[0];

      return { date: currentDate, max: maxTemp, min: minTemp };
    });

  // We use slice since we don't want to show the current day
  return maxMinTemperaturesByDay.slice(1);
};
