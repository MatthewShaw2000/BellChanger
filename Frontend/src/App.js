//Packages
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';


//Pages
import Home from './pages/home';
import MethodsList from './pages/methodsList';
import MethodSingle from './pages/methodSingle';
import CallChanges from './pages/callChanges';
import Collections from './pages/collections';
import ErrorPage from './pages/errorPage';

//Components
import Header from './mainComponents/header';
import Slider from './mainComponents/slider';
import Footer from './mainComponents/footer';

//CSS
import './css/App.css';



/**
 * App
 * 
 * Houses all the navigation routes.
 * Contains all the fetches to be passed to correct pages.
 * 
 * @author Matthew Shaw
 * @returns JSX
 */
export default function App()
{
    const [status, setStatus] = useState('Loading');
    const [methods, setMethods] = useState([]);
    const [collections, setCollections] = useState([]);
    const [collectionsFull, setCollectionsFull] = useState([]);
    const [type, setType] = useState([]);
    const [stage, setStage] = useState([]);

    const [sideBarState, setSideBarState] = useState(false);



    useEffect(() =>
    {
        Promise.all([
            fetch('http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/API/Methods')
            .then((Response) => Response.json()),

            fetch('http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/API/CollectionsFull')
            .then((Response) => Response.json()),

            fetch('http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/API/MethodType')
            .then((Response) => Response.json()),

            fetch('http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/API/Stage')
            .then((Response) => Response.json()),

            fetch('http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/API/Collections')
            .then((Response) => Response.json()),
        ])
        .then((json) =>
        {
            setStatus('Success');
            setMethods(json[0].data);
            setCollectionsFull(json[1].data);
            setType(json[2].data);
            setStage(json[3].data);
            setCollections(json[4].data);
        })
        .catch((e) =>
        {
            setStatus('Error');
            console.log(e.message);
        });
    }, []);



    useEffect(() =>
    {
        if(sideBarState)
        {
            document.body.classList.add('stopScroll');
        }
        else
        {
            document.body.classList.remove('stopScroll');
        }
    }, [sideBarState]);


    const sideBarHandler = () => setSideBarState(!sideBarState);



    return (
        <div className='App_container'>
            <Header sideBarHandler={sideBarHandler} />

            <Slider sliderState={sideBarState} sideBarHandler={sideBarHandler} />

            <Routes>
                <Route exact index path='/' element={ <Home status={status} collectionsFull={collectionsFull} /> } />

                <Route exact path='/Methods'>
                    <Route index element={ <MethodsList status={status} methods={methods} type={type} stage={stage} collections={collections} /> } />
                    <Route exact path=':methodParam' element={ <MethodSingle /> }/>
                </Route>

                <Route exact path='/Collections/:collectionId' element={ <Collections /> } />
                <Route exact path='/CallChanges' element={ <CallChanges /> } />

                <Route path='*'element={ <ErrorPage /> } />
            </Routes>
            <Footer />
        </div>
    );
}