<!-- copyright -->
<!-- https://mdbootstrap.com/docs/standard/extended/login/ -->
<!-- https://jasonwatmore.com/post/2022/04/12/vue-3-veevalidate-form-validation-example-composition-api -->

<script setup>
import { ref, onMounted } from "vue";
import { Form, Field } from "vee-validate";
import axios from "@/plugins/axios";
import * as Yup from "yup";
const email = ref("");
const password = ref("");

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});

onMounted(() => {
  console.log(`On Mounted.`);
});

function onSubmit() {
  axios
    .get("/posts")
    .then((res) => {
      const data = res.data;
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>
<template>
  <section class="vh-100">
    <div class="container py-5 h-100">
      <div class="row d-flex align-items-center justify-content-center h-100">
        <div class="col-md-8 col-lg-7 col-xl-6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            class="img-fluid"
            alt="Phone image"
          />
        </div>
        <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
          <Form
            @submit="onSubmit"
            :validation-schema="schema"
            v-slot="{ errors }"
          >
            <div class="form-outline mb-4">
              <Field
                name="email"
                placeholder="Email"
                v-model="email"
                type="text"
                class="form-control form-control-lg"
                :class="{ 'is-invalid': errors.email }"
              />
              <div class="invalid-feedback">{{ errors.email }}</div>
            </div>
            <div class="form-outline">
              <Field
                name="password"
                placeholder="Password"
                v-model="password"
                type="password"
                class="form-control form-control-lg"
                :class="{ 'is-invalid': errors.password }"
              />
              <div class="invalid-feedback">{{ errors.password }}</div>
            </div>

            <div
              class="d-flex justify-content-end align-items-center mb-4 ma-0 pa-0"
            >
              <div class="col-6 text-end">
                <router-link to="/forgot-password"
                  >Forgot password?</router-link
                >
              </div>
            </div>
            <div>
              <button type="submit" class="btn btn-primary btn-lg w-100">
                Sign in
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
