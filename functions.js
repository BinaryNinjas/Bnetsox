/* Battle net Web Chat function module */

//Time stamp Chat Window
function $TimeStamp() {
    var d = new Date();
    var $ts = d.toLocaleTimeString();
    if($ts.length != 11)
    {
        return '[0' + $ts + ']';
    } else {
        return '[' + $ts + ']';
    }
}

//Get user id by username
function $GetUserID(username) {
    for(var thisobject in $users) {
        if($users[thisobject]["toon_name"].toLowerCase() == username.toLowerCase()) { return $users[thisobject]["user_id"]; }
    }
    return "-1";
}
function ClearUsers() {
    for(var thisobject in $users) {
        delete $users[thisobject];
    }
}

//Userlist Icon to use from the .CSS
function $IconIdString(gamestring) {
    if(gamestring == 'STAR') { return "icon-starcraft"; }
    if(gamestring == 'SEXP') { return "icon-broodwars"; }
    if(gamestring == 'CHAT') { return "icon-chat"; }
    if(gamestring == 'D2DV') { return "icon-diablo2"; }
    if(gamestring == 'D2XP') { return "icon-diablo2lod"; }
    if(gamestring == 'DRTL') { return "icon-diablo1"; }
    if(gamestring == 'DSHR') { return "icon-diablo1sw"; }
    if(gamestring == 'JSTR') { return "icon-starcraftj"; }
    if(gamestring == 'W2BN') { return "icon-warcraft2"; }
    if(gamestring == 'WAR3') { return "icon-warcraft3"; }
    if(gamestring == 'W3XP') { return "icon-warcraft3tft"; }
    return "icon-unknowen";
}

//Userlist Flag Icon to use from the .CSS
function $IconFlagIdString(flag) {
    if(flag == 'Moderator') { return "icon-moderator"; }
    NotificationMessage('warning', 'Unknowen/unimplemented flag [' + flag + ']');
    return "icon-unknowen";
}

//Statstring processor, Chat window
function $Statstring(gamestring) {
    if(gamestring == 'STAR') { return "Starcraft"; }
    if(gamestring == 'SEXP') { return "Starcraft Broodwars"; }
    if(gamestring == 'CHAT') { return "Web Chat Client"; }
    if(gamestring == 'D2DV') { return "Diablo 2"; }
    if(gamestring == 'D2XP') { return "Diablo 2 Lords of Destruction"; }
    if(gamestring == 'DRTL') { return "Diablo Retail"; }
    if(gamestring == 'DSHR') { return "Diablo Shareware"; }
    if(gamestring == 'JSTR') { return "Starcraft Japan"; }
    if(gamestring == 'W2BN') { return "Warcraft 2 Battle.net Edition"; }
    if(gamestring == 'WAR3') { return "Warcraft 3 Rein of Chaos"; }
    if(gamestring == 'W3XP') { return "Warcraft 3 The Frozen Throne"; }
    return "Unknown Game Type [" + gamestring + "]";
}

//Userlist Remove element, (or wipe the chat window clean aswell.)
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}


//        
function OnEmote(username,message) {
    var pre = document.createElement("li");
    var partime = document.createElement("p");
    partime.setAttribute('class', 'timestamp-cls');
    partime.innerText = $TimeStamp();
    var par = document.createElement("p");
    var par2 = document.createElement("p");
    var par3 = document.createElement("p");

    par.setAttribute('class', 'emote-cls');
    par.innerText = '<';
    par2.innerText = username;
    if(loggedname == username) {
        par2.setAttribute('class', $NotificationMessageType('self'));
    }
    par3.setAttribute('class', 'emote-em-cls');
    par3.innerText = message + '>';

    pre.style.wordWrap = "break-word";
    
    pre.appendChild(partime);
    pre.appendChild(par);
    pre.appendChild(par2);
    pre.appendChild(par3);

    messagelisting.appendChild(pre);
    output.scrollTop = output.scrollHeight;
}

