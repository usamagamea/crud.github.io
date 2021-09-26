const productDB = (dbName,table) =>{
// create database

const db = new Dexie(dbName)
db.version(1).stores(table);
db.open();

// const db = new Dexie('myDb');
// db.version(1).stores({
//     friends: `name,age`
// })

return db;

}


// insert function

const bulkCreate = (dbTable,data) =>{
    let flag= empty(data)
    if(flag){
        dbTable.bulkAdd([data]);
        console.log("data  inserted successfully ...!");
    }else
    {
        console.log("please Provide Data...!");
    }

    return flag;
}

// check textBox validation 

const empty = object =>{
    let flag = false;

    for(const value in object){
        if(object[value] != ""&& object.hasOwnProperty(value)){
             flag = true;
        }else
        {
            flag=false;
        }
    }
return flag
}

// get data from data  base

const getData = (dbTable, fn) =>{
    let index = 0 ;
    let obj = 0;
    
    dbTable.count((count)=>{
   if(count){
       dbTable.each(table=>{
   
       obj = SortObj(table);

       fn(obj, index++);
   
       })
   }else{
    fn(0);   
   }
    })
}

// sort object

const SortObj = sortObj =>{
    let obj ={};
    obj ={
        id: sortObj.id,
        name:sortObj.name,
        seller:sortObj.seller,
        price: sortObj.price
    }
    return obj
}


// create dynamic elements
const createElement =(tagname, appendTo,fn) =>{

    const element = document.createElement(tagname);
    if(appendTo) appendTo.appendChild(element);
    if(fn) fn(element);
}





export default productDB
export{
    bulkCreate,
    getData,
    createElement
}