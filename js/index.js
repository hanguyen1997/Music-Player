/*client_id*/
var client_id = "aba2c7918a43ab0cc467124cfc00a9c7";

function button_back_page()
{
  if(document.getElementById("back").className.startsWith("button-back list"))
  {
    /*show header(back, title, about), page list*/
    document.getElementById("header").className = "header";
    document.getElementById("back").className = "button-back true";
    document.getElementById("title").className = "title title_active";
    document.getElementById("about").className = "button-about true";
    document.getElementById("box-list").className = "box-list true";

    /*hidden header(clear), page home, about, detail-song*/
    document.getElementById("clear").className = "button-clear false";
    document.getElementById("box-home").className = "box-home false";
    document.getElementById("box-about").className = "box-about false";
    document.getElementById("box-detail-song").className = "box-detail-song false";

    /*change onclick button back*/
    document.getElementById("back").className  = "button-back home true";
  }
  else{
    /*hidden header, list, about, detail-song*/
    document.getElementById("header").className = "header hidden-header";
    document.getElementById("box-list").className = "box-list false";
    document.getElementById("box-about").className = "box-about false";
    document.getElementById("title").className = "title";
    document.getElementById("box-detail-song").className = "box-detail-song false";

    /*show page home*/
    document.getElementById("box-home").className = "box-home home true";

    /*change onclick button back*/
    document.getElementById("back").className  = "button-back home true";
  }
  /*end: if(document.getElementById("back").className.startsWith("button-back list"))*/
}
/*end: function button_back()*/

function button_play()
{
  /*show header(back, title, about), page list*/
  document.getElementById("header").className = "header";
  document.getElementById("back").className = "button-back true";
  document.getElementById("title").className = "title title_active";
  document.getElementById("about").className = "button-about true";
  document.getElementById("box-list").className = "box-list true";

  /*hidden header(clear), page home, about, detail-song*/
  document.getElementById("clear").className = "button-clear false";
  document.getElementById("box-home").className = "box-home false";
  document.getElementById("box-about").className = "box-about false";
  document.getElementById("box-detail-song").className = "box-detail-song false";

  /*change onclick button back*/
  document.getElementById("back").className  = "button-back home true";

  if(document.getElementById("audio").duration > 0 && !document.getElementById("audio").paused ) console.log("play");
  else{
    document.getElementById("audio").className = "";
    this.get_list_song();
  }
}
/*end: function button_play()*/

function button_show_about()
{
  /*hidden header(back, title, about), list, home, detail-song*/
  document.getElementById("back").className = "button-back false";
  document.getElementById("title").className = "title false";
  document.getElementById("about").className = "button-about false";
  document.getElementById("box-list").className = "box-list false";
  document.getElementById("box-home").className = "box-home false";
  document.getElementById("box-detail-song").className = "box-detail-song false";

  /*show header(clear) page about,*/
  document.getElementById("box-about").className = "box-about true";
  document.getElementById("clear").className = "button-clear true";
}
/*end: function button_about()*/

function play_song($key_song)
{
  /*hidden header(clear), page home, list, about*/
  document.getElementById("clear").className = "button-clear false";
  document.getElementById("box-home").className = "box-home false";
  document.getElementById("box-list").className = "box-list false";
  document.getElementById("box-about").className = "box-about false";
  
  /*show page detail song*/
  document.getElementById("box-detail-song").className = "box-detail-song true";

  /*change onclick button back*/
  document.getElementById("back").className  = "button-back list true";

  /*get detail song*/
  if(document.getElementById("audio").className != $key_song) 
  {
    this.get_detail_song($key_song);
  }
  /*end: if(audio.className != $key_song)*/
}
/*end: function play_song()*/

var list_song = {};
function get_list_song(){
  var api_list_song = "https://api.soundcloud.com/users/192171467/playlists?random=20&client_id="+client_id;

  var html_list_song = "";
  var num = 1;
  fetch(api_list_song)
    .then(response => {
      return response.json();
    })
    .then(data => {
      
      data[0].tracks.forEach(function(tracks)
      {
        key_num = num++
        list_song[key_num] = tracks;
        list_song[key_num]["key"] = key_num;
        html_list_song +=
        "<div onclick='play_song("+key_num+")'  class='box-content'><div class='img-box-content-list'> <img src='"+tracks.artwork_url+"'></div><div class='text-box-content-list'><p class='title-song'>"+tracks.title+"</p> <p class='composed'>"+tracks.user.username+"<div class='progress-bar'><input type='range' id='"+key_num+"' class='progress-bar_il' value='0' min='0' max='100'></div></div></p><div class='clear'></div></div>";
      }) 
      document.getElementById("content-list").innerHTML = html_list_song;
    })
}
/*function get_list_song()*/

