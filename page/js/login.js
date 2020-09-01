/**
 * Created by SYT on 2016-07-31.
 */
var Box=document.getElementById("Box");
var loginBox=document.getElementById("loginBox");
var zhuceBox=document.getElementById("zhuceBox");
function login(){
    Box.style.visibility="visible";
    loginBox.style.visibility="visible"
    console.log("456")
}
function switchLogin(){
    Box.style.visibility="visible";
    zhuceBox.style.visibility="hidden";
    loginBox.style.visibility="visible"
}
function switchZhuce(){
    Box.style.visibility="visible";
    loginBox.style.visibility="hidden";
    zhuceBox.style.visibility="visible"
}
function zhuce(){
    Box.style.visibility="visible";
    zhuceBox.style.visibility="visible"
}
function close1(){
    console.log("123")
    Box.style.visibility="hidden";
    loginBox.style.visibility="hidden";
    zhuceBox.style.visibility="hidden"
}
