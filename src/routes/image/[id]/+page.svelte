<script>
   let { data, form } = $props();
</script>

<div class="max-w-2xl mx-auto">


    <img src={data.image.image} alt={data.image.description}
        class="w-full rounded-xl shadow-md object-cover max-h-500px" />

    <div class="mt-6">
        <h1 class="text-2xl font-bold text-gray-800">{data.image.title || 'Untitled'}</h1>
        <p class="text-gray-700 text-lg">{data.image.description || 'No description'}</p>
        <div class="flex items-center justify-between mt-3">


            <div class="flex items-center gap-2">
            <span class="text-sm text-gray-400">by</span>
     {#if data.image.avatar}
        <img src={data.image.avatar} alt="avatar"
            class="w-6 h-6 rounded-full object-cover"/>
     {:else}
        <div class="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold">
            {data.image.username[0].toUpperCase()}
        </div>
     {/if}
        <a href="/profile/{data.image.author_id}" class="text-xs text-gray-400 hover:text-pink-600 transition">{data.image.username}</a>
        </div> 

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

            <div class="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm flex gap-3 items-start">
                <a href="/profile/{comment.user_id}">
            {#if comment.avatar}
                <img src={comment.avatar} alt="avatar"
                class="w-8 h-8 rounded-full object-cover border border-gray-200 mt-0.5" />
            {:else}
                <div class="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-sm font-bold mt-0.5">
                {comment.username[0].toUpperCase()}
            </div>
            {/if}
        </a>
        <div class="flex-1">
            <a href="/profile/{comment.user_id}" class="text-sm font-semibold text-pink-600 hover:underline">
            {comment.username}
            </a>
            <div class="flex items-center justify-between">
                <p class="text-gray-700 text-sm flex-1">{comment.text}</p>
                {#if data.user && data.user.id === comment.user_id}
        <form action="?/deleteComment" method="POST" class="m-0 shrink-0">
            <input type="hidden" name="commentId" value={comment.id} />
            <button type="submit"
                class="text-xs text-red-400 hover:text-red-600 font-semibold cursor-pointer bg-transparent border-none transition">
                Delete
            </button>
        </form>
             {/if}
        </div>
            </div>

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