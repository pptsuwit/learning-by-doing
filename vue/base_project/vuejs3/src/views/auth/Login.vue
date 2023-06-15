<template>
  <form @submit.prevent="submit">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        v-model="email"
      />
      <div id="emailHelp" class="form-text">
        We'll never share your email with anyone else.
      </div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input
        type="password"
        v-model="password"
        class="form-control"
        id="exampleInputPassword1"
      />
    </div>
    <div class="mb-3 form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1" />
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script>
export default {
  data: () => ({
    email: "root",
    password: "root999",
    showPass: false,
    usernameRules: [(v) => !!v || "กรุณาระบุชื่อผู้ใช้"],
    passwordRules: [
      (v) => !!v || "กรุณาระบุรหัสผ่าน",
      (v) => (v && v.length >= 6) || "รหัสผ่านขั้นต่ำต้องมีอย่างน้อย 6",
    ],
  }),
  mounted() {
    // this.$store.dispatch("logout").then(() => {});
    this.$root
      .appApi({
        url: "admin/position/all",
      })
      .then((resp) => {
        const entity = resp.data.data;
        if (entity) {
          this.ddlPosition = entity.map((item) => {
            return {
              text: item.name,
              value: item.id,
            };
          });
        }
        this.$store.state.loading = false;
      })
      .catch((err) => {
        this.$root.getErorMessage(err);
      });
  },
  methods: {
    submit() {
      // console.log(this.email);
      // console.log(this.password);
      // this.email = this.email.trim();
      // if (!this.$refs.form.validate()) return null;
      console.log("first");
      this.$store.state.loading = true;
      this.$store
        .dispatch("login", { username: this.email, password: this.password })
        .then(() => {
          this.$store.state.loading = false;
          this.$router.push("/");
          this.$store.state.title = "";
        })
        .catch((err) => {
          console.log(err);
          this.$root.getErrorSystemMessage(err);
          this.$store.state.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.section-container {
  padding: 0;
  margin: 0;
  background: #000;
  width: 100%;
}
.screen {
  padding: 0;
  margin: 0;
  height: 100%;
  box-sizing: border-box;
}

.left--side {
  width: 35%;
  height: 100%;
  box-sizing: border-box;
  background: var(--v-app-theme-base);

  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10%;
  padding-left: 0;
}
.right--side {
  display: inline-block;
  width: 65%;
  height: 100%;

  box-sizing: border-box;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding-bottom: 10%; */
  /* padding-right: 5%; */
}
</style>
