
/*
апдейт запрос при детекте трека
добавить функцию проверки запроса
Добавление в папки!!!
Доделать редактирование!!!!
Дать формам имена и отправлять отдельно addtrackform 
Доделать регистрацию

*/
let requestFile = "forRequests.php";

fetch(requestFile+'/?getlogin=go')
        .then(response => response.text())
        .then(result => {
            if(result){
                // alert(result);
                $('.navigate').show();
                $('#inputsearch').show();
                $('#logintext').show();
                $('.divhider').hide();
                $('#divforloginform').hide();

                updatefolders();
                showlastsongs();
            }
            else{
                $('.navigate').hide();
                $('#inputsearch').hide();
                $('#logintext').hide();
                $('.divhider').show();

                $('#divforloginform').load('loginform.html');
                // alert('Empty session :(');
            }
        });

function sendform(formid){
    const form = document.getElementById(formid);
    fetch('' , {
      method: "POST",
      body: new FormData(form),
    });
}

//////////////////////////////////////// BEFORE LOGIN ////////////////////////////////////////

function checkInputKey(inputid) {
    let input = document.getElementById(inputid)
    if (input.value!='') {
        input.style.borderColor = "#ccc";
        submitregisterbutton.innerText = 'Зарегистрироваться';
        submitloginbutton.innerText = 'Войти';
    }
}

function checkInput(){
    let validated = true;
    if(inputmail){
        if (inputmail.value=='') {
            inputmail.style.borderColor = "#ee3e61";
            validated = false;
        }
        else{
          inputmail.style.borderColor = "#ccc";
        }
    }
    if (inputlogin.value=='') {
        inputlogin.style.borderColor = "#ee3e61";
        validated = false;
    }
    else{
      inputlogin.style.borderColor = "#ccc";
    }
    if (inputpass.value=='') {
        inputpass.style.borderColor = "#ee3e61";
        validated = false;
    }
    else{
      inputpass.style.borderColor = "#ccc";
    }
    if (inputpassagain.value=='') {
        inputpassagain.style.borderColor = "#ee3e61";
        validated = false;
    }
    else{
      inputpassagain.style.borderColor = "#ccc";
    }
    return validated;
}

function submitRegister(){
    let validated = checkInput();
    if(validated){
        sendform('registerloginform');
    }
    else{
        submitregisterbutton.innerText = 'Пожалуйста, заполните поля';
    }
}

function submitLogin(){
    let validated = checkInput();
    if(validated){
        sendform('submitloginbutton');
    }
    else{
        submitloginbutton.innerText = 'Пожалуйста, заполните поля';
    }
}


function showRegister(){
    $('.regbutton').hide();
    $('.submitloginbutton').hide();
    $('.submitregisterbutton').show();
    $('#inputmail').show();
    $('#inputpassagain').show();


}

//////////////////////////////////////// AFTER LOGIN ////////////////////////////////////////

function searchKey(){
    if(inputsearch.value)
    {
        fetch(requestFile+'/?search='+inputsearch.value)
            .then(response => response.json())
            .then(result => {
                if(result){
                    let finalOut = '';
                    let index_song = '';
                    let trackid = '';
                    mainblock.innerHTML = "<div class=''><h2>Результаты поиска среди ваших композиций:</h2>";
                    $('#mainblock').append(function(){
                        if(!result[0]['isEmpty']){
                            for (var i = 0; i < result.length; i++) {
                                index_song = result[i]['index_song'];
                                trackid = result[i]['id'];
                                finalOut += '<div onclick="clicktrack('+trackid+')" class="track hoverbutton" name="songbutton" id="selectsongid'+result[i]['id']+'">'+index_song+'</div>';
                            }
                            return finalOut + '</div><div class=""><h2>Результаты глобального поиска:</h2>' + '<div onclick="clicktrack(none)" class="track hoverbutton" name="songbutton" id="selectsongid3333">The Qemists - Run You</div>';
                        }
                        else{
                            return '<div class="track">Нет результатов</div>' + '</div>';
                        }
                    });                 
                }
            });
    }
    else
    {
        showlastsongs();
    }
}

