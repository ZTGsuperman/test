// JavaScript source code


window.onload = function () {

    var box = document.getElementById('box');
    var list = box.querySelector('.list');
    var oLi = list.getElementsByTagName('li');
    var iLength = oLi.length;

    css(list,'width',iLength*oLi[0].offsetWidth)

    for (var i = 0; i < iLength; i++) {
        css(oLi[i],'translateX',i*oLi[0].offsetWidth)
    }

    mv.tool.autoChange(list,'x',0)
    mv.app.clickNav();
    mv.app.clickAutoImg();
   // mv.app.moveUl();
}
var mv = {};
mv.tool = {}
mv.app = {}

mv.tool.autoChange = function (obj, dir, now) {
    var el = obj.children;
    var length = el.length;

    var num = now;
    var num2 = now;
    var off = true;
    var offset = {
        x: 'offsetWidth',
        y: 'offsetHeight',
    }
    var translate = {
        x: 'translateX',
        y: 'translateY',
    }
    clearInterval(obj.timer)

    var moveDis = 0;

    moveDis = (dir === 'x') ? el[0].offsetWidth : el[0].offsetHeight;
    obj.timer = setInterval(function () {
        if (num === length - 1) {
            el[0].style.transition = 'none';
            css(el[0], translate[dir], length * moveDis);
            num = 0;
            off = true;
        } else {
            num++;
            el[0].style.transition = '1s';
        }
        num2++;
        css(obj, translate[dir], -num2 * moveDis);
        obj.style.transition = '0.6s';
        if (num === 0) {
            obj.addEventListener('webkitTransitionEnd', function () {
                if (off) {
                    off = false;
                    console.log(num)
                    obj.style.transition = '0s';
                    css(el[0], translate[dir], 0);
                    css(obj, translate[dir], 0);
                    num2 = 0;
                }
            })
        }
    }, 5000)
}

mv.app.clickNav = function () {
    var menu = document.getElementById('menu');
    var menuList = menu.querySelector('#menu_list');
    var a = menuList.getElementsByTagName('a');
    var home = menu.querySelector('#home');
    var r = -80;
    var aLength=a.length

    var btnOff = true;

    home.addEventListener("touchstart", function () {
        if (btnOff) {
            css(this, 'rotate', 720);
            for (var i = 0; i < aLength; i++) {
                var dis = getXY(90 / (aLength - 1) * i, r);
                a[i].style.transition = '0.5s ' + i * 0.1 + 's';
                css(a[i], 'rotate', 720)
                a[i].style.left = dis.x + 'px';
                a[i].style.top = dis.y + 'px';
            }

        } else {
            css(this, 'rotate', 0);
            for (var i = 0; i < aLength; i++) {
                a[i].style.transition = '0.8s ' + -i * 0.05 + 's';
                css(a[i], 'rotate', 0);
                a[i].style.left = 0 + 'px';
                a[i].style.top =0 + 'px';
            }
        }
        btnOff = !btnOff;
    })
   
    for (var i = 0; i < aLength; i++) {
        a[i].addEventListener('touchstart', function () {
            this.style.transition = '0.2s ease-in'
            css(this, 'scale', 130);
        })
        a[i].addEventListener('touchend', function () {
            this.style.transition = '0.2s ease-out'
            css(this, 'scale', 100);
        })
    }

    function getXY(iDeg, iRadius) {
        return { x: Math.sin(iDeg * Math.PI / 180) * iRadius, y: Math.cos(iDeg * Math.PI / 180) * iRadius };
    }
}
mv.app.clickAutoImg = function () {
    var list = document.querySelector('.list');
    var oLi = list.getElementsByTagName('li');
    var three = list.querySelector('.weather_word')

    var ischange = true;
    var _this = null;
    for (var i = 0; i < oLi.length; i++) {
        oLi[i].index = i;
        mv.tool.tab(oLi[i], function () {
            _this = this;
                clearInterval(list.timer);
                this.style.transition = '1s'
                if (this.index === oLi.length-1) {
                    three.style.transform = 'rotateZ(45deg) translateZ(100px) scale(1)';
                    setTimeout(function () {
                        three.style.transform = 'rotateZ(45deg) translateZ(100px) scale(0)';
                    }, 3000)
                } else {
                    css(this, 'rotateY', 180);
                    setTimeout(function () {
                        css(_this, 'rotateY', 0);
                    }, 3000)
                }

                setTimeout(function () {
                    mv.tool.autoChange(list, 'x', _this.index)
                }, 4000)
        })

    }

}
mv.app.moveUl = function () {
    var oUl = document.querySelector('.list');
    var oLi = oUl.getElementsByTagName('li')
    var liW = oLi[0].offsetWidth;
    var iLength = oLi.length;
    var lastPoint = 0;
    var dis = 0;
    var index = 0;
    var startL = 0;
    var startPoint = 0;
    oUl.addEventListener('touchstart', function (ev) {
        var touch = ev.changedTouches[0];
        var target = ev.srcElement || target;
        index = li(target).index;
        lastPoint = touch.pageX;
        clearInterval(oUl.timer);
        startY = touch.pageY;
        startL = css(oUl, 'translateX');
        oUl.style.transition = oUl.style.webkitTransition = 'none';
    })
    oUl.addEventListener('touchmove', function (ev) {
        var touch = ev.changedTouches[0];
        var nowPonit = touch.pageX;
        var nowY = touch.pageY;

        dis = nowPonit - lastPoint;
        var target = dis + css(oUl, 'translateX');
        if (target > 0) {
            target = 0;
        } else if (target < -(oUl.offsetWidth - liW)) {
            target = -(oUl.offsetWidth - liW);

        }
        if (nowY - startY < 10) {
            css(oUl, 'translateX', target);
        }

        lastPoint = nowPonit;
    })
    oUl.addEventListener('touchend', function (ev) {
        var touch = ev.changedTouches[0];
        var endY = touch.pageY;
        var endL = css(oUl, 'translateX');
        var moveX = Math.abs(endL - startL);
        if (dis < 0 && moveX > 20) {
            index++;
            index = Math.min(iLength - 1, index);
        } else if (dis > 0 && moveX > 20) {
            index--;
            index = Math.max(0, index);
        }
        oUl.style.transition = oUl.style.webkitTransition = '0.3s';
        css(oUl, 'translateX', -index * liW);
        if (endY - startY < 10) {
            ev.stopPropagation();
        }

        setTimeout(function () {
            mv.tool.autoChange(oUl, 'x', index)
        }, 4000)
    })

    function li(obj) {
        var target = obj;
        if (obj.nodeName.toLowerCase() === 'ul') return;
        if (target.nodeName.toLowerCase() != 'li') {
            return li(obj.parentNode)
        } else {
            return target;
        }
    }
}

mv.tool.tab = function (el, fn) {
    var startPoint = {};
    el.addEventListener('touchstart', function (e) {
        var touch = e.changedTouches[0];
        startPoint = {
            x: touch.pageX,
            y: touch.pageY
        }
    });
    el.addEventListener('touchend', function (e) {
        var touch = e.changedTouches[0];
        var nowPoint = {
            x: touch.pageX,
            y: touch.pageY
        };
        var dis = {
            x: Math.abs(nowPoint.x - startPoint.x),
            y: Math.abs(nowPoint.y - startPoint.y)
        }
        if (dis.x < 5 && dis.y < 5) {
            fn.call(el, e);
        }
    });
}