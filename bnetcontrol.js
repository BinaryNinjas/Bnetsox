/* Battle.net Websocket Control */

var OnMessageEvent = function(error, msg) {
    var user = $users[msg["user_id"]];

    if (msg.type == "Whisper") {
        OnWhisperFrom(user.toon_name, msg["message"]);
    } else if (msg.type == "Emote") {
        OnEmote(user.toon_name, msg["message"]);
    } else if (msg.type == "Channel") {
        OnChat(user.toon_name, msg["message"]);
        
        if (msg["message"].charAt(0) == "?") {
            
            
            var triggerCMD = msg["message"].slice(1)
            
            
            
            switch(triggerCMD) {
                    
                case "version":
                    //window.alert("version cmd triggered")
 
SendTextMessage("bnutsox - a WebBot for Battle.net created by |)ragon and Myst - [DarkBlizz.org]")
                    break;
                    
                case "ver":
                   // window.alert("ver cmd triggerd")
SendTextMessage("bnutsox - a WebBot for Battle.net created by |)ragon and Myst - [DarkBlizz.org]")
                    break;
                    
                case "ban":
                    window.alert("Ban Cmd triggered")
                    window.alert(msg["message"].slice(5))
                    
                    SendBanMessage(msg["message"].slice(5))
                    
                    break;
                    
                    
                case triggerCMD.includes("say ") == true:
                    
                    window.alert("day cmd triggered")
                    SendEmoteMessage(msg["message"].slice(5))
                    
                    break;
                    
                default:
                    SendEmoteMessage("Not a valid command")
                    
            }
           
            
            
        }
        
        
        
    } else if (msg.type == "ServerInfo") {
        NotificationMessage('warning', 'Info: (' + msg["message"] + ')');
    } else if (msg.type == "ServerError") {
        NotificationMessage('error', 'Error: ' + msg["message"]);
    } else {
        writeToScreen('[' + msg.type + '] ' + msg["message"]);
    }
}

var OnAuthResponse = function(error, msg) {
    if (error) {
        writeToScreen('Failed to auth: ' + error);
    } else {
        NotificationMessage('2', 'Authenticated. Connecting to chat....');
        var connect = {
            "command": "Botapichat.ConnectRequest",
            "request_id": ++lastRequestId,
            "payload": {
            }
        };
        var stringmessage = JSON.stringify(connect);
        doSend(stringmessage);
    }
}

var OnUserUpdateEvent = function(error, msg) {
    //the message dosent carry the game string for warcraft 3, via attribute.
    //msg["toon_name"] = msg["toon_name"].replace('#', '@'); //warcraft 3 names
    if(loggedonname == false) { 
        loggedonname = true;
        OnBotName(msg["toon_name"])
    } else {
        if($users[msg["user_id"]] !== msg) {
            $users[msg["user_id"]] = msg; //add if non existant.
        }
        if(endofuserlisting == false) {
            if (msg["toon_name"] == loggedname) {
                endofuserlisting = true;
                OnUserInChannel(msg["user_id"], msg["toon_name"], 'CHAT');
            } else {
                var gamestringarr = msg["attribute"];
                var gamestring = gamestringarr[0].value; //asuming that this never changes from index 0
                OnUserInChannel(msg["user_id"], msg["toon_name"], gamestring);
            }
            if (msg.hasOwnProperty('flag')) { //due to how the packets are incoming at the start
                OnUserFlagUpdate(msg['user_id'], msg['toon_name'], msg['flag']);
            }
        } else {
            if (msg.hasOwnProperty('flag')) {
                OnUserFlagUpdate(msg['user_id'], msg['toon_name'], msg['flag']);
            } else { //else user joined the channel
                var gamestringarr = msg["attribute"];
                var gamestring = gamestringarr[0].value; //asuming that this never changes from index 0
                OnUserJoin(msg["user_id"], msg["toon_name"], gamestring);
            }
        }
    }
}

var OnChatConnectResponse = function(error, msg) {
    NotificationMessage('1', 'Chat connection has been established.');
}

