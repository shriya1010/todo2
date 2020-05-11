var comp2 = {
  data: function () {
    return {
    }
  },
  props:['name'],
  template: '<li class="list_name"><input type="checkbox" v-model="name.checked">{{name.value}} <button  class="btn btn-primary btn-sm float-right"  > &times;</button></li>'
  }
var comp1= {
  
  data: function () {
    return { 
    }
  },
  components:{ list:comp2},
  props:['tasks'],
  template: '<div id="main"><ul class="nav flex-column"> <list v-for="task in tasks" v-bind:name="task" ></list></ul><input type="text">   <button class="btn btn-primary" >Add</button></div>  '
  
  //template: '<div id="main"><ul class="nav flex-column"> {{tasks.title}}</ul><input type="text">   <button class="btn btn-primary" >Add</button></div>  '
  
}
new Vue({ 
  el: '#maincomponent', 
  data:{
    name:"",
    info:"",
    data:""
  },
  components:{
    app:comp1
  },
  mounted () {
    axios
      .get(' http://localhost:3000/tasks')
      .then(response => (this.info = response))
  }
})