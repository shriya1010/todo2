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
    return { tasks:"",
    info:""
    }
  },
  props:['title'],
  components:{ list:comp3},
  mounted () {
    axios
      .get(' http://localhost:3000/tasks?title=shopping')
      .then(response => (this.info = response))
  },
  template: '<div><ul class="nav flex-column" v-for="tasks in info.data"><list v-for="task in tasks.work" v-bind:name="task" ></list></ul><input type="text"> <button class="btn btn-primary" >Add</button></div>  '
  //http://localhost:3000/tasks?title="title"
}
var comp1= {
  
  data: function () {
    return { 
      //list:"",
      info:""
    }
  },
  components:{ app:comp2},
  mounted () {
    axios
      .get(' http://localhost:3000/tasks')
      .then(response => (this.info = response))
  },
  //template: '<div>  <p v-for="data in info"><router-link to="/next">{{data.title}}</router-link><app v-bind:tasks="data.work"></app> </p> </div>'
  //template: '<div>bgh <p v-for="data in info">njn<router-link to="/next">{{data.title}}{{info}}</router-link></p>  </div>'
  template:'<div><p v-for="list in info.data" v-bind:title="list.title"><router-link to="/next">{{list.title}}</router-link></p></div>'
}
const routes = [
  
  { path: '/', component: comp1 },
  { path: '/next', component: comp2 },
  
]
const router = new VueRouter({
  routes // short for `routes: routes`
})
new Vue({ 
  el: '#maincomponent', 
  data:{
    name:"",
    info:"",
    data:"" // how will comp1 get this data now? you cannot use props to send data through router view.. also if u could.. all components dont need that data.. so what would you do? think about it 

  },
  components:{
    titlelist:comp1
  },
  mounted () {
    axios
      .get(' http://localhost:3000/tasks')
      .then(response => (this.info = response))
  },
  router
}).$mount('#maincomponent')
