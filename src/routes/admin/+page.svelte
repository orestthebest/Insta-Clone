<script>
    let { data } = $props();
</script>

<div>
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Admin Panel</h1>

    <!-- Users section -->
    <h2 class="text-xl font-bold text-gray-700 mb-4">All Users</h2>

    <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-10">
        <table class="w-full text-sm">
            <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                    <th class="text-left px-4 py-3 text-gray-600 font-semibold">ID</th>
                    <th class="text-left px-4 py-3 text-gray-600 font-semibold">Username</th>
                    <th class="text-left px-4 py-3 text-gray-600 font-semibold">Role</th>
                    <th class="text-left px-4 py-3 text-gray-600 font-semibold">Action</th>
                </tr>
            </thead>
            <tbody>
                {#each data.users as user (user.id)}
                    <tr class="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td class="px-4 py-3 text-gray-400">{user.id}</td>
                        <td class="px-4 py-3 font-medium text-gray-700">{user.username}</td>
                        <td class="px-4 py-3">
                            {#if user.is_admin}
                                <span class="bg-indigo-100 text-indigo-600 text-xs font-bold px-2 py-1 rounded-full">Admin</span>
                            {:else}
                                <span class="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">User</span>
                            {/if}
                        </td>
                        <td class="px-4 py-3">   
                            {#if user.id === data.currentUser.id}
                            <span class="text-xs text-gray-400 font-semibold">You</span>
                            {:else}
                                
                            <form action="?/deleteUser" method="POST" class="m-0">
                                <input type="hidden" name="userId" value={user.id} />
                                <button type="submit"
                                    class="text-xs text-red-500 hover:text-red-700 font-semibold cursor-pointer bg-transparent border-none transition">
                                    Delete
                                </button>
                            </form>
                            {/if}
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>

    <!-- Images section -->
    <h2 class="text-xl font-bold text-gray-700 mb-4">All Images</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {#each data.images as image (image.id)}
            <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

                <a href="/image/{image.id}">
                    <img src={image.image} alt={image.description}
                        class="w-full h-40 object-cover" />
                </a>

                <div class="p-3">
                    <p class="text-sm text-gray-700 truncate">{image.description || 'No description'}</p>
                    <div class="flex items-center justify-between mt-2">
                        <span class="text-xs text-gray-400">by {image.username}</span>
                        <span class="text-xs font-semibold text-indigo-600">▲ {image.votes}</span>
                    </div>
                    <form action="?/deleteImage" method="POST" class="mt-2 m-0">
                        <input type="hidden" name="imageId" value={image.id} />
                        <button type="submit"
                            class="w-full text-xs bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 font-semibold py-1.5 rounded-lg cursor-pointer border-none transition">
                            Delete Image
                        </button>
                    </form>
                </div>

            </div>
        {/each}
    </div>

</div>

<!-- Comments section -->
<h2 class="text-xl font-bold text-gray-700 mb-4 mt-10">All Comments</h2>

<div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
    <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
                <th class="text-left px-4 py-3 text-gray-600 font-semibold">User</th>
                <th class="text-left px-4 py-3 text-gray-600 font-semibold">Comment</th>
                <th class="text-left px-4 py-3 text-gray-600 font-semibold">Image</th>
                <th class="text-left px-4 py-3 text-gray-600 font-semibold">Action</th>
            </tr>
        </thead>
        <tbody>
            {#each data.comments as comment (comment.id)}
                <tr class="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td class="px-4 py-3 font-medium text-gray-700">{comment.username}</td>
                    <td class="px-4 py-3 text-gray-500 max-w-xs truncate">{comment.text}</td>
                    <td class="px-4 py-3">
                        <a href="/image/{comment.image_id}" class="text-indigo-500 hover:underline text-xs">
                            View image
                        </a>
                    </td>
                    <td class="px-4 py-3">
                        <form action="?/deleteComment" method="POST" class="m-0">
                            <input type="hidden" name="commentId" value={comment.id} />
                            <button type="submit"
                                class="text-xs text-red-500 hover:text-red-700 font-semibold cursor-pointer bg-transparent border-none transition">
                                Delete
                            </button>
                        </form>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>