<script>
  import { onMount } from "svelte";
  import { db, Auth } from "../firebase";
  import {
    collection,
    getDocs,
    query,
    where,
    startAfter,
    orderBy,
    limit,
  } from "firebase/firestore";
  import { onAuthStateChanged } from "firebase/auth";
  import { IsLoggedin } from "../authStore";
  import { PostList, LastVisible, ClickCount } from "../scroolStore";
  import CnMedia from "$lib/assets/cnmedia.png";

  import Vignette from "$lib/vignette.svelte";
  import InpagePush from "$lib/inpagepush.svelte";

  let lastVisible = "";
  $: reachlast = false;

  let posts = [];

  onMount(() => {
    // console.log("on mount called");

    const auth = Auth;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        IsLoggedin.update(() => true);
      } else {
        // console.log("no user from user_layout");
        IsLoggedin.update(() => false);

        // goto("/register/userSignup_0");
      }
    });

    if ($PostList.length == 0) {
      getPosts();
    } else {
      posts = [];
      lastVisible = $LastVisible;
      posts = $PostList;
    }
  });

  async function getPosts() {
    try {
      let q = "";
      if (lastVisible == "") {
        q = query(
          collection(db, "BLOGS", "CNMEDIA", "POSTS"),
          where("hidden", "==", false),
          orderBy("postAt", "desc"),
          limit(21)
        );
      } else {
        q = query(
          collection(db, "BLOGS", "CNMEDIA", "POSTS"),
          where("hidden", "==", false),
          orderBy("postAt", "desc"),
          startAfter(lastVisible),
          limit(21)
        );
      }

      const querySnapshot = await getDocs(q);
      let newPosts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      posts = posts.concat(newPosts);
      PostList.update(() => posts);
      console.log(posts.length);

      lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      LastVisible.update(() => lastVisible);
      // console.log("last", lastVisible);

      if (newPosts.length < 21) {
        reachlast = true;
      }
    } catch (error) {
      console.log("error", error);
      reachlast = true;
    }
  }
</script>

<!-- <svelte:head>
  <title>CnMedia - get leatest update on Bollywood and HollyWood</title>
  <meta name="robots" content="noindex nofollow" />
  <html lang="en" />
  <Vignette />
  <InpagePush />
</svelte:head> -->

<div
  id="mainCont"
  class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:w-4/5 md:px-24 lg:px-8 lg:py-20"
>
  <div class="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
    {#each posts as item}
      <div
        class="overflow-hidden transition-shadow duration-300 bg-white rounded-md mt-4"
      >
        <a
          on:click={() => {
            ClickCount.update(() => $ClickCount + 1);
          }}
          href={`/posts/${item.id}`}
          aria-label="Article"
          ><img
            src={item.thumb}
            class="object-cover overflow-hidden w-full h-48 rounded-xl"
            alt=""
          />
          <div class="py-5">
            <p
              class="text-2xl font-bold  mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
            >
              {item.title}
            </p>
            <!-- <p class="mb-4 h-24 overflow-hidden text-gray-700 textLine3">
              {@html item.zDescription}
            </p> -->
            <div class="flex space-x-4">
              <div class="">
                <img src={CnMedia} class="w-10 h-10" alt="" />
              </div>
              <div class="">
                <p class="mb-2 text-xs font-semibold text-gray-600">
                  {new Date(item.postAt).toDateString("en-US")}
                </p>
              </div>
            </div>
          </div>
        </a>
      </div>
    {/each}
  </div>
</div>

<div class="flex  mt-5 mb-14">
  {#if reachlast == false}
    <button
      on:click={getPosts}
      type="button"
      class="ml-auto mr-8 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-xl text-sm px-8 py-2 text-center"
      >NEXT</button
    >
  {/if}
</div>

<style>
  .textLine3 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    -webkit-box-orient: vertical;
  }
</style>
