var header  = document.getElementById("header");
var box_list = document.getElementById("box-list");
var box_about = document.getElementById("box-about");
var title = document.getElementById("title");
var box_detail_song = document.getElementById("box-detail-song");
var button_back = document.getElementById("back");
var box_home = document.getElementById("box-home");
var button_about = document.getElementById("about");
var button_clear = document.getElementById("clear");

function button_back_page()
{
  if(button_back.className.startsWith("button-back list"))
  {
    /*show header(back, title, about), page list*/
    header.className = "header";
    button_back.className = "button-back true";
    title.className = "title title_active";
    button_about.className = "button-about true";
    box_list.className = "box-list true";

    /*hidden header(clear), page home, about, detail-song*/
    button_clear.className = "button-clear false";
    box_home.className = "box-home false";
    box_about.className = "box-about false";
    box_detail_song.className = "box-detail-song false";

    /*change onclick button back*/
    button_back.className  = "button-back home true";
  }
  else{
    
    /*hidden header, list, about, detail-song*/
    header.className = "header hidden-header";
    box_list.className = "box-list false";
    box_about.className = "box-about false";
    title.className = "title";
    box_detail_song.className = "box-detail-song false";

    /*show page home*/
    box_home.className = "box-home home true";

    /*change onclick button back*/
    button_back.className  = "button-back home true";
  }
  /*end: if(button_back.className == "button-back home" || button_back.className == "button-back")*/
}
/*end: function button_back()*/

function button_play()
{
  /*show header(back, title, about), page list*/
  header.className = "header";
  button_back.className = "button-back true";
  title.className = "title title_active";
  button_about.className = "button-about true";
  box_list.className = "box-list true";

  /*hidden header(clear), page home, about, detail-song*/
  button_clear.className = "button-clear false";
  box_home.className = "box-home false";
  box_about.className = "box-about false";
  box_detail_song.className = "box-detail-song false";

  /*change onclick button back*/
  button_back.className  = "button-back home true";
}
/*end: function button_play()*/

function button_show_about()
{
  /*hidden header(back, title, about), list, home, detail-song*/
  button_back.className = "button-back false";
  title.className = "title false";
  button_about.className = "button-about false";
  box_list.className = "box-list false";
  box_home.className = "box-home false";
  box_detail_song.className = "box-detail-song false";

  /*show header(clear) page about,*/
  box_about.className = "box-about true";
  document.getElementById("clear").className = "button-clear true";
}
/*end: function button_about()*/

function play_song()
{
  /*hidden header(clear), page home, list, about*/
  button_clear.className = "button-clear false";
  box_home.className = "box-home false";
  box_list.className = "box-list false";
  box_about.className = "box-about false";
  
  /*show page detail song*/
  box_detail_song.className = "box-detail-song true";

  /*change onclick button back*/
  button_back.className  = "button-back list true";
}
/*end: function play_song()*/
