//Packages
import { useEffect } from "react";



/**
 * Error page
 * 
 * @author Matthew Shaw
 * @returns JSX
 */
export default function ErrorPage()
{
    useEffect(() =>
    {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        document.title = 'Error 404 | BellChanger';
    }, []);



    return(
        <main>
            <h2>OOPS</h2>
            <h3>No bell ringing can be found on this page</h3>
            <h4>Error 404: Page Not Found</h4>
        </main>
    );
}