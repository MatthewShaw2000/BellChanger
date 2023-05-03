document.addEventListener('DOMContentLoaded', () =>
{
    const canvas = document.getElementById('canvas');
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


    let plainCourse;

    let placeNotation;

    let cellSize;
    let numRows;
    let numCols;



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


    let row = 0;

    let selectedBell = '1';
    let treble = true;
    let numbers = true;



    /**
     * Draw
     * 
     * Draws the diagram.
     * 
     * @author Matthew Shaw
     */
    const draw = () =>
    {
        canvas.height = cellSize * numRows;
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
            }
        }
    }



    const bellNumSelect = document.getElementById('bellNum');
    bellNumSelect.addEventListener('change', () =>
    {
        selectedBell = bellNumSelect.value;
        draw();
        //console.log(selectedBell);
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
            draw();
            //console.log('Treble: ' + treble);
        });
    }

    const showNumbers = document.getElementById('numbers');
    if(showNumbers)
    {
        showNumbers.addEventListener('click', () =>
        {
            numbers = showNumbers.checked;
            draw();
            //console.log('Numbers: ' + showNumbers.checked);
        });
    }


    draw();
});