/* Vue.component('app', {
  data: function () {
    return {      
    }
  },
  template: '<div>   <input type="text">   <button class="btn btn-primary" >Add</button>  </div>  '
})

Vue.component('list', {
  data: function () {
    return {
      "tasks": ["study","play","code"],
      
    }
  },
  template: '<div> <ul class="nav flex-column"><li class="nav-item" v-for="task in tasks" > <input type="checkbox">       {{ task }}<button  class="btn btn-primary float-right"  > &times;</button></li></ul> </div>  '
})
*/

//{title:"assignment steps", items:[{ name: "Make a vue instance", checked: false},{ name: "Make a vue instance", checked: false}]}
var comp2 = {
  data: function () {
    return {
      //"tasks": ["study","play","code"],
     "tasks":
      [
        {
          "value":"code",
          checked:false
        },
        {
          "value":"play",
          checked:true
        },
        {
          "value":"study",
          checked:false
        }

      ]
      
    }
  },
  
  template: '<div><ul class="nav flex-column"><li class="nav-item" v-for="task in tasks" > <input type="checkbox" v-model="task.checked">{{ task.value }}<button  class="btn btn-primary float-right"  > &times;</button></li></ul> </div>'

  }
var comp1= {
  data: function () {
    return {      
    }
  },
  components:{ list:comp2},
  template: '<div id="main"><list></list><input type="text">   <button class="btn btn-primary" >Add</button></div>  '
  }

new Vue({ 
  el: '#maincomponent', 
  components:{
    app:comp1
  }

})