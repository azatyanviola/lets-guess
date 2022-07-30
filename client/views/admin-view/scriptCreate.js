async function CreateQuestion(getObj) {
    const response = await fetch("/admin", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({

            question: getObj.question,
            answer1: {
                isTrue: getObj.istrue1,
                text: getObj.answer1
            },
            answer2: {
                isTrue: getObj.istrue2,
                text: getObj.answer2
            },
            answer3: {
                isTrue: getObj.istrue3,
                text: getObj.answer3
            },
            answer4: {
                isTrue: getObj.istrue4,
                text: getObj.answer4
            },

            created: getObj.created,
        })
    });

    if (response.ok === true) {
        const question = await response.json();

        //........................................
        window.location.href = "/admin-view/index.html";
        //........................................
    }

}


document.forms["questionForm"].addEventListener("submit", e => {
    e.preventDefault();

    const form = document.forms["questionForm"];
    const ques = form.elements["question"].value;
    const ans1 = form.elements["answer1"].value;
    const true1 = form.elements["istrue1"].checked;
    const ans2 = form.elements["answer2"].value;
    const true2 = form.elements["istrue2"].checked;
    const ans3 = form.elements["answer3"].value;
    const true3 = form.elements["istrue3"].checked;
    const ans4 = form.elements["answer4"].value;
    const true4 = form.elements["istrue4"].checked;
    const dt = form.elements["created"].value;

    let getData = {
        question: ques,
        answer1: ans1,
        istrue1: true1,
        answer2: ans2,
        istrue2: true2,
        answer3: ans3,
        istrue3: true3,
        answer4: ans4,
        istrue4: true4,
        created: dt,
    }
    const id = getQueryStr();
    if (id != null) {
        UpdateQuestion(getData, id);
    } else {
        CreateQuestion(getData);
    }

});
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
async function GetQuestion(id) {
    const response = await fetch("/admin/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok === true) {
        const qs = await response.json();

        const form = document.forms["questionForm"];
        form.elements["question"].value = qs.question;
        form.elements["answer1"].value = qs.answer1.text;
        form.elements["istrue1"].checked = qs.answer1.isTrue;

        form.elements["answer2"].value = qs.answer2.text;
        form.elements["istrue2"].checked = qs.answer2.isTrue;

        form.elements["answer3"].value = qs.answer3.text;
        form.elements["istrue3"].checked = qs.answer3.isTrue;

        form.elements["answer4"].value = qs.answer4.text;
        form.elements["istrue4"].checked = qs.answer4.isTrue;
        form.elements["created"].value = qs.created;

    }

}

//------------------------------------------------------------------------------
function getQueryStr() {
    const queryStr = window.location.search;
    if (queryStr === null) {
        return;
    }
    const urlParams = new URLSearchParams(queryStr);
    const id = urlParams.get('id');
    return id;
}
//------------------------------------------------------------------------------
function fillForm() {
    const id = getQueryStr();
    if (id != null) {
        GetQuestion(id);
    }
}

fillForm();
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
async function UpdateQuestion(getObj, id) {

    const response = await fetch("/admin", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            _id: id,
            question: getObj.question,
            answer1: {
                isTrue: getObj.istrue1,
                text: getObj.answer1
            },
            answer2: {
                isTrue: getObj.istrue2,
                text: getObj.answer2
            },
            answer3: {
                isTrue: getObj.istrue3,
                text: getObj.answer3
            },
            answer4: {
                isTrue: getObj.istrue4,
                text: getObj.answer4
            },

            created: getObj.created,
        })
    });

    if (response.ok === true) {
        const updtQues = await response.json();

        //........................................
        window.location.href = "/admin-view/index.html";
        //........................................
    }

}