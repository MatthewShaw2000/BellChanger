//Packages
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

//Components
import Method from '../components/method';

//Mui packages
import { Container } from '@mui/material';



/**
 * Collections page
 * 
 * displays all collections
 * 
 * @author Matthew Shaw
 * @returns 
 */
export default function Collections()
{
    const location = useLocation();
    const methods = location.state;

    useEffect(() =>
    {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        document.title = methods.name + ' | BellChanger';
    }, [methods]);

    const methodList = methods.methods.map((data) =>
        <Method method={data} key={data.method_id} />
    );


    return(
        <main>
            <Container maxWidth='md'>
                <div className='methodList_header'>
                    <h2>{methods.name} Collection</h2>
                    <p>{methods.methods.length} methods part of this collection</p>
                </div>

                <div className='list_container'>
                    {methodList}
                </div>

            </Container>
        </main>
    );
}