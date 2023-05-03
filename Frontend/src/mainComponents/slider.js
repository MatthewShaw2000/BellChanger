//Packages
import { NavLink } from 'react-router-dom';

//Font awesome packages
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faX} from '@fortawesome/free-solid-svg-icons';

//CSS
import '../css/mainComponents.css'
import "react-sliding-pane/dist/react-sliding-pane.css";



/**
 * Slider component
 * 
 * @author Matthew Shaw
 * @param {*} props 
 * @returns 
 */
export default function Slider(props)
{

    const closeSideBar = () => props.sideBarHandler();

    return(
        <div className={props.sliderState ? 'navSlider navOpen' : 'navSlider'}>
            <div className='nav_head'>
                <h2><img src='http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/images/logo.png' alt='' /></h2>
                <FontAwesomeIcon icon={faX} onClick={closeSideBar} />
            </div>
            <hr/>
            <nav>
                <ul>
                    <li><NavLink activeclassname='active' to='/'><strong>Home</strong></NavLink></li>
                    <li><NavLink activeclassname='active' to='/Methods'><strong>Methods</strong></NavLink></li>
                    <li><a href='http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/method.html?type=changes'><strong>Call Changes</strong></a></li>
                </ul>
            </nav>
        </div>
    );
}