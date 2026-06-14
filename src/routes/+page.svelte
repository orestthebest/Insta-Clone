<script>
    let { data } = $props();
</script>

{#if !data.user}
    <!-- Landing section for non logged in users -->
    <div class="flex flex-col items-center justify-center text-center py-24 px-4">

        <h1 class="text-5xl font-black mb-4 text-transparent bg-clip-text"
        style="background-image: linear-gradient(to right, #db2777, #9333ea)">
        Welcome to OrestGram
        </h1>
        <p class="text-gray-400 text-lg mb-8 max-w-md">
            Discover the best photos from our community. Login to upload, vote and comment.
        </p>

        <div class="flex gap-4">
            <a href="/login"
                class="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
                Login
            </a>
            <a href="/register"
                class="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">
                Register
            </a>
        </div>

    </div>

    <hr class="border-gray-200 mb-10" />
{/if}

<!-- Image grid — visible to everyone -->
<h2 class="text-2xl font-black mb-6 text-transparent bg-clip-text"
    style="background-image: linear-gradient(to right, #db2777, #9333ea)">
    Best Photos
</h2>

{#if data.images.length === 0}
    <p class="text-gray-400">No images uploaded yet. Be the first!</p>
{/if}

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
     {#each data.images as image, i (image.id)}

        <a href="/image/{image.id}"
            class="bg-white rounded-2xl border-2 shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-2 transition block
            {i === 0 ? 'border-yellow-400 shadow-yellow-100' : i === 1 ? 'border-gray-400 shadow-gray-300' : i === 2 ? 'border-orange-400 shadow-orange-100' : 'border-gray-200'}">

            <div class="relative">
                <img src={image.image} alt={image.description}
                    class="w-full h-52 object-cover" />

                {#if i === 0}
                    <span class="absolute top-2 left-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full">#1</span>
                {:else if i === 1}
                    <span class="absolute top-2 left-2 bg-gray-400 text-white text-xs font-bold px-2 py-1 rounded-full">#2</span>
                {:else if i === 2}
                    <span class="absolute top-2 left-2 bg-orange-400 text-white text-xs font-bold px-2 py-1 rounded-full">#3</span>
                {/if}
            </div>
            <div class="p-4">
                <p class="text-sm text-gray-700 font-medium truncate">{image.title || 'No title'}</p>
                    
                <div class="flex items-center justify-between mt-3">


                    <div class="flex items-center gap-2">
        <span class="text-xs text-gray-400">by</span>
        {#if image.avatar}
            <img src={image.avatar} alt="avatar"
            class="w-5 h-5 rounded-full object-cover" />
        {:else}
            <div class="w-5 h-5 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold">
            {image.username[0].toUpperCase()}
             </div>
            {/if}
                    <span class="text-xs text-gray-400">{image.username}</span>
        </div>

                    <span class="flex items-center gap-1 text-sm font-semibold text-indigo-600">
                        ▲ {image.votes}
                    </span>
                </div>
            </div>

        </a>
    {/each}
</div>
