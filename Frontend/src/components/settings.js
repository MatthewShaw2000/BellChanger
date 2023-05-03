//Mui packages
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';




/**
 * Settings
 * 
 * Unused
 * 
 * @author Matthew Shaw
 * @param {*} props 
 * @returns JSX
 */
export default function Settings(props)
{
    const changeTreble = (event) => props.trebleHandler(event.target.checked);
    const changeSound = (event) => props.soundHandler(event.target.checked);

    return(
        <div className="settings_container">
            <FormGroup>
                {
                    props.type !== 'changes'
                    &&
                    <>
                        {
                            props.type !== 'Principle'
                            ?
                            <FormControlLabel control={<Checkbox onChange={changeTreble} defaultChecked/>} label="Show Treble" />
                            :
                            <FormControlLabel disabled control={<Checkbox onChange={changeTreble}/>} label="Show Treble" />
                        }
                        <FormControlLabel control={<Checkbox defaultChecked/>} label="Show Numbers" />
                    </>
                }
                <FormControlLabel control={<Checkbox onChange={changeSound} defaultChecked/>} label="Sound On/Off" />
            </FormGroup>

            <div className='controller_button'>Info</div>
        </div>
    );
}