// login.onclick = function(eventlogin) {
//     alert("Login form will be here");
//     let textt = "text";
//     var xhttp = new XMLHttpRequest();
//     xhttp.open("get", "info.txt");
//     xhttp.send("this");
//     xhttp.responseType = 'text';
// }

function updatefolders(){
    fetch(requestFile+'/?updatefolders=go')
        .then(response => response.json())
        .then(result => {
            folders.innerHTML = "";
            $('.folders').append(function(){
                if(!result[0]['isEmpty']){
                    let finalOut = '';
                    for (var i = 0; i < result.length; i++) {
                        let folderid = String(result[i]['id']);
                        finalOut += '<div onclick="clickfolder('+folderid+')" class="folder hoverbutton" name="folderbutton" id="selectfolderid'+folderid+'">'+result[i]['foldername']+'</div>';
                    }
                    return finalOut;
                }
                else{
                    return '<div class="folder"> - - Здесь ничего нет - - </div>';
                }

            });
        }); 
}

function showlastsongs(){
    fetch(requestFile+'/?showlastsongs=go')
        .then(response => response.json())
        .then(result => {
            let finalOut = '';
            let index_song = '';
            let trackid = '';
            mainblock.innerHTML = "<div class=''><h2>Последние добавленные:</h2>";
            $('#mainblock').append(function(){
                if(!result[0]['isEmpty']){
                for (var i = 0; i < result.length; i++) {
                    index_song = result[i]['index_song'];
                    trackid = result[i]['id'];
                    finalOut += '<div onclick="clicktrack('+trackid+')" class="track hoverbutton" name="songbutton" id="selectsongid'+result[i]['id']+'">'+index_song+'</div>';
                }
                return finalOut + '</div>';
                }
                else{
                    return '<div class="track">Нет результатов</div>' + '</div>';
                }
            });
        });
}
 
addfolder.onclick = function(){
    $('.folders').append(function(){
        return '<div class="addfolder" id="addfolderdiv"><input type="text" id="inputaddfolder" onblur="clearDiv(addfolderdiv)" onkeypress="addFolder(event)"></div>';
    });
    $('#inputaddfolder').focus();
}

function clearDiv(id){
    id.remove();
}

function addFolder(event){
    if (event.keyCode == 13) {
        fetch(requestFile+'/?addfolder='+String($('#inputaddfolder').val()))
        .then(response => response.text())
        .then(result => {
            if(result){
                alert(result);
            }
            else{
                updatefolders();
            }
        });
    }
}

addtrack.onclick = function(){
    addtrackFunction(); }
function addtrackFunction(){
    $('#mainblock').load('addtrack.html');
    fetch(requestFile+'/?updatefolders=go')
        .then(response => response.json())
        .then(result => {
            if(result){
                let finalOut = '';
                $('.insideform').append(function(){
                    for (var i = 0; i < result.length; i++) {
                        finalOut += '<input class="boxfolder" type="checkbox" name="folderboxes[]" id="folderid'+result[i]['id']+'" value="'+result[i]['id']+'"><label for="folderid'+result[i]['id']+'"> '+result[i]['foldername']+'</label><br>'; 
                    }
                    return finalOut;
                });
            }
        }); 
}

function submitTrackAndSend(){
    sendform('addtrackform');
    clicktrack(inputartist.value + ' - ' + inputsong.value);
}

function clickfolder(ffolderid){
    fetch(requestFile+'/?folder='+ffolderid)
        .then(response => response.json())
        .then(result => {
            $('.folder').removeClass("borderselect");
            $('#selectfolderid'+ffolderid).addClass("borderselect");
            if(result){
                let finalOut = '';
                tracks.innerHTML = "";
                $('.tracks').append(function(){
                    if(!result[0]['isEmpty']){
                        for (var i = 0; i < result.length; i++) {
                            let trackid = String(result[i]['id']);
                            finalOut += '<div onclick="clicktrack('+trackid+')" class="track hoverbutton" name="songbutton" id="selectsongid'+result[i]['id']+'">'+result[i]['artist']+" - "+result[i]['song_name']+'</div>';
                        }
                        return finalOut;
                    }
                    else{
                        return '<div class="track">Нет результатов</div>' + '</div>';
                    }
                });
            }
        });
}

