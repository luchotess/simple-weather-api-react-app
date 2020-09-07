import React from 'react';
import {Container, Typography, List, ListItem} from "@material-ui/core";

export const SearchHistory = ({historyList, onSearch}) => (
    <Container>
        <Typography variant="h6">
            Search History
        </Typography>
        <List>
            {historyList.map((item, index) => (
                <ListItem button key={index} onClick={() => onSearch(item)}>{item}</ListItem>
            ))}
        </List>
    </Container>
)