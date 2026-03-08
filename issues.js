// ================= API =================
const allIssuesAPI = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

// ================= Loading Control =================
const controlLoading = (status) => {

const loader = document.getElementById("loader");
const container = document.getElementById("issuesContainer");

if(status){
loader.classList.remove("hidden");
container.classList.add("hidden");
}
else{
loader.classList.add("hidden");
container.classList.remove("hidden");
}

};


// ================= Remove Active Tab =================
const removeActiveBtn = () => {

const tabs = document.querySelectorAll(".tab-btn");

tabs.forEach(btn=>{
btn.classList.remove("bg-[#4A00FF]","text-white");
});

};


// ================= Active Tab =================
const setActive = (button) => {

removeActiveBtn();

button.classList.add("bg-[#4A00FF]","text-white");

};


// ================= Load All Issues =================
const loadIssues = () => {

controlLoading(true);

fetch(allIssuesAPI)
.then(res=>res.json())
.then(data=>{

displayIssues(data.data);

});

};


// ================= Filter Status =================
const filterStatus = (status) => {

controlLoading(true);

fetch(allIssuesAPI)
.then(res=>res.json())
.then(data=>{

const filtered = data.data.filter(issue => issue.status === status);

displayIssues(filtered);

});

};


// ================= Search Issue =================
const searchIssue = () => {

const text = document
.getElementById("searchInput")
.value
.trim();

if(text === ""){
loadIssues();
return;
}

const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`;

fetch(url)
.then(res=>res.json())
.then(data=>{

displayIssues(data.data);

});

};
//show color in priority
const createPriority = (priority) => {

let colorClass = "";

if(priority === "high"){
colorClass = "bg-red-100 text-red-500";
}

else if(priority === "medium"){
colorClass = "bg-yellow-100 text-yellow-600";
}

else if(priority === "low"){
colorClass = "bg-gray-200 text-gray-600";
}

return `
<span class="text-xs px-3 py-1 rounded-full font-semibold ${colorClass}">
${priority.toUpperCase()}
</span>
`;

};


// For show Color in label

const createLabels = (labels) => {

return labels.map(label => {

let colorClass = "";
let icon = "";

if(label === "bug"){
colorClass =  "bg-red-100 text-red-500";
icon = '<i class="fa-solid fa-bug"></i>';
}

else if(label === "enhancement"){
colorClass = "bg-green-100 text-green-600";
icon = '<i class="fa-solid fa-wand-magic-sparkles"></i>';
}

else if(label === "help wanted"){
colorClass = "bg-yellow-100 text-yellow-600";
icon='<i class="fa-solid fa-life-ring"></i>';
}

else if(label === "good first issue"){
colorClass = "bg-blue-100 text-sky-600";
icon='<i class="fa-solid fa-clover"></i>';
}

else if(label === "documentation"){
colorClass = "bg-orange-100 text-skyblue-600";
icon='<i class="fa-solid fa-book-medical"></i>';
}

else{
colorClass = "bg-gray-100 text-gray-600";
icon='<i class="fa-solid fa-otter"></i>';
}


return `
<span class="text-xs px-2 py-1 rounded-full font-semibold ${colorClass}">
${icon} ${label.toUpperCase()}
</span>
`;

}).join("");

};



// ================= Display Issues =================
const displayIssues = (issues) => {

const container = document.getElementById("issuesContainer");

container.innerHTML = "";

document.getElementById("issueCount").innerText = issues.length;


// no issues case
if(issues.length === 0){

container.innerHTML = `
<div class="col-span-full text-center py-10 text-gray-400">
No Issues Found
</div>
`;

controlLoading(false);
return;

}


// loop issues
issues.forEach(issue => {

const borderColor =
issue.status === "open"
? "border-green-500"
: "border-purple-500";

const statusImg =
issue.status === "open"
? "assets/Open-Status.png"
: "assets/Closed- Status .png";


const labelsHTML = createLabels(issue.labels);
const priorityHTML = createPriority(issue.priority);


const card = document.createElement("div");

card.innerHTML = `

<div onclick="loadIssueDetail(${issue.id})"
class="bg-white rounded-lg shadow-sm border-t-4 ${borderColor} p-4 mt-8 cursor-pointer">

<div class="flex justify-between items-center">

<div class="flex items-center gap-2">
<img src="${statusImg}" class="w-5 h-5">
</div>

<span class="text-xs px-3 py-1 rounded-full font-semibold">
${priorityHTML}
</span>

</div>

<h3 class="mt-3 font-semibold text-gray-800 text-sm">
${issue.title}
</h3>

<p class="text-xs text-gray-500 mt-1">
${issue.description}
</p>

<div class="flex gap-2 mt-3 flex-wrap">
${labelsHTML}
</div>

<div class="border-t mt-4 pt-3 text-xs text-gray-400">
<p>#${issue.id} by ${issue.author}</p>
<p>${new Date(issue.createdAt).toLocaleDateString()}</p>
</div>

</div>
`;

container.append(card);

});

controlLoading(false);

};



// ================= Load Single Issue =================
const loadIssueDetail = async(id) => {

const url =
`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;

const response = await fetch(url);

const data = await response.json();

displayIssueModal(data.data);

};


//  Modal 
const displayIssueModal = (issue) => {

const modal = document.getElementById("issueModal");
const content = document.getElementById("modalContent");

// status modal color
const statusColor =
issue.status === "open"
? "bg-green-100 text-green-600"
: "bg-purple-100 text-purple-600";

// priority color
let prioritymodalColor = "";

if(issue.priority === "high"){
prioritymodalColor = "bg-red-500 text-white";
}
else if(issue.priority === "medium"){
prioritymodalColor = "bg-yellow-600 text-white";
}
else{
prioritymodalColor = "bg-gray-600 text-white";
}

// labels
const labelsHTML = createLabels(issue.labels);

content.innerHTML = `

<h2 class="text-xl font-semibold mb-2">
${issue.title}
</h2>

<div class="flex items-center gap-3 text-sm mb-4">

<span class="px-2 py-1 rounded-full text-xs ${statusColor}">
${issue.status}
</span>

<span class="text-gray-500">
● Opened by ${issue.author}
</span>

<span class="text-gray-400 ">
● ${new Date(issue.createdAt).toLocaleDateString()}
</span>

</div>


<div class="flex gap-2 flex-wrap mb-4">
${labelsHTML}
</div>


<p class="text-gray-600 mb-6">
${issue.description}
</p>


<div class="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg text-sm">

<div>
<p class="text-gray-400">Assignee:</p>
<p class="font-semibold">${issue.author}</p>
</div>

<div>
<p class="text-gray-400">Priority: </p>
<span class="px-2 py-1 rounded-full text-xs font-semibold ${prioritymodalColor}">
${issue.priority.toUpperCase()}
</span>
</div>

</div>

`;

modal.classList.remove("hidden");

};

const closeModal = () => {
     document .getElementById("issueModal") .classList.add("hidden"); 
    };


// ================= Initial Load =================
loadIssues();


window.addEventListener("DOMContentLoaded", () => {

const allBtn = document.getElementById("allBtn");

setActive(allBtn);

loadIssues();

});