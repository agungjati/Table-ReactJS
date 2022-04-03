import React, { useReducer, useEffect, useMemo } from 'react';
import { Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import { FormSearch } from './components/FormSearch'
import { DataTable } from './components/DataTable';
import { reducer, SET_DATA, FILTER_DATA } from './reducer';
import debouce from "lodash.debounce";

const useStyles = makeStyles({
  container: {
    minHeight: '100vh',
    backgroundColor: grey['100']
  }
})

const initialState = {
  data: [],
  page: 1,
  pageSize: 5,
  keyword: '',
  gender: 'all'
}


function App() {

  const classes = useStyles() 
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
    debouncedResults()
  }, [state.keyword, state.gender])
  
  const getUsers = () => {
    const keyword = state.keyword ? `&keyword=${state.keyword}` : '';
    const gender = state.gender !== 'all' ? `&gender=${state.gender}` : '';

    fetch(`${process.env.REACT_APP_API}?page=${state.page}&results=${state.pageSize}${gender + keyword}`)
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: SET_DATA,
        payload: res.results 
      })
    })
  }

  const searchUser = (keyword, gender) => {
    dispatch({ 
      type: FILTER_DATA,
      payload: { keyword, gender }
    })
  }

  const debouncedResults = useMemo(() => {
    return debouce(getUsers, 300);
  }, [state]);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });


  return (
    <Grid container justifyContent='center' className={classes.container} >
      <Grid item md={6} sx={{ mt: 2 }} >
        <Typography variant='h4' gutterBottom >Data Table</Typography>
        <FormSearch searchUser={searchUser} filter={state} />
        <DataTable data={state.data} />
      </Grid>
    </Grid>
  );
}

export default App;
