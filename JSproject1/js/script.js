//封装一个代替getElementById()的方法
function byId(id){
	return typeof(id) === "string"?document.getElementById(id):id;
}

//全局变量
var index = 0,
	timer = null,
	pics = byId("banner").getElementsByTagName("div"),
	menubox = byId("menu-box").getElementsByTagName("div"),
	len = pics.length;

function slideImg(){
	//滑过清除定时器，离开继续
	main.onmouseover = function(){
		//滑过清除定时器
		if(timer) clearInterval(timer);
	}
	main.onmouseout = function(){
		timer = setInterval(function(){
			//切换图片
			changeImg();
			index++;
			if(index >= len){
				index = 0;
			}
			// //切换图片
			// changeImg();
		},1000);
	}
	//自动在banner上触发鼠标离开事件
	main.onmouseout();
	//遍历所有点击，且绑定事件--切换图片
	for(var d=0;d<len;d++){
		//给所有div添加一个id的属性，值为d,作为当前div的索引
		menubox[d].id=d;
		menubox[d].onclick = function(){
			//改变index为当前索引
			index=this.id;
			//遍历所有menubox，将其className设为"menu-content",并将当前menubox的className设为"menu-content active"
			for(var a = 0;a<len;a++){
				menubox[a].className="menu-content";
			}
			this.className="menu-content active";
			//调用changeImg,实现切换图片
			changeImg();
		}
	}
}

//切换图片
function changeImg(){
	//遍历所有menubox，将其className设为"menu-content",并将当前menubox的className设为"menu-content active"
	for(var a = 0;a<len;a++){
				menubox[a].className="menu-content";
	}
	menubox[index].className="menu-content active";
	//遍历所有的div,将其影藏，再将相应的div显示
	for(var i=0;i<len;i++){
       pics[i].style.display = "none";
   }
	pics[index].style.display = 'block';
}

slideImg()
