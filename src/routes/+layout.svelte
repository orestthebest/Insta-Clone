<script>
    import './layout.css';
    import favicon from '$lib/assets/favicon.svg';

    let { children, data } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-gray-50 flex flex-col">

    <header class="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" class="text-xl font-bold text-indigo-600 hover:text-indigo-800">PixShare</a>
            <nav class="flex items-center gap-4 text-sm font-medium">
                {#if data.user}
                    <span class="text-gray-400">Hi, {data.user.username}</span>
                    <a href="/upload" class="bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition">Upload</a>
                    <a href="/profile/{data.user.id}" class="text-gray-600 hover:text-indigo-600 transition">My Profile</a>
                    <form action="/logout?/logout" method="POST" class="m-0">
                        <button type="submit" class="text-gray-500 hover:text-red-500 transition cursor-pointer bg-transparent border-none">Logout</button>
                    </form>
                {:else}
                    <a href="/login" class="text-gray-600 hover:text-indigo-600 transition">Login</a>
                    <a href="/register" class="bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition">Register</a>
                {/if}
            </nav>
        </div>
    </header>

    <main class="max-w-5xl mx-auto px-4 py-8 w-full flex-1">
        {@render children()}
    </main>

    <footer class="bg-white border-t border-gray-200 mt-auto">
        <div class="max-w-5xl mx-auto px-4 py-5 flex items-center justify-between text-sm text-gray-400">
            <span>2026 PixShare</span>
            <span>HTL Medientechnik</span>
        </div>
    </footer>

</div>