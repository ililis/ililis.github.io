ymaps.ready(init);
var tochka_a = [55.043722, 82.907398]
var tochka_b = [55.017343, 82.947289]
var position =[];
var i,j;
var n = 11;
var placemark = [];
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}
function init() {
    var myMap = new ymaps.Map("map", {
            center: [55.030031, 82.920838],
            zoom: 13
        });
    for(i=0;i<n;i++)
    {
        position[i]=[];
        position[i][0]=getRandomFloat(tochka_b[0], tochka_a[0]);
        position[i][1]=getRandomFloat(tochka_a[1], tochka_b[1]);
        placemark[i] = new ymaps.Placemark(position[i]);
        myMap.geoObjects.add(placemark[i]);
    }
    function play()
    {
        for(i=0;i<n;i++)
        {
            var rez=ymaps.geoQuery(placemark[i]);
            random_move(rez.get(0).geometry._coordinates);
            myMap.geoObjects.remove(placemark[i]);
            placemark[i] = new ymaps.Placemark(position[i],{}, {present: 'islands#blackCircleDotIcon'});
    	    myMap.geoObjects.add(placemark[i]);
    	    console.log(rez.get(0).geometry._coordinates);
        }


    	setTimeout(function() {
            play();
            }, 1000);
    }
    play();
}

function random_move(pos) {
    for(j=0;j<2;j++)
    {
        if(j==0)
        {
            var a=getRandomInt(0,2)
            if(a==0)
            {
                pos[j] += 0.00002;
            }
            if(a==1)
            {
                pos[j] -= 0.00002;
            }
        }
        if(j==1)
        {
            var a=getRandomInt(0,2)
            if(a==0)
            {
                pos[j] += 0.00002;
            }
            if(a==1)
            {
                pos[j] -= 0.00002;
            }
        }
    }
}