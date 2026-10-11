let step = 1, bill = 0, selectedSeats = 0, hall = "", restaurantCapacity = 0;
let orderList = [];

// Restaurants with seat capacities
const restaurants = [
  {name:"Paradise Biryani",capacity:40},
  {name:"Domino's Pizza",capacity:50},
  {name:"Bawarchi",capacity:35},
  {name:"KFC",capacity:45},
  {name:"Pizza Hut",capacity:50},
  {name:"McDonald's",capacity:60},
  {name:"Barbeque Nation",capacity:40},
  {name:"Ohri's",capacity:35},
  {name:"Cream Stone",capacity:30},
  {name:"Haldiram's",capacity:50},
  {name:"Mainland China",capacity:45},
  {name:"Subway",capacity:40},
  {name:"Behrouz Biryani",capacity:50},
  {name:"Leonia Resorts",capacity:60},
  {name:"Novotel Restaurant",capacity:45},
  {name:"Taj Vivanta",capacity:50},
  {name:"ITC Dakshin",capacity:40},
  {name:"Rayalaseema Ruchulu",capacity:35},
  {name:"Santosh Dhaba",capacity:30},
  {name:"Cafe Bahar",capacity:50}
];

const restaurantSelect = document.getElementById("restaurant");
restaurants.forEach((r,i)=>{
  restaurantSelect.innerHTML += `<option value="${i}">${r.name}</option>`;
});

// Events
const halls = ["Wedding Hall","Birthday Party","Conference Hall","DJ Party","Engagement Ceremony","Music Night"];
const hallGrid = document.querySelector(".hall-grid");
halls.forEach(h=>{
  const div = document.createElement("div");
  div.className="hall-card";
  div.innerHTML=`<p>${h}</p>`;
  div.onclick=()=>{
    hall=h;
    document.querySelectorAll(".hall-card").forEach(x=>x.classList.remove("selected"));
    div.classList.add("selected");
  };
  hallGrid.appendChild(div);
});

// Seats
const seats = document.getElementById("seats");
function generateSeats(capacity){
  seats.innerHTML=""; selectedSeats=0;
  for(let i=1;i<=capacity;i++){
    const div=document.createElement("div");
    div.className="seat"; div.innerText=`Seat ${i}`;
    div.onclick=()=>{
      div.classList.toggle("selected");
      selectedSeats=document.querySelectorAll(".seat.selected").length;
    };
    seats.appendChild(div);
  }
}

// Food Categories
const foodCategories = {
  veg:[
    {name:"Paneer Butter Masala",emoji:"🧀",price:200},
    {name:"Veg Biryani",emoji:"🥦",price:180},
    {name:"Aloo Gobi",emoji:"🥔",price:150},
    {name:"Chole Bhature",emoji:"🥘",price:170},
    {name:"Dal Tadka",emoji:"🍲",price:160},
    {name:"Veg Fried Rice",emoji:"🍚",price:140}
  ],
  nonveg:[
    {name:"Butter Chicken",emoji:"🍗",price:250},
    {name:"Mutton Biryani",emoji:"🥩",price:300},
    {name:"Chicken Tikka",emoji:"🍖",price:220},
    {name:"Fish Curry",emoji:"🐟",price:280},
    {name:"Prawns Masala",emoji:"🦐",price:350}
  ],
  italian:[
    {name:"Margherita Pizza",emoji:"🍕",price:200},
    {name:"Pepperoni Pizza",emoji:"🍕",price:250},
    {name:"Pasta Alfredo",emoji:"🍝",price:220},
    {name:"Pasta Arrabiata",emoji:"🍝",price:220}
  ],
  continental:[
    {name:"Grilled Sandwich",emoji:"🥪",price:150},
    {name:"Veg Burger",emoji:"🍔",price:120},
    {name:"Chicken Burger",emoji:"🍔",price:180},
    {name:"French Fries",emoji:"🍟",price:100}
  ],
  desserts:[
    {name:"Ice Cream",emoji:"🍨",price:80},
    {name:"Brownie",emoji:"🍫",price:90},
    {name:"Gulab Jamun",emoji:"🍮",price:70},
    {name:"Chocolate Cake",emoji:"🎂",price:150}
  ],
  drinks:[
    {name:"Cold Coffee",emoji:"🥤",price:100},
    {name:"Fresh Lime Soda",emoji:"🥤",price:80},
    {name:"Soft Drinks",emoji:"🥤",price:50},
    {name:"Mocktail",emoji:"🍹",price:120}
  ]
};