function OnWhisperFrom(username,message) {
    var pre = document.createElement("li");
    pre.setAttribute('class', 'whisper-box');
    var partime = document.createElement("p");
    partime.setAttribute('class', 'timestamp-cls');
    partime.innerText = $TimeStamp();

    var par = document.createElement("p");
    var par2 = document.createElement("p");
    var par3 = document.createElement("p");
    var par4 = document.createElement("p");

    par.setAttribute('class', 'w-from-cls');
    par.innerText = '<From:';
    par2.setAttribute('class', 'normal-em');
    par2.innerText = username;
    par3.setAttribute('class', 'w-from-cls');
    par3.innerText = '>';
    par4.setAttribute('class', 'w-from-em-cls');
    par4.innerText = message;

    pre.style.wordWrap = "break-word";
    
    pre.appendChild(partime);
    pre.appendChild(par);
    pre.appendChild(par2);
    pre.appendChild(par3);
    pre.appendChild(par4);

    messagelisting.appendChild(pre);
    output.scrollTop = output.scrollHeight;
}

function OnWhisperTo(username,message) {
    var pre = document.createElement("li");
    pre.setAttribute('class', 'whisper-box');
    var partime = document.createElement("p");
    partime.setAttribute('class', 'timestamp-cls');
    partime.innerText = $TimeStamp();

    var par = document.createElement("p");
    var par2 = document.createElement("p");
    var par3 = document.createElement("p");
    var par4 = document.createElement("p");

    par.setAttribute('class', 'w-from-cls');
    par.innerText = '<To:';
    par2.setAttribute('class', 'normal-em');
    par2.innerText = username;
    par3.setAttribute('class', 'w-from-cls');
    par3.innerText = '>';
    par4.setAttribute('class', 'w-from-em-cls');
    par4.innerText = message;

    pre.style.wordWrap = "break-word";
    
    pre.appendChild(partime);
    pre.appendChild(par);
    pre.appendChild(par2);
    pre.appendChild(par3);
    pre.appendChild(par4);

    messagelisting.appendChild(pre);
    output.scrollTop = output.scrollHeight;
}

function OnChat(username,message) {
    var pre = document.createElement("li");
    var partime = document.createElement("p");
    partime.setAttribute('class', 'timestamp-cls');
    partime.innerText = $TimeStamp();
    var par = document.createElement("p");
    var par2 = document.createElement("p");
    var par3 = document.createElement("p");
    var par4 = document.createElement("p");

    par.innerText = '<';
    par2.innerText = username;
    par3.innerText = '>';
    par4.setAttribute('class', 'normal-em');
    par4.innerText = message;

    pre.style.wordWrap = "break-word";
    
    pre.appendChild(partime);
    pre.appendChild(par);
    pre.appendChild(par2);
    pre.appendChild(par3);
    pre.appendChild(par4);

    messagelisting.appendChild(pre);
    output.scrollTop = output.scrollHeight;
}

function OnChannel(channelname) {
    var pre = document.createElement("li");
    var partime = document.createElement("p");
    partime.setAttribute('class', 'timestamp-cls');
    partime.innerText = $TimeStamp();
    var par = document.createElement("p");
    var par2 = document.createElement("p");
    par.innerText = "You have joined channel:";
    par2.innerText = channelname;
    channeltitle.innerText = channelname;
    par2.setAttribute('class', 'normal-em');

    pre.style.wordWrap = "break-word";
    pre.appendChild(partime);
    pre.appendChild(par);
    pre.appendChild(par2);

    messagelisting.appendChild(pre);
    output.scrollTop = output.scrollHeight;
}

//obtained during inital login
function OnBotName(username) {
    loggedname = username;

    var pre = document.createElement("li");
    var partime = document.createElement("p");
    partime.setAttribute('class', 'timestamp-cls');
    partime.innerText = $TimeStamp();
    var par = document.createElement("p");
    var par2 = document.createElement("p");
    par.innerText = "You are logged on as:";
    par2.innerText = username;
    par2.setAttribute('class', 'normal-em');

    pre.style.wordWrap = "break-word";
    pre.appendChild(partime);
    pre.appendChild(par);
    pre.appendChild(par2);

    messagelisting.appendChild(pre);
    output.scrollTop = output.scrollHeight;
}

