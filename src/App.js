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
  gender: 'all',
  isLoading: true
}


function App() {

  const classes = useStyles() 
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
    debouncedResults()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.keyword, state.gender, state.page])
  
  const getUsers = () => {
    const keyword = state.keyword ? `&keyword=${state.keyword}` : '';
    const gender = state.gender !== 'all' ? `&gender=${state.gender}` : '';

    fetch(`${process.env.REACT_APP_API}?page=${state.page}&results=${state.pageSize}${gender + keyword}`)
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: SET_DATA,
        payload: { data: res.results, isLoading: false } 
      })
    })
    .catch(err => {
      alert(err.message || 'An error occured, try again later')
    })
  }

  const searchUser = (payload) => {
    dispatch({ 
      type: FILTER_DATA,
      payload: { ...payload, isLoading: true }
    })
  }

  const debouncedResults = useMemo(() => {
    return debouce(getUsers, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <DataTable data={state.data} searchUser={searchUser} isLoading={state.isLoading} />
      </Grid>
    </Grid>
  );
}

export default App;
