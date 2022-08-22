/**
 * author: kientt6602
 * date: 22-08-2022
 * */ 


//REDUX
//state
let inititalState = JSON.parse(sessionStorage.getItem('hobby')) || ["Listen to music"]

//reducer
const hobbyReducer = function (state = inititalState, action) {
    switch (action.type) {
        case "ADD":
            state.push(action.payload);
            break;
        case "REMOVE":
            _.pull(state, action.payload);
            break;
        default:
            break;
    }
    sessionStorage.setItem('hobby', JSON.stringify(state))
    return [...state];  //must CLONE 
}

//store
let store = Redux.createStore(hobbyReducer);
store.subscribe(() => renderHobbies(store.getState()))


//RENDER REDUX HOBBY LIST
function renderHobbies(data) {
    let $html = data.map(el => `<li style="margin-bottom: 10px" data-remove="${el}">${el} <button type="button" class="btn btn-outline-danger btn-sm" onclick="removeItem('${el}')">delete</button></li>`).join('')
    $("#hobbylist").html($html)
    $("input").val("")  //reset.
}

function removeItem(hobby) {
    store.dispatch({
        type: "REMOVE",
        payload: hobby
    })
}

function addItem(hobby) {
    store.dispatch({
        type: "ADD",
        payload: hobby
    })
}

$("form").on("submit", function (e) {
    e.preventDefault();
    let hobby = $(this).serializeArray()[0].value;
    addItem(hobby)
})

$(document).ready(function () {
    renderHobbies(store.getState());
})
