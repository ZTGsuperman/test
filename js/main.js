// JavaScript source code


var isPc = false;

function isPhone() {
    try {
        document.createEvent('TouchEvent');
        return true;
    } catch (e) {
        return false;
    }
}

isPc = isPhone();

Event = isPc ? 'mousedown' : 'touchstart';
console.log(Event)

var arr=[1,3,5,7,9,11,13,11,9,7,5,3,1]
var oSence = document.querySelector('.sence');
var oBox = oSence.querySelector('.box');
var oUl = oBox.getElementsByTagName('ul')[0];
var aLi = oUl.getElementsByTagName('li');



var circleArr = [];          //要实现这个规律[1,3,5,7,9,11,9,7,5,3,1]
var angleX = 0;

setInterval(function () {
    angleX++;
    oBox.style.transform = 'rotateY(' + angleX + 'deg)'
}, 60)


    var s = document.querySelector('.item').getElementsByTagName('p')[0].innerHTML;

    var theta = 0;   //每一层与圆心的夹角，第一层与最后一层算一层
    var phi = 0;
    var r = 150
    var layer = 0;
    var wordNum = -1;
    for (var i = 4; i < 13; i++) {
        num = i * i + (i + 1) * (i + 1);      //按规律依次增大数值   1+3+5+7+9=16=4*4   11+9+7+5+3+1 =25=5*5   但是只显示 41个字
        if (num >= s.length) {                //当增大的数值大于设置的文字长度时
            layer = (i - 1) * 2 + 1;          //层数，当num值大于输入的文字长度后说明，i层数打了，减小一层，(1,3,5,7,9)*2对称的层数一样，再加上中间层
            break;
        }
        layer = (i - 1) * 2 + 1;
    }

    for (var i = 0; i < layer; i++) {
        if (i < (layer + 1) / 2) {               //层数加1成偶数再除以2就相当于取1,3,5,7,9,11前五层,到了第六层后就到了后半部分9,7,5,3,1
            wordNum += 2;
        } else {
            wordNum -= 2;
        }
        circleArr.push(wordNum)
    }
    // console.log(circleArr)                [1, 3, 5, 7, 9, 11, 13, 15, 13, 11, 9, 7, 5, 3, 1] 

    theta = Math.PI / (circleArr.length - 1);   //每一层与圆心的夹角，第一层与最后一层算一层

    num = 0;
    for (var i = 0; i < circleArr.length; i++) {         //循环多少层
        phi = Math.PI * 2 / circleArr[i]                  //每一层里的文字平分360度
        for (var j = 0; j < circleArr[i]; j++) {            //每一层包含多少个文字/li
            var li = document.createElement('li');
            li.innerHTML = s[num];
            num++;
            drawCircle(li, theta, phi, i, j);
            oUl.appendChild(li);
        }
    }

    for (var i = 0; i < aLi.length; i++) {
        aLi[i].style.transform = 'translate3D(' + aLi[i].circleX + 'px,' + aLi[i].circleY + 'px,'
            + aLi[i].circleZ + 'px) rotateY(' + aLi[i].criclePhi + 'rad) rotateX(' + aLi[i].cricleTheta + 'rad) '
    }

    //获取li的位置，
    function drawCircle(obj, theta, phi, i, j) {
        obj.circleX = r * Math.sin(theta * i) * Math.sin(phi * j) + 200;     //加200是单纯是将球移动一下
        obj.circleY = -r * Math.cos(theta * i) + 200;                     //负号：是因为构建圆的时候默认从底部开始，这样文字就是从上面开始
        obj.circleZ = r * Math.sin(theta * i) * Math.cos(phi * j);

        obj.bigCircleX = (r + 1000) * Math.sin(theta * i) * Math.sin(phi * j) + 200;     //加200是单纯是将球移动一下
        obj.bigCircleY = -(r + 1000) * Math.cos(theta * i) + 200;                     //负号：是因为构建圆的时候默认从底部开始，这样文字就是从上面开始
        obj.bigCircleZ = (r + 1000) * Math.sin(theta * i) * Math.cos(phi * j);

        obj.cricleTheta = theta * (circleArr.length - i) - Math.PI / 2;     //文字偏转角度，相对于每一层圆中心，因为上面改变了方向。所以层的方向也改变了，先从高层开始
        obj.criclePhi = phi * j;                                                         // 每一个文字相对于球中心


}

        var item = document.querySelector('.item')
        var close = item.querySelector('.close')

        var open = document.querySelector('.open')
        var myDo = document.querySelector('.myDo')
        var oP = document.querySelector('.item').getElementsByTagName('p')[0];

        var myInput = document.querySelector('.myInput')
        var cancle = myInput.querySelector('.cancle')
        var submit = myInput.querySelector('.submit')
        var clearW = myInput.querySelector('.clearW')
        var inner = myInput.querySelector('.inner');
        
        open.addEventListener(Event, function () {

        for (var i = 0; i < aLi.length; i++) {
            aLi[i].style.transform = 'translate3D(' + aLi[i].bigCircleX + 'px,' + aLi[i].bigCircleY + 'px,'
             + aLi[i].bigCircleZ + 'px) rotateY(' + aLi[i].criclePhi + 'rad) rotateX(' + aLi[i].cricleTheta + 'rad) ';
            aLi[i].style.opacity = 0;
        }

        setTimeout(function () {
            item.style.transform = 'scale(1)';
            item.style.webkitTransform = 'scale(1)';
            item.style.opacity = 1;
            item.style.filter = 'alpha(opacity=1)';
        }, 600)
     })
      
        close.addEventListener(Event, function () {
            item.style.transform = 'scale(13)';
            item.style.webkitTransform = 'scale(3)';
            item.style.opacity = 0;
            item.style.filter = 'alpha(opacity=0)';
            
            setTimeout(function () {
                for (var i = 0; i < aLi.length; i++) {
                    aLi[i].style.transform = 'translate3D(' + aLi[i].circleX + 'px,' + aLi[i].circleY + 'px,'
                     + aLi[i].circleZ + 'px) rotateY(' + aLi[i].criclePhi + 'rad) rotateX(' + aLi[i].cricleTheta + 'rad) ';
                    aLi[i].style.opacity = 1;
                }
            }, 600)
        })

        myDo.addEventListener(Event, function () {
            myInput.style.transform = 'scale(1)';
            myInput.style.webkitTransform = 'scale(1)';
        })
        cancle.addEventListener(Event, function () {
            myInput.style.transform = 'scale(0)';
            myInput.style.webkitTransform = 'scale(0)';
        })

        submit.addEventListener(Event, function () {
            oP.innerHTML = inner.value;
           s =oP.innerHTML;
            for (var i = 0; i < aLi.length; i++) {
                aLi[i].innerHTML=s[i]
            }
            myInput.style.transform = 'scale(0)';
            myInput.style.webkitTransform = 'scale(0)';
        })
        clearW.addEventListener(Event, function () {
             inner.value = '';
        })





