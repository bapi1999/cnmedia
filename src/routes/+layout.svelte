<script>
  import "../app.css";
  import { Auth, db } from "../firebase";
  import { onMount } from "svelte";
  import { IsLoggedin, UserName } from "../authStore";
  import { AlreadyViewed, ClickCount, TotalClick } from "../scroolStore";
  import { doc, getDoc, collection, setDoc } from "firebase/firestore";
  import { onAuthStateChanged } from "firebase/auth";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import UserNavber from "$lib/nav.svelte";
  import Footer from "$lib/footer.svelte";
  import Vignette from "$lib/vignette.svelte";
  import InpagePush from "$lib/inpagepush.svelte";
  $: userName = "";
  $: pathname = $page.url.pathname;
  $: userID = "";
  $: siteList = [];

  const d = new Date();
  let date = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  let today = `${date}_${month}_${year}`;
  $: documentExist = false;

  onMount(() => {
    const auth = Auth;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        userID = uid;
        getUserData(uid);
        getsiteViewdStatus(uid);
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

  $: if ($ClickCount == $TotalClick) {
    alert("Thank you for surfing the Cn-Media.");
    sendCnMediaViewdStatus();
    AlreadyViewed.update(() => true);
  }

  async function getsiteViewdStatus(uid) {
    try {
      const docRef = doc(db, "USER", uid, "TODAYS_ADS_SITE", today);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        documentExist = true;
        siteList = docSnap.data().siteList;
        if (siteList.includes("CNMEDIA")) {
          AlreadyViewed.update(() => true);
        }
      } else {
        // No address available
        console.info("No document available");
        documentExist = false;
      }
    } catch (error) {
      // console.error(error);
    }
  }

  async function sendCnMediaViewdStatus() {
    // console.log("sendCnMediaViewdStatus");
    siteList = [...siteList, "CNMEDIA"];
    try {
      if (documentExist == false) {
        await setDoc(doc(db, "USER", userID, "TODAYS_ADS_SITE", today), {
          siteList: siteList,
          ponitsGiven: false,
          qotaCompleted: false,
          base: 79089,
        });
      } else {
        await updateDoc(doc(db, "USER", userID, "TODAYS_ADS_SITE", today), {
          siteList: siteList,
          base: 72056,
        });
      }
    } catch (error) {
      console.error("An error occurred while creating a new user", error);
    }
  }
</script>

<svelte:head>
  <title>CnMedia - get leatest update on Bollywood and HollyWood</title>
  <meta name="robots" content="noindex nofollow" />
  <html lang="en" />
  <Vignette />
  <InpagePush />
</svelte:head>

<div class="top-0 w-full sticky z-20 shadow-xl">
  <UserNavber {userName} {pathname} />
</div>

<slot />

<div class="shadow-md border-t-2 border-gray-500">
  <Footer />
</div>
