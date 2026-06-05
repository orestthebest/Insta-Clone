<script>
    let { data } = $props();
</script>

{#if !data.user}
    <!-- Landing section for non logged in users -->
    <div class="flex flex-col items-center justify-center text-center py-24 px-4">

        <h1 class="text-5xl font-bold text-gray-800 mb-4">Welcome to PixShare</h1>
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
<h2 class="text-2xl font-bold text-gray-800 mb-6">Best Photos</h2>

{#if data.images.length === 0}
    <p class="text-gray-400">No images uploaded yet. Be the first!</p>
{/if}

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {#each data.images as image (image.id)}
        <a href="/image/{image.id}"
            class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-1 transition block">

            <img src={image.image} alt={image.description}
                class="w-full h-52 object-cover" />

            <div class="p-4">
                <p class="text-sm text-gray-700 font-medium truncate">
                    {image.description || 'No description'}
                </p>
                <div class="flex items-center justify-between mt-3">
                    <span class="text-xs text-gray-400">by {image.username}</span>
                    <span class="flex items-center gap-1 text-sm font-semibold text-indigo-600">
                        ▲ {image.votes}
                    </span>
                </div>
            </div>

        </a>
    {/each}
</div>
