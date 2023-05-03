//Font awesome packages
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBell} from '@fortawesome/free-solid-svg-icons';


/**
 * Loader
 * 
 * @author Matthew Shaw
 * @returns JSX
 */
export default function Loader()
{
    return(
        <div className='loader'>
            <div className='beam1' />
            <FontAwesomeIcon icon={faBell} />
        </div>
    );
}