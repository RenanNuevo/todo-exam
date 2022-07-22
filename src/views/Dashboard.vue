<script>
import { watch } from 'vue'

export default {
  data() {
    return {
      todos: [],
      name: "",
      input_summary: "",
      input_description: null,
      completed: []
    };
  },
  methods: {
    todos_asc() {
      this.todos.sort((a,b) =>{
        return a.createdAt-b.createdAt;
      });
    },
    watch() {
      watch(this.name, (newVal) => {
        localStorage.setItem('name', newVal)
      })
      watch(this.todos, (newVal) => {
        localStorage.setItem('todos', JSON.stringify(newVal))
      }, {
        deep: true
      })
    },
    addTodo() {
      if (this.input_summary?.trim() === '' || this.input_description === null) {
        return
      }

      this.todos.push({
        summary: this.input_summary,
        description: this.input_description,
        done: false,
        editable: false,
        createdAt: new Date().getTime()
      })
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    removeTask(task, status) {
      this[status] = this[status].filter((t) => t !== task);
      localStorage.setItem(status, JSON.stringify(this[status]))
    },
    doneTask(todo) {
      let newValue = this.todos.map((item) => {
        if(item.createdAt == todo.createdAt) {
          item.done = true;
        }
        return item;
      })
      this.todos = this.todos.filter((t) => t !== todo);
      localStorage.setItem('todos', JSON.stringify(this.todos))
      this.completed.push(...newValue)
      localStorage.setItem('completed', JSON.stringify(this.completed))
  	  this.completed = JSON.parse(localStorage.getItem('completed')) || []
    }
  },
  mounted() {
    this.name = localStorage.getItem('name') || ''
	  this.todos = JSON.parse(localStorage.getItem('todos')) || []
	  this.completed = JSON.parse(localStorage.getItem('completed')) || []
  }
};
</script>

<template>
	<main class="app">
		<section class="create-todo">
      <label>
				<button 
          data-bs-toggle="modal"
          type="button"
          data-bs-target="#exampleModal"
          style="font-weight:bold; border: none, background-color: white, margin: 20px;">
         + Add new task
         </button>
      </label>
			<form id="new-todo-form" @submit.prevent="addTodo">
      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
               <input 
                type="text" 
                name="summary" 
                id="summary" 
                placeholder="Summary"
                v-model="input_summary" />

                <input
                  type="text" 
                  name="description" 
                  id="description" 
                  placeholder="Description"
                  v-model="input_description" />
				        <input type="submit" value="Add todo" />
              ...
            </div>
            <button type="button" class="btn" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
			</form>
       
		</section>

		<section class="todo-list">
			<h4>INCOMEPLETE</h4>
			<div class="list" id="todo-list">

				<div v-bind:key="todo.summary"  v-for="todo in todos" :class="`todo-item ${todo.done && 'done'}`">
					<label>
						<input type="checkbox" v-model="todo.done" @click="doneTask(todo)" />
						<span :class="`bubble`"></span>
            <p ></p>
					</label>

					<div class="todo-content">
						<input type="text" v-text="todo.summary" v-model="todo.summary" />
            <p class="date" v-text="new Date(todo.createdAt).toUTCString()"></p>
					</div>
				</div>

			</div>
      <h4>COMPLETED</h4>
			<div class="list" id="todo-list">

				<div v-bind:key="com.summary"  v-for="com in completed" :class="`todo-item ${com.done && 'done'}`">
					<label>
						<input disabled type="checkbox" checked/>
						<span :class="`bubble`"></span>
					</label>

					<div class="todo-content">
						<label v-text="com.summary"></label>
					</div>

					<div class="actions">
						<button class="delete" @click="removeTask(com, 'completed')">Delete</button>
					</div>
				</div>

			</div>
		</section>

	</main>
</template>
