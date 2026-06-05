<script>
    let { form } = $props();
</script>

<div class="max-w-lg mx-auto">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Upload Image</h1>

    {#if form?.error}
        <p class="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-4 text-sm">
            {form.error}
        </p>
    {/if}

    <form action="?/upload" method="POST" enctype="multipart/form-data"
        class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">

        <div class="flex flex-col gap-1">
            <label for="image" class="text-sm font-semibold text-gray-700">Image file</label>
            <input type="file" id="image" name="image" accept="image/*" required
                class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>

        <div class="flex flex-col gap-1">
            <label for="description" class="text-sm font-semibold text-gray-700">Description</label>
            <textarea id="description" name="description" rows="3" placeholder="What is this photo about?"
                class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none">
            </textarea>
        </div>

        <button type="submit"
            class="bg-indigo-600 text-white rounded-lg py-2 font-semibold hover:bg-indigo-700 transition cursor-pointer">
            Upload
        </button>

    </form>
</div>