var chl=document.getElementById('lineChart')
var den=document .getElementById('ScoreBar')
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
firebase.initializeApp(firebaseConfig);
detail=[]
database=firebase.database()
var ref = database.ref('/data/');
ref.on('value', gotData)


function LineChart(li,mi,he,time){
  const score=[0.5,1,3]

  const labels = time

  var lineChart=new Chart(chl, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Light',
        data: li,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },{
      label: 'Medium',
      data: mi,
      fill: false,
      borderColor: 'rgb(75, 0, 192)',
      tension: 0.1
      },{
      label: 'Heavy',
      data: he,
      fill: true,
      borderColor: 'rgb(255, 0, 0)',
      tension: 0.2
      }],
    },
  });
  var bar=new Chart(den,{
    type: 'bar',
    data: {
      label:'Density',
      datasets: [{
        label:'Overall',
        data:[(li[4]*score[0]+mi[4]*score[1]+he[4]*score[2])/20],
        backgroundColor:[
        'rgba(255, 99, 132, 0.2)'
        ],
        borderWidth: 1
      
      },{
        label:'Light',
        data:[li[4]*score[0]/20],
        backgroundColor:[
          'rgba(255, 206, 86, 0.2)'
        ],
        borderWidth: 1
      },{
        label:'Medium',
        data:[mi[4]*score[1]/20],
        backgroundColor:[
          'rgba(54, 162, 235, 0.2)'
        ],
        borderWidth: 1
      },{
        label:'Heavy',
        data:[he[4]*score[2]/20],
        backgroundColor:[
          'rgba(75, 192, 192, 0.2)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
  })

}


function gotData(data){
  const classes=['car','truck','bus','motorbike','person']
  var count_car=0
  var count_motorbike=0
  var count_truck=0
  var count=0
  
  var ch_c=[]
  var ch_t=[]
  var ch_m=[]
  var ch_time=[]

  var realdata =data.val();
  var keys=Object.keys(realdata);
  i1=keys[keys.length-1]

  c1=realdata[i1]
  i_time=c1[0].properties.Time;

  for (var i=keys.length-1;i<keys.length; i++){
    var k=keys[i];
    var classified = realdata[k];

    for (var j=0;j<classified.length; j++){
      
      y=classified[j].geometry.coordinates[1];
      x=classified[j].geometry.coordinates[0];
      SN=classified[j].properties.SN;
      Class=classified[j].properties.Class_IDs;
      Time=classified[j].properties.Time;
      console.log(Time)
      
      if (i_time==Time){
        if (Class==classes[0]){
          count_car+=1
        }
        else if (Class==classes[1] || Class==classes[2]){
          count_truck+=1
        }
        else if (Class==classes[3] || Class==classes[4]){
          count_motorbike+=1
        }
      }
      
      else{
        i_time=Time
        console.log('car = ',ch_c,"\n truck = ",ch_t,"\n motorbike = ",ch_m)
        
        if (count>=25){
          ch_c.shift()
          ch_m.shift()
          ch_t.shift()
          ch_time.shift()
          count--  
        }
        ch_c[count]=count_car
        ch_m[count]=count_motorbike
        ch_t[count]=count_truck
        ch_time[count]=Time
        
        LineChart(ch_m,ch_c,ch_t,ch_time)
        count_car=0
        count_truck=0
        count_motorbike=0
        count++
      }
      
    }
  }
};





  

