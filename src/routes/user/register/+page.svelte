<script>
  import { db, Auth } from "../../../firebase";
  import { IsLoggedin } from "../../../authStore";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import google from "$lib/assets/google.svg";
  import cnmedia from "$lib/assets/cnmedia.png";
  import {
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
  } from "firebase/auth";
  import { doc, setDoc, getDoc } from "firebase/firestore";

  let modname = "";
  let errorMessage = "";
  let loadingToggle = false;
  //1st time run onAuthStateChanged
  let directSignIn = true;

  const provider = new GoogleAuthProvider();

  onMount(() => {
    const auth = Auth;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        if (directSignIn == true) {
          getUserData(uid);
        }

        IsLoggedin.update(() => true);
      } else {
        IsLoggedin.update(() => false);
        directSignIn = false;
      }
    });
    return true;
  });

  async function getUserData(userId) {
    try {
      const docRef = doc(db, "USER", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // goto("/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  function googleSignUp() {
    const auth = Auth;
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
        let dispalyName = user.displayName;
        modname = dispalyName;
        let email = user.email;
        let userId = user.uid;

        getSignupUserData(userId, email, dispalyName);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        // errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  async function getSignupUserData(uid, userEmail, dispalyName) {
    try {
      const docRef = doc(db, "USER", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        goto("/");
      } else {
        // addTask(uid, dispalyName, userEmail);
        errorMessage = " No User available";
      }
    } catch (error) {
      errorMessage = "Error occurred while fetching user details";
    }
  }

  //LOGIN FUNCTION ======================================================
</script>

<svelte:head>
  <title>User signup</title>
  <meta name="robots" content="noindex nofollow" />
  <html lang="en" />
</svelte:head>'

<div class="w-full p-8 mx-auto lg:w-1/3 md:w-1/3 min-h-screen">
  <a href="/" class="flex justify-center">
    <img src={cnmedia} alt="" class="w-10 h-10 p-1" />
    <span class="ml-2 text-2xl font-bold tracking-wide text-gray-800 "
      >CN Media</span
    >
  </a>

  <p class="text-xl my-3 text-gray-600 text-center">Already have an account!</p>

  <div class=" mb-4">
    <div class=" items-center justify-cente ">
      <button
        on:click={googleSignUp}
        class="flex w-full items-center justify-center mx-auto flex-wrap mt-6 rounded-md shadow-md border-gray-200 border p-2 "
      >
        <img src={google} alt="" class="w-8 h-8 p-1  rounded-full" />
        <span class="ml-3 md:text-md text-gray-900 font-semibold text-lg"
          >Login with Google</span
        >
      </button>
    </div>
  </div>

  {#if errorMessage}
    <div
      class="justify-center items-center my-5 text-red-700 text-center font-semibold text-sm mx-auto "
    >
      {@html errorMessage}
    </div>
  {/if}

  <div class="mt-4 flex items-center justify-between">
    <span class="border-b w-1/5 md:w-1/4" />
    <a href="/register/userSignup_0" class="text-xs flex  p-1 rounded-md ">
      <span> New user? </span>
      <span class="flex text-blue-accent-700 uppercase font-bold ml-2">
        Sign Up</span
      ></a
    ><span class="border-b w-1/5 md:w-1/4" />
  </div>

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
