var comp3 = {
  data: function () {
    return {    }
  },
  props:['name','id1','item','title','index'],
  methods:{
    del()
    {  this.$emit('delete',this.index)  },
  check()
  {this.$emit('checked') 
  }
},
  template: '<li id="main"><input type="checkbox" v-model="name.checked" v-on:change="check(name.value,id1,item,title)">{{name.value}}<button  class="btn btn-primary btn-sm float-right" v-on:click="del()" > &times;</button></li>'
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
    remove(index)
    { 
      task=this.info[0].work
        if (index > -1) {
            task.splice(index, 1);
        }
        next={
          "title":this.info[0].title,
          "work" : task
        } 
        
    var url= "http://localhost:3000/tasks/"+this.info[0].id
       const res =   axios.put(url, next )    

    },
    check()
    { 
    var url= "http://localhost:3000/tasks/"+this.info[0].id
       const res =   axios.put(url, { "title":this.info[0].title,     "work" : this.info[0].work    }  )      
      },
     add(){  
        task=this.info[0].work 
        var next =  {  "value":this.name,     "checked":false  }   
        task.push(next) 
        next={
          "title":this.info[0].title,
          "work" : task
        } 
    var url= "http://localhost:3000/tasks/"+this.info[0].id
       const res =   axios.put(url, next )    
       
       this.name=""
      
    }  
  },
  mounted () {
    axios.get("http://localhost:3000/tasks?title="+ this.$route.params.id ).then(response => (this.info = response.data)
    )},
  template: '<div><p  v-for="tasks in info"><ul class="nav flex-column">{{id}}  <list v-bind:id1="tasks.id" v-bind:title="tasks.title" v-bind:item="tasks.work" v-for="(task,index) in tasks.work" v-bind:name="task" v-bind:index="index"  @delete="remove" @checked="check"></list></ul> <input type="text" v-model="name"><button class="btn btn-primary" v-on:click="add()">Add</button></p></div>'
   
}//npx json-server --watch db.json

var comp1= {  
  data: function () {
    return { 
       info:"",
       title:"",
       info1:""     
    }
  },
  components:{ app:comp2},
  methods:{
    add()
    {
      var abc={"title":this.title,"work":[]}
     var a = axios.post(' http://localhost:3000/tasks',abc) //.then(response => (this.info1 = response.data))
       .then(function (response) {     
        info1=response.data
        return info1  })
      a.then(response => { 
       (this.info).push(info1)  
       
        this.title=""   }) 
    
    
    }
  },
  mounted () {
    axios.get(' http://localhost:3000/tasks') .then(response => (this.info = response.data))
  },
  template: '<div ><p v-for="list in info"><router-link :to="{ name: &quot;user&quot;, params: { id: list.title }}">{{list.title}}</router-link></p><input type="text" v-model="title"><button class="btn btn-primary" v-on:click="add()">Add</button></div>',
  }
const routes = [
    { path: '/', component: comp1 },
  { path: '/next/:id', name: 'user', component: comp2, props:true },
]
const router = new VueRouter({
  routes 
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