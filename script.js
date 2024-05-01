// Add event listener to the button with id "addTaskButton" and call the addTask function when clicked
document.getElementById("addTaskButton").addEventListener("click", addTask);
// Add event listener to the button with id "sortButton" and call the sortTasks function when clicked
document.getElementById("sortButton").addEventListener("click", sortTasks);

// Function to add a new task
function addTask() {
    // Retrieve input values
    var input = document.getElementById("taskInput").value;
    var priority = document.getElementById("prioritySelect").value;
    var dateTime = document.getElementById("dateTimeInput").value;
    // Check if task input is empty, if so, display an alert and return
    if (input === '') {
        alert("Please enter a task!");
        return;
    }
    var priorityDiv;

    // Determine the priority div based on the selected priority
    if (priority === 'high') {
        priorityDiv = document.getElementById("PriorityTasks");
    } else if (priority === 'medium') {
        priorityDiv = document.getElementById("PriorityTasks");
    } else {
        priorityDiv = document.getElementById("PriorityTasks");
    }

    // Create elements for the task
    var taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    var taskName = document.createElement("div");
    taskName.classList.add("task-name");
    taskName.textContent = input;
    var taskPriority = document.createElement("div");
    taskPriority.classList.add("task-info");
    taskPriority.textContent = "Priority: " + priority;
    var taskAddedTime = document.createElement("div");
    taskAddedTime.classList.add("task-info");
    taskAddedTime.textContent = "Added: " + new Date().toLocaleString();
    var taskDeadline = document.createElement("div");
    taskDeadline.classList.add("task-info");
    taskDeadline.textContent = "Deadline: " + new Date(dateTime).toLocaleString();

    // Calculate time remaining until deadline
    var deadlineTime = new Date(dateTime).getTime();
    var currentTime = new Date().getTime();
    var timeRemaining = deadlineTime - currentTime;
    // Calculate remaining days, hours, minutes, and seconds
    var daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    var hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    var secondsRemaining = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    // Create element for displaying remaining time
    var taskTimeRemaining = document.createElement("div");
    taskTimeRemaining.classList.add("task-info");
    taskTimeRemaining.textContent = "Time Remaining: " + daysRemaining + " days, " + hoursRemaining + " hours, " + minutesRemaining + " minutes, " + secondsRemaining + " seconds";

    // Create checkbox for task completion status
    var taskStatus = document.createElement("input");
    taskStatus.type = "checkbox";
    taskStatus.classList.add("task-status");
    taskStatus.addEventListener("change", function() {
        if (taskStatus.checked) {
            taskStatusLabel.textContent = "Completed";
            taskStatusLabel.style.color = "green";
            taskStatusLabel.style.fontWeight = "bold";
        } else {
            taskStatusLabel.textContent = "Not Completed";
            taskStatusLabel.style.color = "red";
            taskStatusLabel.style.fontWeight = "bold";
        }
    });

    // Create label for task completion status
    var taskStatusLabel = document.createElement("label");
    taskStatusLabel.textContent = "Task Status: Not Completed";
    taskStatusLabel.style.color = "red";
    taskStatusLabel.style.fontWeight = "bold";
    taskStatusLabel.classList.add("task-status-label");

    // Create edit button for task
    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", function() {
        var newTaskName = prompt("Enter new task name:");
        if (newTaskName !== null && newTaskName !== '') {
            taskName.textContent = newTaskName;
        }
    });

    // Create delete button for task
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", function() {
        taskItem.remove();
    });

    // Append task elements to task item
    taskItem.appendChild(taskName);
    taskItem.appendChild(taskPriority);
    taskItem.appendChild(taskAddedTime);
    taskItem.appendChild(taskDeadline);
    taskItem.appendChild(taskTimeRemaining);
    taskItem.appendChild(taskStatusLabel);
    taskItem.appendChild(taskStatus);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    // Append task item to priority div
    priorityDiv.appendChild(taskItem);

    // Clear input fields after adding task
    document.getElementById("taskInput").value = "";
    document.getElementById("dateTimeInput").value = "";
}

// Function to sort tasks
function sortTasks() {
    var sortCriteria = document.getElementById("sortCriteria").value;
    var tasksContainer = document.getElementById("tasksContainer");
    var taskLists = tasksContainer.getElementsByClassName("task-list");

    // Iterate over each task list
    for (var i = 0; i < taskLists.length; i++) {
        var taskList = taskLists[i];
        var tasks = taskList.getElementsByClassName("task-item");

        // Convert HTMLCollection to array for sorting
        var tasksArray = Array.from(tasks);

        // Sort tasks based on selected criteria
        if (sortCriteria === "priority") {
            tasksArray.sort(compareByPriority);
        } else if (sortCriteria === "deadline") {
            tasksArray.sort(compareByDeadline);
        } else if (sortCriteria === "status") {
            tasksArray.sort(compareByStatus);
        }

        // Clear the task list
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        // Append sorted tasks back to the task list
        tasksArray.forEach(function(task) {
            taskList.appendChild(task);
        });
    }
}

// Function to compare tasks by priority
function compareByPriority(task1, task2) {
    var priority1 = task1.getElementsByClassName("task-info")[0].textContent;
    var priority2 = task2.getElementsByClassName("task-info")[0].textContent;
    return priority1.localeCompare(priority2);
}

// Function to compare tasks by deadline
function compareByDeadline(task1, task2) {
    var deadline1 = task1.getElementsByClassName("task-info")[2].textContent;
    var deadline2 = task2.getElementsByClassName("task-info")[2].textContent;
    return new Date(deadline1) - new Date(deadline2);
}

// Function to compare tasks by status
function compareByStatus(task1, task2) {
    var status1 = task1.getElementsByClassName("task-status-label")[0].textContent;
    var status2 = task2.getElementsByClassName("task-status-label")[0].textContent;
    return status1.localeCompare(status2);
}
