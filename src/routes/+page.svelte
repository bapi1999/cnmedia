<script>
  import { db, Auth } from "../firebase";
  import {
    doc,
    getDoc,
    updateDoc,
    orderBy,
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
  import Stagered from "$lib/stageredView.svelte";

  let adSiteList = [];
  $: userId = "";

  let mediaPost = [];
  let electerpost = [];
  let foodpost = [];
  let gmaxposts = [];
  let hitlabpost = [];

  onMount(() => {
    const auth = Auth;

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        userId = uid;
      }
    });
    getsites();
    getCnmediaPosts();
    getElecterPosts();
    getfoodPosts();
    getGmaxPosts();
    gethitlabPosts();
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
      // console.log("adSiteList", adSiteList);
    } catch (error) {
      console.error(error);
    }
  }

  async function getCnmediaPosts() {
    try {
      let q = query(
        collection(db, "BLOGS", "CNMEDIA", "POSTS"),
        where("hidden", "==", false),
        orderBy("postAt", "desc"),
        limit(4)
      );

      const querySnapshot = await getDocs(q);
      let newPosts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      mediaPost = mediaPost.concat(newPosts);
    } catch (error) {
      console.log("error", error);
    }
  }
  async function getElecterPosts() {
    try {
      let q = query(
        collection(db, "BLOGS", "ELECTER", "POSTS"),
        where("hidden", "==", false),
        orderBy("postAt", "desc"),
        limit(4)
      );

      const querySnapshot = await getDocs(q);
      let newPosts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      electerpost = electerpost.concat(newPosts);
    } catch (error) {
      console.log("error", error);
    }
  }
  async function getfoodPosts() {
    try {
      let q = query(
        collection(db, "BLOGS", "FOODI", "POSTS"),
        where("hidden", "==", false),
        orderBy("postAt", "desc"),
        limit(4)
      );

      const querySnapshot = await getDocs(q);
      let newPosts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      foodpost = foodpost.concat(newPosts);
    } catch (error) {
      console.log("error", error);
    }
  }
  async function getGmaxPosts() {
    try {
      let q = query(
        collection(db, "BLOGS", "GMAX", "POSTS"),
        where("hidden", "==", false),
        orderBy("postAt", "desc"),
        limit(4)
      );

      const querySnapshot = await getDocs(q);
      let newPosts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      gmaxposts = gmaxposts.concat(newPosts);
    } catch (error) {
      console.log("error", error);
    }
  }
  async function gethitlabPosts() {
    try {
      let q = query(
        collection(db, "BLOGS", "HITLAB", "POSTS"),
        where("hidden", "==", false),
        orderBy("postAt", "desc"),
        limit(4)
      );

      const querySnapshot = await getDocs(q);
      let newPosts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      hitlabpost = hitlabpost.concat(newPosts);
    } catch (error) {
      console.log("error", error);
    }
  }
</script>

<div class="bg-blue-gray-200">
  <div class=" w-full py-6 bg-gray-200 mx-auto  ">
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
          class=" w-full lg:w-1/5 md:w-1/5 bg-white  px-4 py-2 m-2 rounded-md  justify-center border shadow-sm hover:shadow-xl  cursor-pointer "
        >
          <p class="fle textLine2 text-gray-900 text-base font-bold">
            {item.topic}
          </p>
        </div>
      {/each}
    </div>
  </div>
</div>

<Stagered posts={mediaPost} code={"CNMEDIA"} topic={"Entertainment"} />
<Stagered posts={electerpost} code={"ELECTER"} topic={"Electronics"} />
<Stagered posts={foodpost} code={"FOODI"} topic={"Foods"} />
<Stagered posts={gmaxposts} code={"GMAX"} topic={"Mobile Games"} />
<Stagered posts={hitlabpost} code={"HITLAB"} topic={"Facts"} />

<!-- <style>
  .textLine3 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    -webkit-box-orient: vertical;
  }
</style> -->
