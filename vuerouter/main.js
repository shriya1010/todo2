var comp3 = {
  data: function () {
    return {
    }
  },
  props:['name','id1','item','title'],
  methods:{
    del(a,b,c,d)
    { this.$emit('delete',[a,b,c,d])
  },
  check(a,b,c,d)
  {this.$emit('checked',[a,b,c,d]) 
  }

},
  template: '<li id="main"><input type="checkbox" v-model="name.checked" v-on:change="check(name.value,id1,item,title)">{{name.value}}<button  class="btn btn-primary btn-sm float-right" v-on:click="del(name.value,id1,item,title)" > &times;</button></li>'
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
    remove(arr)
    { item=arr[0]
      id=arr[1]
      task=arr[2]
      title=arr[3]
        var index =task.findIndex(x =>x.value == item)
         
        
        if (index > -1) {
            task.splice(index, 1);
        }
        next={
          "title":title,
          "work" : task
        } 
        
    var url= "http://localhost:3000/tasks/"+id
       const res =   axios.put(url, next )      

    },
    check(arr)
    { item=arr[0]
      id=arr[1]
      task=arr[2]
      title=arr[3]
      next={
          "title":title,
          "work" : task
        } 
        
    var url= "http://localhost:3000/tasks/"+id
       const res =   axios.put(url, next )      
      },
     add(value,title,id,task){        
       var next =  {  "value":value,     "checked":false  }   
        task.push(next) 
        next={
          "title":title,
          "work" : task
        } 
    var url= "http://localhost:3000/tasks/"+id
       const res =   axios.put(url, next )       
       
       this.name=""
      
    }  
  },
  mounted () {
    axios.get("http://localhost:3000/tasks?title="+ this.$route.params.id ).then(response => (this.info = response.data)
    )},
  template: '<div><p  v-for="tasks in info"><ul class="nav flex-column">{{id}}<list v-bind:id1="tasks.id" v-bind:title="tasks.title" v-bind:item="tasks.work" v-for="task in tasks.work" v-bind:name="task"  @delete="remove" @checked="check"></list></ul>  <input type="text" v-model="name"><button class="btn btn-primary" v-on:click="add(name,id,tasks.id,tasks.work)">Add</button></p></div>'
   
}//npx json-server --watch db.json

var comp1= {  
  data: function () {
    return { 
       info:"",
       title:""     
    }
  },
  components:{ app:comp2},
  methods:{
    add(title,info)
    {
      var abc=axios.post(' http://localhost:3000/tasks',{"title":title,"work":[]}).then(function (response) {     
        info1=response.data
        return info1  })
      abc.then(response => { 
        (this.info).push(info1)  
        this.title=""    
    
    })
    }
  },
  mounted () {
    axios.get(' http://localhost:3000/tasks') .then(response => (this.info = response.data))
  },
  template: '<div ><p v-for="list in info"><router-link :to="{ name: &quot;user&quot;, params: { id: list.title }}">{{list.title}}</router-link></p><input type="text" v-model="title"><button class="btn btn-primary" v-on:click="add(title,info)">Add</button></div>',
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