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
      <a
        href="//whoursie.com/4/5520434"
        target="_blank"
        rel="noreferrer noopener"
        class="w-full"
      >
        <div class="  md:w-1/2 sm:w-full w-full mx-5 ">
          <div class="w-full bg-gray-500 rounded-full h-3 ">
            <div
              class="bg-blue-accent-700 h-3 rounded-full"
              style={`width: ${progress}%`}
            />
          </div>
        </div>
      </a>
    {:else if $IsLoggedin == true && $AlreadyViewed == true}
      <a
        href="//whoursie.com/4/5520434"
        target="_blank"
        rel="noreferrer noopener"
        class="  md:w-1/2 sm:w-full w-full mx-5 h-6 "
      >
        <div class=" flex text-center text-lg">
          Already Visited this site <span
            class="  m-auto bg-gradient-to-r from-[#28ca76] to-[#aaff00] ml-2 rounded-full"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="border-2 border-white rounded-full p-1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 12l5 5l10 -10" />
              <path d="M2 12l5 5m5 -5l5 -5" />
            </svg></span
          >
        </div>
      </a>
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
