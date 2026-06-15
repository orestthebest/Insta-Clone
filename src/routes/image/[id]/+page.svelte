<script>
  // data = Bild + Kommentare + eingeloggter User, form = evtl. Kommentar-Fehler.
   let { data, form } = $props();
</script>

<div class="max-w-2xl mx-auto">

     <!-- Das große Bild -->
    <img src={data.image.image} alt={data.image.description}
        class="w-full rounded-xl shadow-md object-cover max-h-500px" />

    <div class="mt-6">
        <h1 class="text-2xl font-bold text-gray-800">{data.image.title || 'Untitled'}</h1>
        <p class="text-gray-700 text-lg">{data.image.description || 'No description'}</p>
        <div class="flex items-center justify-between mt-3">

        <!-- Autor des Bildes: Avatar oder erster Buchstabe des Namens -->
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
            <!-- Vote-Button: schickt POST an den vote-Action -->
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

    <!-- Hinweis, falls es noch keine Kommentare gibt -->
    {#if data.comments.length === 0}
        <p class="text-gray-400 text-sm">No comments yet. Be the first!</p>
    {/if}

    <!-- Liste aller Kommentare -->
    <div class="flex flex-col gap-4 mb-8">
        {#each data.comments as comment (comment.id)}

            <div class="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm flex gap-3 items-start">
                <!-- Avatar des Kommentar-Autors -->
                <a href="/profile/{comment.user_id}">
                
            {#if comment.avatar}
                <img src={comment.avatar} alt="avatar"
                class="w-8 h-8 rounded-full object-cover border border-gray-200 mt-0.5" />
            {:else}
                <!-- Wenn kein Avatar, dann ist man automatich ein Zeichen-Avatar zugeordnet -->
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
                <!-- Delete-Button nur beim eigenen Kommentar anzeigen -->
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

    <!-- Formular für einen neuen Kommentar -->
    {#if data.image}
        <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 class="text-md font-bold text-gray-700 mb-3">Add a comment</h3>

             <!-- Fehlermeldung, falls der Kommentar leer war -->
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