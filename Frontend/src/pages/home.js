//Packages
import { useEffect } from 'react';

//Components
import SlideShowSection from '../components/slideShowSection';
import AboutSection from '../components/aboutSection';
import CollectionSection from '../components/collectionSection'



/**
 * Home page
 * 
 * @author Matthew Shaw
 * @param {*} props 
 * @returns JSX
 */
export default function Home(props)
{
    useEffect(() =>
    {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        document.title = 'Home | BellChanger';
    }, []);



    return(
        <main>
            <SlideShowSection />
            <AboutSection />
            <CollectionSection status={props.status} collectionsFull={props.collectionsFull} />
        </main>
    );
}