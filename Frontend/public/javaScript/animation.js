document.addEventListener('DOMContentLoaded', () =>
{
    const canvas = document.getElementById('canvas');
    canvas.height = 400;
    const ctx = canvas.getContext('2d');



    const type = window.location.href.split('=')[1];
    const method = JSON.parse(sessionStorage.getItem('method'));

    /**
     * Construct place notation
     * 
     * Constructs the full place notation needed to build the method.
     * 
     * @author Matthew Shaw
     * @returns Full place notation
     */
    const constructPlaceNotation = () =>
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

        return fullNotation;
    }



    let coverBell = true;
    let maxNumber;

    /**
     * Contsruct plaincourse
     * 
     * Using the place notation to build a full plain course of the selected method.
     * 
     * @author Matthew Shaw
     * @param {*} placeNotation - Full place notation made in the function above.
     * @param {*} cover - boolean if the method will have a cover bell
     * @returns The full plaincourse
     */
    const constructPlainCourse = (placeNotation, cover) =>
    {
        let row = [];

        maxNumber = parseInt(method.stageNum);

        if(cover)
        {
            maxNumber = parseInt(method.stageNum) + 1;
        }


        //Populate the row array
        for(let i=0; i<maxNumber; i++)
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

        let maxLeads = parseInt(method.stageNum) - parseInt(method.numberOfHunts);
        let lead = 0;

        if(maxLeads === 0)
        {
            maxLeads = 1;
        }


        //Build plaincourse
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


                        if(place.includes((i+1).toString()) || place.includes(bigNum) || i === hold || i+1 === maxNumber)
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
        return fullMethod;
    }



    /**
     * Construct call changes
     * 
     * Uses user inputted calls to build a full method diagram.
     * 
     * @author Matthew Shaw
     * @param {*} bellNum - number of bells
     * @param {*} leads - leads between calls
     * @param {*} callType - Calling up or down
     * @param {*} inputCalls - user inputted calls
     * @returns Full method
     */
    const constructCallChanges = (bellNum, leads, callType, inputCalls) =>
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
                if((/^[0-9A-Z]+$/).test(value) || (/l/).test(value))
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
        return fullMethod;
    }

    let plainCourse;
    let stageNum = 6;
    let leads = 2;
    let call_type = 'Up';

    let placeNotation;

    let cellSize;
    let numRows;
    let numCols;

    if(type !== 'changes')
    {
        if(method.stageNum % 2 === 0)
        {
            coverBell = false;
        }
        placeNotation = constructPlaceNotation();
        const fullMethod = constructPlainCourse(placeNotation, coverBell);

        plainCourse = fullMethod;

        cellSize = canvas.width / maxNumber;
        numRows = plainCourse.length / maxNumber;
        numCols = maxNumber;
    }
    else
    {
        const numberOfBells = document.getElementById('numberOfBells');
        numberOfBells.addEventListener('change', () =>
        {
            stageNum = numberOfBells.value;
        });

        const numberOfLeads = document.getElementById('numberOfLeads');
        numberOfLeads.addEventListener('change', () =>
        {
            leads = numberOfLeads.value;
            console.log(leads);
        });

        const callType = document.getElementById('callType');
        callType.addEventListener('change', () =>
        {
            call_type = callType.value;
            console.log(call_type);
        });

        let fullMethod = constructCallChanges(stageNum, leads, call_type, '');

        plainCourse = fullMethod;



        cellSize = canvas.width / stageNum;
        numRows = plainCourse.length / stageNum;
        numCols = stageNum;
    }


    const soundUrls = [
        'http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/sound/bell1.mp3',
        'http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/sound/bell2.mp3',
        'http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/sound/bell3.mp3',
        'http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/sound/bell4.mp3',
        'http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/sound/bell5.mp3',
        'http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/sound/bell6.mp3',
        'http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/sound/bell7.mp3',
        'http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/sound/bell8.mp3',
        'http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/sound/bell9.mp3',
        'http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/sound/bell0.mp3',
        'http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/sound/bellE.mp3',
        'http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/sound/bellT.mp3',
        'http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/sound/bellA.mp3',
        'http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/sound/bellB.mp3',
        'http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/sound/bellC.mp3',
        'http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/sound/bellD.mp3',
        'http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/sound/bellF.mp3',
        'http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/sound/bellG.mp3',
        'http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/sound/bellH.mp3',
        'http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/sound/bellJ.mp3',
        'http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/sound/bellK.mp3',
        'http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/sound/bellL.mp3'
    ];

    const sounds = new Array(soundUrls.length);

    // Preload all sound files
    for (let i = 0; i < soundUrls.length; i++)
    {
        sounds[i] = new Howl({
        src: [soundUrls[i]],
        preload: true
        });
    }
    

    /**
     * Play bell
     * 
     * Plays the sound corresponding with the bell number.
     * 
     * @author Matthew Shaw
     * @param {*} note - bell number currently hightlighted
     */
    const playBell = (note) =>
    {
        switch(note)
        {
            case '0':
                sounds[9].play();
                break;

            case 'E':
                sounds[10].play();
                break;

            case 'T':
                sounds[11].play();
                break;

            case 'A':
                sounds[12].play();
                break;

            case 'B':
                sounds[13].play();
                break;

            case 'C':
                sounds[14].play();
                break;

            case 'D':
                sounds[15].play();
                break;

            case 'F':
                sounds[16].play();
                break;

            case 'G':
                sounds[17].play();
                break;

            case 'H':
                sounds[18].play();
                break;

            case 'J':
                sounds[19].play();
                break;

            case 'K':
                sounds[20].play();
                break;

            case 'L':
                sounds[21].play();
                break;

            default:
                sounds[note - 1].play();
        }
    }


    let interact = false;

    let index = 0;
    let col = 0;
    let row = 0;

    let playing = false;
    let speed = 5;
    let selectedBell = '1';
    let treble = true;
    let sound = true;
    let handstrokeGap = true;
    let numbers = true;



    /**
     * Draw
     * 
     * Draws the diagram and plays the method.
     * 
     * @author Matthew Shaw
     */
    const draw = () =>
    {
        let xCoordsTreble = [];
        let yCoordsTreble = [];
        let xCoordsSelectBell = [];
        let yCoordsSelectBell = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for(let i=0; i<numRows; i++)
        {
            for(let j=0; j<numCols; j++)
            {
                const cellValue = plainCourse[i * numCols + j];
                const x = j * cellSize;
                const y = (i - row) * cellSize;


                //Grid
                //ctx.beginPath();
                ctx.fillStyle = '#E6E6E6';
                ctx.fillRect(x, y, cellSize, cellSize);

                //Text
                ctx.font = '15px Arial';
                ctx.textAlign = 'center';
                ctx.lineWidth = 3;

                ctx.beginPath();
                if(cellValue === '1' && treble && (method && method.type !== 'Principle') && type !== 'changes')
                {
                    ctx.strokeStyle = 'red';

                    //Coordinats of the treble bell line
                    if(xCoordsTreble.length < numRows)
                    {
                        xCoordsTreble.push(x + cellSize/2);
                        yCoordsTreble.push(y + cellSize/2);
                    }

                    if(xCoordsTreble.length === numRows)
                    {
                        for(let a=0; a<xCoordsTreble.length; a++)
                        {
                            
                            if(xCoordsTreble[a+1] !== undefined)
                            {
                                ctx.moveTo(xCoordsTreble[a], yCoordsTreble[a]);
                                ctx.lineTo(xCoordsTreble[a+1], yCoordsTreble[a+1]);
                            }
                            
                        }
                    }
                }
                else if(cellValue === selectedBell && type !== 'changes')
                {
                    ctx.strokeStyle = 'blue';

                    //Coordinates of the selected bell line
                    if(xCoordsSelectBell.length < numRows)
                    {
                        xCoordsSelectBell.push(x + cellSize/2);
                        yCoordsSelectBell.push(y + cellSize/2);
                    }

                    if(xCoordsSelectBell.length === numRows)
                    {
                        for(let a=0; a<xCoordsSelectBell.length; a++)
                        {
                            if(xCoordsSelectBell[a+1] !== undefined)
                            {
                                ctx.moveTo(xCoordsSelectBell[a], yCoordsSelectBell[a]);
                                ctx.lineTo(xCoordsSelectBell[a+1], yCoordsSelectBell[a+1]);
                            }
                        }
                    }
                }
                else if(!numbers)
                {
                    ctx.fillStyle = '#E6E6E6';
                }
                else
                {
                    ctx.fillStyle = '#1B1B1B';
                }
                ctx.stroke();


                ctx.fillText(cellValue, x + cellSize / 2, y + cellSize / 2 + 5);




                if(i - row === 0 && j === col)
                {
                    //console.log('Highlighting cell with value: ' + cellValue + ' at coords x: ' + x + ' | y: ' + y);

                    if(sound && playing)
                    {
                        if(interact && cellValue !== selectedBell)
                        {
                            playBell(cellValue);
                        }
                        else if(!interact)
                        {
                            playBell(cellValue);
                        }
                    }

                    ctx.fillStyle = '#8d8d8d66';
                    ctx.fillRect(x, y, cellSize, cellSize);
                }
            }
        }

        if(playing)
            index++;

        if (index >= numCols)
        {
            index = 0;
            col = 0;
            row++;

            if(row % 2 === 0 && handstrokeGap)
            {
                playing = false;
                setTimeout(() =>
                {
                    playing = true;
                    draw();
                }, 150);
            }
            else if (row >= numRows) {
                playing = false;
            }
        } 
        else 
        {
            if(playing)
            {
                col++;
            }
        }
        if(playing)
        {
            setTimeout(() => {
                draw();
            }, 1000 / speed);
        }
    }




    document.getElementById('play').addEventListener('click', () =>
    {
        if(!playing)
        {
            playing = true;
            requestAnimationFrame(draw);
        }
    });

    document.getElementById('pause').addEventListener('click', () =>
    {
        if(playing)
        {
            playing = false;
            //console.log('pause');
        }
    });

    document.getElementById('reset').addEventListener('click', () =>
    {
        playing = false;
        index = 0;
        col = 0;
        row = 0;
        draw();
        //console.log('reset');
    });

    const bellNumSelect = document.getElementById('bellNum');
    bellNumSelect.addEventListener('change', () =>
    {
        selectedBell = bellNumSelect.value;
        if(!playing)
        {
            draw();
        }
        if(playing)
        {
            playing = false;
            draw();
            playing = true;
        }
        //console.log(selectedBell);
    });

    let slider = document.getElementById('range');
    speed = slider.value;
    slider.addEventListener('input', () =>
    {
        speed = slider.value;
        //console.log(speed);
    });



    /*---------- Settings inputs ----------*/
    const ChangeCoverBell = document.getElementById('coverBell');
    if(ChangeCoverBell)
    {
        ChangeCoverBell.addEventListener('click', () =>
        {
            coverBell = ChangeCoverBell.checked;

            const newCourse = constructPlainCourse(placeNotation, ChangeCoverBell.checked);

            //console.log(newCourse);

            plainCourse = newCourse;


            cellSize = canvas.width / maxNumber;
            numRows = plainCourse.length / maxNumber;
            numCols = maxNumber;

            playing = false;
            index = 0;
            col = 0;
            row = 0;
            draw();

            //console.log('Cover Bell: ' + coverBell);
        });
    }

    const trebleOnOff = document.getElementById('treble');
    if(trebleOnOff)
    {
        trebleOnOff.addEventListener('click', () =>
        {
            treble = trebleOnOff.checked;
            if(!playing)
            {
                draw();
            }
            if(playing)
            {
                playing = false;
                draw();
                playing = true;
            }
            //console.log('Treble: ' + treble);
        });
    }

    const showNumbers = document.getElementById('numbers');
    if(showNumbers)
    {
        showNumbers.addEventListener('click', () =>
        {
            numbers = showNumbers.checked;
            if(!playing)
            {
                draw();
            }
            if(playing)
            {
                playing = false;
                draw();
                playing = true;
            }
            //console.log('Numbers: ' + showNumbers.checked);
        });
    }

    const handstroke = document.getElementById('handstroke');
    if(handstroke)
    {
        handstroke.addEventListener('click', () =>
        {
            handstrokeGap = handstroke.checked;
            //console.log('Handstroke: ' + handstrokeGap);
        });
    }

    const soundOnOff = document.getElementById('sound');
    if(soundOnOff)
    {
        soundOnOff.addEventListener('click', () =>
        {
            sound = soundOnOff.checked;
            //console.log('Sound: ' + sound);
        });
    }

    const userInteract = document.getElementById('interact');
    if(userInteract)
    {
        userInteract.addEventListener('click', () =>
        {
            interact = userInteract.checked;
            //console.log('Interact: ' + interact);
        });
    }

    canvas.addEventListener('click', () =>
    {
        if(interact)
        {
            playBell(selectedBell);
        }
    });




    /*---------- Call Changes ----------*/
    const generate = document.getElementById("generate");
    if(generate)
    {
        generate.addEventListener("click", () =>
        {
            const calls = document.getElementById("CallChangeInput").value;
            const newCourse = constructCallChanges(stageNum, leads, call_type, calls);

            //console.log(newCourse);

            plainCourse = newCourse;


            cellSize = canvas.width / stageNum;
            numRows = plainCourse.length / stageNum; //method.stageNum
            numCols = stageNum;

            playing = false;
            index = 0;
            col = 0;
            row = 0;
            draw();
        });
    }


    draw();
});