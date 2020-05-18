var comp3 = {
  data: function () {
    return {
    }
  },
  props:['name','id1'],
  methods:{
    del(x,y)
    { this.$emit('click',[x,y])
  },
  check(x,y)
  {this.$emit('change',[x,y]) 
  }

},
  template: '<li id="main"><input type="checkbox" v-model="name.checked" v-on:change="check(name.value,id1)">{{name.value}}<button  class="btn btn-primary btn-sm float-right" v-on:click="del(name.value,id1)" > &times;</button></li>'
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
      //console.log(id) 
       var info1={}          
      var abc= axios.get("http://localhost:3000/tasks?id="+id).then(function (response) {
        info1=response.data
        return info1  })
      abc.then(response => { 
        var task=info1[0].work 
        title=info1[0].title
        var index 
        for( index in task)
        {
          if(task[index].value===item)
          break;
        
        }
        
        if (index > -1) {
            task.splice(index, 1);
        }
        next={
          "title":title,
          "work" : task
        } 
        
    var url= "http://localhost:3000/tasks/"+id
       const res =   axios.put(url, next )      
      
       this.info=info1
      })   

    },
    check(arr)
    { item=arr[0]
      id=arr[1]
      //console.log(id)
      var info1={}          
      var abc= axios.get("http://localhost:3000/tasks?id="+id).then(function (response) {
        info1=response.data
        return info1  })
      abc.then(response => { 
        var task=info1[0].work 
        title=info1[0].title
        var index 
        for( index in task)
        {
          if(task[index].value===item)
          task[index].checked=!task[index].checked
        
        }
        
        next={
          "title":title,
          "work" : task
        } 
        
    var url= "http://localhost:3000/tasks/"+id
       const res =   axios.put(url, next )      
      
       this.info=info1
      })   
    },
     add(value,title){        
      var info1={}   
        task=[]
      var abc= axios.get("http://localhost:3000/tasks?title="+title).then(function (response) {
        info1=response.data
        return info1  })
      abc.then(response => { 
        task=info1[0].work 
        id=info1[0].id
        var next =  {  "value":value,     "checked":false  }        
        task.push(next) 
        next={
          "title":title,
          "work" : task
        } 
    var url= "http://localhost:3000/tasks/"+id
       const res =   axios.put(url, next )      
      
       this.info=info1
       this.name=""
      })   
    }  
  },
  mounted () {
    axios({ method: "GET", "url": "http://localhost:3000/tasks?title="+ this.$route.params.id }).then(response => (this.info = response.data))},
  template: '<div><p><ul class="nav flex-column" v-for="tasks in info">{{id}}<list v-bind:id1="tasks.id" v-for="task in tasks.work" v-bind:name="task" @click="remove" @change="check"></list></ul><input type="text" v-model="name"><button class="btn btn-primary" v-on:click="add(name,id)">Add</button></p></div>'
   
}//npx json-server --watch db.json

var comp1= {  
  data: function () {
    return { 
       info:"",
     
    }
  },
  components:{ app:comp2},
  mounted () {
    axios.get(' http://localhost:3000/tasks') .then(response => (this.info = response))
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