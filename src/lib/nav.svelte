<script>
  import { onMount } from "svelte";
  import { IsLoggedin, UserName } from "../authStore";
  import { AlreadyViewed, ClickCount, TotalClick } from "../scroolStore";
  import { Auth } from "../firebase";
  import { goto } from "$app/navigation";
  import { signOut } from "firebase/auth";
  import cnmedia from "$lib/assets/cnmedia.png";
  let mobileMenueVisible = false;

  export let userName = "No User ";
  export let pathname = "";
  export let notificationCount = 0;

  $: if (userName.length > 20) {
    userName = userName.substring(20);
  }

  let showLogoutforDesktop = false;

  $: progress = ($ClickCount * 100) / $TotalClick;
  $: if (progress >= 100) {
    progress = 100;
  }

  function menuToggle() {
    if (mobileMenueVisible) {
      let flyout = document.getElementById("mobile-menu");
      mobileMenueVisible = false;
    } else {
      let flyout = document.getElementById("mobile-menu");
      mobileMenueVisible = true;
    }
  }

  function signOutUser() {
    const auth = Auth;
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        goto("/");
        IsLoggedin.update(() => false);
        userName = "No User";
        if (showLogoutforDesktop) {
          showLogoutforDesktop = false;
        }
      })
      .catch((error) => {
        // An error happened.
      });
  }
</script>

<div
  class=" top-0 w-full sticky z-20 shadow-md  px-4 bg-blue-gray-100 py-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8"
