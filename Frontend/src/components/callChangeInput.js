//Mui packages
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

//CSS
import '../css/components.css';


/**
 * Call changes input
 * 
 * Unused
 * 
 * @author Matthew Shaw
 * @param {*} props 
 * @returns JSX
 */
export default function CallChangeInput(props)
{
    const inputChanges = (event) => props.inputHandler(event.target.value);
    const bellNumChanges = (event) => props.bellNumHandler(event.target.value);
    const leadsChanges = (event) => props.leadsHandler(event.target.value);
    const callTypeChanges = (event) => props.callTypeHandler(event.target.value);


    return(
        <div className='item changes_input'>
            <div className='changes_settings'>
                <FormControl>
                    <InputLabel id='demo-simple-select-label'>Select bell number</InputLabel>
                    <Select labelId='demo-simple-select-label' id='demo-simple-select'
                        value={props.bellNum}
                        label='Select Type'
                        onChange={bellNumChanges}
                        sx={{
                            width: 200
                        }}
                        inputProps={{ readOnly: false }}
                    >
                        <MenuItem value={4}>4 bells</MenuItem>
                        <MenuItem value={5}>5 bells</MenuItem>
                        <MenuItem value={6}>6 bells</MenuItem>
                        <MenuItem value={7}>7 bells</MenuItem>
                        <MenuItem value={8}>8 bells</MenuItem>
                        <MenuItem value={9}>9 bells</MenuItem>
                        <MenuItem value={10}>10 bells</MenuItem>
                        <MenuItem value={11}>11 bells</MenuItem>
                        <MenuItem value={12}>12 bells</MenuItem>
                        <MenuItem value={13}>13 bells</MenuItem>
                        <MenuItem value={14}>14 bells</MenuItem>
                        <MenuItem value={15}>15 bells</MenuItem>
                        <MenuItem value={16}>16 bells</MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id='demo-simple-select-label'>Select leads between calls</InputLabel>
                    <Select labelId='demo-simple-select-label' id='demo-simple-select'
                        value={props.leads}
                        label='Select Type'
                        onChange={leadsChanges}
                        sx={{
                            width: 200
                        }}
                        inputProps={{ readOnly: false }}
                    >
                        <MenuItem value={1}>1 lead</MenuItem>
                        <MenuItem value={2}>2 leads</MenuItem>
                        <MenuItem value={3}>3 leads</MenuItem>
                        <MenuItem value={4}>4 leads</MenuItem>
                        <MenuItem value={5}>5 leads</MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id='demo-simple-select-label'>Select call type</InputLabel>
                    <Select labelId='demo-simple-select-label' id='demo-simple-select'
                        value={props.callType}
                        label='Select Type'
                        onChange={callTypeChanges}
                        sx={{
                            width: 200
                        }}
                        inputProps={{ readOnly: false }}
                    >
                        <MenuItem value={'Up'}>Call Up</MenuItem>
                        <MenuItem value={'Down'}>Call Down</MenuItem>
                    </Select>
                </FormControl>
            </div>


            <p>Input example:</p>
            <p>'3 to 1, 5 to 2' or '2 to 3, 4 to 5'</p>
            <p>'E to 9, A to 0 or '0 to E, T to A'</p>
            <TextField
                id="outlined-multiline-flexible"
                label="Input Call Changes"
                multiline
                maxRows={10}
                sx={{width: '100%'}}
                value={props.inputCalls}
                onChange={inputChanges}
            />

        </div>
    );
}