import React, {useState} from 'react';

import {API_KEY} from "./config";

import {
    Container,
    Button,
    Box,
    Grid,
    Typography,
    Paper,
    makeStyles,
    TextField,
    CircularProgress,
    Backdrop
} from "@material-ui/core";

import {useDataApi} from "./hooks/fetchWeatherHook";
import {useLocalStorage} from "./hooks/localStorageHook";

import {WeatherCard} from "./components/WeatherCard";
import {SearchHistory} from "./components/SearchHistory";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing(2),
    },
    searchField: {
        padding: theme.spacing(2),
        display: 'flex',
        alignItems: 'flex-end'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

const buildUrl = (query, API_KEY) => `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`;

function App() {
    const classes = useStyles();

    const [query, setQuery] = useState('Lima');
    const [{data, isLoading, isError}, doFetch] = useDataApi(
        buildUrl(query, API_KEY),
        {},
    );

    const [searchHistoryList, setSearchHistoryList] = useLocalStorage('searchHistory', []);

    const onSubmit = event => {
        doSearch(query);
        event.preventDefault();
    };

    const doSearch = (cityName) => {
        setSearchHistoryList([cityName, ...searchHistoryList].slice(0, 5))
        doFetch(buildUrl(cityName, API_KEY));
    }

    return (
        <Container className={classes.root}>
            <Grid container spacing={5}>
                <Grid item xs={4}>
                    <Paper className={classes.control}>
                        <Typography variant="h4" gutterBottom>
                            Simple Weather API <br/> <small>React App</small>
                        </Typography>
                        <SearchHistory historyList={searchHistoryList}
                                       onSearch={(cityName) => doSearch(cityName)}/>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper className={classes.control}>
                        <Box>
                            <form onSubmit={(event) => onSubmit(event)}>
                                <Typography variant='h6'>Enter city name</Typography>
                                <Box className={classes.searchField}>
                                    <TextField label={'City name'}
                                               value={query}
                                               onChange={event => setQuery(event.target.value)}/>
                                    <Button color="primary" type="submit">Get Weather</Button>
                                </Box>
                            </form>

                            {isError && <Typography variant="h6">City not found</Typography>}

                            {isLoading ? (
                                <Backdrop className={classes.backdrop} open={true}>
                                    <CircularProgress color="inherit"/>
                                </Backdrop>
                            ) : data &&
                                (<WeatherCard data={data} query={query}/>)
                            }
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
