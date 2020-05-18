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
    name:"",
     }
  },
  props:['id'],
  components:{ list:comp3},
  methods:{
     add(value,title){
       var next = {   
        "value":value,
        "checked":false
      }
      var url= "http://localhost:3000/tasks?title="+title
      const res =   axios.post(url, next )
      //this.info=[this.info,res.data]   
    }  
  },
  mounted () {
    axios({ method: "GET", "url": "http://localhost:3000/tasks?title="+ this.$route.params.id }).then(response => (this.info = response.data))},
  template: '<div><p><ul class="nav flex-column" v-for="tasks in info">{{id}}<list v-for="task in tasks.work" v-bind:name="task" ></list></ul><input type="text" v-model="name"><button class="btn btn-primary" v-on:click="add(name,id)">Add</button></p></div>'
   
}//npx json-server --watch db.json

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