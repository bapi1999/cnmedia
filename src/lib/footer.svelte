<script>
  import { AlreadyViewed, ClickCount, TotalClick } from "../scroolStore";
  import { IsLoggedin, UserName } from "../authStore";

  // $: percent =
  $: progress = ($ClickCount * 100) / $TotalClick;
  $: if (progress >= 100) {
    progress = 100;
  }
</script>

<div
  class=" top-0 w-full sticky z-20 shadow-md  px-4 py-3 bg-blue-gray-100  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8"
>
  <div class="relative flex items-center">
    {#if $IsLoggedin == true && $AlreadyViewed == false}
      <div class="  md:w-1/2 sm:w-full w-full mx-5 ">
        <div class="w-full bg-gray-500 rounded-full h-3 ">
          <div
            class="bg-indigo-accent-400 h-3 rounded-full"
            style={`width: ${progress}%`}
          />
        </div>
      </div>
    {:else if $IsLoggedin == false}
      <a href="/register" class=" mx-auto">
        <div class="  flex px-3 items-center justify-center ">
          <span class="text-sm mr-2">Already have an account!</span>
          <span class=" tex-base font-semibold rounded-full text-rose-600 ">
            SIGN IN
          </span>
        </div>
      </a>
    {/if}
  </div>
</div>
