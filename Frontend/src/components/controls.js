//Font awesome packages
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import {faPause} from '@fortawesome/free-solid-svg-icons';
import {faArrowRotateLeft} from '@fortawesome/free-solid-svg-icons';

//Mui packages
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';

//CSS
import '../css/components.css';
import { useEffect, useState } from 'react';




/**
 * constrols
 * 
 * Unused
 * 
 * @author Matthew Shaw
 * @param {*} props 
 * @returns JSX
 */
export default function Controls(props)
{
    const [bellNum, setBellNum] = useState([]);

    useEffect(() =>
    {
        let array = [];
        for(let i=0; i<props.stageNum; i++)
        {
            array[i] = '' + (i+1);
        }
        setBellNum(array);
    }, [props.stageNum]);



    const playingChange = (value) => console.log(value);
    const reset = () => console.log('reset');
    const changeSpeed = (event) => props.speedHandler(event.target.value);
    const changeBell = (event) => props.selectedBellHandler(event.target.value);

    /*

        const playingChange = (value) => props.playingHandler(value);
    const reset = () => props.resetHandler();

    */



    const bellList = bellNum.map((value) =>
        <MenuItem key={value} value={value}>Bell: {value}</MenuItem>
    );



    return(
        <div className='controls_Container'>
            <div className='controls'>
                <FontAwesomeIcon icon={faPlay} id='play' onClick={() => playingChange(true)} />
                <FontAwesomeIcon icon={faPause} id='pause' onClick={() => playingChange(false)} />
                <FontAwesomeIcon icon={faArrowRotateLeft} id='reset' onClick={() => reset()} />
            </div>

            <hr/>

            {
                props.type !== 'changes'
                &&
                <FormControl>
                    <InputLabel id='demo-simple-select-label'>Select Bell</InputLabel>
                    <Select labelId='demo-simple-select-label' id='bellNum'
                        value={props.selectedBell}
                        label='Select Type'
                        onChange={changeBell}
                        sx={{
                            width: 250
                        }}
                        inputProps={{ readOnly: false }}
                    >
                        {bellList}
                    </Select>
                </FormControl>
            }

            <Slider 
                value={props.speed} 
                min={1}
                max={10}
                onChange={changeSpeed}
                id='range'
            />
        </div>
    );
}