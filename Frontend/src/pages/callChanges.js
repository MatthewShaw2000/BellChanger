//Packages
import { useState, useEffect } from 'react';

//Components
import CallChangeInput from '../components/callChangeInput';
import Canvas from '../components/canvas';

//Mui packages
import { Container } from '@mui/material';


/**
 * Call changes page
 * 
 * unused
 * 
 * @author Matthew Shaw
 * @returns JSX
 */
export default function CallChanges()
{
    const [inputCalls, setInputCalls] = useState('');
    const [bellNum, setBellNum] = useState(6);
    const [leads, setleads] = useState(1);
    const [callType, setCallType] = useState('Up');
    const [method, setMethod] = useState([]);


    useEffect(() =>
    {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, []);


    //Generate Method
    useEffect(() =>
    {
        let fullMethod = [];
        let row = [];

        for(let i=0; i<bellNum; i++)
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

        for(let i=0; i<leads*2; i++)
        {
            fullMethod = fullMethod.concat(row);
        }

        let newCalls = [];
        const calls = inputCalls.split('');
        calls.forEach(value =>
            {
                if((/^[0-9A-Z]+$/).test(value))
                {
                    newCalls.push(value);
                }
            });


        for(let i=0; i<newCalls.length; i+=2)
        {
            let hold = null;
            let bell_up = null;
            let bell_down = null;

            if(callType === 'Up')
            {
                bell_up = row.indexOf(newCalls[i]);
                bell_down = row.indexOf(newCalls[i+1]);
            }

            if(callType === 'Down')
            {
                bell_down = row.indexOf(newCalls[i]);
                bell_up = row.indexOf(newCalls[i+1]) + 1;
            }

            if(bell_down - bell_up > 1)
            {
                alert('You cannot move a bell more than 1 place!');
                break;
            }

            hold = row[bell_up];
            row[bell_up] = row[bell_down];
            row[bell_down] = hold;

            for(let i=0; i<leads*2; i++)
            {
                fullMethod = fullMethod.concat(row);
            }
        }
        setMethod(fullMethod);
    }, [inputCalls, bellNum, leads, callType]);


    const inputHandler = (value) => setInputCalls(value);
    const bellNumHandler = (value) => setBellNum(value);
    const leadsHandler = (value) => setleads(value);
    const callTypeHandler = (value) => setCallType(value);



    return(
        <main>
            <Container maxWidth='md'>
                <h2>Call Changes</h2>
                <CallChangeInput 
                    inputCalls={inputCalls} 
                    bellNum={bellNum} 
                    leads={leads} 
                    callType={callType} 
                    inputHandler={inputHandler} 
                    bellNumHandler={bellNumHandler} 
                    leadsHandler={leadsHandler} 
                    callTypeHandler={callTypeHandler}/>
                <Canvas 
                    plainCourse={method} 
                    numRows={method.length / bellNum}
                    numCols={bellNum}
                    type='changes'
                />
            </Container>
        </main>
    );
}