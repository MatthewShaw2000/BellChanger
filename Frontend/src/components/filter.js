//Packages
import { useState } from 'react';

//Mui Packages
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

//Font awesome packages
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFilter, faCaretDown} from '@fortawesome/free-solid-svg-icons';

//CSS
import '../css/components.css';



/**
 * Filter
 * 
 * Will filter all the methods retrieved from the database based on user input.
 * 
 * @param {*} props 
 * @returns JSX
 */
export default function Filter(props)
{
    const [collapsed, setCollapsed] = useState(true);



    const onSearchChange = (event) => props.searchHandler(event.target.value)
    const onTypeChange = (event) => props.typeSelectHandler(event.target.value);
    const onStageChange = (event) => props.stageSelectHandler(event.target.value);
    const onCollectionChange = (event) => props.collectionSelectHandler(event.target.value);
    const onHuntChange = (event) => props.numberOfHuntsSelectHandler(event.target.value);
    const onSortByChange = (event) => props.sortByHandler(event.target.value);



    const typeList = props.type.map((type) =>
        <MenuItem value={type.name} key={type.type_id}>{type.name}</MenuItem>
    );

    const stageList = props.stage.map((stage) =>
        <MenuItem value={stage.stageNum} key={stage.stage_id}>{stage.name} : {stage.stageNum}</MenuItem>
    );

    const collectionList = props.collections.map((collection) =>
        <MenuItem value={collection.name} key={collection.collection_id}>{collection.name}</MenuItem>
    );

    return(
        <div className={collapsed ? 'filter collapsed_Filter' : 'filter'}>
            <h3 onClick={() => setCollapsed(!collapsed)}>
                Filter
                <FontAwesomeIcon icon={faFilter} />
                <FontAwesomeIcon className={!collapsed ? 'rotate_Arrow' : ''} style={{float: 'right', height: 30, marginRight: 10}} icon={faCaretDown} />
            </h3>

            <hr/>

            <Box component='form' sx={{
                    '& .MuiTextField-root': { width: 200, m: 0 },
                }}
                noValidate
                autoComplete='off'
            >
                <TextField id='outlined-search' label='Search' type='search' value={props.searchValue} onChange={onSearchChange} />



                <FormControl>
                    <InputLabel id='demo-simple-select-label'>Select Type</InputLabel>
                    <Select labelId='demo-simple-select-label' id='demo-simple-select'
                        value={props.typeSelect}
                        label='Select Type'
                        onChange={onTypeChange}
                        sx={{
                            width: 200
                        }}
                        inputProps={{ readOnly: false }}
                    >
                        <MenuItem value={'All'}>All</MenuItem>
                        {typeList}
                    </Select>
                </FormControl>



                <FormControl>
                    <InputLabel id='demo-simple-select-label'>Select Stage</InputLabel>
                    <Select labelId='demo-simple-select-label' id='demo-simple-select'
                        value={props.stageSelect}
                        label='Select Stage'
                        onChange={onStageChange}
                        sx={{
                            width: 200
                        }}
                    >
                        <MenuItem value={'All'}>All</MenuItem>
                        {stageList}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id='demo-simple-select-label'>Select Collection</InputLabel>
                    <Select labelId='demo-simple-select-label' id='demo-simple-select'
                        value={props.collectionSelect}
                        label='Select Collection'
                        onChange={onCollectionChange}
                        sx={{
                            width: 200
                        }}
                    >
                        <MenuItem value={'None'}>None</MenuItem>
                        {collectionList}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id='demo-simple-select-label'>Select Number of Hunts</InputLabel>
                    <Select labelId='demo-simple-select-label' id='demo-simple-select'
                        value={props.numberOfHunts}
                        label='Select Number of Hunts'
                        onChange={onHuntChange}
                        sx={{
                            width: 200
                        }}
                    >
                        <MenuItem value={'All'}>All</MenuItem>
                        <MenuItem value={'0'}>0 Hunt bells</MenuItem>
                        <MenuItem value={'1'}>1 Hunt bell</MenuItem>
                        <MenuItem value={'2'}>2 Hunt bells</MenuItem>
                        <MenuItem value={'3'}>3 Hunt bells</MenuItem>
                        <MenuItem value={'4'}>4 Hunt bells</MenuItem>
                        <MenuItem value={'5'}>5 Hunt bells</MenuItem>
                        <MenuItem value={'6'}>6 Hunt bells</MenuItem>
                        <MenuItem value={'7'}>7 Hunt bells</MenuItem>
                        <MenuItem value={'8'}>8 Hunt bells</MenuItem>
                        <MenuItem value={'9'}>9 Hunt bells</MenuItem>
                        <MenuItem value={'10'}>10 Hunt bells</MenuItem>
                    </Select>
                </FormControl>



                <FormControl>
                    <InputLabel id='demo-simple-select-label'>Sort By</InputLabel>
                    <Select labelId='demo-simple-select-label' id='demo-simple-select'
                        value={props.sortBy}
                        label='Sort by'
                        onChange={onSortByChange}
                        sx={{
                            width: 200
                        }}
                    >
                        <MenuItem value={'AZ'}>A to Z</MenuItem>
                        <MenuItem value={'ZA'}>Z to A</MenuItem>
                        <MenuItem value={'H'}>Highest stage</MenuItem>
                        <MenuItem value={'L'}>Lowest Stage</MenuItem>
                    </Select>
                </FormControl>


            </Box>
        </div>
    );
}