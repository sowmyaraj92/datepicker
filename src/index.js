// Template creation
const template = document.createElement("template");
template.innerHTML = `
    <style>
        @import '../src/style.css';
    </style>
    <div class="date-picker-container">
        <h3>Select the dates:- </h3>
        <input type="date" id="date-picker1" min="2020-01-01" max="2020-12-01"/>
        <input type="date" id="date-picker2" min="2020-01-01" max="2020-12-01"/>
        
        <span id="date-range"></span>   

    </div>`;

// Class Section 
class DatePicker extends HTMLElement {
    constructor() {
        super();

        //Create a Shadow Root
        this.shadow = this.attachShadow({ mode: "open" });

        //Variable Initialisation
        this.datePicker1 = null;
        this.datePicker2 = null;
        this.dateValue = null;

        this.value1 = null;
        this.value2 = null;

    }

    //Web Component Method 
    connectedCallback() {
        const templateClone = document.importNode(template.content, true);
        this.shadow.appendChild(templateClone);
        this.datePicker1 = this.shadow.querySelector("#date-picker1");
        this.datePicker2 = this.shadow.querySelector("#date-picker2");
        this.dateValue = this.shadow.querySelector("#date-range");
        this.eventListenerMethod();
        this.render();
    }

    // Attaching event listener to the date inpts
    eventListenerMethod() {
        this.datePicker1.addEventListener("change", (event) => {
            this.value1 = event.target.value;
            this.render(this.value1);
        });
        this.datePicker2.addEventListener("change", (event) => {
            this.value2 = event.target.value;
            this.render(this.value2);
        });
    }

    //Render function for date inputs
    render(value1, value2) {
        if (this.datePicker1 !== null) {
            this.datePicker1.value = this.value1;
            this.dateValue.innerHTML = this.fetchDate1(this.value1, this.value2) || "-Date Range will appear here-";
        }
    }

    //Fetch function for date inputs and validation
    fetchDate1(date1, date2) {
        if (date1 && date2) {
            let selectedDate = new Date(date1);
            let selectedDate2 = new Date(date2);
            const monthMapper = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            // Check date difference for validation
            if (selectedDate - selectedDate2 >= 0) return "Invalid dates"

            //Check weekend validation
            var day = selectedDate.getUTCDay();
            var day2 = selectedDate2.getUTCDay();
            if (([6, 0].includes(day)) || ([6, 0].includes(day2))) return "Weekends not allowed"

            // Disable mid-week
            if (([3, 0].includes(day)) || ([3, 0].includes(day2))) return "Mid-week is disabled"

            return `${selectedDate.getDate()} ${monthMapper[selectedDate.getMonth()].substring(0,3)} ${selectedDate.getFullYear()} - ${selectedDate2.getDate()} ${monthMapper[selectedDate2.getMonth()].substring(0,3)} ${selectedDate2.getFullYear()}`;
        }
    }

    //Function invoked when element's attributes are changed
    attributeChangedCallback(value, oldValue, newValue) {
        console.log('The element attributes changed.');

    }

    //Function invoked when custom element is disconnected from DOM
    disConnectedCallback() {
        this.datePicker1.removeEventListener("change");
        this.datePicker2.removeEventListener("change");
    }
}

//Create the instance
customElements.define("date-picker-component", DatePicker);