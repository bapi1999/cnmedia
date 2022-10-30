<script>
  import { page } from "$app/stores";
  import { db, Auth } from "../../../firebase";
  import { doc, getDoc } from "firebase/firestore";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

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
</svelte:head>

<div class="container w-4/5 px-5 py-5 lg:py-5 mx-auto">
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

    <div class="text-gray-900 text-xl mt-14 ">{@html descriptionText}</div>
  </div>
</div>