function get_detail_song($key_song){

  /*hidden progress bar in list*/
  var x = document.getElementsByClassName("progress-bar_il");
  var i;
  for (i = 0; i < x.length; i++) {
      x[i].style.display = 'none';
  }

  /*check $key_song in json*/
  if(!list_song[$key_song]) $key_song = 1;

  detail_song = list_song[$key_song];
  document.getElementById("audio").className = $key_song;

  document.getElementById("img_song").src = "images/giphy.gif";
  document.getElementById("detail_song").innerHTML = "";

  /*replace character path image*/
  artwork_url =  detail_song.artwork_url.replace("large", "t500x500");
  document.getElementById("img_song").src = artwork_url;

  /*set title, desc song*/
  document.getElementById("detail_song").innerHTML = "<h1>"+detail_song.title+"</h1><p>"+detail_song.user.username+"</p>";
  document.getElementById("next-song").innerHTML = "<i onclick='next_song("+$key_song+")' class='fas fa-forward'></i>";
  document.getElementById("back-song").innerHTML = "<i onclick='back_song("+$key_song+")' class='fas fa-backward'></i>";
  
  /*play song*/
  document.getElementById("audio").src = "https://api.soundcloud.com/tracks/"+detail_song.id+"/stream?client_id="+client_id;
  this.play_mussic();

  this.set_time_song(detail_song);
  /*Assign an ontimeupdate event to the video element, and execute a function if the current playback position has changed*/
  audio.ontimeupdate = function() {update_time(detail_song)};

  /*show progress bar in list*/
  document.getElementById($key_song).style.display = "block";
}
/*end: function get_detail_song($id_song)*/
  
function update_time(detail_song) {

  /*s*/
  real_s = document.getElementById("audio").currentTime;
  d = Number(real_s);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? "" : "") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? "" : "") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "";

  /*h*/
  if(hDisplay == "") hDisplay = "";
  if(hDisplay < 10 && hDisplay != "") hDisplay = "0"+hDisplay+":";

  /*m*/
  if(mDisplay == "") mDisplay = "00:";
  if(mDisplay < 10 && mDisplay > 0) mDisplay = "0"+mDisplay+":";

  /*s*/
  if(sDisplay == "" ) sDisplay = "00";
  if(sDisplay < 10 && sDisplay > 0) sDisplay = "0"+sDisplay;

  real_time =  hDisplay + mDisplay + sDisplay; 

  // Display the current position of the video in a p element with id="demo"
  document.getElementById("left-time").innerHTML = real_time;

  maxsize = document.getElementById("progress-bar-size").max;
  size = ((real_s*1000)*100)/detail_song.duration;

  document.getElementById("progress-bar-size").value = size;
  document.getElementById(detail_song.key).value = size;
  
  /*next song*/
  if(size > 99.8) this.next_song(detail_song.key);
}
/*end: function update_time() */

function set_time_song(data){
  /*milis(ms)*/
  millisec = data.duration;
  var seconds = (millisec / 1000).toFixed(0);
  var minutes = Math.floor(seconds / 60);
  var hours = "";
  if (minutes > 59) {
      hours = Math.floor(minutes / 60);
      hours = (hours >= 10) ? hours : "0" + hours;
      minutes = minutes - (hours * 60);
      minutes = (minutes >= 10) ? minutes : "0" + minutes;
  }
  /*end: if (minutes > 59)*/

  seconds = Math.floor(seconds % 60);
  seconds = (seconds >= 10) ? seconds : "0" + seconds;
  if (hours != "") {
      return hours + ":" + minutes + ":" + seconds;
  }
  /*end: if (hours != "")*/

  if(minutes < 10) minutes = "0"+minutes;
  minutes_song =  minutes + ":" + seconds;

  /*set time right*/
  document.getElementById("right-time").innerHTML = minutes_song;
}
/*end: function set_time_song(data)*/

function pause_mussic(){
  document.getElementById("play_music").style.display = "block";
  document.getElementById("pause_music").style.display = "none";
  document.getElementById("audio").pause();
}
/*end: function pause_mussic()*/

function play_mussic(){
  document.getElementById("play_music").style.display = "none";
  document.getElementById("pause_music").style.display = "block";
  document.getElementById("audio").play();
}
/*end: function play_mussic()*/

function next_song($key_song){
  get_detail_song($key_song+1);
}
/*end: function next_song($id_song)*/

function back_song($key_song){
  get_detail_song($key_song-1);
}
/*end: function back_song($id_song)*/