//Packages
import ReactPaginate from 'react-paginate';

//CSS
import '../css/components.css';


/**
 * Paginate
 * 
 * Paginate for the method list page
 * 
 * @param {*} props 
 * @returns JSX
 */
export default function Paginate(props)
{
    return(
        <>
        {
            props.totalPages > 1
            &&
            <ReactPaginate
                previousLabel={"< Previous"}
                nextLabel={"Next >"}
                pageCount={props.totalPages}
                onPageChange={props.changePage}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}

                containerClassName={"navigation_Buttons"}
                previousLinkClassName={"previous_Button"}
                nextLinkClassName={"next_Button"}
                disabledClassName={"navigation_Disabled"}
                activeClassName={"navigation_Active"}
            />
        }
        </>
    );
}