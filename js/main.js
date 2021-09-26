import productDB, {
    bulkCreate,
    getData,
    createElement
} from "./module.js";

let db = productDB("productDB", {
    products: `++id,name,seller,price`
});

// input tags
const userId = document.getElementById("userId");
const productName = document.getElementById("proName");
const seller = document.getElementById("seller");
const price = document.getElementById("price");


// buttons

const btnCreate = document.getElementById("btnCreate");
const btnRead = document.getElementById("btnRead");
const btnUpdate = document.getElementById("btnUpdate");
const btnDelete = document.getElementById("btnDelete");


// notfound
const notfound = document.getElementById("notfound");


// insert value using create button
btnCreate.onclick = (e) => {
    let flag = bulkCreate(db.products, {
        name: proName.value,
        seller: seller.value,
        price: price.value
    })
    // console.log(flag);
    proName.value = seller.value = price.value = "";
    getData(db.products, (data) => {
        userId.value = data.id + 1 || 1;
    });

    table();

    let insertMsg = document.querySelector(".insertmsg");
    getMsg(flag, insertMsg);
}

// create event on btn read button

btnRead.onclick = table;

// update event
btnUpdate.onclick = () => {
    const id = parseInt(userId.value || 0)

    if (id) {
        db.products.update(id, {
            name: proName.value,
            seller: seller.value,
            price: price.value
        }).then((updated) => {

            let get = updated ? true : false;

            let updateMsg = document.querySelector(".updatemsg");

            getMsg(get, updateMsg)

            proName.value = seller.value = price.value = "";


        })
    }

}

// delete records

btnDelete.onclick = () => {
    db.delete();
    db = productDB("productDB", {
        products: `++id,name,seller,price`
    });
    db.open();
    table();
    textID(userId);

    let deleteMsg = document.querySelector(".deletemsg");
    getMsg(true, deleteMsg);

}

// window onload event
window.onload = () => {
    textID(userId);
}

function textID(textBoxId) {
    getData(db.products, data => {
        textBoxId.value = data.id + 1 || 1;
    })
}



function table() {


    const tBody = document.getElementById("tbody");


    while (tBody.hasChildNodes()) {
        tBody.removeChild(tBody.firstChild);
    }

    getData(db.products, (data) => {

        if (data) {
            createElement("tr", tBody, tr => {

                for (const value in data) {
                    createElement("td", tr, td => {
                        td.textContent = data.price === data[value] ? `$ ${data[value]}` : data[value];
                    })
                }
                createElement("td", tr, td => {
                    createElement("i", td, i => {
                        i.className += "fas fa-user-edit btnEdit"
                        i.setAttribute("data-id", data.id);
                        i.onclick = editBtn;
                    })
                })
                createElement("td", tr, td => {
                    createElement("i", td, i => {
                        i.className += "fas fa-trash btnDelete";
                        i.setAttribute("data-id", data.id);
                        i.onclick = deleteBtn;
                    })
                })

            })

        } else {
            notfound.textContent = "No Record in the database ..!"
        }

    })

}

function editBtn(e) {
    let id = parseInt(e.target.dataset.id);

    db.products.get(id, data => {
        userId.value = data.id || 0;
        proName.value = data.name || "";
        seller.value = data.seller || "";
        price.value = data.price || "";
    })

}

function deleteBtn(e) {
    let id = parseInt(e.target.dataset.id);

    db.products.delete(id);
    table();
}

//function msg

function getMsg(flag, element) {
    if (flag) {
        // call msg 
        element.className += " moveDown";

        setTimeout(() => {
            element.classList.forEach(classname => {
                classname == "moveDown" ? undefined : element.classList.remove('moveDown');
            })
        }, 4000);
    }
}