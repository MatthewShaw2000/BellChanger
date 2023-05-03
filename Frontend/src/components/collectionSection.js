//Components
import Collection from './collection';
import Loader from './loader'

//Mui packages
import { Container } from '@mui/material';

//CSS
import '../css/components.css';



/**
 * Collections section
 * 
 * Outputs all the collectiosn stored in the database.
 * 
 * @author Matthew Shaw
 * @param {*} props 
 * @returns JSX
 */
export default function CollectionSection(props)
{
    const collections = props.collectionsFull.map((value) =>
        <Collection data={value} key={value.collection_id}/>
    );

    return(
        <section className='collection_section'>
            <Container maxWidth='md'>
                <h2>Collections</h2>
                <div className="collection_container">
                    {
                        !props.collectionsFull || props.status === 'Loading'
                        ?
                        <Loader />
                        :
                        collections
                    }
                    {
                        props.status === 'Error'
                        &&
                        <p>Error</p>
                    }
                </div>
            </Container>
        </section>
    );
}