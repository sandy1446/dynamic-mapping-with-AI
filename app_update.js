var firebaseConfig = {    
    apiKey: "AIzaSyD3gWna7k222TDmjKx-w5B4MK8oxQ15LQo",
    authDomain: "quickstart-1598859311837.firebaseapp.com",
    databaseURL: "https://quickstart-1598859311837.firebaseio.com",
    projectId: "quickstart-1598859311837",
    storageBucket: "quickstart-1598859311837.appspot.com",
    messagingSenderId: "253027976319",
    appId: "1:253027976319:web:6c83bbe785ff1d5b902b4a",
    measurementId: "G-8V4V93NGZ5"
  };
  
  var map=L.map('map',{
    crs:L.CRS.Simple
  });
  
  var m_car = L.icon({
    iconUrl:'./marker/yellow.png',
    iconSize:[10,10],
    
  })
  var m_bike = L.icon({
    iconUrl:'./marker/blue.png',
    iconSize:[10,10]
  })
  var m_bus = L.icon({
    iconUrl:'./marker/images.png',
    iconSize:[10,10]
  })
  
  var bounds=[[-50,-100],[100,100]];
  
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  detail=[]
  database=firebase.database()
  var ref = database.ref('/data/');
  ref.on('value', gotData)
  
  var count=1;
  var i=0;
  var a=Array();
  var b=Array();
  var c=Array();
  var d=Array();
  var e=Array();
  var name=Array();
  function Cnt(c,d){
    if(d.length>1){
        //console.log(c,d)
        for(j=0;j<d[0].length;j++){
            for(k=0;k<d[1].length;k++){
                r=d[0][j]
                r1=d[1][k]
                yn=r-r1
                xn=c[1][k]-c[0][j]
                //if ((r>10 && r<30) && (r1>10 && r1<30)){
                    if (yn<8 && yn>0 && xn>-1 && xn<1){
                        sin++;
                        var layerGroup=L.polyline([[d[0][j],-c[0][j]],[d[1][k],-c[1][k]]],{
                            color: 'blue',
                            weight: 1,
                        }).addTo(map);
                        //L.marker([d[0][j],-c[0][j]]).addTo(map);
                    }
  
                    else if(yn<0 && yn>-7 && xn>-1 && xn<1){
                        sout++;
                        var layerGroup=L.polyline([[d[0][j],-c[0][j]],[d[1][k],-c[1][k]]],{
                            color: 'red',
                            weight:1,
                        }).addTo(map);
                    }
                    document.getElementById("clickup").innerHTML=sin;
                    document.getElementById("clickdn").innerHTML=sout;
                    for(m=0;m<10000;m++){
  
                    }
                    
                //}
            }
        }
    }
  }
  function gotData(data){
    
    //console.log(data.val());
    var realdata =data.val();
    var keys=Object.keys(realdata);
    i1=keys[keys.length-1]
    var a=[]
    var count=0
    var c=[]
    var d=[]
    var f=0
    var s
    var b=[]
    var Nam=[]

    c1=realdata[i1]
    i_time=c1[0].properties.Time;
    //console.log(i_time)
    
    for (var i=keys.length-1;i<keys.length; i++){
      console.log(keys[i])
      var k=keys[i];
      var classified = realdata[k];
      a[0]=classified[0].geometry.coordinates[0]
      b[0]=classified[0].geometry.coordinates[1]
      for (var j=0;j<classified.length; j++)
      {
        /*data={
          "type":"Feature",
          "geometry":{
            "type":"Point",
            "coordinates":[classified[j].geometry.coordinates[0],classified[j].geometry.coordinates[1]]
          },
          "properties":{
            "SN":classified[j].properties.SN,
            "Class_IDs":classified[j].properties.Class_IDs,
            "Time":classified[j].properties.Time
          }
        }*/
        y=classified[j].geometry.coordinates[1];
        x=classified[j].geometry.coordinates[0];
        SN=classified[j].properties.SN;
        Class=classified[j].properties.Class_IDs;
        Time=classified[j].properties.Time;
        /*if (Class=="car"){
          L.circle([x,y], {
            color: 'red',
            fillColor: 'yellow',
            fillOpacity: 0,
            radius: 1
          }).addTo(map);
          
        }
        if (Class=="bus" || Class=="truck"){
          L.circle([x,y], {
            color: 'blue',
            fillColor: 'yellow',
            fillOpacity: 0,
            radius: 1
          }).addTo(map);
          
        }
        if (Class=="motorbike" || Class=="person"){
          L.circle([x,y], {
            color: 'yellow',
            fillColor: 'yellow',
            fillOpacity: 0,
            radius: 1
          }).addTo(map);
          
        }*/
        if (i_time==Time){
            for(k=0;k<a.length;k++){
                cx=x-a[k];
                cy=y-b[k];
                //console.log(cx,cy)
                if (cx>-10 && cx<10 && cy>-10 && cy<10){
                    s=1
                    break
                }
                else {
                    s=0
                    
                }
            }
            if(s==0)
            {
                a[f]=x
                b[f]=y
                Nam[f]=Class
            }
            
        }
        else{
            console.log(Time)
            if (count>=5){
                c.shift()
                d.shift()
            }
            c.push=a
            d.push=b
            
            a=[]
            b=[]
            Nam=[]
            f=0
            i_time=Time
            a[f]=x
            b[f]=y
            Nam[f]=Nam
            count++
            
        }
        f++
        
      }
      console.log(c,d)
     
    }
  }
  
  map.fitBounds(bounds);
  