const foodGrid = document.getElementById("foodGrid");
const billItems = document.getElementById("billItems");
const totalBill = document.getElementById("totalBill");

function showFoodCategory(cat){
  foodGrid.innerHTML="";
  foodCategories[cat].forEach(item=>{
    const div = document.createElement("div");
    div.className="food-card";
    div.innerHTML=`<input type="checkbox" id="${item.name}" /> ${item.emoji} ${item.name} ₹${item.price}`;
    div.onclick=()=>{
      const checkbox = div.querySelector("input[type='checkbox']");
      checkbox.checked = !checkbox.checked;
      if(checkbox.checked){
        orderList.push(item);
        div.classList.add("selected");
      }else{
        orderList = orderList.filter(x=>x.name!==item.name);
        div.classList.remove("selected");
      }
      updateBill();
    };
    div.querySelector("input[type='checkbox']").onclick=(e)=>{
      e.stopPropagation();
      if(div.querySelector("input[type='checkbox']").checked){
        orderList.push(item);
        div.classList.add("selected");
      }else{
        orderList = orderList.filter(x=>x.name!==item.name);
        div.classList.remove("selected");
      }
      updateBill();
    };
    foodGrid.appendChild(div);
  });
  updateBill();
}

function updateBill(){
  bill=orderList.reduce((a,b)=>a+b.price,0);
  billItems.innerHTML="";
  orderList.forEach(item=>{
    const li=document.createElement("li");
    li.innerText=`${item.emoji} ${item.name} ₹${item.price}`;
    billItems.appendChild(li);
  });
  totalBill.innerText="Total: ₹"+bill;
}

// Check availability + warnings
function checkAvailability(){
  const restIndex=restaurantSelect.value;
  const people=Number(document.getElementById("people").value);
  const date=document.getElementById("date").value;

  if(restIndex===""){alert("⚠️ Please select a restaurant"); return;}
  if(!date){alert("⚠️ Please select a date"); return;}
  if(people<=0){alert("⚠️ Enter valid number of people"); return;}

  restaurantCapacity=restaurants[restIndex].capacity;
  if(people>restaurantCapacity){
    alert(`⚠️ Selected restaurant has only ${restaurantCapacity} seats`);
    return;
  }

  generateSeats(restaurantCapacity);
  next(); 
}

// Navigation with warnings
function next(){
  if(step===2 && hall===""){alert("⚠️ Please select an event"); return;}
  if(step===3 && selectedSeats===0){alert("⚠️ Please select at least one seat"); return;}
  if(step===4 && orderList.length===0){alert("⚠️ Please select at least one food item"); return;}

  document.getElementById(`step${step}`).classList.remove("active");
  step++;
  document.getElementById(`step${step}`).classList.add("active");

  if(step===5){
    const restName=restaurants[restaurantSelect.value].name;
    const itemsText=orderList.map(x=>`${x.name} ₹${x.price}`).join(", ");
    document.getElementById("summary").innerText=
      `Restaurant: ${restName}\nEvent: ${hall}\nSeats: ${selectedSeats}\nOrder: ${itemsText}\nTotal: ₹${bill}`;
  }
}

function prev(){
  document.getElementById(`step${step}`).classList.remove("active");
  step--;
  document.getElementById(`step${step}`).classList.add("active");
}

// SMS validation
function sendSMS(){
  const phone=document.getElementById("phone").value;
  if(!phone){alert("⚠️ Enter a mobile number"); return;}
  fetch("/send-sms", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      phone,
      message:`Booking Confirmed!\nTotal: ₹${bill}\nEvent: ${hall}`
    })
  })
  .then(res=>res.json())
  .then(data=>{ if(data.success) alert("✅ SMS Sent!"); else alert("❌ SMS Failed"); })
  .catch(err=>alert("❌ SMS Error: "+err.message));
}