<script>
  import { page } from "$app/stores";
  import { db, Auth } from "../../../firebase";
  import { doc, getDoc } from "firebase/firestore";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  // import Vignette from "$lib/vignette.svelte";
  // import InpagePush from "$lib/inpagepush.svelte";

  let title = "";
  let postId = "";
  let descriptionText = "";
  $: thumb = [];

  $: docID = $page.params.slug;

  async function getPost() {
    try {
      const docRef = doc(db, "BLOGS", "CNMEDIA", "POSTS", docID);
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

  onMount(() => {
    getPost();
  });
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="robots" content="noindex nofollow" />
  <html lang="en" />
  <!-- <Vignette />
  <InpagePush /> -->
</svelte:head>

<div class=" fixed   bottom-0 right-0 z-20 ">
  <button
    on:click={() => {
      history.back();
    }}
    class="rounded-full bg-rose-600 p-2 mr-4 mb-4"
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
  </button>
</div>

<div class="container w-full lg:px-10 px-5 py-5 lg:py-5 mx-auto">
  <script
    data-cfasync="false"
    type="text/javascript"
    src="//p450758.clksite.com/adServe/banners?tid=450758_885234_1"
  ></script>
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

    <script
      data-cfasync="false"
      type="text/javascript"
      src="//p450758.clksite.com/adServe/banners?tid=450758_885234_0"
    ></script>

    <div class="text-gray-900 text-xl mt-14 ">{@html descriptionText}</div>
  </div>
</div>
