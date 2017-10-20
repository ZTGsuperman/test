


window.onload = function () {
    var box=document.getElementById('box')
    var page=document.querySelectorAll('.page')
    var pLength = page.length;
    var pH = page[0].offsetHeight;
    var pW = page[0].offsetWidth;

    for (var i = 1; i < pLength; i++) {
        css(page[i], 'translateY', pH);
    }
  
    var startPoint = 0;
    var lastPoint = 0;
    var dis = 0;
    var off = true;
    var lastIndex = 0;
    var isFrist = true;
    for (var i = 0; i < pLength; i++) {
        css(page[i],'translateZ',0.01)
        page[i].index = i;
        page[i].addEventListener('touchstart', function (ev) {
            var touch = ev.changedTouches[0];
            startPoint = touch.pageY;
            lastPoint = startPoint;
            for (var i = 1; i < pLength; i++) {
                page[i].style.transition = '0s';
            }
        })

        page[i].addEventListener('touchmove', function (ev) {
            var touch = ev.changedTouches[0];
            var nowPoint = touch.pageY;
            dis = nowPoint - lastPoint;
            var target = css(this, 'translateY') + dis;


            if (this.index == 0) {           //当是最后一张，或第一张的时候，就不让向上或向下移动
                if (dis > 0) {
                    return ;
                }
            } else if (this.index == pLength-1) {
                if (dis < 0) {
                    return ;
                }
            }

            if (off) {
                if (dis < 0) {
                    lastIndex = this.index + 1;
                    lastIndex = lastIndex > pLength-1 ? pLength-1 : lastIndex;
                } else if (dis > 0) {
                    lastIndex = this.index - 1;
                    lastIndex = lastIndex < 0 ? 0 : lastIndex;
                }
                off = false;
            }
            css(this, 'translateY', target);
            css(page[lastIndex], 'translateY', css(page[lastIndex], 'translateY') + dis * 2);
            lastPoint = nowPoint;
        })

        page[i].addEventListener('touchend', function (ev) {
            for (var i = 1; i < pLength; i++) {
                page[i].style.transition = '0.3s';
            }
            if (dis < 0) {
                css(this, 'translateY', -pH);
                css(page[lastIndex], 'translateY', 0);
            } else {
                css(this, 'translateY', pH);
                css(page[lastIndex], 'translateY', 0);
            }
          
            var mySkill = document.querySelector('.my_skill');
            var oLi = mySkill.getElementsByTagName('li');
            if (lastIndex == 2) {
                rect(oLi[0],80);
                rect(oLi[1], 60);
                rect(oLi[2], 40);
                rect(oLi[3], 60);
                rect(oLi[4], 50);
                rect(oLi[5], 30)
            }
            else {
                var rects = mySkill.querySelectorAll('.rect');
                var num=mySkill.querySelectorAll('.num')
                for (var i = 0; i < rects.length; i++) {
                    css(rects[i], 'width', 0);
                    num[i].innerHTML = 0+'%';
                }
            }
            off=true
        })
    }

   
    function rect(obj, target) {
        var h3 = obj.getElementsByTagName("em")[0];
        var rect = obj.querySelector('.rect')
        var scale = 0;
        var width = 0;
        var targetW = 200 * (target / 100)
        clearInterval(rect.timer);

        rect.timer = setInterval(function () {
            width = css(rect, "width");
            scale = ((width / 180) * 10).toFixed(1);
            if (width >= targetW) {
                clearInterval(rect.timer);
                scale = Math.floor(scale);
            }
            else {
               rect.style.width = width + 5 + "px";
            }
            h3.innerHTML = scale * 10 + "%";
        }, 30)

    }
  
}



































