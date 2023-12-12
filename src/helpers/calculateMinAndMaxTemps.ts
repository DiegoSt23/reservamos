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

  // Loop through each forecast object
  data.forEach((forecast) => {
    // Extract the date from the forecast object
    const date = forecast.dt_txt.split(' ')[0]; // Extract only the date part

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
      let maxTemp = Number.MIN_VALUE;
      let minTemp = Number.MAX_VALUE;
      let currentDate = '';

      dayData.forEach((forecast) => {
        if (forecast.main.temp_max > maxTemp) {
          maxTemp = forecast.main.temp_max;
        }
        if (forecast.main.temp_min < minTemp) {
          minTemp = forecast.main.temp_min;
        }
        currentDate = forecast.dt_txt.split(' ')[0]; // Extract date from the forecast
      });

      return { date: currentDate, max: maxTemp, min: minTemp };
    });

  // Now resultArray contains an array of arrays, each inner array containing the forecast data for a single day
  return maxMinTemperaturesByDay;
};
