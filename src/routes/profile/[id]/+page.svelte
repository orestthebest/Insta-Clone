<script>
    let { data } = $props();
</script>

<div>


    <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8 flex items-center gap-4">
        <div class="bg-indigo-100 text-indigo-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
            {data.profile.username[0].toUpperCase()}
        </div>
        <div>
            <h1 class="text-2xl font-bold text-gray-800">{data.profile.username}</h1>
            <p class="text-gray-400 text-sm mt-1">{data.images.length} image{data.images.length === 1 ? '' : 's'} uploaded</p>
        </div>
    </div>

    {#if data.images.length === 0}
        <p class="text-gray-400">No images uploaded yet.</p>
    {/if}

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {#each data.images as image (image.id)}
            <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-1 transition">

                <a href="/image/{image.id}">
                    <img src={image.image} alt={image.description}
                        class="w-full h-52 object-cover" />
                </a>

                <div class="p-4">
                    <p class="text-sm text-gray-700 font-medium truncate">
                        {image.description || 'No description'}
                    </p>
                    <div class="flex items-center justify-between mt-3">
                        <span class="text-sm font-semibold text-indigo-600">▲ {image.votes}</span>


                        {#if data.user && data.user.id === data.profile.id}
                            <form action="?/delete" method="POST" class="m-0">
                                <input type="hidden" name="imageId" value={image.id} />
                                <button type="submit"
                                    class="text-xs text-red-500 hover:text-red-700 font-semibold transition cursor-pointer bg-transparent border-none">
                                    Delete
                                </button>
                            </form>
                        {/if}

                    </div>
                </div>

            </div>
        {/each}
    </div>

</div>