document.addEventListener('DOMContentLoaded', async () =>
{
    const type = window.location.href.split('=')[1];



    /*---------- Fetch the method from the API ----------*/
    const method = JSON.parse(sessionStorage.getItem('method'));
    if(type !== 'changes')
    {
        document.getElementById('title').innerText = method.title;
        document.title = method.title;
    }
    else
    {
        document.getElementById('title').innerText = 'Call Changes';
        document.getElementById('call_changes').innerHTML = '<div class="changes_settings">' +
                '<label for="numberOfBells">Bell number:' +
                    '<select name="numberOfBells" id="numberOfBells">' +
                        '<option value="4">4 Bells</option>' +
                        '<option value="5">5 Bells</option>' +
                        '<option value="6" selected>6 Bells</option>' +
                        '<option value="7">7 Bells</option>' +
                        '<option value="8">8 Bells</option>' +
                        '<option value="9">9 Bells</option>' +
                        '<option value="10">10 Bells</option>' +
                        '<option value="11">11 Bells</option>' +
                        '<option value="12">12 Bells</option>' +
                        '<option value="13">13 Bells</option>' +
                        '<option value="14">14 Bells</option>' +
                    '<option value="15">15 Bells</option>' +
                        '<option value="16">16 Bells</option>' +
                    '</select>' +
                '</label>' +
                '<label for="numberOfLeads">Leads between calls:' +
                    '<select name="numberOfLeads" id="numberOfLeads">' +
                        '<option value="1">1 lead</option>' +
                        '<option value="2"selected>2 leads</option>' +
                        '<option value="3">3 leads</option>' +
                        '<option value="4">4 leads</option>' +
                        '<option value="5">5 leads</option>' +
                    '</select>' +
                '</label>' +
                '<label for="callType">Call Type:' +
                    '<select name="callType" id="callType">' +
                        '<option value="Up" selected>Call Up</option>' +
                        '<option value="Down">Call Down</option>' +
                    '</select>' +
                '</label>' +
            '</div>' +
            '<div class="call_input">' +
                '<p>Input example:</p>' +
                '<p>"3 to 1, 3 Lead" or "2 to 3, 1 to 3"</p>' +
                '<p>"E to 9, A to 0" or "0 to E, T to A"</p>' +
                '<textarea id="CallChangeInput" placeholder="Input call changes"></textarea>' +
                '<input id="generate" type="button" value="Generate"/>'+
            '</div>';
        document.getElementById('call_changes').style.display = 'block';
        document.getElementById('bellNum').style.display = 'none';
        document.getElementById('bellNumLabel').style.display = 'none';
        document.title = 'Call Changes';
    }
    /*---------- End ----------*/



    /*---------- Generate the bell num list ----------*/
    const generateBellNumbers = () =>
    {
        for(let i=1; i<=method.stageNum; i++)
        {
            const bellNum = document.getElementById('bellNum');
            
            let num = i;

            if(i === 10)
                num = '0';
        
            if(i === 11)
                num = 'E';
            
            if(i === 12)
                num = 'T';
            
            if(i === 13)
                num = 'A';
            
            if(i === 14)
                num = 'B';
            
            if(i === 15)
                num = 'C';
            
            if(i === 16)
                num = 'D';
            
            if(i === 17)
                num = 'F';
            
            if(i === 18)
                num = 'G';
            
            if(i === 19)
                num = 'H';
            
            if(i === 20)
                num = 'J';
            
            if(i === 21)
                num = 'K';
            
            if(i === 22)
                num = 'L';


            bellNum.innerHTML += '<option value="' + num + '">Bell: ' + i + '</option>'
        }
    }
    if(type !== 'changes')
    {
        generateBellNumbers();
    }
    /*---------- End ----------*/



    /*---------- Generate the settings ----------*/
    const generateSettings = () =>
    {
        const settings = document.getElementById('settings');

        if(type !== 'changes')
        {
            if(method.stageNum % 2 !== 0)
            {
                settings.innerHTML += '<label for="coverBell"><input type="checkbox" id="coverBell" name="coverBell" checked>Have Cover bell</label>';
            }
            if(method.type !== 'Principle')
            {
                settings.innerHTML += '<label for="treble"><input type="checkbox" id="treble" name="treble" checked>Show Treble</label>';
            }
            settings.innerHTML += '<label for="numbers"><input type="checkbox" id="numbers" name="numbers" checked>Show Numbers</label>';
        }
        if(type !== 'diagram')
        {
            settings.innerHTML += '<label for="handstroke"><input type="checkbox" id="handstroke" name="handstroke" checked>Handstroke Gap</label>';
            settings.innerHTML += '<label for="sound"><input type="checkbox" id="sound" name="sound" checked>Sound On/Off</label>';
        }

        if(type !== 'changes' && type !== 'diagram')
        {
            settings.innerHTML += '<label for="interact"><input type="checkbox" id="interact" name="interact">Interact Yes/No</label>';
            settings.innerHTML += '<div class="button_container">' +
                '<div class="settings_button" id="info_button">Info</div>'+
                '<div class="settings_button"><a href="http://localhost:3000/diagram.html?type=diagram">Diagram</a></div>' +
                '</div>';
        }

    }
    generateSettings();
    /*---------- End ----------*/



    /*---------- Handle nav slider open and close ----------*/
    const nav_slider = document.getElementById('nav_slider');

    document.getElementById('menu_icon').addEventListener('click', () =>
    {
        nav_slider.classList.add('nav_open');
        document.body.classList.add('stop_scroll');
    });
    document.getElementById('close_icon').addEventListener('click', () =>
    {
        nav_slider.classList.remove('nav_open');
        document.body.classList.remove('stop_scroll');
    });
    /*---------- End ----------*/



    /*---------- Handle info slider open and close ----------*/
    const info_slider = document.getElementById('info_slider');
    const info_button = document.getElementById('info_button');
    if (info_button && info_slider)
    {
        info_button.addEventListener('click', () =>
        {
            info_slider.classList.add('info_open');
            document.body.classList.add('stop_scroll');
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        });
        document.getElementById('close_info').addEventListener('click', () =>
        {
            info_slider.classList.remove('info_open');
            document.body.classList.remove('stop_scroll');
        });
    }
    /*---------- End ----------*/



    /*---------- Display data on slider ----------*/
    const method_info = document.getElementById('method_info');
    if(type !== 'changes' && info_slider)
    {
        document.getElementById('info_title').innerText = method.title;
        method_info.innerHTML += '<dt>Short Name:</dt>';
        method_info.innerHTML += '<dd>' + method.name + '</dd>';

        method_info.innerHTML += '<dt>Method Type:</dt>';
        method_info.innerHTML += '<dd>' + method.type + '</dd>';

        method_info.innerHTML += '<dt>Notation:</dt>';
        method_info.innerHTML += '<dd>Short notation: ' + method.notation + '</dd>';

        method_info.innerHTML += '<dt>Symmetry:</dt>';
        method_info.innerHTML += '<dd>' + method.symmetry + '</dd>';

        method_info.innerHTML += '<dt>Lead length:</dt>';
        method_info.innerHTML += '<dd>' + method.lengthOfLead + '</dd>';

        if(method.numberOfHunts > 0)
        {
            method_info.innerHTML += '<dt>Hunt bell(s):</dt>';
            method_info.innerHTML += '<dd>Number of hunts: ' + method.numberOfHunts + '</dd>';
            method_info.innerHTML += '<dd>Hunt bell path: ' + method.huntbellPath + '</dd>';
        }

        if(method.firstDateTower !== null)
        {
            method_info.innerHTML += '<dt>First tower bell peal:</dt>';
            method_info.innerHTML += '<dd>Date: ' + method.firstDateTower + '</dd>';

            if(method.buildingTower)
                method_info.innerHTML += '<dd>Tower: ' + method.buildingTower + '</dd>';
            if(method.townTower)
                method_info.innerHTML += '<dd>Town/City: ' + method.townTower + '</dd>';
            if(method.countyTower)
                method_info.innerHTML += '<dd>County: ' + method.countyTower + '</dd>';
            if(method.societyTower)
                method_info.innerHTML += '<dd>Society: ' + method.societyTower + '</dd>';
        }

        if(method.firstDateHand !== null)
        {
            method_info.innerHTML += '<dt>First hand bell peal:</dt>';
            method_info.innerHTML += '<dd>Date: ' + method.firstDateHand + '</dd>';

            if(method.buildingHand)
                method_info.innerHTML += '<dd>Tower: ' + method.buildingHand + '</dd>';
            if(method.townHand)
                method_info.innerHTML += '<dd>Town/City: ' + method.townHand + '</dd>';
            if(method.countyHand)
                method_info.innerHTML += '<dd>County: ' + method.countyHand + '</dd>';
            if(method.societyHand)
                method_info.innerHTML += '<dd>Society: ' + method.societyHand + '</dd>';
        }
    }
    /*---------- End ----------*/
});