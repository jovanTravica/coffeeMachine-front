<template>
  <div id="app" class="container">
     <div id="inner"  class="col-sm-6 col-md-3 col-md-offset-4">
    <img
      width="250"
      height="250"
      class="img-fluid"
      alt="Responsive image"
      src="@/assets/logo.png"
    />
     </div>
    <div class="">
      <div id="inner" class="col-sm-6 col-md-4 col-md-offset-4">
        <div class="account-wall">
          <form class="form-signin" @submit.prevent="doRegister" method="POST">
            <input
              id="name"
              v-model="name"
              type="text"
              class="form-control"
              placeholder="Name"
              required
              autofocus
            />
            <input
              id="desc"
              v-model="desc"
              type="text"
              class="form-control"
              placeholder="Description"
            />
            <input
              id="username"
              v-model="username"
              type="text"
              class="form-control"
              placeholder="Username"
              required
            />
            <input
              id="password"
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Password"
              required
            />
            <input
              id="rePassword"
              v-model="rePassword"
              type="password"
              class="form-control"
              placeholder="Retype password"
              required
            />
            <button class="btn btn-lg btn-primary btn-block" type="submit">
              Sign in
            </button>
          </form>
        </div>
        <router-link to="/"> Already have an account? </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import router from "../router";

@Component
export default class Register extends Vue {
  private name = "";
  private desc = "";
  private password = "";
  private username = "";
  private rePassword = "";

  public doRegister() {
    axios
      .post("http://localhost:9090/api/v1/users", {
        name: this.name,
        desc: this.desc,
        username: this.username,
        password: this.password,
        passwordCheck: this.rePassword
      })
      .then(resp => {
        router.push("/"), alert("User created");
      })
      .catch(function(error) {
        if (error.response) alert(error.response.data.message);
      });
  }
}
</script>

<style scoped>
.form-signin {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  font-size: 16px;
  height: auto;
  padding: 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input[type="text"] {
  margin-bottom: -1px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.account-wall {
  margin-top: 20px;
  padding: 40px 0px 20px 0px;
  background-color: #f7f7f7;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.login-title {
  color: #555;
  font-size: 18px;
  font-weight: 400;
  display: block;
}
.profile-img {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
.need-help {
  margin-top: 10px;
}
.new-account {
  display: block;
  margin-top: 10px;
}
@media screen and (max-width: 600px) {
  div#app div#login {
    align-items: unset;
    background-color: unset;
    display: unset;
    justify-content: unset;
  }
}
#inner {
  margin: 0 auto;
}
</style>
