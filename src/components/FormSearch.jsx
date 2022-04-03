import SearchIcon from '@mui/icons-material/Search';
import { Grid, Paper, TextField, InputAdornment, Button, FormControl, Select, MenuItem, InputLabel } from '@mui/material'

export const FormSearch = ({ searchUser, filter }) => {

    const onChange = e => {
        if (e.target.name === 'keyword') {
            searchUser(e.target.value, filter.gender)
        } else if (e.target.name === 'gender') {
            searchUser(filter.keyword, e.target.value)
        }
    }

    return (
        <Paper sx={{ p: 2 }} >
            <TextField
                fullWidth
                size='small'
                InputProps={{
                    startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                }}
                placeholder='Search..'
                type='search'
                name='keyword'
                onChange={onChange}
                value={filter.keyword}
            />
            <Grid container sx={{ mt: 2 }} >
                <FormControl size='small' sx={{ mr: 1 }} >
                    <InputLabel id="simple-select-label">Gender</InputLabel>
                    <Select value='all' label='Gender' name='gender' value={filter.gender} onChange={onChange} labelId="simple-select-label" >
                        <MenuItem value='all' >All</MenuItem>
                        <MenuItem value='male' >Male</MenuItem>
                        <MenuItem value='female' >Female</MenuItem>
                    </Select>
                </FormControl>
                <Button variant='outlined' size='small' type='reset' onClick={() => searchUser('', 'all')} >Reset</Button>
            </Grid>
        </Paper>

    )
}