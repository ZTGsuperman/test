// JavaScript source code


window.onload = function () {

    var list = document.querySelector('.list');
    var oUl = list.getElementsByTagName('ul')[0];
    var oLi = list.getElementsByTagName('li');

    var oLength = oLi.length;


    var github = document.querySelector('.github');
    github.addEventListener('touchstart', function () {
        window.location.href = this.href;
    })

    var lastPoint = 0;
    var dis = 0;

    oUl.addEventListener('touchstart', function (ev) {
        var touch = ev.changedTouches[0];
        lastPoint = touch.pageY;
    })
    oUl.addEventListener('touchmove', function (ev) {
        var touch = ev.changedTouches[0];
        var nowPoint = touch.pageY;
        dis = nowPoint - lastPoint;

        var translateY = css(oUl, 'translateY');
        var target = translateY + dis;

        if (target > 0) {
            target = 0;
        } else if (target < list.offsetHeight - oUl.offsetHeight) {
            target = list.offsetHeight - oUl.offsetHeight
        }
        css(oUl, 'translateY', target);
        lastPoint = nowPoint;
    })
    

    for (var i = 0; i < oLength; i++) {
        tab(oLi[i], function () {
            var a = this.getElementsByTagName('a')[0];
            window.location.href = a.href;
        })
    }

    clickNav()
}

 function tab(el, fn) {
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

function clickNav() {
     var menu = document.getElementById('menu');
     var menuList = menu.querySelector('#menu_list');
     var a = menuList.getElementsByTagName('a');
     var home = menu.querySelector('#home');
     var r = -80;
     var aLength = a.length

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
                 a[i].style.top = 0 + 'px';
             }
         }
         btnOff = !btnOff;
     })

     for (var i = 0; i < aLength; i++) {
         a[i].addEventListener('touchstart', function () {
             this.style.transition = '0.4s ease-in'
             css(this, 'scale', 150);
         })
         a[i].addEventListener('touchend', function () {
             this.style.transition = '0.4s ease-out'
             css(this, 'scale', 100);
             window.location.href = this.href;
         })
     }

     function getXY(iDeg, iRadius) {
         return { x: Math.sin(iDeg * Math.PI / 180) * iRadius, y: Math.cos(iDeg * Math.PI / 180) * iRadius };
     }
 }
















