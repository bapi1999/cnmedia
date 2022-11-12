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
  let firstRedirect = false;

  let showbtn = false;
  $: setTimeout(() => {
    showbtn = true;
  }, 4000);

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

  function open() {
    firstRedirect = true;
    window.open("//whoursie.com/4/5520434");
  }
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="robots" content="noindex nofollow" />
  <html lang="en" />
</svelte:head>

<div class=" fixed   bottom-0 right-0 z-20 ">
  {#if showbtn == false}
    <a
      href="//whoursie.com/4/5520434"
      target="_blank"
      rel="noreferrer noopener"
      class="rounded-full flex bg-rose-600 p-2 mr-8 mb-12 items-center justify-center "
    >
      <span class="text-xs text-white">Loading</span>
      <div class="ml-1 loader" />
    </a>
  {:else if firstRedirect == false && showbtn == true}
    <button
      on:click={() => {
        open();
      }}
      class="rounded-full flex bg-rose-600 px-3 py-2 mr-8 mb-12 items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-checks"
        width="20"
        height="20"
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
      </svg>
      <span class="text-sm font-semibold text-white ml-1 ">Done</span>
    </button>
  {:else if firstRedirect == true && showbtn == true}
    <button
      on:click={() => {
        ClickCount.update(() => $ClickCount + 1);
        console.log("click count", $ClickCount);
        history.back();
      }}
      class="rounded-full flex bg-rose-600 px-3 py-2 mr-8 mb-12 items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-checks"
        width="20"
        height="20"
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
      </svg>
      <span class="text-sm font-semibold text-white ml-1 ">Done</span>
    </button>
  {/if}
</div>

<div class="container w-full lg:px-10 px-5 py-5 lg:py-5 mx-auto">
  <a
    href="//whoursie.com/4/5520434"
    target="_blank"
    rel="noreferrer noopener"
    class="flex mt-9 mb-5"
  >
    <h1
      class="text-gray-900  w-full lg:text-4xl md:text-4xl text-3xl   font-bold uppercase "
    >
      {title}
    </h1>
  </a>
  <a
    href="//whoursie.com/4/5520434"
    target="_blank"
    rel="noreferrer noopener"
    class=" w-full"
  >
    <img
      src={thumb}
      class="object-scale-down object-center mx-auto mt-8 rounded-2xl "
      alt=""
    />

    <div class="text-gray-900 text-xl mt-14 ">{@html descriptionText}</div>
  </a>
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
