var comp3 = {
  data: function () {
    return {
    }
  },
  props:['name'],
  template: '<li id="main"><input type="checkbox" v-model="name.checked">{{name.value}} <button  class="btn btn-primary btn-sm float-right"  > &times;</button></li>'
  }
var comp2= {
  data: function () {
    return {
    info:"",
     }
  },
  props:['id'],
  components:{ list:comp3},
  mounted () {
    axios({ method: "GET", "url": "http://localhost:3000/tasks" }).then(response => (this.info = response.data))},
  template: '<div><p><ul class="nav flex-column" v-for="tasks in info" v-if="tasks.title === id">{{id}}<list v-for="task in tasks.work" v-bind:name="task" ></list></ul><input type="text"> <button class="btn btn-primary" >Add</button></p></div>  '
   //http://localhost:3000/tasks?title=$route.params.id
}
var comp1= {  
  data: function () {
    return { 
       info:"",
     
    }
  },
  components:{ app:comp2},
  mounted () {
    axios
      .get(' http://localhost:3000/tasks')
      .then(response => (this.info = response))
  },
  template: '<div><p v-for="list in info.data"><router-link :to="{ name: &quot;user&quot;, params: { id: list.title }}">{{list.title}}</router-link></p></div>',
  }
const routes = [
    { path: '/', component: comp1 },
  { path: '/next/:id', name: 'user', component: comp2, props:true },
]
const router = new VueRouter({
  routes // short for `routes: routes`
})
new Vue({ 
  el: '#maincomponent', 
  data:{
     },
  components:{
    titlelist:comp1
  },
  
  router
})