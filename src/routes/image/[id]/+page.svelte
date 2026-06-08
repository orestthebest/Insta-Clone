<script>
   let { data, form } = $props();
</script>

<div class="max-w-2xl mx-auto">


    <img src={data.image.image} alt={data.image.description}
        class="w-full rounded-xl shadow-md object-cover max-h-[500px]" />

    <div class="mt-6">
        <p class="text-gray-700 text-lg">{data.image.description || 'No description'}</p>
        <div class="flex items-center justify-between mt-3">
            

            <form action="?/vote" method="POST" class="m-0">
                <button type="submit"
                    class="flex items-center gap-2 bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition cursor-pointer">
                    ▲ {data.image.votes} votes
                </button>
            </form>

        </div>
    </div>

    <hr class="my-8 border-gray-200" />


    <h2 class="text-xl font-bold text-gray-800 mb-4">Comments</h2>

    {#if data.comments.length === 0}
        <p class="text-gray-400 text-sm">No comments yet. Be the first!</p>
    {/if}

    <div class="flex flex-col gap-4 mb-8">
        {#each data.comments as comment (comment.id)}
            <div class="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
                <a href="/profile/{comment.user_id}" class="text-sm font-semibold text-indigo-600 mb-1 hover:underline">
    {comment.username}
</a>
                <p class="text-gray-700 text-sm">{comment.text}</p>
            </div>
        {/each}
    </div>

    {#if data.image}
        <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 class="text-md font-bold text-gray-700 mb-3">Add a comment</h3>

            {#if form?.error}
                <p class="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-3 text-sm">
                    {form.error}
                </p>
            {/if}

            <form action="?/comment" method="POST" class="flex flex-col gap-3">
                <textarea name="text" rows="3" placeholder="Write your comment..."
                    class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none">
                </textarea>
                <button type="submit"
                    class="self-end bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition cursor-pointer">
                    Post Comment
                </button>
            </form>
        </div>
    {/if}

</div>