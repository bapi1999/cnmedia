<script>
  import { db, Auth, RealDB } from "../../../firebase";
  import { ref, child, get } from "firebase/database";
  import { IsLoggedin } from "../../../authStore";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import google from "$lib/assets/google.svg";
  import cnmedia from "$lib/assets/cnmedia.png";
  import {
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
  } from "firebase/auth";
  import { doc, setDoc, getDocs, getDoc } from "firebase/firestore";

  let elders = [];
  let errorMessage = "";
  let loadingToggle = false;
  let referFrom = "";

  const provider = new GoogleAuthProvider();

  let tandC = "";
  let privacy = "";

  let directSignIn = true;

  onMount(() => {
    const auth = Auth;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        IsLoggedin.update(() => true);
        if (directSignIn == true) {
          goto("/");
        }
      } else {
        IsLoggedin.update(() => false);
        directSignIn = false;
      }
    });
    return true;
  });

  const dbRef = ref(RealDB);
  get(child(dbRef, "Policies/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        tandC = snapshot.val().terms_condition;
        privacy = snapshot.val().privecy_policy;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      // console.error(error);
    });

  function googleSignUp() {
    const auth = Auth;
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
        let dispalyName = user.displayName;
        let email = user.email;
        let userId = user.uid;

        getUserData(userId, email, dispalyName);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        // let em = error.message;
        errorMessage = error.message + ".<br/> " + "Try again";
        loadingToggle = false;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  async function getUserData(uid, userEmail, dispalyName) {
    try {
      const docRef = doc(db, "USER", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        errorMessage = "This Gmail is already in use";
        signOutUser();
      } else {
        // No document available
        addTask(uid, dispalyName, userEmail);
      }
    } catch (error) {
      errorMessage = "Error occurred while fetching user details";
      // console.error(error);
      loadingToggle = false;
    }
  }

  function signOutUser() {
    loadingToggle = false;

    const auth = Auth;
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  async function addTask(userId, dispalyName, email) {
    try {
      await setDoc(doc(db, "USER", userId), {
        name: dispalyName,
        email: email,
        Address: [],
        My_Cart: [],
        ELDERS: elders,
        created_At: Date.now(),
        SUBORDINATES: 0,
        referFrom: referFrom,
        direct_downline: 0,
        last_seen: Date.now(),
        base: 978053,
      });

      await setDoc(doc(db, "USER", userId, "USER_DETAILS", "MY_EARNING"), {
        CURRENT_BALANCE: 0,
        TOTAL_EARNING: 0,
        TOTAL_WITHDRAWAL: 0,
        base: 21368,
      });

      let message1 =
        "Thank you for joining  AFIBY. Unlock the opportunity of becoming successful and get freedom from the monetary problem. <br/> Your Gmail is your user id. Use your Gmail as a Referral-Gmail when you are trying to add a member.";

      await setDoc(doc(db, "USER", userId, "NOTIFICATION", "firstnoti"), {
        title: "Thank you for joining  AFIBY",
        message: message1,
        seen: false,
        time: Date.now(),
        image: "",
        promotion: false,
      });
      IsLoggedin.update(() => true);
      await give2toreferral();
      await gotoDashboard();
    } catch (error) {
      // console.error("An error occurred while creating a new user", error);
      errorMessage = "An error occurred while creating a new user";
      loadingToggle = false;
      signOutUser();
      IsLoggedin.update(() => false);
    }
  }

  async function gotoDashboard() {
    setTimeout(() => {
      goto("/");
    }, 2000);
  }
</script>

<svelte:head>
  <title>User signup: Create new account</title>
  <meta name="robots" content="noindex nofollow" />
  <html lang="en" />
</svelte:head>

<div class="w-full px-8 py-4 mx-auto lg:w-1/3 md:w-1/3 min-h-screen  ">
  <a href="/" class="flex justify-center">
    <img src={cnmedia} alt="" class="w-10 h-10 p-1" />
    <span class="ml-2 text-2xl font-bold tracking-wide text-gray-800 uppercase"
      >Cn Media</span
    >
  </a>

  <p class="text-xl text-gray-700 my-3 text-center">Create an Account!</p>

  {#if errorMessage}
    <div
      class="px-2  py-1 items-center my-5 text-red-700 text-center font-semibold text-sm mx-auto "
    >
      {@html errorMessage}
    </div>
  {/if}

  <form on:submit|preventDefault={googleSignUp}>
    <button
      type="submit"
      class="flex  w-full mt-5 items-center justify-center mx-auto   rounded-md shadow-md border-gray-200 border p-2 "
    >
      <img src={google} alt="" class="w-8 h-8 p-1  rounded-full" />
      <span class="ml-3 md:text-md text-gray-900 font-semibold text-lg"
        >Create an account</span
      >
    </button>
  </form>

  <div class="mt-4 flex items-center justify-between">
    <span class="border-b w-1/6 md:w-1/5" />
    <a href="/register/userLogin" class="text-xs flex  p-1 rounded-md ">
      <span>Already have an account? </span>
      <span class="flex text-blue-accent-700 uppercase font-bold ml-2">
        Login</span
      ></a
    ><span class="border-b w-1/6 md:w-1/5" />
  </div>

  <!-- <div class="flex border-2 border-red-600">s</div> -->

  {#if loadingToggle == true}
    <div class=" mx-auto mt-8 loader" />
  {/if}
</div>

<style>
  .loader {
    border: 5px solid #f3f3f3;
    border-radius: 50%;
    border-top: 5px solid #3498db;
    width: 50px;
    height: 50px;
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
