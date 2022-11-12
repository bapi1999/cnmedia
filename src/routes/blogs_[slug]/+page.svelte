<script>
  import { onMount } from "svelte";
  import { db, Auth } from "../../firebase";
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
  import { IsLoggedin } from "../../authStore";
  import { PostList, LastVisible } from "../../scroolStore";
  import CnMedia from "$lib/assets/cnmedia.png";
  import { page } from "$app/stores";

  $: docID = $page.params.slug;

  let lastVisible = "";
  $: reachlast = false;

  let posts = [];

  onMount(() => {
    const auth = Auth;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        IsLoggedin.update(() => true);
      } else {
        IsLoggedin.update(() => false);
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
          collection(db, "BLOGS", docID, "POSTS"),
          where("hidden", "==", false),
          orderBy("postAt", "desc"),
          limit(21)
        );
      } else {
        q = query(
          collection(db, "BLOGS", docID, "POSTS"),
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
      // console.log(posts.length);

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

<div class="px-4 py-10 mx-auto  lg:w-4/5 md:px-24 lg:px-8 lg:py-20">
  <div class="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
    {#each posts as item}
      <div
        class="overflow-hidden transition-shadow duration-300 bg-white rounded-md mt-4"
      >
        <a
          href={`/blogs_${docID}/posts/${docID}_${item.id}`}
          aria-label="Article"
          ><img
            src={item.thumb}
            class="object-cover overflow-hidden w-full h-48 rounded-xl"
            alt=""
          />
          <div class="py-5">
            <p
              class="text-2xl font-bold text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
            >
              {item.title}
            </p>

            <a
              href="//whoursie.com/4/5520434"
              target="_blank"
              rel="noreferrer noopener"
              class="flex pt-3 "
            >
              <div class="">
                <img src={CnMedia} class="w-6 h-6" alt="" />
              </div>
              <div class="">
                <p class="mb-2 text-xs font-semibold text-gray-600">
                  {new Date(item.postAt).toDateString("en-US")}
                </p>
              </div>
            </a>
          </div>
        </a>
      </div>
    {/each}
  </div>
</div>

<div class="flex  mt-5 mb-14">
  {#if reachlast == false}
    <button
      on:click={() => {
        getPosts();
      }}
      type="button"
      class="ml-auto mr-8 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-xl text-sm px-8 py-2 text-center"
      >NEXT</button
    >
  {/if}
</div>
