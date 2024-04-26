// setting the vars
let theInput = document.querySelector('.app-header .input'),
    addButton = document.querySelector('.app-header .plus'),
    noTasksMessg = document.querySelector('.tasks-container .no-tasks-messg'),
    tasksContainer = document.querySelector('.tasks-container'),
    tasksCount = document.querySelector('.tasks-stats .tasks-count span'),
    finshedTasks = document.querySelector('.tasks-stats .tasks-finshed span');


// make the focus on the input 
window.onload = function (){

    theInput.focus();
    // if there are tasks in the local storage we will show it 
    if(localStorage.length){
        // remove the no tasks messg
        noTasksMessg.remove();
            // loop through tasks in local storage to show it
            for(let [key,value] of Object.entries(localStorage)){
                tasksContainer.innerHTML +=                 `
                <span class="task-box">${key}<span class="delete fas fa-trash-alt"></span></span>
            `;;            
            }
    }
};    


// add task when click on add button
addButton.onclick= function(){

    var test = 0 ;

    if(theInput.value === ''){

        console.log('you can not add empty task');

        theInput.focus();

    }else{

        let tasks = Array.from(tasksContainer.children);
        
        tasks.forEach(task => {

            if(theInput.value === task.textContent){

                console.log('this task is already exist');

                test  = 1 ;
            }
        });

        if (test != 1){

            noTasksMessg.remove();

            // create the task's span
            let theTask = `
                <span class="task-box">${theInput.value}<span data-item="${theInput.value}" class="delete fas fa-trash-alt"></span></span>
            `;

            // append the task to tasks container
            tasksContainer.innerHTML += theTask;

            localStorage.setItem(theInput.value,'task');

            // reset the input value to ''
            theInput.value = '';
    
            // make the focus on the input 
            theInput.focus();


        }
    }
}

// create delete function
document.addEventListener('click' , function (e) {

    if(e.target.classList.contains('delete')){

        e.target.parentNode.remove();

        localStorage.removeItem(e.target.parentNode.textContent);

        notasks();

        console.log(noTasksMessg)
    }
    // toggle  finshed class on tasks
    if(e.target.classList.contains('task-box')){

        e.target.classList.toggle('finshed')
    }
})

// no tasks message
function notasks() {

    if(document.querySelectorAll('.tasks-container .task-box').length == 0){

        tasksContainer.appendChild(noTasksMessg);
        console.log('done')

    }


};