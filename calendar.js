const Cmonth = document.getElementById("Cmonth");
const monthPop = document.getElementsByClassName("month_popup")[0];

const Cyear = document.getElementById("Cyear");
const yearPop = document.getElementsByClassName("year_popup")[0];
const yearList = document.getElementsByClassName("years")[0];
const detail_day = document.getElementById("head");
const body_cal = document.getElementsByClassName("contents")[0];
const currentDay = new Date();

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
setInterval(() => {
    const now = new Date();
    let day = now.getDay    ();
    let month = now.getMonth();
    let year = now.getFullYear();
    detail_day.innerHTML = daysOfWeek[day] + ", " + months[month] + " " + now.getDate();
});

calendar = () => {
    currentDay.setDate(1);

    console.log(currentDay)

    const days = document.querySelector(".day");

    const lastDayOfLastMonth = new Date(
        currentDay.getFullYear(),
        currentDay.getMonth(),
        0
    ).getDate();

    const lastDayOfMonth = new Date(
        currentDay.getFullYear(),
        currentDay.getMonth() + 1,
        0
    ).getDate();

    const firstDay = currentDay.getDay();

    document.querySelector(".Cyear p").innerHTML = `${currentDay.getFullYear()}`;
    document.querySelector(".Cmonth p").innerHTML = `${months[currentDay.getMonth()]}`;

    let dateItem = "";

    for (let i = firstDay; i > 0; i--) {
        dateItem += `<li class="color-g">${lastDayOfLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDayOfMonth; i++) {
        if (
          i === new Date().getDate() &&
          currentDay.getMonth() === new Date().getMonth() &&
          currentDay.getFullYear() === new Date().getFullYear()
        ) {
          dateItem += `<li class="today">${i}</li>`;
        }
        else {
          dateItem += `<li>${i}</li>`;
        }
    }

    const totalDayOfMonth = lastDayOfMonth + firstDay;
    
    const dayOfNextMonth = 42 - totalDayOfMonth;

    for (let i = 1; i <= dayOfNextMonth; i++) {
        dateItem += `<li class="color-g">${i}</li>`;
    }

    days.innerHTML = dateItem;
};


window.addEventListener('click', function(e){   
    if (Cmonth.contains(e.target)){
      monthPop.style.display = "block"
      yearPop.style.display = "none"
      body_cal.style.display = "none"

    }
    else if(Cyear.contains(e.target)){
        displayYearList()
        monthPop.style.display = "none"
        yearPop.style.display = "block"
        body_cal.style.display = "none"
    }
    else if(e.target && e.target.nodeName == "LI"){
        if(e.target.getAttribute("month")){
            const monthIndex = parseInt(e.target.getAttribute("month"));
            currentDay.setMonth(monthIndex);
            calendar();
            monthPop.style.display = "none";
            body_cal.style.display = "block"

        }else{
            const yearIndex = parseInt(e.target.innerText);
            currentDay.setFullYear(yearIndex);
            calendar();
            yearPop.style.display = "none";
            body_cal.style.display = "block"
        }
    }
    else{
        yearPop.style.display = "none"
        monthPop.style.display = "none"
        body_cal.style.display = "block"

    }
});;

function displayYearList() {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 50; i <= currentYear + 50; i++) {
      years.push(`<li>${i}</li>`);
    }
    yearList.innerHTML = years.join("");
};

document.getElementsByClassName("prev")[0].addEventListener("click", () => {
    currentDay.setMonth(currentDay.getMonth()-1);
    calendar();
});

document.getElementsByClassName("next")[0].addEventListener("click", () => {
    currentDay.setMonth(currentDay.getMonth()+1);
    calendar();
});

calendar();