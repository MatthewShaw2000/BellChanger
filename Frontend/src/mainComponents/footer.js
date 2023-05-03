//Mui packages
import { Container } from "@mui/material";

//CSS
import '../css/mainComponents.css';


/**
 * Footer component
 * 
 * @author Matthew Shaw
 * @returns JSX
 */
export default function Footer()
{
    return(
        <footer>
            <Container maxWidth="md">
                <p>Footer</p>
            </Container>
        </footer>
    );
}