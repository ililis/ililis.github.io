ymaps.ready(init);
const n = 4;
const nc = 5;
var user = [];
var lines;
var temp1lat = [];
var temp1lon = [];
var temp2lat = [];
var temp2lon = [];
var k = 0;
var coords;
var circle = [];
var rad = 921;
bigMap = false;
let speed = 100;

function init(){


	// Создание карты.
		var myMap = new ymaps.Map("map", {
		// Координаты центра карты.
		// Порядок по умолчанию: «широта, долгота».
		center: [55.030850, 82.920290],
		// Уровень масштабирования. Допустимые значения:
		// от 0 (весь мир) до 19.
		zoom: 14
	});

	for(var i = 0; i < n; i++){
		var lon = 82.91 + (Math.random() * 0.4) / 20;
		var lat = 55.02 + (Math.random() * 0.4) / 20;
				
		user[i] = new ymaps.GeoObject({
  	  // Описываем геометрию типа "Точка".
 		geometry: {
    			type: "Point",
			coordinates: [lat, lon]
			},
    // Описываем данные геообъекта.
    		properties: {
			hintContent: 'Людь '+i,
        		balloonContentHeader: "Это людь",
        		balloonContentBody: "перетащи его",
        		population: 11848762
    				}
}, {
    // Задаем пресет метки с точкой без содержимого.
    preset: "islands#greenDotIcon",
    // Включаем возможность перетаскивания.
    draggable: true,
    // Переопределяем макет содержимого нижней части балуна.
    balloonContentFooterLayout: ymaps.templateLayoutFactory
        .createClass(),
    // Отключаем задержку закрытия всплывающей подсказки.
    hintCloseTimeout: null
});
// Добавляем геообъект на карту.
myMap.geoObjects.add(user[i]);
	}
		 circle.push(new ymaps.Circle([[55.042308, 82.918913], rad], {}, {draggable: true}));
         circle[0].name = "Станция Сибирская"
         circle[0].properties.set('hintContent', circle[0].name);
 
         circle.push(new ymaps.Circle([[55.022971, 82.922366], rad], {}, {draggable: true}));
         circle[1].name = "Красный проспект"
         circle[1].properties.set('hintContent', circle[1].name);
 
         circle.push(new ymaps.Circle([[55.029854, 82.939356], rad], {}, {draggable: true}));
         circle[2].name = "ТЦ Аура"
         circle[2].properties.set('hintContent', circle[2].name);
 
         circle.push(new ymaps.Circle([[55.035573, 82.897818], rad], {}, {draggable: true}));
         circle[3].name = "Вокзал"
         circle[3].properties.set('hintContent', circle[3].name);
 
         circle.push(new ymaps.Circle([[55.031627, 82.915613], rad], {}, {draggable: true}));
         circle[4].name = "Вокзальная"
         circle[4].properties.set('hintContent', circle[4].name);
         for(var j = 0; j < nc; j++){
             myMap.geoObjects.add(circle[j]);
    }
	let timech= 0;
	var sinrA = [[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
	var timeA = [];
	var data=[];
	var lineDiv = [];
	let graphStep = 5;
	var sinr;
	var PL
	
function userMovement() {
		timeA [timech]= timech;
		let sumbad;
			
		for(let i = 0; i < n; i++){
			
			coords = user[i].geometry.getCoordinates();
			temp1lat[i] = coords[0];
			temp1lon[i] = coords[1];
////DefineBS

 
          var min = 10000;
          var minj = 0;
          var bad = [];
		  sumbad=0;
          for(var j = 0; j < nc; j++){
              bad[j] = ymaps.coordSystem.geo.getDistance(circle[j].geometry.getCoordinates(), coords);
              if(bad[j] < rad){
                  if(min > bad[j]){
                      min = bad[j]
                      minj = j
				  } 
				}
			}
////sinr
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			PL = -(46.3+33.9*Math.log10(1600)-13.82*Math.log10(18)+((47.88+13.9*Math.log10(1600)-13.6*Math.log10(18))/Math.log10(50))*Math.log10(min/1000));
			console.log(PL);
			for(j = 0; j < nc; j++)
			{
				sumbad+=-(46.3+33.9*Math.log10(1600)-13.82*Math.log10(18)+((47.88+13.9*Math.log10(1600)-13.6*Math.log10(18))/Math.log10(50))*Math.log10(bad[j]/1000));
			}
			sinr= PL/(4+sumbad-PL);
			// sinr = PL/(4+(PL-(46.3+33.9*Math.log10(1600)-13.82*Math.log10(18)+((47.88+13.9*Math.log10(1600)-13.6*Math.log10(18))/Math.log10(50))*Math.log10(da[0]/1000))+46.3+33.9*Math.log10(1600)-13.82*Math.log10(18)+((47.88+13.9*Math.log10(1600)-13.6*Math.log10(18))/Math.log10(50))*Math.log10(da[1]/1000)+46.3+33.9*Math.log10(1600)-13.82*Math.log10(18)+((47.88+13.9*Math.log10(1600)-13.6*Math.log10(18))/Math.log10(50))*Math.log10(da[2]/1000)+46.3+33.9*Math.log10(1600)-13.82*Math.log10(18)+((47.88+13.9*Math.log10(1600)-13.6*Math.log10(18))/Math.log10(50))*Math.log10(da[3]/1000)+46.3+33.9*Math.log10(1600)-13.82*Math.log10(18)+((47.88+13.9*Math.log10(1600)-13.6*Math.log10(18))/Math.log10(50))*Math.log10(da[4]/1000)));
			sinrA[i][timech] = sinr;
			document.getElementById("dist"+i).value = PL;
			document.getElementById("sinr"+i).value = sinr;
			if(min <= rad)
			{
				document.getElementById("nbs"+i).value = circle[minj].name
			}
			else{
				document.getElementById("nbs"+i).value = "Нет подключения"
			}
			if(timech%graphStep==0){
				lineDiv[i] = document.getElementById('line-chart'+i);
				var traceA = {
				x: timeA,
				y: sinrA[i],
				type: 'scatter',
			};
			
			data[i] = [traceA];
			var layout = {
				 height: 400,
				 width: 600,
				title:'SINR(time) for Людь ' + i,
				showlegend: false,
				font: {
				color: 'black'
				}
			};
			Plotly.newPlot( lineDiv[i], data[i], layout );
			}
				////////////////////////////////////////////// end sinr
			
			coords = someMotion(coords[0], coords[1]); 			
			user[i].geometry.setCoordinates(coords);
			temp2lat[i] = coords[0];
			temp2lon[i] = coords[1];
			}
			

			if(k>0){
		for(var jj = 0; jj < n; jj++){
			lines = new ymaps.Polyline([
          	  // Указываем координаты вершин ломаной.
			[temp1lat[jj], temp1lon[jj]],
			[temp2lat[jj], temp2lon[jj]]
     	   ], {
            // Описываем свойства геообъекта.
            // Содержимое балуна.
            balloonContent: "Ломаная линия"
        }, {
            // Задаем опции геообъекта.
            // Отключаем кнопку закрытия балуна.
            balloonCloseButton: false,
            // Цвет линии.
            strokeColor: "#4169E1",
            // Ширина линии.
            strokeWidth: 4,
            // Коэффициент прозрачности.
            strokeOpacity: 0.9
        });
		myMap.geoObjects.add(lines);
		}
					
		}
		k+=1;
		timech+= 1;
	if(timech<100){
		setTimeout(userMovement, 1000);
	}
}
	userMovement();
}

function someMotion(lat, lon){
	lat = random_move(lat);
	lon = random_move(lon);
	return [lat, lon];

function random_move(corr){
	var a=getRandomInt(0,2)
       	if(a==0)
       	{
        	corr += 0.0002*speed/70;
       	}
       	if(a==1)
       	{
        	corr -= 0.0002*speed/70;
       	}	
	return corr;
}

}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}






