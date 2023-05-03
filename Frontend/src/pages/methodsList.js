import { useState, useEffect } from 'react';

//Components
import Method from '../components/method';
import Filter from '../components/filter';
import Paginate from '../components/paginate';
import Loader from '../components/loader';

//Mui packages
import { Container } from '@mui/material';




/**
 * Method list page
 * 
 * Outputs all the methods retrieved from the database.
 * 
 * @author Matthew Shaw
 * @param {*} props 
 * @returns JSX
 */
export default function MethodsList(props)
{
    const [page, setPage] = useState(0);

    const [searchValue, setSearchValue] = useState('');
    const [typeSelect, setTypeSelect] = useState('All');
    const [stageSelect, setStageSelect] = useState('All');
    const [collectionSelect, setCollectionSelect] = useState('None');
    const [numberOfHunts, setNumberOfHunts] = useState('All');
    const [sortBy, setSortBy] = useState('AZ');



    //UseEffects
    useEffect(() =>
    {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        document.title = 'Methods | BellChanger';
    }, [page]);

    useEffect(() =>
    {
        setPage(0);
    }, [searchValue, typeSelect, stageSelect, sortBy]);



    //Handlers
    const searchHandler = (value) => setSearchValue(value)
    const typeSelectHandler = (value) => setTypeSelect(value);
    const stageSelectHandler = (value) => setStageSelect(value);
    const collectionSelectHandler = (value) => setCollectionSelect(value);
    const numberOfHuntsSelectHandler = (value) => setNumberOfHunts(value);
    const sortByHandler = (value) => setSortBy(value);



    //Filters
    const searchMethods = (value) =>
    {
        return(
            value.title.toLowerCase().includes(searchValue.toLowerCase())
            ||
            value.name.toLowerCase().includes(searchValue.toLowerCase())
        );
    }

    const selectType = (value) =>
    {
        return(
            (value.type.toLowerCase() === typeSelect.toLowerCase())
            ||
            (typeSelect === 'All')
        );
    }

    const selectStage = (value) =>
    {
        return(
            (value.stageNum === stageSelect)
            ||
            (stageSelect === 'All')
        );
    }

    const selectCollection = (value) =>
    {
        return(
            (value.collection === collectionSelect)
            ||
            (collectionSelect === 'None')
        );
    }

    const selectNumberOfLeads = (value) =>
    {
        return(
            (value.numberOfHunts === numberOfHunts)
            ||
            (numberOfHunts === 'All')
        );
    }



    //Method list sort
    const sortMethods = (a, b) =>
    {
        switch(sortBy)
        {
            case 'ZA':
                return(
                    a.title.toLowerCase() < b.title.toLowerCase()
                    ?
                    1
                    :
                    -1
                );

            case 'H':
                return( b.stageNum - a.stageNum );

            case 'L':
                return( a.stageNum - b.stageNum );

            default:
                return(
                    a.title.toLowerCase() > b.title.toLowerCase()
                    ?
                    1
                    :
                    -1
                );
        }
    }



    //Paginate functions
    const methodsPerPage = 20;

    const numberOfMethodsViewed = page * methodsPerPage;


    const methodsPaginated = props.methods.sort(sortMethods).filter(searchMethods).filter(selectType).filter(selectStage).filter(selectCollection).filter(selectNumberOfLeads).slice(
        numberOfMethodsViewed, numberOfMethodsViewed + methodsPerPage
    );

    const totalMethods = props.methods.sort(sortMethods).filter(searchMethods).filter(selectType).filter(selectStage).filter(selectCollection).filter(selectNumberOfLeads).length;
    const totalPages = Math.ceil(totalMethods / methodsPerPage);

    const changePage = ({selected}) =>
    {
        setPage(selected);
    }






    const methodList = methodsPaginated.map((data) =>
        <Method method={data} key={data.method_id} />
    );

    return(
        <main>
            <Container maxWidth='md'>
                <div className='methodList_header'>
                    <h2>Methods</h2>
                    <p>{totalMethods} methods found</p>
                </div>

                <Filter
                    type={props.type}
                    stage={props.stage}
                    collections={props.collections}

                    searchValue={searchValue}
                    searchHandler={searchHandler}
                    typeSelect={typeSelect}
                    typeSelectHandler={typeSelectHandler}
                    stageSelect={stageSelect}
                    stageSelectHandler={stageSelectHandler}
                    collectionSelect={collectionSelect}
                    collectionSelectHandler={collectionSelectHandler}
                    numberOfHunts={numberOfHunts}
                    numberOfHuntsSelectHandler={numberOfHuntsSelectHandler}
                    sortBy={sortBy}
                    sortByHandler={sortByHandler}
                />

                <div className='list_container'>
                    {
                        !props.methods || props.status === 'Loading'
                        ?
                        <Loader />
                        :
                        methodList
                    }
                    {
                        (totalMethods < 1 && props.totalMethods)
                        &&
                        <p>No methods have been found</p>
                    }
                    {
                        props.status === 'Error'
                        &&
                        <p>Error</p>
                    }
                </div>

                <Paginate totalPages={totalPages} changePage={changePage} />
            </Container>
        </main>
    );
}