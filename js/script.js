const { createApp } = Vue;

createApp({
  data() {
    return {
      todoList: [],
      apiUrl: "server.php",
      newTask: "",
    };
  },
  methods: {
    readList() {
      axios
        .get(this.apiUrl)
        .then((response) => {
          console.log(response.data);
          this.todoList = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          //alway executed
        });
    },

    // VERSIONE ALTERNATIVA DI ADD TASK
    // addTask2(){
    //   const data ={
    //     task: this.newTask,
    //   };
    //   axios.post(apiUrl,data,{
    //     headers:{"Content-Type":"multipart/form-data"},
    //   })
    // .then(function(response){
    //   console.log(response);
    // })
    //   .catch(function(error){
    //     console.log(error);
    //   });
    // },

    addTask() {
      console.log("newTask:" + this.newTask);

      if (this.newTask == "") {
        return;
      }
      const data = new FormData();
      data.append("task", this.newTask);

      axios
        .post(this.apiUrl, data)
        .then((response)=> {
          console.log("addtask" + response.data);
          this.todoList = response.data;
          this.readList();
          this.newTask="";
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteTask(index) {
      const data = new FormData();
      data.append("deletetask", index);
      axios
        .post(this.apiUrl, data)
        .then((response) => {
          console.log(response.data);
          this.todoList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },


    invertDone(task) {
      task.done = !task.done;

      const data = new FormData();
      data.append("updateTask", JSON.stringify(task));

      axios
        .post(this.apiUrl, data)
        .then((response) => {
          // Puoi gestire la risposta come preferisci
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    this.readList();
  },
}).mount("#app");
