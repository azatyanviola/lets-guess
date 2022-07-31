async function GetQuestions() {
    const response = await fetch("/admin", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok === true) {
        const questions = await response.json();

        let rows = document.querySelector("tbody");
        questions.data.forEach(ques => {

            rows.append(row(ques));
        });
    }

}
////////////////////////////////////////////////////////////////////////////////
async function DeleteQuestion(id) {
    const response = await fetch("/admin", {
        method: "DELETE",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            id: id
        })
    });

    if (response.ok === true) {
        document.querySelector("tr[data-rowid = '" + id + "']").remove();
    }

}
////////////////////////////////////////////////////////////////////////////////
function row(ques) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", ques._id);
    //--------------------------------------------
    const removeTd = document.createElement("td");

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", ques._id);
    removeLink.classList.add("btn", "btn-danger", "btn-sm");
    removeLink.append("Delete");
    removeLink.addEventListener("click", e => {
        e.preventDefault();
        DeleteQuestion(ques._id);
    });
    removeTd.append(removeLink);

    tr.append(removeTd);
    //............................................
    const editTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", ques._id);
    editLink.classList.add("btn", "btn-warning", "btn-sm");
    editLink.append("Edit");
    editLink.addEventListener("click", e => {
        e.preventDefault();
        //EditQuestion(ques._id);
        const url = "/admin-view/create.html?id=" + ques._id;
        window.location.href = url;
    });
    editTd.append(editLink);

    tr.append(editTd);
    //--------------------------------------------
    const idTd = document.createElement("td");
    idTd.append(ques._id);
    tr.append(idTd);

    const questionTd = document.createElement("td");
    questionTd.append(ques.question);
    tr.append(questionTd);
    //--------------------------------------------
    const answer1Td = document.createElement("td");
    answer1Td.append(ques.answer1.text);
    tr.append(answer1Td);

    const isTrue1Td = document.createElement("td");
    isTrue1Td.append(ques.answer1.isTrue);
    tr.append(isTrue1Td);
    //--------------------------------------------

    const answer2Td = document.createElement("td");
    answer2Td.append(ques.answer2.text);
    tr.append(answer2Td);

    const isTrue2Td = document.createElement("td");
    isTrue2Td.append(ques.answer2.isTrue);
    tr.append(isTrue2Td);
    //--------------------------------------------

    const answer3Td = document.createElement("td");
    answer3Td.append(ques.answer3.text);
    tr.append(answer3Td);

    const isTrue3Td = document.createElement("td");
    isTrue3Td.append(ques.answer3.isTrue);
    tr.append(isTrue3Td);
    //--------------------------------------------

    const answer4Td = document.createElement("td");
    answer4Td.append(ques.answer4.text);
    tr.append(answer4Td);

    const isTrue4Td = document.createElement("td");
    isTrue4Td.append(ques.answer4.isTrue);
    tr.append(isTrue4Td);
    //--------------------------------------------

    const createdTd = document.createElement("td");
    createdTd.append(ques.created);
    tr.append(createdTd);

    return tr;
}
////////////////////////////////////////////////////////////////////////////////
GetQuestions();