document.getElementById("form1").addEventListener("submit", submitFun1);

var studentDataArr = JSON.parse(localStorage.getItem("studentData")) || [];

function submitFun1(e) {
    e.preventDefault();
    var name = document.querySelector("#name").value;
    var rollNo = document.querySelector("#rollNo").value;
    var sem = document.querySelector("#sem").value;  
    var cgpa = document.querySelector("#cgpa").value;  

    var studentObj = {
        name: name,
        rollNo: rollNo,
        sem: sem,
        cgpa: cgpa,
        status: ""  
    };

    studentDataArr.push(studentObj);
    localStorage.setItem("studentData", JSON.stringify(studentDataArr));
    document.querySelector("#form1").reset();
    alert("Student Added Successfully");

    displayFun(studentDataArr);
}

function displayFun(studentDataArr) {
    document.querySelector("#tbody").innerHTML = ""; // Clear the table before displaying new data
    var count = 1;

    studentDataArr.forEach(function (item, index) {
        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        td1.innerHTML = count++;
        
        var td2 = document.createElement("td");
        td2.innerHTML = item.name;
        
        var td3 = document.createElement("td");
        td3.innerHTML = item.rollNo;
        
        var td4 = document.createElement("td");
        td4.innerHTML = item.sem;
        
        var td5 = document.createElement("td");
        td5.innerHTML = item.cgpa;
        
        var td6 = document.createElement("td");

        // Present Button
        var btn1 = document.createElement("button");
        btn1.innerHTML = "P";
        btn1.addEventListener("click", function () {
            item.status = "Present"; // Update status in object
            localStorage.setItem("studentData", JSON.stringify(studentDataArr)); // Save updated data to localStorage
            displayFun(studentDataArr); // Re-render the table
        });

        // Absent Button
        var btn2 = document.createElement("button");
        btn2.innerHTML = "A";
        btn2.addEventListener("click", function () {
            item.status = "Absent"; // Update status in object
            localStorage.setItem("studentData", JSON.stringify(studentDataArr)); // Save updated data to localStorage
            displayFun(studentDataArr); // Re-render the table
        });

        td6.classList.add("td6");
        td6.append(btn1, btn2);

        var td7 = document.createElement("td");
        td7.innerHTML = item.status ? item.status : "Not Marked"; // Display status if present or absent, else "Not Marked"

        // Delete Button
        var deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.classList = "btn-warning btn";
        deleteBtn.addEventListener("click", function () {
            studentDataArr.splice(index, 1); // Remove the student from the array
            localStorage.setItem("studentData", JSON.stringify(studentDataArr)); // Save updated array to localStorage
            displayFun(studentDataArr); // Re-render the table
        });

        tr.append(td1, td2, td3, td4, td5, td6, td7);

        // Append the delete button at the end of the row
        var td8 = document.createElement("td");
        td8.appendChild(deleteBtn);
        tr.append(td8);

        document.querySelector("#tbody").append(tr);
    });
}

displayFun(studentDataArr);
