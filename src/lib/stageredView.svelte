<script>
  import {
    PostList,
    LastVisible,
    ClickCount,
    AlreadyViewed,
  } from "../scroolStore";
  import { goto } from "$app/navigation";

  export let posts = [];
  export let code = "";
  export let topic = "";
</script>

<div class="lg:px-16 px-4 pt-10 ">
  <div class="flex justify-center">
    <h2
      class="lg:text-4xl text-3xl mr-auto  lg:px-10 text-center font-semibold mb-8"
    >
      {topic}
    </h2>
    <span
      on:keypress={() => {
        console.log("kk");
      }}
      on:click={() => {
        ClickCount.update(() => 0);
        LastVisible.update(() => {});
        PostList.update(() => []);
        AlreadyViewed.update(() => false);
        goto(`/blogs_${code}`);
      }}
    >
      <span
        class="px-3 py-1 bg-indigo-accent-700 rounded-full text-white lg:text-xl text-lg font-semibold"
        >View All</span
      >
    </span>
  </div>

  <div class="w-11/12  mx-auto ">
    {#each posts as item, i}
      {#if i == 0}
        <div
          on:keypress={() => {
            console.log("vv");
          }}
          on:click={() => {
            goto(`/blogs_${code}/posts/${code}_${item.id}`);
          }}
          class="mx-auto justify-center hidden lg:flex  "
        >
          <div class=" w-3/5 overflow-hidden h-[300px] rounded  ">
            <img
              src={item.thumb}
              class="object-cover overflow-hidden w-full  "
              alt=""
            />
          </div>
          <div class=" w-2/5 bottom-3 h-4/6 overflow-hidden lg:px-6 px-4 ">
            <p class="text-blue-gray-900 font-semibold text-2xl">
              {item.title}
            </p>

            <p
              class="textLine3 text-blue-gray-700 mt-6 font-semibold text-base"
            >
              {@html item.zDescription}
            </p>

            <p class="mb-2  mt-4 text-xs font-semibold text-gray-600">
              {new Date(item.postAt).toDateString("en-US")}
            </p>
          </div>
        </div>
      {/if}
    {/each}
  </div>
</div>

<div class="px-4 lg:px-16  mx-auto  lg:w-11/12  ">
  <div class="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
    {#each posts as item, i}
      {#if i == 0}
        <div
          class=" lg:hidden overflow-hidden transition-shadow duration-300 bg-white rounded-md mt-4"
        >
          <a
            href={`/blogs_${code}/posts/${code}_${item.id}`}
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

              <div class="flex space-x-4">
                <div class="">
                  <!-- <img src={CnMedia} class="w-6 h-6" alt="" /> -->
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
      {:else}
        <div
          class="overflow-hidden transition-shadow duration-300 bg-white rounded-md mt-4"
        >
          <a
            href={`/blogs_${code}/posts/${code}_${item.id}`}
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

              <div class="flex space-x-4">
                <div class="">
                  <!-- <img src={CnMedia} class="w-6 h-6" alt="" /> -->
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
      {/if}
    {/each}
  </div>
</div>
<div class=" mx-4 lg:mx-16 my-10 border-2 border-blue-gray-100" />

<style>
  .textLine3 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    -webkit-box-orient: vertical;
  }
</style>
