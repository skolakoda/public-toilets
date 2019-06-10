
const nazivKolekcije = 'novogroblje/';
const url = 'https://spomenici-api.herokuapp.com/kolekcija/'+ nazivKolekcije;

(function initAdm(){
    fetch(url)
    .then(function(response) {
       return response.json();
    })
    .then(function(response) {        
        loadPanel(response.data);                       
    });
})();

function loadPanel(promisData){
    const data = promisData;    
    let tr = document.createElement('tr'); 
    let arrId = [];
    for(let i=0; i < data.length; i++)
    {  
        let tr1 = document.createElement('tr'); 
        for(let j=i; j < data.length; j++)
        {
            let td0 = document.createElement('td');
            let td1 = document.createElement('td');                
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');
            let td4 = document.createElement('td');
            let td5 = document.createElement('td')
            let in0 = document.createElement('input');
            let in1 = document.createElement('input');
            let in2 = document.createElement('input'); 
            let in3 = document.createElement('input');
            let in4 = document.createElement('button');
            let in5 = document.createElement('button');
            arrId.push(data[j]._id);
              
            in0.setAttribute("type", "radio");
            in0.setAttribute("name", "ocupation");
            in0.setAttribute("value", "attribute");
            in0.setAttribute("id", data[j]._id);             
                           
            in0.addEventListener('click', function(event){                             
                  if(in0.checked){                                        
                    for(let i=0; i < arrId.length; i++){                        
                        let item1 = document.getElementsByClassName(arrId[i])[0];
                        let item2 = document.getElementsByClassName(arrId[i])[1];
                        let item3 = document.getElementsByClassName(arrId[i])[2];
                        let item4 = document.getElementsByClassName(arrId[i])[3];
                        let item5 = document.getElementsByClassName(arrId[i])[4];
                        if( (in0.id !== item1.getAttribute("class")) || (in0.id !== item2.getAttribute("class")) || (in0.id !== item3.getAttribute("class")) || (in0.id !== item4.getAttribute("class"))  || (in0.id !== item5.getAttribute("class")) ){
                            item1.removeAttribute('style', 'color: grey');
                            item2.removeAttribute('style', 'color: grey');
                            item3.removeAttribute('style', 'color: grey');                                
                            item4.removeAttribute('style', 'color: lime');                                                        
                            item5.removeAttribute('style', 'colr: red');
                            item1.disabled = true;  
                            item2.disabled = true;
                            item3.disabled = true;   
                            item4.disabled = true;
                            item5.disabled = true;
                        }                    
                    }                                           
                    setStyle(in1, in2, in3, in4, in5);
                }  
                toggle(in1, in2, in3, in4, in5);                 
            })
            
            td0.innerHTML = '';
            td0.appendChild(in0); 
            tr1.appendChild(td0);

            in1.value = data[j].naslov;
            in1.setAttribute("name", "ocupation");
            in1.setAttribute("value", "attribute");
            in1.setAttribute("disabled","disabled");
            in1.setAttribute("class", data[j]._id);
            td1.innerHTML = '';
            td1.appendChild(in1); 
            tr1.appendChild(td1); 

            in2.value = data[j].opis;
            in2.setAttribute("disabled","disabled");
            in2.setAttribute("class", data[j]._id);
            td2.innerHTML = '';
            td2.appendChild(in2);                
            tr1.appendChild(td2);

            in3.value = data[j].kategorija;
            in3.setAttribute("disabled","disabled");
            in3.setAttribute("class", data[j]._id);
            td3.innerHTML = '';
            td3.appendChild(in3);
            tr1.appendChild(td3);

            in4.innerHTML = 'Save';
            in4.setAttribute("disabled","disabled");
            in4.setAttribute("class", "btnSave");                                          
            in4.classList.add(data[j]._id);
            in4.addEventListener('click', function(event){                                                                                           
                saveRow(in0, in1, in2, in3, data[j].lokacija.lon, data[j].lokacija.lat);
                disableRow(in0, in1, in2, in3, in4, in5);                                                                
            });
            td4.appendChild(in4); 
            tr1.appendChild(td4);

            in5.innerHTML = 'Delete';
            in5.setAttribute("disabled","disabled");
            in5.setAttribute("class", "btnDelete");
            in5.classList.add(data[j]._id);                                       
            in5.addEventListener('click', function(event){                                
                deleteRow(in0);
                disableRow(in0, in1, in2, in3, in4, in5);                
            });
            td5.appendChild(in5);
            tr1.appendChild(td5);

            document.getElementById('data').appendChild(tr1);
            break;
        }  
        document.getElementById('data').appendChild(tr);       
    } 

}
function disableRow(edit, naslov,  opis, kategorija, save, del){
    const in0 =  edit;
    const in1 = naslov;
    const in2 = opis;
    const in3 = kategorija;
    const in4 = save;
    const in5 = del;
    in0.checked = false;
    in1.disabled = true;
    in2.disabled = true;
    in3.disabled = true;
    in4.disabled = true;
    in5.disabled = true;    
}
function saveRow(col0, col1, col2, col3, longitude, latitude){
    const in0 = col0;
    const in1 = col1;
    const in2 = col2;    
    const in3 = col3;
    const ln = longitude; 
    const lt = latitude;
    const urlEdit = url + 'uredi/' + in0.id;                
    fetch(urlEdit,{
       method: 'PUT',
       headers: { 'Content-Type': 'application/json'},
       body: JSON.stringify({
           naslov: in1.value,
           opis: in2.value,
           kategorija: in3.value,   
           lon: ln,
           lat: lt
       })                          
    }) 
   .then(function(response) { return response.json(); } )
   .then(function(){ location.reload(); })
   .catch(function(error) { console.error('Error:', error); })   
}
function deleteRow(col0){
    const in0 = col0;
    const urlDelete = url + 'obrisi/' + in0.id;   
    console.log(urlDelete);
                    
    fetch(urlDelete, {
        method: 'DELETE'
    })    
    .then(function(response) { return response.json(); } )
    .then(function(){ location.reload(); })    
}
function toggle(col1, col2, col3, col4, col5){
    let in1 = col1;
    let in2 = col2;
    let in3 = col3;
    let in4 = col4;
    let in5 = col5;

    in1.disabled = !in1.disabled;                    
    in2.disabled = !in2.disabled;
    in3.disabled = !in3.disabled; 
    in4.disabled = !in4.disabled;
    in5.disabled = !in5.disabled; 
}
function setStyle(col1, col2, col3, col4, col5){
    let in1 = col1;
    let in2 = col2;
    let in3 = col3;
    let in4 = col4;
    let in5 = col5;

    in1.setAttribute('style', 'color: grey');
    in2.setAttribute('style', 'color: grey');
    in3.setAttribute('style', 'color: grey');
    in4.setAttribute('style', 'color: lime');
    in5.setAttribute('style', 'color: red');
}