var OnChatConnect = function(error, msg) {
    OnChannel(msg["channel"]);
}

var OnUserLeaveEvent = function(error, msg) {
    var thisuser = $users[msg["user_id"]]["toon_name"];
    NotificationMessage('userleftchannel', thisuser + ' has left the channel.');

    var $elementidvalue = 'thisuser-' + msg["user_id"];
    document.getElementById($elementidvalue).remove();

    delete $users[msg["user_id"]];
}

var OnChatSendMessageResponse = function(error, msg) {
    if (error) {
        DoError(error, 'Chat');
        return;
    }
}

var OnChatSendWhisperResponse = function(error, msg) {
    if (error) {
        DoError(error, 'Whisper');
        return;
    }
}

var OnChatSendEmoteResponse = function(error, msg) {
    if (error) {
        DoError(error, 'Emote');
        return;
    }
}

var OnChatSendBanUserResponse = function(error, msg) {
    if (error) {
        DoError(error, 'Ban');
        return;
    }
}

var OnChatSendUnbanUserResponse = function(error, msg) {
    if (error) {
        DoError(error, 'Unban');
        return;
    }
}

var OnChatSendKickUserResponse = function(error, msg) {
    if (error) {
        DoError(error, 'Kick');
        return;
    }
}

var OnChatSendOpResponse = function(error, msg) {
    if (error) {
        DoError(error, 'Op');
        return;
    }
}

var OnChatDisconnect = function(error, msg) {
    if (error) {
        DoError(error, 'ChatDisconnect');
        return;
    }
}

var OnDisconnectRequest = function(error, msg) {
    if (error) {
        DoError(error, 'DisconnectRequest');
        return;
    }
    websocket.close();
}

//Send chat messages
function SendTextMessage(text) {
    var textmessage = {
        "command": "Botapichat.SendMessageRequest",
        "request_id": ++lastRequestId,
        "payload": {
            "message": text,
        }
    };
    OnSelfMessage(loggedname, text);
    doSend(JSON.stringify(textmessage));
}
function SendWhisperMessage(usersid, message) {
    var textmessage = {
        "command": "Botapichat.SendWhisperRequest",
        "request_id": ++lastRequestId,
        "payload": {
            "message": message,
            "user_id": usersid
        }
    };
    OnWhisperTo($users[usersid]["toon_name"], message);
    doSend(JSON.stringify(textmessage));
}
function SendEmoteMessage(message) {
    var emotemessage = {
        "command": "Botapichat.SendEmoteRequest",
        "request_id": ++lastRequestId,
        "payload": {
            "message": message,
        }
    };
    //This message is sent back to us in the form of an emote message
    doSend(JSON.stringify(emotemessage));
}
function SendBanMessage(userid) {
    var banmessage = {
        "command": "Botapichat.BanUserRequest",
        "request_id": ++lastRequestId,
        "payload": {
            "user_id": userid,
        }
    };
    //
    doSend(JSON.stringify(banmessage));
}
function SendKickMessage(userid) {
    var banmessage = {
        "command": "Botapichat.KickUserRequest",
        "request_id": ++lastRequestId,
        "payload": {
            "user_id": userid,
        }
    };
    //
    doSend(JSON.stringify(banmessage));
}
function SendUnbanMessage(username) {
    var banmessage = {
        "command": "Botapichat.UnbanUserRequest",
        "request_id": ++lastRequestId,
        "payload": {
            "toon_name": username,
        }
    };
    //
    doSend(JSON.stringify(banmessage));
}
function SendOpMessage(userid) {
    var banmessage = {
        "command": "Botapichat.SendSetModeratorRequest",
        "request_id": ++lastRequestId,
        "payload": {
            "user_id": userid,
        }
    };
    //
    doSend(JSON.stringify(banmessage));
}
function SendDisconnectMessage() {
    var banmessage = {
        "command": "Botapichat.DisconnectRequest",
        "request_id": ++lastRequestId,
        "payload": {
        }
    };
    //
    doSend(JSON.stringify(banmessage));
}
