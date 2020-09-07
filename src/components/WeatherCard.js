import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        fontSize: 14,
    },
}));

export const WeatherCard = ({data}) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary">
                    Weather Information
                </Typography>
                <Typography variant="h5" component="h2">
                    {data.name && data.name.toUpperCase()}
                </Typography>
                <Typography variant="h6" component="p">
                    Weather
                </Typography>
                <Typography variant="body2" component="p">
                    Temp: {data.temp}
                </Typography>
                <Typography variant="body2" component="p">
                    Humidity: {data.humidity}
                </Typography>
                <Typography variant="body2" component="p">
                    Pressure: {data.pressure}
                </Typography>
                <Typography variant="body2" component="p">
                    Temp Max: {data.temp_max}
                </Typography>
                <Typography variant="body2" component="p">
                    Temp Min: {data.temp_min}
                </Typography>
                <Typography variant="h6" component="p">
                    Location
                </Typography>
                <Typography variant="body2" component="p">
                    Long: {data.lon}
                </Typography>
                <Typography variant="body2" component="p">
                    Lat : {data.lat}
                </Typography>
            </CardContent>
        </Card>
    )
}