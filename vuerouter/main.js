var comp3 = {
  data: function () {
    return {
    }
  },
  props:['name'],
  template: '<li id="main">comp3<input type="checkbox" v-model="name.checked">{{name.value}} <button  class="btn btn-primary btn-sm float-right"  > &times;</button></li>'
  }
var comp2= { 
  data: function () {
    return { 
    }
  },
  components:{ list:comp3},
  props:['tasks'],
  //template: '<div ><ul class="nav flex-column"> fdgg<list v-for="task in tasks" v-bind:name="task" ></list></ul><input type="text">   <button class="btn btn-primary" >Add</button></div>  '
  template: '<div ><ul class="nav flex-column">comp2{{tasks}}</ul><input type="text">   <button class="btn btn-primary" >Add</button></div>  '
    
}
var comp1= {  
  data: function () {
    return { 
    }
  },
  components:{ app:comp2},
  props:['info'],
  //template: '<div> <p v-for="data in info" ><router-link to="/comp2">{{data.title}} </router-link> <app v-show="data.show" v-bind:tasks="data.work"></app> </p>  <router-view></router-view>   </div>'
  template: "<div> <p v-for='data in info' v-bind:info='data.work'>  <router-link to=/comp2/>{{ $route.params.info }}{{data.title}}</router-link>    </p>  <router-view></router-view>   </div>"

}
const routes = [
  {
    path: '/comp2/', 
    name:'comp2',
  component: comp2 ,
  props: true ,
  
  children: [
    {
      // UserProfile will be rendered inside User's <router-view>
      // when /user/:id/profile is matched
      path: '*',
      component: comp3
    } 
  ]
  }
]
const router = new VueRouter({
    routes // short for `routes: routes`
    
})
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
  },
   router
}).$mount('#maincomponent')