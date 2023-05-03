import { Link } from "react-router-dom";


/**
 * Collection
 * 
 * Outputs the individual collection
 * 
 * @author Matthew Shaw
 * @param {*} props 
 * @returns 
 */
export default function Collection(props)
{
    return(
        <div className="item">
            <Link to={'/Collections/' + props.data.name} state={props.data}><h3>{props.data.name}</h3></Link>
            <hr/>
        </div>
    );
}