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
    }
  },
  components:{ list:comp3},
  props:['tasks'],
  template: '<div ><ul class="nav flex-column"> <list v-for="task in tasks" v-bind:name="task" ></list></ul><input type="text">   <button class="btn btn-primary" >Add</button></div>  '
  
}
var comp1= {
  
  data: function () {
    return { 
    }
  },
  components:{ app:comp2},
  props:['info'],
  template: '<div>  <p v-for="data in info" >{{data.title}} <button  class="btn btn-primary btn-sm float-right" v-on:click="data.show=!data.show" >View</button> <app v-show="data.show" v-bind:tasks="data.work"></app> </p> </div>'
}
new Vue({ 
  el: '#maincomponent', 
  data:{
    name:"",
    info:"",
    data:""
  },
  components:{
    titlelist:comp1
  },
  mounted () {
    axios
      .get(' http://localhost:3000/tasks')
      .then(response => (this.info = response))
  }
})