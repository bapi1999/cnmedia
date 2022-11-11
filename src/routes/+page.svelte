<script>
  import { db, Auth } from "../firebase";
  import {
    doc,
    getDoc,
    updateDoc,
    collection,
    getDocs,
    query,
    where,
    limit,
  } from "firebase/firestore";
  import { onAuthStateChanged } from "firebase/auth";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import {
    PostList,
    LastVisible,
    ClickCount,
    AlreadyViewed,
  } from "../scroolStore";

  let adSiteList = [];
  $: userId = "";

  onMount(() => {
    const auth = Auth;

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        userId = uid;
      }
    });
    getsites();
  });

  async function getsites() {
    try {
      let q = query(
        collection(db, "BLOGS"),
        where("visible", "==", true),
        limit(20)
      );

      const querySnapshot = await getDocs(q);
      adSiteList = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("adSiteList", adSiteList);
    } catch (error) {
      console.error(error);
    }
  }
</script>

<div class="bg-blue-gray-200">
  <div class="lg:w-4/5 md:w-4/5 w-full py-6 bg-gray-200 mx-auto  ">
    <h2 class="text-3xl text-center w-full font-semibold">Topics</h2>

    <div class="flex flex-wrap justify-center">
      {#each adSiteList as item}
        <div
          on:keydown={console.log("cc")}
          on:click={() => {
            ClickCount.update(() => 0);
            LastVisible.update(() => {});
            PostList.update(() => []);
            AlreadyViewed.update(() => false);
            goto(`/blogs_${item.id}`);
          }}
          class=" w-full lg:w-2/5 bg-white  px-4 py-2 m-2 rounded-md  justify-center border shadow-sm hover:shadow-xl  cursor-pointer "
        >
          <p class="fle textLine2 text-gray-900 text-base font-bold">
            {item.topic}
          </p>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
</style>
