import {
  Avatar,
  Card,
  CardContent,
  Dialog,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { StoreContext, ctx } from "../../shared/store";
import { dateConverter } from "../../utils/date-converter";
import ShareIcon from "@mui/icons-material/Share";
import ShareForm from "./ShareWeatherForm";
import WeatherInfo from "./WeatherInfo";
import SearchWeatherForm from "./SearchWeatherForm";
import "./weather-styles.scss";
import apiConnect from "../../services/apiConnect";
import ReactGA from "react-ga4";

const WeatherPage = () => {
  const { weatherData, setWeatherData, uid, city, setCity } =
    React.useContext<ctx>(StoreContext);
  const { icon, description, cityName, info, timeStemp } = weatherData;
  const [searchParams, setSearchParams] = useSearchParams();
  const [isShare, setIsShare] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const api = new apiConnect();

  const handleWeather = async (city: string) => {
    setError(null);

    const commonEventOptions = {
      category: "GetWeather",
    };

    // Send event for the weather request
    ReactGA.event({
      ...commonEventOptions,
      action: city ? "SearchForPlace" : "AutomaticLocation",
      label: city ? "User search for place" : "Automatic location",
    });

    try {
      const res = await api.patch("weather", {
        uid: uid,
        location: city,
      });

      setWeatherData(res.data.data);
      setCity(res.data.data.cityName);
      setSearchParams({ city: res.data.data.cityName });

      // Send event for successful weather data retrieval
      ReactGA.event({
        ...commonEventOptions,
        action: "PlaceFound",
        label: "Place found",
      });
    } catch (error: any) {
      // Send event for failed weather data retrieval
      ReactGA.event({
        ...commonEventOptions,
        action: "PlaceNotFound",
        label: "Place was not found",
      });
      setError(error?.response?.data.errors[0].message || error.message);
    }
  };

  useEffect(() => {
    if (uid) {
      const paramCity = searchParams.get("city");
      paramCity && setCity(paramCity);
      handleWeather(paramCity || city);
    }
  }, [uid]);

  return (
    <>
      <Card className="card-container">
        <CardContent>
          <SearchWeatherForm
            handleWeather={handleWeather}
            cityInput={city}
            error={error}
          />
          <Grid className="grid-center-items" container mt={3}>
            <Grid item xs={6}>
              <Avatar
                className={`temp-avatar ${info.temp > 16 ? "blue" : "gray"}`}
              >
                {icon && <img src={icon} alt={description} />}
              </Avatar>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Typography variant="h6">{cityName}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h3"
                component="h2"
                className="weather-grey bold"
              >
                {info.temp}
                <span className="temp-unit-sign">°C</span>
              </Typography>
            </Grid>
            {timeStemp && (
              <Grid item xs={12}>
                <Typography variant="body2">
                  {dateConverter(timeStemp)} | {description}
                </Typography>
              </Grid>
            )}
            <WeatherInfo info={info} />
          </Grid>
        </CardContent>
      </Card>
      <Grid className="grid-center-items" container mt={3}>
        <Tooltip title="Share your weather">
          <IconButton onClick={() => setIsShare(true)}>
            <Avatar>
              <ShareIcon fontSize="medium" />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Grid>
      <Dialog onClose={() => setIsShare(false)} open={isShare} maxWidth="xs">
        <ShareForm onClose={() => setIsShare(false)} />
      </Dialog>
    </>
  );
};

export default WeatherPage;
