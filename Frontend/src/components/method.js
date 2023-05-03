//Packages
//import { Link  } from 'react-router-dom';

//CSS
import '../css/components.css';



/**
 * Method
 * 
 * Outputs each individual method
 * 
 * @param {*} props 
 * @returns JSX
 */
export default function Method(props)
{
    const openMethod = () =>
    {
        //window.parent.postMessage(props.method, 'http://unn-w20013772.newnumyspace.co.uk/Year3/KF6012/Frontend/');
        sessionStorage.setItem('method', JSON.stringify(props.method));
        window.location.href = 'http://localhost:3000/method.html?type=method';
    };
    return(
        <div className="item" onClick={openMethod}>
            <h3>{props.method.name}</h3>
            <h4>{props.method.title}</h4>
            <hr/>
            <p>Notation: {props.method.notation}</p>
        </div>
    );
}

//<h3><Link to={'/Methods/' + props.method.method_id} state={props.method}>{props.method.name}</Link></h3><h3 onClick={openMethod}>{props.method.name}</h3>
//<h4><Link to={'/Methods/' + props.method.method_id} state={props.method}>{props.method.title}</Link></h4>