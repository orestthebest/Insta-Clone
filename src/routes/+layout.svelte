<script>
    import './layout.css';
    import favicon from '$lib/assets/favicon.svg';

    let { children, data } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen flex flex-col" style="background-color: #f9f0f4">

    <header class="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div class="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" class="text-2xl font-black tracking-tight text-transparent bg-clip-text"
    style="background-image: linear-gradient(to right, #db2777, #9333ea)">
    OrestGram
</a>
            <nav class="flex items-center gap-4 text-sm font-medium">
                {#if data.user}
                    <span class="text-gray-400">Hi, {data.user.username}</span>
                    <a href="/upload" class="bg-pink-600 text-white px-3 py-1.5 rounded-lg hover:bg-pink-700 transition text-sm font-semibold">Upload</a>
                    <a href="/profile/{data.user.id}" class="text-gray-600 hover:text-pink-600 transition">My Profile</a>
                    <form action="/logout?/logout" method="POST" class="m-0">
                        <button type="submit" class="text-gray-500 hover:text-red-500 transition cursor-pointer bg-transparent border-none">Logout</button>
                    </form>
                {:else}
                    <a href="/login" class="text-gray-600 hover:text-pink-600 transition">Login</a>
                    <a href="/register" class="bg-pink-600 text-white px-3 py-1.5 rounded-lg hover:bg-pink-700 transition text-sm font-semibold">Register</a>
                {/if}
            </nav>
        </div>
    </header>

    <main class="max-w-5xl mx-auto px-4 py-8 w-full flex-1">
        {@render children()}
    </main>

   <footer class="bg-white border-t border-gray-100 mt-auto">
    <div class="max-w-4xl mx-auto px-4 py-5 flex items-center justify-between text-xs text-gray-400">
        <span class="font-bold text-transparent bg-clip-text"
            style="background-image: linear-gradient(to right, #db2777, #9333ea)">
            OrestGram
        </span>
        <span>HTL Medientechnik © 2026</span>
    </div>
</footer>

</div>