//获取元素
var getElem=function(selector){
	return document.querySelector(selector);
}
var getAllElem=function(selector){
	return document.querySelectorAll(selector);
}

//获取元素样式
var getCls=function(element){
	return element.getAttribute('class');
}

//设置元素样式
var setCls=function(element , cls){
	return element.setAttribute('class' , cls);
}

//为元素添加样式
var addCls=function(element,cls ){
	var baseCls=getCls(element);
	if(baseCls.indexOf(cls)=== -1 ){
		setCls(element,baseCls+' '+cls );
	}
}

//为元素删除样式
var delCls=function(element,cls ){
	var baseCls=getCls(element);
	if(baseCls.indexOf(cls)!= -1 ){
		setCls(element,baseCls.split(cls).join(' ').replace(/\s+/g,' ') );
	}
}


//第一步：初始化样式 init

var screenAnimateElements={
	'.screen-1':[
		'.header',
		'.screen-1__heading',
		'.screen-1__subheading',
	],
	'.screen-2':[
		'.screen-2__heading',
		'.screen-2__subheading',
		'.screen-2__wrap-img-2',
		'.screen-2__wrap-img-3',
		'.screen-2__tip',
	],
	'.screen-3':[
		'.screen-3__wrap__circle-1',
		'.screen-3__wrap__circle-2',
		'.screen-3__wrap__circle-3',
		'.screen-3__wrap__circle-4',
		'.screen-3__wrap__circle-5',
		'.screen-3__wrap__heading',
		'.screen-3__wrap__subheading',
		'.screen-3__right-img',
		'.screen-3__wrap__tip',
	],
	'.screen-4':[
		'.screen-4__wrap__type__item_i_1',
		'.screen-4__wrap__type__item_i_2',
		'.screen-4__wrap__type__item_i_3',
		'.screen-4__wrap__type__item_i_4',
		'.screen-4__heading',
		'.screen-4__subheading',
		'.screen-4__tip',
	],
	'.screen-5':[
		'.screen-5__img',
		'.screen-5__tip',
		'.screen-5__heading',
		'.screen-5__subheading'
	]
}
//设置屏内元素为初始状态
var setScreenAnimateInit=function(screenCls){
	var screen = document.querySelector(screenCls);//获取当前屏的元素
	var animateElements=screenAnimateElements[screenCls];//需要设置动画的元素
	for(var i=0;i<animateElements.length;i++){
		var element= document.querySelector(animateElements[i]);
		var baseCls=element.getAttribute('class');
		element.setAttribute('class',baseCls+' '+animateElements[i].substr(1)+'_animate_init');
	}

}
//设置播放屏内元素动画
var playScreenAnimateDone=function(screenCls){
	var screen = document.querySelector(screenCls);//获取当前屏的元素
	var animateElements=screenAnimateElements[screenCls];//需要设置动画的元素
	for(var i=0;i<animateElements.length;i++){
		var element= document.querySelector(animateElements[i]);
		var baseCls=element.getAttribute('class');
		element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
	}
}


window.onload=function(){
	for(k in screenAnimateElements){
		if(k === '.screen-1'){
			continue;
		}
		setScreenAnimateInit(k);
	}
}

//第二步，滚动到哪里就播放到哪里
var navItems=getAllElem('.header__nav__item');
var outlineItems=getAllElem('.outline__item');
var switchNavItemsActive=function(idx){
	for(var i=0;i<outlineItems.length;i++){
		delCls(outlineItems[i],'outline__item_status_active');
		delCls(navItems[i],'header__nav__item_status_active');
	}
	addCls(outlineItems[idx],'outline__item_status_active');
	addCls(navItems[idx],'header__nav__item_status_active');
}
window.onscroll=function(){
	var top=document.body.scrollTop;
	switchNavItemsActive(0);
	if(top>60){
		addCls(getElem('.header'),'header_status_back');
		addCls(getElem('.outline'),'outline_status_in');
	}else{
		delCls(getElem('.header'),'header_status_back');
		delCls(getElem('.outline'),'outline_status_in');
	}

	if (top>=0){
		playScreenAnimateDone('.screen-1');
		navTip.style.left=(0*88)+'px';
	}
	if (top > 640*1 -60){
		playScreenAnimateDone('.screen-2');
		switchNavItemsActive(1);
		navTip.style.left=(1*88)+'px';
	}
	if (top > 640*2 -60){
		playScreenAnimateDone('.screen-3');
		switchNavItemsActive(2);
		navTip.style.left=(2*88)+'px';
	}
	if (top > 640*3 -60){
		playScreenAnimateDone('.screen-4');
		switchNavItemsActive(3);
		navTip.style.left=(3*88)+'px';
	}
	if (top > 640*4 -60){
		playScreenAnimateDone('.screen-5');
		switchNavItemsActive(4);
		navTip.style.left=(4*88)+'px';
	}
}

//第三步双向定位

var setNavJump=function(i,lib){
	var item=lib[i];
	item.onclick=function(){
		document.body.scrollTop=i*640;
	}
}
for(var i=0;i<navItems.length;i++){
	setNavJump(i,navItems);
}
for(var i=0;i<outlineItems.length;i++){
	setNavJump(i,outlineItems);
}

//第四步滑动门特效
var navTip=getElem('.header__nav-tip');
var setTip=function(idx ,lib){
	lib[idx].onmouseover=function(){
		navTip.style.left=(idx*88)+'px';
	}
	var activeIdx=0;
	lib[idx].onmouseout=function(){
		for (var i=0;i<lib.length;i++){
			if(getCls(lib[i]).indexOf('header__nav__item_status_active') > -1){
				activeIdx=i;
				break;
			}
		}
		navTip.style.left=(activeIdx*88)+'px';
	}

}
for (var i=0;i<navItems.length-1;i++){
	setTip(i,navItems);
}

setTimeout(function(){
	playScreenAnimateDone('.screen-1');
},200)

//返回第一屏
var abloutButtom=getElem('.screen-about__button');
abloutButtom.onclick=function(){
	document.body.scrollTop=1;	
}