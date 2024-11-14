<template>
  <b-container class="mt-5">
    <b-card title="Vue Form" class="p-4">
      <b-form @submit.prevent="handleSubmit">
        <!-- Name Field -->
        <b-form-group label="Name" label-for="name" description="Enter your full name">
          <b-form-input
            id="name"
            v-model="formData.name"
            placeholder="John Doe"
            required
          ></b-form-input>
        </b-form-group>

        <!-- Email Field -->
        <b-form-group label="Email" label-for="email" description="Enter your email address">
          <b-form-input
            id="email"
            v-model="formData.email"
            type="email"
            placeholder="name@example.com"
            required
          ></b-form-input>
        </b-form-group>

        <!-- Age Field -->
        <b-form-group label="Age" label-for="age" description="Enter your age">
          <b-form-input
            id="age"
            v-model="formData.age"
            type="number"
            placeholder="e.g., 25"
            required
          ></b-form-input>
        </b-form-group>

        <!-- Role Selection -->
        <b-form-group label="Role" label-for="role" description="Select your role">
          <b-form-select
            id="role"
            v-model="formData.role"
            :options="roles"
            required
          ></b-form-select>
        </b-form-group>

        <!-- Submit Button -->
        <b-button type="submit" variant="primary" class="mt-3">Submit</b-button>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const formData = ref({
      name: '',
      email: '',
      age: null,
      role: '',
    })

    const roles = [
      { value: 'developer', text: 'Developer' },
      { value: 'designer', text: 'Designer' },
      { value: 'manager', text: 'Manager' },
    ]

    const handleSubmit = () => {
      alert('Form submitted:')
    }

    return {
      formData,
      roles,
      handleSubmit,
    }
  },
}
</script>

<style scoped>
.b-container {
  max-width: 600px;
}
.b-card {
  background-color: #f9f9f9;
}
</style>
