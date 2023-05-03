//Mui packages
import { Container } from "@mui/material";

//CSS
import '../css/components.css';



/**
 * About section
 * 
 * Outputs information about the website.
 * 
 * @author Matthew Shaw
 * @returns JSX
 */
export default function AboutSection()
{
    return(
        <section className='about_section'>
            <Container maxWidth='md'>
                <h2>About</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <hr/>
            </Container>
        </section>
    );
}