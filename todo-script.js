// LOCAL STORAGE KEY
const STORAGE_KEY = 'todoList';

// DOM ELEMENTS
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompleted = document.getElementById('clearCompleted');
const deleteAll = document.getElementById('deleteAll');
const totalCount = document.getElementById('totalCount');
const activeCount = document.getElementById('activeCount');
const completedCount = document.getElementById('completedCount');

// STATE
let todos = [];
let currentFilter = 'all';

// INITIALIZE APP
function init() {
    loadTodos();
    renderTodos();
    updateStats();
    attachEventListeners();
}

// LOAD TODOS FROM LOCAL STORAGE
function loadTodos() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            todos = JSON.parse(saved);
        } catch (error) {
            console.error('Error loading todos:', error);
            todos = [];
        }
    } else {
        todos = [];
    }
}

// SAVE TODOS TO LOCAL STORAGE
function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// ADD NEW TODO
function addTodo() {
    const text = todoInput.value.trim();
    
    if (!text) {
        alert('Please enter a task!');
        return;
    }

    if (text.length > 100) {
        alert('Task is too long! Maximum 100 characters.');
        return;
    }

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toLocaleString()
    };

    todos.unshift(newTodo);
    saveTodos();
    todoInput.value = '';
    renderTodos();
    updateStats();
    todoInput.focus();
}

// DELETE TODO
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
    updateStats();
}

// TOGGLE TODO COMPLETION
function toggleTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
        updateStats();
    }
}

// CLEAR ALL COMPLETED TODOS
function clearCompletedTodos() {
    const count = todos.filter(todo => todo.completed).length;
    
    if (count === 0) {
        alert('No completed tasks to clear!');
        return;
    }

    if (confirm(`Delete ${count} completed task(s)?`)) {
        todos = todos.filter(todo => !todo.completed);
        saveTodos();
        renderTodos();
        updateStats();
    }
}

// DELETE ALL TODOS
function deleteAllTodos() {
    if (todos.length === 0) {
        alert('No tasks to delete!');
        return;
    }

    if (confirm(`Delete all ${todos.length} task(s)? This cannot be undone!`)) {
        todos = [];
        saveTodos();
        renderTodos();
        updateStats();
    }
}

// RENDER TODOS
function renderTodos() {
    todoList.innerHTML = '';

    let filteredTodos = todos;

    if (currentFilter === 'active') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    if (filteredTodos.length === 0) {
        todoList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <p>No tasks ${currentFilter !== 'all' ? `in ${currentFilter} filter` : 'yet'}. Let's get started! 🚀</p>
            </div>
        `;
        return;
    }

    filteredTodos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        todoItem.innerHTML = `
            <input 
                type="checkbox" 
                class="checkbox" 
                ${todo.completed ? 'checked' : ''}
                onchange="toggleTodo(${todo.id})"
            >
            <span class="todo-text">${escapeHtml(todo.text)}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        todoList.appendChild(todoItem);
    });
}

// UPDATE STATS
function updateStats() {
    const total = todos.length;
    const active = todos.filter(todo => !todo.completed).length;
    const completed = todos.filter(todo => todo.completed).length;

    totalCount.textContent = total;
    activeCount.textContent = active;
    completedCount.textContent = completed;
}

// ESCAPE HTML FOR SECURITY
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ATTACH EVENT LISTENERS
function attachEventListeners() {
    // Add todo on button click
    addBtn.addEventListener('click', addTodo);

    // Add todo on Enter key
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            renderTodos();
        });
    });

    // Clear completed button
    clearCompleted.addEventListener('click', clearCompletedTodos);

    // Delete all button
    deleteAll.addEventListener('click', deleteAllTodos);
}

// START APP
document.addEventListener('DOMContentLoaded', init);
