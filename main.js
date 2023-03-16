currTime = document.getElementById('appt').value;
currDate = document.getElementById('date').value;


function saveReservation(date, table, from, to) {

    from = getMinutes(from);
    to = getMinutes(to);
    let bool = false;

    if (table == '0') {
        alert('Please Select a Table😊');
        bool = true; return;
    }

    if (date == currDate && from < currTime) {
        alert('Please Select a Valid Slot😊');
        bool = true; return;
    }

    if (to <= from || (to - from) < 30) {
        alert('Please Choose Atleast 30 minutes slot');
        bool = true; return;
    };

    if (from < 540 || to > 1320) {
        alert('Please slect a slot within open hours');
        bool = true; return;
    }


    datetable = date.toString() + table.toString();
    let arr = localStorage.getItem(datetable);
    if (arr != null && arr != '') {
        let slots = arr.split('@');
        slots.forEach(element => {
            setTo = Number(element.split('$')[1]);
            setFrom = Number(element.split('$')[0]);
            if ((from == setFrom || to == setTo) || (from <= setFrom && to >= setTo) || (to >= setTo && from <= setFrom)) {
                alert('This Table is not available for the selected time slot');
                bool = true; return;
            }
        });
        if (bool == false) {
            arr += from.toString() + '$' + to.toString() + '@';
        }
    }
    else {
        arr = from.toString() + '$' + to.toString() + '@';
    }
    if (bool == false) {
        localStorage.setItem(datetable, arr);
        display(date, table, from, to);
    }
    return;
}

function getMinutes(time) {
    let minutes = Number(time.substring(0, 2)) * 60;
    minutes += Number(time.substring(3, 5));
    return minutes;
}

function getReservation() {
    const date = document.getElementById('date').value;
    const table = document.getElementById('Tables').value;
    const from = document.getElementById('appt').value;
    const to = document.getElementById('to').value;
    saveReservation(date, table, from, to);
}


function display(date1, i, From, To) {
    document.getElementById('res').style.visibility = 'visible';
    const node = document.createTextNode("On "+date1+" Table " + i + " is Booked from " + toHoursAndMinutes(From) + " to " + toHoursAndMinutes(To));
    const del = document.createElement("button");
    const nde = document.createTextNode("🗑");
    del.appendChild(nde);
    const cont = document.createElement("div");
    cont.setAttribute("id", (date1 + i + From + To));
    let brac = '"';
    let func = "deleteEntry(" + JSON.stringify(date1) + "," + i.toString() + "," + From +
        "," + To +
        "),document.getElementById(" + brac + (date1 + i + From + To) +
        brac + ").remove()";
    del.setAttribute("onclick", func);
    const element = document.getElementById("div1");
    cont.appendChild(node);
    cont.appendChild(del);
    cont.style.padding = "10px";
    element.appendChild(cont);
}

function deleteEntry(date, table, from, to) {
    datetable = date.toString() + table.toString();
    let arr = localStorage.getItem(datetable);
    let slots = arr.split('@');
    let fromto = from.toString() + '$' + to.toString()
    slots.splice(slots.indexOf(fromto), 1);
    if (slots.length == 0) { localStorage.removeItem(datetable); }
    else { localStorage.setItem(datetable, slots); }
}
function toHoursAndMinutes(totalMinutes) {
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;
    if (hours > 12) {
        hours = hours - 12;
    }
    if (hours <= 9) {
        hours = '0' + hours;
    }
    if (minutes <= 9) {
        minutes = '0' + minutes;
    }
    return hours.toString() + ':' + minutes.toString();
}