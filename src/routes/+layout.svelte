<script>
  import "../app.css";
  import { Auth, db } from "../firebase";
  import { onMount } from "svelte";
  import { IsLoggedin, UserName } from "../authStore";
  import { doc, getDoc } from "firebase/firestore";
  import { onAuthStateChanged } from "firebase/auth";
  import { page } from "$app/stores";
  import UserNavber from "$lib/nav.svelte";
  import Vignette from "$lib/vignette.svelte";
  import InpagePush from "$lib/inpagepush.svelte";
  $: userName = "";
  $: pathname = $page.url.pathname;
  $: userID = "";

  onMount(() => {
    const auth = Auth;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        userID = uid;
        getUserData(uid);
        IsLoggedin.update(() => true);
      } else {
        IsLoggedin.update(() => false);
      }
    });
  });

  async function getUserData(uid) {
    try {
      const docRef = doc(db, "USER", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        userName = docSnap.data().name;
        UserName.update(() => userName);
      } else {
        // No address available
        console.info("No document available");
      }
    } catch (error) {
      // console.error(error);
    }
  }
</script>

<!-- <svelte:head>
  <Vignette />
  <InpagePush />
</svelte:head> -->

<div class="top-0 w-full sticky z-20 shadow-xl">
  <UserNavber {userName} {pathname} />
</div>

<slot />
