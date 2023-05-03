//Packages
import { useState, useEffect, useRef } from 'react';

//Components
import Controls from '../components/controls';
import Settings from './settings';

//CSS
import '../css/mediaQuerys.css';


/**
 * Canvas
 * 
 * Unused
 * 
 * @author Matthew Shaw
 * @param {*} props 
 * @returns JSX
 */
export default function Canvas(props)
{
    const [playing, setPlaying] = useState(false);
    const [selectedBell, setSelectedBell] = useState('2');
    const [speed, setSpeed] = useState(5);
    const [sound, setSound] = useState(true);
    const [treble, setTreble] = useState(true);

    const canvasRef = useRef(null);
    const rowRef = useRef(0);
    const colRef = useRef(0);
    const indexRef = useRef(0);
    const playingRef = useRef(false);

    

    useEffect(() =>
    {
        /*
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let animationFrameId;
        const cellSize = canvas.width / props.numCols;
        canvas.height = 500;


        const playBell = (note) =>
        {
            let audio;
            audio = new Audio('http://localhost:3000/sound/bell' + note + '.mp3');
            audio.loop = false;
            audio.play();
        }

        const draw = () =>
        {
            const row = rowRef.current;
            const col = colRef.current;
            const index = indexRef.current;
            const playing = playingRef.current;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for(let i=row; i<props.numRows; i++)
            {
                for(let j=0; j<props.numCols; j++)
                {
                    const cellValue = props.plainCourse[i * props.numCols + j];
                    const x = j * cellSize;
                    const y = (i - row) * cellSize;

                    //Grid
                    ctx.fillStyle = '#E6E6E6';
                    ctx.fillRect(x, y, cellSize, cellSize);

                    //Text
                    ctx.font = '20px Arial';
                    ctx.textAlign = 'center';


                    if(cellValue === '1' && treble && props.type !== 'Principle' && props.type !== 'changes')
                    {
                        ctx.fillStyle = 'red';
                    }
                    else if(cellValue === selectedBell && props.type !== 'changes')
                    {
                        ctx.fillStyle = 'blue';
                    }
                    else
                    {
                        ctx.fillStyle = '#1B1B1B';
                    }

                    ctx.fillText(cellValue, x + cellSize / 2, y + cellSize / 2);

                    if(i - row === 0 && j === col)
                    {
                        console.log('Highlighting cell with value: ' + cellValue);
                        
                        if(sound && playing)
                        {
                            playBell(cellValue);
                        }

                        ctx.fillStyle = '#8d8d8d66';
                        ctx.fillRect(x, y, cellSize, cellSize);
                    }
                }
            }

            indexRef.current++;
            if(index > props.numCols)
            {
                indexRef.current = 0;
                colRef.current = 0;
                rowRef.current++;

                if(row >= props.numRows)
                {
                    playingRef.current = false;
                }
            }
            else
            {
                if(playing)
                    colRef.current++;
            }

            if(playing)
            {
                animationFrameId = setTimeout(draw, speed);
            }
        };

        draw();

        return() =>
        {
            clearTimeout(animationFrameId);
        };
        */
    }, [playing, props.plainCourse, props.numRows, props.numCols, props.type, speed, selectedBell, sound, treble])


    const playingHandler = (value) =>
    {
        setPlaying(value);
        playingRef.current = value;
    }

    const resetHandler = () =>
    {
        rowRef.current = 0;
        colRef.current = 0;
        indexRef.current = 0;

        setPlaying(false);
        playingRef.current = false;
    }

    const selectedBellHandler = (value) => setSelectedBell(value);
    const speedHandler = (value) => setSpeed(value);
    const soundHandler = (value) => setSound(value);
    const trebleHandler = (value) => setTreble(value);



    return(
        <div className='canvas_container'>
            <canvas ref={canvasRef} id='canvas'/>
            
            <div className='user_controls'>
                <Controls 
                    playing={playing}
                    playingHandler={playingHandler}
                    selectedBell={selectedBell}
                    selectedBellHandler={selectedBellHandler}
                    speed={speed}
                    speedHandler={speedHandler}
                    resetHandler={resetHandler}
                    stageNum={props.numCols}
                    type={props.type}
                />

                <Settings soundHandler={soundHandler} trebleHandler={trebleHandler} type={props.type}/>
            </div>
        </div>
    );
}