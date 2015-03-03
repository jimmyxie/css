function Slide(wrap,cont){
  this.winW = document.documentElement.clientWidth;
  this.winH = document.documentElement.clientHeight;
  this.cont = document.getElementById(cont);
  this.cont_li = this.cont.getElementsByTagName("li");
  this.cont_radio = this.cont.getElementsByTagName("label");
  this.cont_span = this.cont.getElementsByTagName("span");
  this.cont_li_length = this.cont_li.length;

  this.resultimg = document.getElementById('resultimg');
  this.nickname = document.getElementById('nickname');
  this.scoreval = document.getElementById('score');
  this.startN = 0;
  this.sum=0;
  this.question=0;
  this.result=3;
}

Slide.prototype = {
  init:function(){
    for(var i=0;i<this.cont_li_length;i++){
      this.cont_li[i].style.zIndex = 20-i;
    }
    this.resize();
    this.cont_li[0].style.display = 'block';
    this.addHandler(this.cont,"touchend",this.bind_fn(this,this.touch_end));
  },
  resize : function(){
    this.winH = document.documentElement.clientHeight;
    this.cont.style.height = this.winH+"px";

    for(var i=0;i<this.cont_li.length;i++){
      this.cont_li[i].style.height = this.winH+'px';
    }
  },
  addHandler : function(elem,evtype,fn){
    if(elem.attachEvent){
      elem.attachEvent('on'+evtype,fn);
    }else if(elem.addEventListener){
      elem.addEventListener(evtype,fn,false);
    }else{
      elem["on"+evtype] = fn;
    }
  },
  bind_fn : function(obj,func){
    return function(){
      func.apply(obj,arguments);
    };
  },
  //点击翻页，并加分
  touch_end : function(e){
    if(e.target.nodeName.toLowerCase() == 'span'){
      this.play(this.startN);
      this.sum += parseInt(this.question);
      this.score(this.sum,this.result);
      this.question = 0;
      _paq.push(['setCustomVariable', 1, "pagenum", this.startN+1,  "page"]);
      _paq.push(['trackEvent', 'pagenum', 'clicked' , this.startN+1]);
    }
    if(e.target.nodeName.toLowerCase() == 'label'){
      this.question = parseInt(e.target.dataset.add);
      if(e.target.dataset.result && this.result == 3){
        this.result = e.target.dataset.result;
      }
      _paq.push(['setCustomVariable', 2, "radio", e.target.dataset.sel,  "page"]);
      _paq.push(['trackEvent', 'radio', 'clicked' , e.target.dataset.sel]);
    }
  },
  play : function(n){
    var _ = this;
    this.cont_li[n].style.webkitTransform = 'translateY('+(-this.winH)+'px)';
    setTimeout(function(){
      _.cont_li[n+1].style.display = 'block';
    },350);
    setTimeout(function(){
      _.startN++;
      _.cont_li[n].style.display = 'none';
    },450);
    return;
  },
  score : function(n,i){
      this.resultimg.src = 'images/result'+i+'.png';
      this.nickname.className = 'nickname'+i;
      this.scoreval.innerHTML = n;
      descContent = '我是'+nicknames[i]+'，你是什么？去UC浏览器测试下吧。';
  }

};
var slide1 = new Slide("slide","slide_ul");
slide1.init();
window.onresize = function(){
  slide1.resize();
};