function clicktrack(ftrackid){
    fetch(requestFile+'/?song='+ftrackid)
        .then(response => response.json())
        .then(result => {
            $('.track').removeClass("borderselect");
            $('#selectsongid'+ftrackid).addClass("borderselect");
            let finalOut = '';
            mainblock.innerHTML = "";
            let artsong = '';
            if(!result[0]['isEmpty']){
                $('.mainblock').append(function(){
                    for (var i = 0; i < result.length; i++) {
                        artsong = result[i]['artist'] + ' - ' + result[i]['song_name'];
                        finalOut += '<div class="topinmain"><div class="songtitle">' +artsong+ '</div><div class="edit hoverbutton" onclick="editSong('+'\''+artsong+'\''+')">EDIT</div></div><div class="lyrics">' +result[i]['lyrics'].replace(/\r\n/gi, '<br>')+ '</div>';
                    }
                    return finalOut;
                });
            }
            else{
                console.log('Ошибка открытия трека');
            }
        });
}

function editSong(artsong){
    console.log(artsong);
    addtrackFunction();
    fetch(requestFile+'/?song='+artsong)
        .then(response => response.json())
        .then(result => {
            inputartist.value = result[0]['artist'];
            inputsong.value = result[0]['song_name'];
            inputlyrics.value = result[0]['lyrics'];
        });
    fetch(requestFile+'/?songfolders='+artsong)
        .then(response => response.json())
        .then(result => {
            if(result){
                for (var i = 0; i < result.length; i++) {
                    folderid = result[i]['id'];
                    if(folderid){
                        console.log('ids: '+'#folderid'+folderid);
                        document.getElementById('folderid'+folderid).checked = true;  
                    }
                }
            }
            else{
                console.log('Empty out :(');
            }
        });
}

/////////////////////////////////////// PROFILE PART ////////////////////////////////////////

function clicklogin(){
    $('#mainblock').load('profile.html');
}

function editprofile(){
    maileditinput.disabled = false;
    logineditinput.disabled = false;
    passwordeditinput.disabled = false;
}

//////////////////////////////////////// VISUAL PART ////////////////////////////////////////

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function sayHi() {
    jQuery(document).ready(function(){
        let num = getRandomInt(20);
        // num = 5;
        if (num > 0 && num < 18){    
            $('#welcometext').css({'text-shadow':'2px 2px 8px #03a4ff'}, 2000);  
            $('#welcometext').css({'color':'#efefef'}, 2000); 
        }
        else{
            $('#welcometext').css({'text-shadow':'0px 0px 1px #03a4ff'}, 2000);
            $('#welcometext').css({'color':'#999'}, 2000);
        }
    });
}
setInterval(sayHi, 2000);

function controlwidth() {
    var width = $(this).width();
    if( width < 1000 )
    {
        $('.navigate').css({float:'none', width: '100%'});
        $('.mainblock').css({float:'none', width: '100%'});
        if( width < 600 ){
            welcometext.innerText = "Gelato Lyrics";
        }
        else{
            welcometext.innerText = "Welcome to Gelato Lyrics";
        }
    }
    else
    {
        $('.navigate').css({float:'left', width: '25%'});
        $('.mainblock').css({float:'left', width: '75%'});
    }
}
controlwidth();
    
$(window).resize(function(width){
    controlwidth();
})
    

//////////////////////////////////////// TEST PART ////////////////////////////////////////
// fetch('https://www.google.com/search?q=Wild+Frontier+The+Prodigy')
//     .then(response => response.text())
//     .then(result => {
//         if(result){
//             alert(result);
//         }
//         else{
//         }
//     });

// const apiCall = loc => fetch(requestFile+'/?getlogin=go')
//     .then(response => response.text())
//     .then(result => {
//         if(result){
//             login = result;
//             logged = 1;
//             return result;
//         }
//         else{
//             alert('empty session');
//         }
//     });
// if(apiCall){
//     alert(apiCall);
// }
////////////////////////////////////////////////////////////////////////////////