//Self message out
function OnSelfMessage(username, message) {
    var pre = document.createElement("li");
    var partime = document.createElement("p");
    partime.setAttribute('class', 'timestamp-cls');
    partime.innerText = $TimeStamp();
    var par = document.createElement("p");
    var par2 = document.createElement("p");
    var par3 = document.createElement("p");
    var par4 = document.createElement("p");

    par.innerText = '<';
    par2.innerText = username;
    par2.setAttribute('class', $NotificationMessageType('self'));
    par3.innerText = '>';
    par4.setAttribute('class', 'normal-em');
    par4.innerText = message;

    pre.style.wordWrap = "break-word";
    
    pre.appendChild(partime);
    pre.appendChild(par);
    pre.appendChild(par2);
    pre.appendChild(par3);
    pre.appendChild(par4);

    messagelisting.appendChild(pre);
    output.scrollTop = output.scrollHeight;
}

//Notification class id to use from the .CSS
function $NotificationMessageType(messagetypestring) {
    if(messagetypestring == 'self') { return "self-message"; }
    if(messagetypestring == '1' || messagetypestring == 'good') { return "good-message"; }
    if(messagetypestring == '2' || messagetypestring == 'warning') { return "warning-message"; }
    if(messagetypestring == '3' || messagetypestring == 'error') { return "bad-message"; }
    if(messagetypestring == 'userinchannel') { return "userinchannel-message"; }
    if(messagetypestring == 'userjoinedchannel') { return "userjoinedchannel-message"; }
    if(messagetypestring == 'userleftchannel') { return "userleftchannel-message"; }
    return "icon-unknowen";
}
function NotificationMessage(messagetype, messageout) {
    var pre = document.createElement("li");
    var partime = document.createElement("p");
    partime.setAttribute('class', 'timestamp-cls');
    partime.innerText = $TimeStamp();
    var par = document.createElement("p");
    par.innerText = messageout;
    par.setAttribute('class', $NotificationMessageType(messagetype));

    pre.appendChild(partime);
    pre.appendChild(par);
    messagelisting.appendChild(pre);
    output.scrollTop = output.scrollHeight;
}

//Userlisting itself
function AddUser(indexvalue, username, game, flag) {
    var pre = document.createElement("li");
    pre.setAttribute('id', 'thisuser-' + indexvalue);
    pre.setAttribute('class', $IconIdString(game));

    var usernamepar = document.createElement("p");
    usernamepar.setAttribute('class', 'icon-em');
    usernamepar.innerText = username;

    pre.appendChild(usernamepar);

    userlisting.appendChild(pre);
}
function UpdateIcon(indexvalue, username, flag) {
    var elementidvalue = 'thisuser-' + indexvalue;
    document.getElementById(elementidvalue).remove();

    var pre = document.createElement("li");
    pre.setAttribute('id', elementidvalue);
    pre.setAttribute('class', $IconFlagIdString(flag));

    var usernamepar = document.createElement("p");
    usernamepar.setAttribute('class', 'icon-em');
    usernamepar.innerText = username;

    pre.appendChild(usernamepar);

    userlisting.appendChild(pre);
}
function OnUserJoin(indexvalue, username, game) {
    var $messageout = username+' has joined the channel, on client: ' + $Statstring(game);
    NotificationMessage('userjoinedchannel', $messageout);
    AddUser(indexvalue, username, game, "");
}
function OnUserInChannel(userid, username, gamestring) {
    var $messageout = username + ' is here in the channel. using: ' + $Statstring(gamestring);
    NotificationMessage('userinchannel', $messageout);
    AddUser(userid, username, gamestring, "");
}
function OnUserFlagUpdate(userid, username, flag) {
    UpdateIcon(userid, username, flag);
}

function DoError(verror, command) {
    var $errormessage = "";
    if(verror['area'] == 8 && verror['code'] == 1) {
        $errormessage = ": Not Connected to chat";
    } else if(verror['area'] == 8 && verror['code'] == 2) {
        $errormessage = ": Bad request";
    } else if(verror['area'] == 6 && verror['code'] == 5) {
        $errormessage = ": Request timed out";
    } else if(verror['area'] == 6 && verror['code'] == 8) {
        $errormessage = ": Hit rate limit";
    } else {
        $errormessage = " Unknowen: " + JSON.stringify(verror);
    }
    NotificationMessage('error', command + ' Error' + $errormessage);
}
