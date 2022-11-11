<script>
  import { page } from "$app/stores";
  import { db, Auth } from "../../../../firebase";
  import { doc, getDoc } from "firebase/firestore";
  import { onMount } from "svelte";
  import { ClickCount } from "../../../../scroolStore";

  let title = "";
  let postId = "";
  let descriptionText = "";
  $: thumb = [];

  let showbtn = false;
  $: setTimeout(() => {
    showbtn = true;
  }, 2000);

  $: code = $page.params.code;
  $: docID = $page.params.slug;

  onMount(() => {
    getPost();
  });

  async function getPost() {
    try {
      const docRef = doc(db, "BLOGS", code, "POSTS", docID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        title = docSnap.data().title;
        descriptionText = docSnap.data().zDescription;
        postId = docSnap.data().post_Id;
        thumb = docSnap.data().thumb;
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("errpr in getPost from edit", error);
    }
  }
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="robots" content="noindex nofollow" />
  <html lang="en" />
</svelte:head>

<div class=" fixed   bottom-0 right-0 z-20 ">
  {#if showbtn == false}
    <div
      class="rounded-full flex bg-rose-600 p-2 mr-8 mb-12 items-center justify-center "
    >
      <span class="text-xs text-white">Loading</span>
      <div class="ml-1 loader" />
    </div>
  {:else}
    <button
      on:click={() => {
        ClickCount.update(() => $ClickCount + 1);
        console.log("click count", $ClickCount);
        history.back();
      }}
      class="rounded-full flex bg-rose-600 p-2 mr-8 mb-12 items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-arrow-back-up"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="#ffffff"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" />
      </svg>
      <span class="text-sm font-semibold text-white ml-1 ">Back</span>
    </button>
  {/if}
</div>

<div class="container w-full lg:px-10 px-5 py-5 lg:py-5 mx-auto">
  <!-- <script
    data-cfasync="false"
    type="text/javascript"
    src="//p450758.clksite.com/adServe/banners?tid=450758_885234_1"
  ></script> -->
  <div class="flex mt-9 mb-5">
    <h1
      class="text-gray-900  w-full lg:text-4xl md:text-4xl text-3xl   font-bold uppercase "
    >
      {title}
    </h1>
  </div>
  <div class=" w-full">
    <img
      src={thumb}
      class="object-scale-down object-center mx-auto mt-8 rounded-2xl "
      alt=""
    />

    <!-- <script
      data-cfasync="false"
      type="text/javascript"
      src="//p450758.clksite.com/adServe/banners?tid=450758_885234_0"
    ></script> -->

    <div class="text-gray-900 text-xl mt-14 ">{@html descriptionText}</div>
  </div>
</div>

<style>
  .loader {
    border: 2px solid #f3f3f3;
    border-radius: 50%;
    border-top: 2px solid #3498db;
    width: 20px;
    height: 20px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
  }

  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
