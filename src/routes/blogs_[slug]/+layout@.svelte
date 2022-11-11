<script>
  import { Auth, db } from "../../firebase";
  import { onMount } from "svelte";
  import { IsLoggedin } from "../../authStore";
  import { AlreadyViewed, ClickCount, TotalClick } from "../../scroolStore";
  import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
  import { onAuthStateChanged } from "firebase/auth";
  import { page } from "$app/stores";
  import Footer from "$lib/footer.svelte";

  $: userID = "";
  $: siteList = [];

  let docID = $page.params.slug;
  // console.log("page", docID);

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
        getsiteViewdStatus(uid);
        IsLoggedin.update(() => true);
      } else {
        IsLoggedin.update(() => false);
      }
    });
  });

  $: if ($ClickCount == $TotalClick) {
    alert("Thank you for surfing this Website.");
    sendViewdStatus();
    AlreadyViewed.update(() => true);
  }

  async function getsiteViewdStatus(uid) {
    try {
      const docRef = doc(db, "USER", uid, "TODAYS_ADS_SITE", today);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        documentExist = true;
        siteList = docSnap.data().siteList;
        if (siteList.includes(docID)) {
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

  async function sendViewdStatus() {
    console.log("sendViewdStatus");
    siteList.push(docID);
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

<slot />

<div class=" fixed bottom-0  w-full z-20 shadow-md ">
  <Footer />
</div>
