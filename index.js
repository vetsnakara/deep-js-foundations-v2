var $addWorkForm;
var $projectSelect;
var $workDescription;
var $workTime;
var $addWorkBtn;
var $totalTime;

var projects = [];

setupUI();

addProject("Redesign");
addProject("Student");
addProject("EKD");

function setupUI() {
  $addWorkForm = getElByDataContent("addWorkForm");
  $projectSelect = getElByDataContent("projectSelect");
  $workDescription = getElByDataContent("workDescription");
  $workTime = getElByDataContent("workTime");
  $addWorkBtn = getElByDataContent("addWorkBtn");
  $totalTime = getElByDataContent("totalTime");

  updateTotalTime();

  $addWorkForm.on("submit", addWorkToProject);
}

function updateTotalTime() {
  var time = getTotalTime();
  var formattedTime = formatTime(time);
  $totalTime.text(formattedTime);
}

function getTotalTime() {
  return projects.reduce((total, { time }) => {
    total += time;
    return total;
  }, 0);
}

function formatTime(timeInMinutes) {
  var hours = timeInMinutes % 60;
  var minutes = timeInMinutes - hours * 60;

  return `${timeToString(hours)}:${timeToString(minutes)}`;

  // .............................

  function timeToString(time) {
    return time < 10 ? `0${time}` : String(time);
  }
}

function addWorkToProject(event) {
  event.preventDefault();

  var projectId = $projectSelect.val();

  var work = {
    description: $workDescription.val(),
    time: $workTime.val(),
  };

  console.log("work:", work);
}

function addProject(title) {
  var project = {
    id: getRandomId(),
    title,
    works: [],
    time: 0,
  };

  projects.push(project);

  $("<option/>")
    .attr("value", projects.id)
    .text(project.title)
    .appendTo($projectSelect);
}

function getElByDataAttr(name, value) {
  return $(`[data-${name}="${value}"]`);
}

function getElByDataContent(value) {
  return getElByDataAttr("content", value);
}

function getRandomId() {
  return +(Math.random() * 1e10).toFixed();
}
