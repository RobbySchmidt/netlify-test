<template>
  <div>
    <form 
      class="space-y-6 max-w-xl mx-auto my-12 p-4" 
      @submit="onSubmit">
      <FormField 
        v-slot="{ componentField }" 
        v-model="email" 
        name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input 
              type="email" 
              placeholder="Email" 
              v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField 
        v-slot="{ componentField }" 
        v-model="password" 
        name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input 
              type="password" 
              placeholder="password" 
              v-bind="componentField" />
          </FormControl>
          <FormMessage />
          <span 
            v-if="errorMessage"
            class="text-sm font-medium text-destructive inline-block mt-1">
            {{ errorMessage }}
          </span>
        </FormItem>
      </FormField>
      <Button 
        type="submit">
        Einloggen
      </Button>
    </form>
  </div>
</template>

<script setup>

  import { toTypedSchema } from '@vee-validate/zod'
  import { useForm } from 'vee-validate'
  import * as z from 'zod'

  const user = useDirectusUser();

  const formSchema = toTypedSchema(z.object({
    email: z.string().email('Bitte geben sie ihre Email Adresse ein'),
    password: z.string().min(6, 'Bitte geben sie ihr Passwort ein')
  }))

  const { handleSubmit } = useForm({
    validationSchema: formSchema,
  })

  const { login } = useDirectusAuth();

  const email = ref("");
  const password = ref("");
  const errorMessage = ref('')

  const onSubmit = handleSubmit(async () => {
    try {
      await login({ email: email.value, password: password.value });
      navigateTo('/');
    } catch (e) {
      if (user.email !== email.value || user.password !== password.value) {
        errorMessage.value = 'Email Adresse oder Passwort ist nicht korrekt';
        setTimeout(() => {
          errorMessage.value = ''
        }, 3000);
      }
    }
  });

</script>