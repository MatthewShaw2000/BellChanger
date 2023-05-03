//Packages
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

//Components
import Canvas from '../components/canvas';

//Mui packages
import { Container } from '@mui/material';

//CSS
import '../css/components.css';




/**
 * Method page
 * 
 * Unused
 * 
 * @author Matthew Shaw
 * @returns JSX
 */
export default function MethodSingle()
{
    const [placeNotation, setPlaceNotation] = useState([]);
    const [plainCourse, setPlainCourse] = useState([]);


    const location = useLocation();
    const method = location.state;


    useEffect(() =>
    {
        document.title = method.type + ' | ' + method.title;
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, [method]);


    //Construct Placenotation
    useEffect(() =>
    {
        if(method !== undefined)
        {
            /*
                Split string into an array and push into a new array
                hyphens, commas and numbers (not full stops).
            */
            let shortNotation = []
            let holder = null;
            let notation = method.notation.split('');
            notation.forEach((value, index) =>
            {
                if(value === '-' || value === ',')
                {
                    shortNotation.push(value);
                }
                if((/^[0-9a-zA-Z]+$/).test(value))
                {
                    if(holder != null)
                    {
                        holder = '' + holder + value;
                    }
                    if(holder == null)
                    {
                        holder = value;
                    }
                    if(!(/^[0-9a-zA-Z]+$/).test(notation[index + 1]) || notation[index + 1] === undefined)
                    {
                        shortNotation.push(holder);
                        holder = null;
                    }
                }
            });



            /*
                Check if array has a comma and split both sides of the comma.
            */
            let leadHead = null;
            let leadHeadPos = null;
            shortNotation.forEach((value, index) =>
            {
                if(value === ',')
                {
                    if(index > ((shortNotation.length - 1) / 2))
                    {
                        leadHeadPos = 'right';
                    }
                    else
                    {
                        leadHeadPos = 'left';
                    }

                    if(leadHeadPos === 'right')
                    {
                        leadHead = shortNotation.splice(index + 1);
                        shortNotation.splice(index);
                    }
                    if(leadHeadPos === 'left')
                    {
                        leadHead = shortNotation.splice(0, index);
                        shortNotation = shortNotation.slice(index);
                    }
                }
            });



            /*
                Construct the full place notation.
            */
            let fullNotation = shortNotation;
            if(leadHeadPos === 'right')
            {
                fullNotation = shortNotation;
                let reverseNotation = shortNotation.slice(0, shortNotation.length-1).reverse();
                fullNotation = fullNotation.concat(reverseNotation, leadHead);
            }

            if(leadHeadPos === 'left')
            {
                fullNotation = leadHead;
                let reverseNotation = shortNotation.slice(0, shortNotation.length-1).reverse();
                fullNotation = fullNotation.concat(shortNotation, reverseNotation);
            }

            setPlaceNotation(fullNotation);
        }
    }, [method]);


    //Generate the method
    useEffect(() =>
    {
        if(placeNotation.length > 0)
        {
            let row = [];
            for(let i=0; i<parseInt(method.stageNum); i++)
            {
                switch(i+1)
                {
                    case 10:
                        row[i] = '0';
                        break;

                    case 11:
                        row[i] = 'E';
                        break;

                    case 12:
                        row[i] = 'T';
                        break;

                    case 13:
                        row[i] = 'A';
                        break;

                    case 14:
                        row[i] = 'B';
                        break;

                    case 15:
                        row[i] = 'C';
                        break;

                    case 16:
                        row[i] = 'D';
                        break;

                    case 17:
                        row[i] = 'F';
                        break;

                    case 18:
                        row[i] = 'G';
                        break;

                    case 19:
                        row[i] = 'H';
                        break;

                    case 20:
                        row[i] = 'J';
                        break;

                    case 21:
                        row[i] = 'K';
                        break;

                    case 22:
                        row[i] = 'L';
                        break;

                    default:
                        row[i] = (i+1).toString();
                }
            }



            let fullMethod = [].concat(row, row);

            const maxLeads = parseInt(method.stageNum) - parseInt(method.numberOfHunts);
            let lead = 0;

            while(lead < maxLeads)
            {
                for(let n=0; n<placeNotation.length; n++)
                {
                    let temp;
                    if(placeNotation[n] === '-')
                    {
                        for(let i=0; i<row.length; i+=2)
                        {
                            temp = row[i];
                            row[i] = row[i+1];
                            row[i+1] = temp;
                        }

                        fullMethod = fullMethod.concat(row);
                    }



                    if(placeNotation[n] !== '-')
                    {
                        let hold;
                        const place = placeNotation[n].split('');
                        for(let i=0; i<row.length; i++)
                        {
                            let bigNum = null;

                            if(i+1 === 10)
                              bigNum = '0';
                            
                            if(i+1 === 11)
                              bigNum = 'E';
                            
                            if(i+1 === 12)
                              bigNum = 'T';
                            
                            if(i+1 === 13)
                              bigNum = 'A';
                            
                            if(i+1 === 14)
                              bigNum = 'B';
                            
                            if(i+1 === 15)
                              bigNum = 'C';
                            
                            if(i+1 === 16)
                              bigNum = 'D';
                            
                            if(i+1 === 17)
                              bigNum = 'F';
                            
                            if(i+1 === 18)
                              bigNum = 'G';
                            
                            if(i+1 === 19)
                              bigNum = 'H';
                            
                            if(i+1 === 20)
                              bigNum = 'J';
                            
                            if(i+1 === 21)
                              bigNum = 'K';
                            
                            if(i+1 === 22)
                              bigNum = 'L';


                            if(place.includes((i+1).toString()) || place.includes(bigNum) || i === hold)
                            {
                                continue;
                            }
                            else
                            {
                                temp = row[i];
                                row[i] = row[i+1];
                                hold = i+1;
                                row[i+1] = temp;
                            }
                        }

                        fullMethod = fullMethod.concat(row);
                    }
                }
                lead++;
            }
            fullMethod = fullMethod.concat(row, row);
            setPlainCourse(fullMethod);
        }
    }, [placeNotation, method]);



    return(
        <main>
            <Container maxWidth='md'>
                <h2>{method !== undefined && method.title}</h2>
                <Canvas 
                    plainCourse={plainCourse} 
                    numRows={plainCourse.length / method.stageNum}
                    numCols={method.stageNum}
                    type={method.type}
                />
            </Container>
        </main>
    );
}