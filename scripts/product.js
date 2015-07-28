$(function(){
  var body = $('body');

  //点击logo跳转
  $('.logo').on('click',function () {
    window.location.href="http://www.chilrious.net";
  });

  // 点击下滑
  $('.smoothscroll').on('click', function () {
    body.animate({scrollTop:body.height()},1000)
  })

  //划出
  var slide_area =$('.slide-timer');
  $('.clock-botton').on('click', function () {
    slide_area.css('right',0).delay(400,function(){
      slide_area.data('switch', true)
    });
  });
  slide_area.on('click',function(){
    if(!!slide_area.data('switch')){
      slide_area.css('right','-400px')
    }
  });


  /*====================================================================================*/
  //插入时间
  var time_delta=[
    {city:'tokyo /东京',delta:9},
    {city:'beijing /北京',delta:8},
    {city:'seoul /首尔',delta:9},
    {city:'hongkong /香港',delta:8},
    {city:'moscow /莫斯科',delta:3},
    {city:'london /伦敦',delta:0},
    {city:'new york /纽约',delta:-5},
    {city:'paris /巴黎',delta:1},
    {city:'taipei /台北',delta:8},
    {city:'singapore /新加坡',delta:8},
    {city:'sydney /悉尼',delta:10},
    {city:'berlin /柏林',delta:1}];
  var time_area = $('.timer-list');

  setInterval(function () {
    var append_str = '';
    var curTime;
    var localTime = new Date();
    var gmtTime = localTime.getTime() + localTime.getTimezoneOffset()*60*1000;

    time_delta.forEach(function (value) {
      curTime = new Date(gmtTime+value.delta*60*60*1000);
      var day=curTime.getDate();
      var week=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][curTime.getDay()];
      var Month=['January','February','March','April','May','June','July','August','September ','October','November','December'][curTime.getMonth()];
      var year=curTime.getFullYear();
      var hour_24=curTime.getHours();
      var hour,isAm;
      if(hour_24<=12){
        hour=(~~hour_24);
        isAm=' am'
      }
      else{
        hour=(~~hour_24)-12;
        isAm=' pm';
      }
      append_str += '<li><p class="city">' + value.city + '</p><p>'+week+' '+addZero(day)+' '+Month+'</p><p>'
              +year+'</p><p>+'+addZero(hour)+':'+addZero(curTime.getMinutes())+':'+addZero(curTime.getSeconds())+isAm+'</p></li>';
    });


    time_area.html(append_str)
  },500);

  function addZero(num){
    if((~~num)<10)
      return '0'+num;
    else
      return num;
  }

});
