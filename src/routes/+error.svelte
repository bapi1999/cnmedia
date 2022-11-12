<script>
  import { page } from "$app/stores";
</script>

<div class="px-10 py-5">
  <h1 class="text-8xl font-semibold text-center text-cyan-600">Ooops</h1>
  <h1 class="min-h-screen mt-10 text-4xl font-thin text-center">
    {$page.status} : {$page.error.message}
  </h1>
</div>