>
  <div class="relative flex  items-center">
    <a
      href="/"
      aria-label="Company"
      title="Company"
      class="flex  items-center text-white mr-5 "
    >
      <img src={cnmedia} alt="" class="w-7 h-7" />
      <span class="ml-1 text-xl font-normal   text-gray-900">Cn-Media</span>
    </a>

    <div class="ml-auto">
      <button
        on:click={menuToggle}
        aria-label="Open Menu"
        title="Open Menu"
        class="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:outline-gray-200 "
      >
        {#if notificationCount > 0}
          <span
            class="absolute  text-[10px] text-white px-1  h-3 w-3 inline-block overflow-hidden  bg-red-500 rounded-full"
          />
        {/if}

        {#if mobileMenueVisible == false}
          <svg
            class="w-5 text-blue-gray-600  hover:text-blue-gray-900  "
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
            />
            <path
              fill="currentColor"
              d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
            />
            <path
              fill="currentColor"
              d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
            />
          </svg>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-arrow-right w-5"
            viewBox="0 0 20 20"
            stroke-width="2"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="5" y1="12" x2="19" y2="12" />
            <line x1="13" y1="18" x2="19" y2="12" />
            <line x1="13" y1="6" x2="19" y2="12" />
          </svg>
        {/if}
      </button>
    </div>
  </div>
</div>

<!-- Mobile menu dropdown  -->

{#if mobileMenueVisible == true}
  <div
    on:click={() => {
      menuToggle();
      console.log("onclick");
    }}
    on:keypress={() => {
      console.log("onkeypress");
    }}
    class=" w-full min-h-screen absolute top-0 right-0 z-20 bg-[#1c1c1c92] "
  >
    <div
      class="  ml-auto w-3/4 md:w-1/3 lg:w-1/4  min-h-screen  bg-white "
      id="mobile-menu"
    >
      <div
        class="flex items-center  py-3 justify-between border-b bg-gray-800  "
      >
        <div class="w-11/12  ">
          {#if $IsLoggedin == true}
            <a href="#" class="  ">
              <span
                class="  textLine1 uppercase px-3 tex-base font-bold text-white "
              >
                {$UserName}
              </span>
            </a>
          {:else}
            <div class="pl-3">
              <a href="/register" class="   ">
                <span
                  class="py-1 px-3 border-2 border-gray-300 tex-base font-semibold rounded-full text-white "
                >
                  SIGN IN
                </span>
              </a>
            </div>
          {/if}
        </div>

        <div class="w-1/12 ml-2 mr-6">
          <button
            on:click={menuToggle}
            aria-label="Close Menu"
            title="Close Menu"
            class="p-2 -mt-3 -mr-2 transition duration-200 rounded focus:outline-none focus:shadow-outline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-arrow-right w-5"
              viewBox="0 0 20 20"
              stroke-width="2"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="5" y1="12" x2="19" y2="12" />
              <line x1="13" y1="18" x2="19" y2="12" />
              <line x1="13" y1="6" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>

      <nav>
        <ul class=" space-y-2 p-2">
          <li class=" {pathname === '/' ? 'selected' : 'notSelected'}  ">
            <a
              on:click={menuToggle}
              href="/"
              aria-label="Product"
              title="Product"
              class="  flex tracking-wide "
            >
              <svg
                class="w-5 h-5 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <polyline points="5 12 3 12 12 3 21 12 19 12" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
              </svg>
              <span class="ml-2 text-sm ">Home</span>
            </a>
          </li>

          <!-- <li>
            {#if notificationCount > 0}
              <span
                class="absolute  text-[7px] text-white px-1  h-3 max-w-[20px] inline-block overflow-hidden   bg-red-500 rounded-full"
                >{notificationCount}</span
              >
            {/if}

            <a
              href="https://afiby.com/user/userDashboard"
              rel="noopener noreferrer"
              target="_blank"
              title="Affiliate"
              class="   flex tracking-wide   "
            >
              <svg
                class="w-5 h-5 "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5.931 6.936l1.275 4.249m5.607 5.609l4.251 1.275" />
                <path d="M11.683 12.317l5.759 -5.759" />
                <circle cx="5.5" cy="5.5" r="1.5" />
                <circle cx="18.5" cy="5.5" r="1.5" />
                <circle cx="18.5" cy="18.5" r="1.5" />
                <circle cx="8.5" cy="15.5" r="4.5" />
              </svg>

              <span class="ml-2 text-sm ">Affiliate</span>
            </a>
          </li> -->

          {#if $IsLoggedin == true}
            <li>
              <div class="border-t-2 border-gray-500" />
            </li>

            <li class="notSelected">
              <buttot
                on:click={() => {
                  signOutUser();
                }}
                aria-label="Logout"
                title="Logout"
                class=" flex tracking-wide  "
              >
                <svg
                  class="w-5 h-5 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"
                  />
                  <path d="M7 12h14l-3 -3m0 6l3 -3" />
                </svg>

                <span class="ml-2 text-sm ">Logout</span>
              </buttot>
            </li>
          {/if}
        </ul>
      </nav>

      {#if $IsLoggedin == true && $AlreadyViewed == false}
        <div class=" mx-5 mt-14 ">
          <p class="text-base font-thin text-black pb-4">Today's progress</p>
          <div class="w-full bg-gray-300 rounded-full ">
            <div
              class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={`width: ${progress}%`}
            >
              {Math.round(progress)}%
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}

<!--  -->
<style>
  .selected {
    padding-top: 0.5rem /* 8px */;
    padding-bottom: 0.5rem /* 8px */;
    padding-left: 1.25rem /* 20px */;
    padding-right: 1.25rem /* 20px */;
    border-radius: 0.375rem /* 6px */;
    --tw-bg-opacity: 1;
    background-color: rgb(255 87 34 / var(--tw-bg-opacity));
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
    font-weight: 600;
  }
  .notSelected {
    padding-top: 0.5rem /* 8px */;
    padding-bottom: 0.5rem /* 8px */;
    padding-left: 1.25rem /* 20px */;
    padding-right: 1.25rem /* 20px */;
    border-radius: 0.375rem /* 6px */;
    --tw-text-opacity: 1;
    color: rgb(0 0 0 / var(--tw-text-opacity));
    font-weight: 600;
  }
  .notSelected:hover {
    padding-top: 0.5rem /* 8px */;
    padding-bottom: 0.5rem /* 8px */;
    padding-left: 1.25rem /* 20px */;
    padding-right: 1.25rem /* 20px */;
    border-radius: 0.375rem /* 6px */;
    --tw-text-opacity: 1;
    color: rgb(0 0 0 / var(--tw-text-opacity));
    --tw-border-opacity: 1;
    border-color: rgb(255 87 34 / var(--tw-border-opacity));
    border-width: 2px;
  }

  .textLine1 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
    -webkit-box-orient: vertical;
  }
</style>
