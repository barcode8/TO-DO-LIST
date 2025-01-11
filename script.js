const taskBody=document.querySelector('.taskBody');
const taskList=document.getElementById('taskList');
const taskInput = document.getElementById('addTask');
const searchTask=document.getElementById('searchTask');
const submitSearch = document.getElementById('submitSearch');
const resultDiv=document.getElementById('searchResults')

loadTasks();

document.querySelectorAll('.listButtons').forEach((item) => {
    console.log(item);
    item.addEventListener('click', (event) => {
        const button = event.target
        if(button.style.textDecoration==='line-through'){
            button.style.textDecoration='none';
        }else{
            button.style.textDecoration = 'line-through';
        }
    });
})

function searchForTask() {
    let searchQuery = searchTask.value.trim();
    searchTask.value='';
    const tasks=JSON.parse(localStorage.getItem('tasks')) || [];
    const Ul = document.createElement('ul');
    const Li = document.createElement('li');
    tasks.every((task)=>{
        if (searchQuery === task) {
            console.log('Found');
            Li.innerHTML = `<button class="listButtons" id="searchResultButton">${task}</button>`
            resultDiv.appendChild(Ul);
            Ul.appendChild(Li);
            styleListItems();
            return false;
        } else {
            Li.innerHTML = `<button class="listButtons" id="searchResultButton">No Results Found</button>`
            resultDiv.appendChild(Ul);
            Ul.appendChild(Li);
            styleListItems();
        }
    })
}

submitSearch.addEventListener('click',(event)=>{
    searchForTask();

})

function addTask(){
    task=taskInput.value.trim();
    if(task){
    createTaskElement(task);
    saveTasks();
    taskInput.value='';
    }else{
        alert("Please enter a task")
    }
}

document.getElementById('submitTask').addEventListener('click',(event)=>{
    event.preventDefault();
    addTask();
})

function createTaskElement(task){
    const listItem=document.createElement('li');
    listItem.innerHTML=`<button class="listButtons">${task}</button>`
    const deleteButton=document.createElement('button');
    deleteButton.textContent='Delete';
    deleteButton.className='deleteButton';
    listItem.appendChild(deleteButton);
    const editButton=document.createElement('button');
    editButton.textContent='Edit'
    editButton.className='editButton';
    listItem.appendChild(editButton);
    deleteButton.addEventListener('click',(event)=>{
        listItem.remove();
        saveTasks();
    })
    editButton.addEventListener('click',()=>{
        const taskButton=document.querySelector('.listButtons');
        const editField = document.createElement('input');
        editField.type = 'text';
        editField.value = taskButton.textContent.replace('Edit','');
        editField.className='editField';
        const saveButton=document.createElement("button");
        saveButton.className='saveButton';
        saveButton.textContent='Save'
        taskButton.style.display='none';
        editButton.style.display='none'
        listItem.insertBefore(editField,deleteButton);
        listItem.insertBefore(saveButton,deleteButton);
        styleEditField(editField);
        styleSaveButton(saveButton);

        saveButton.addEventListener('click',()=>{
            const newTask=editField.value.trim();
            if (newTask) {
                taskButton.textContent = newTask;
                taskButton.style.display = 'inline-block';
                editButton.style.display = 'inline-block';
                editField.remove();
                saveButton.remove();
                saveTasks();
            }
        })
    })
    taskList.appendChild(listItem);
    styleListItems();
    styleDeleteButton();
    styleEditButton();
}

function saveTasks(){
    let taskArr=[];
    taskList.querySelectorAll('li').forEach((item)=>{
        taskArr.push(item.textContent.replace('Delete','').replace('Edit',''));
    })
    console.log(taskArr);
    localStorage.setItem('tasks',JSON.stringify(taskArr));
}

function loadTasks(){
    const tasks=JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task)=>{
        createTaskElement(task);
    })
}

function styleListItems(){
    document.querySelectorAll('.listButtons').forEach((item)=>{
        item.style.backgroundColor = '#d2d2d2';
        item.style.width = '50vw';
        item.style.padding='10px';
        item.style.cursor = 'pointer';
        item.style.fontSize = '30px';
        item.style.border = 'thick solid #7D869C'
        item.style.borderRadius = '24px';
        item.style.marginBottom='20px';
    })
}

function styleDeleteButton(){
    document.querySelectorAll('.deleteButton').forEach((item)=>{
        item.style.cursor='pointer';
        item.style.padding='20px';
        item.style.color='white';
        item.style.backgroundColor='#D30000';
        item.style.border='none';
        item.style.borderRadius='24px';
        item.style.marginLeft='10px';
    })
}

function styleEditButton(){
    document.querySelectorAll('.editButton').forEach((item)=>{
        item.style.cursor = 'pointer';
        item.style.padding = '20px';
        item.style.color = 'white';
        item.style.backgroundColor = 'black';
        item.style.border = 'none';
        item.style.borderRadius = '24px';
        item.style.marginLeft = '10px';
    })
}

function styleSaveButton(item){
        item.style.cursor = 'pointer';
        item.style.padding = '20px';
        item.style.color = 'white';
        item.style.backgroundColor = 'green';
        item.style.border = 'none';
        item.style.borderRadius = '24px';
        item.style.marginLeft = '10px';
}

function styleEditField(editField) {
    editField.style.width = '50vw';
    editField.style.padding = '10px';
    editField.style.fontSize = '30px';
    editField.style.border = 'thick solid #7D869C';
    editField.style.borderRadius = '24px';
    editField.style.marginBottom = '20px';
}