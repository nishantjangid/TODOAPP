let API_BASE_URL = 'http://localhost:3000/api';
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const tasksDiv = document.getElementById('tasks');
  
    taskForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
  
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, completed: false }),
      });
  
      if (response.ok) {
        const task = await response.json();
        displayTask(task);
        taskForm.reset();
      }
    });

    window.completeTask = async (taskId) => {
        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ completed: true }),
        });
    
        if (response.ok) {
          fetchTasks();
        }
      };
    
      window.deleteTask = async (taskId) => {
        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, { method: 'DELETE' });
    
        if (response.ok) {
          fetchTasks();
        }
      };
  
    const fetchTasks = async () => {
      tasksDiv.innerHTML = '';
  
      const response = await fetch(`${API_BASE_URL}/tasks`);
      const tasks = await response.json();
        if(tasks.length > 0){
            document.getElementById("taskDiv").style.display = "block";            
            tasks.forEach(task => displayTask(task));
        }
    };
  
    const displayTask = (task) => {
    
    const date = new Date(task.createdAt);

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
      
      const formattedDate = date.toLocaleString(undefined, options);
    document.getElementById("taskDiv").style.display = "block";
    let tasks = document.querySelector("#tasks");      
      tasks.innerHTML += `
        <tr>
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.completed ? "<span style='color:green;font-weight:bold'>Completed</span>" : "<span style='color:#ffae19;font-weight:bold'>Not Completed</span>"}</td>
            <td>${formattedDate}</td>
            <td>${
                task.completed ? '' : `<button onclick="completeTask('${task._id}')">Complete</button>`
            }
            <button onclick="deleteTask('${task._id}')">Delete</button>            
            </td>
        </tr>            
      `;
       
        if (!$.fn.DataTable.isDataTable('#tasksTable')) {
            $('#tasksTable').DataTable();
        }
    
    };
  

  
    fetchTasks();
  });
  