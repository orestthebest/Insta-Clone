<script>
    // Globales Stylesheet einbinden.
    import './layout.css';
    import favicon from '$lib/assets/favicon.svg';

    // children = der Seiteninhalt, data.user = eingeloggter User (aus +layout.server.js).  
    let { children, data } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<!-- Grundgerüst: Header oben, Inhalt in der Mitte, Footer unten -->
<div class="min-h-screen flex flex-col" style="background-color: #f9f0f4">

    <!-- Kopfzeile mit Logo und Navigation, bleibt beim Scrollen oben kleben -->
    <header class="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div class="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" class="text-2xl font-black tracking-tight text-transparent bg-clip-text"
            style="background-image: linear-gradient(to right, #db2777, #9333ea)">
            OrestGram
            </a>

            <nav class="flex items-center gap-4 text-sm font-medium">
            <!-- Eingeloggt: Begrüßung, Upload, Profil und Logout -->
                {#if data.user}
                    <span class="text-gray-400">Hi, {data.user.username}</span>
                    <a href="/upload" class="bg-pink-600 text-white px-3 py-1.5 rounded-lg hover:bg-pink-700 transition text-sm font-semibold">Upload</a>
                    <a href="/profile/{data.user.id}" class="text-gray-600 hover:text-pink-600 transition">My Profile</a>
                    <form action="/logout?/logout" method="POST" class="m-0">
                        <button type="submit" class="text-gray-500 hover:text-red-500 transition cursor-pointer bg-transparent border-none">Logout</button>
                    </form>
                {:else}
                    <!-- Nicht eingeloggt: Login und Register -->
                    <a href="/login" class="text-gray-600 hover:text-pink-600 transition">Login</a>
                    <a href="/register" class="bg-pink-600 text-white px-3 py-1.5 rounded-lg hover:bg-pink-700 transition text-sm font-semibold">Register</a>
                {/if}
            </nav>
        </div>
    </header>

    <!-- Hauptbereich: hier wird der Inhalt der jeweiligen Seite eingefügt -->
    <main class="max-w-5xl mx-auto px-4 py-8 w-full flex-1">
        {@render children()}
    </main>

<!-- Fußzeile mit Kurzbeschreibung und Links -->
<footer class="bg-white border-t border-gray-100 mt-auto">
    <div class="max-w-4xl mx-auto px-4 py-8 flex flex-col sm:flex-row justify-between gap-8">
        
        <!-- Logo und kurzer Beschreibungstext -->
        <div class="max-w-xs">
            <span class="font-black text-xl text-transparent bg-clip-text"
                style="background-image: linear-gradient(to right, #db2777, #9333ea)">
                OrestGram
            </span>
            <p class="text-xs text-gray-400 mt-2">Capture your memories and share them with the world. Upload, discover, and vote for the photos you love most.</p>
        </div>

        <!-- Link-Spalten -->
        <div class="flex gap-12 text-sm">
            <div class="flex flex-col gap-2">
                <span class="font-bold text-gray-600 uppercase text-xs tracking-widest">Explore</span>
                <a href="/" class="text-gray-400 hover:text-pink-600 transition">Home</a>
                <a href="/upload" class="text-gray-400 hover:text-pink-600 transition">Upload</a>
                <a href="/admin" class="text-gray-400 hover:text-pink-600 transition">Admin</a>
            </div>
            <div class="flex flex-col gap-2">
                <span class="font-bold text-gray-600 uppercase text-xs tracking-widest">Account</span>
                <a href="/upload" class="text-gray-400 hover:text-pink-600 transition">Upload</a>
                <!-- Profil-Link nur anzeigen, wenn eingeloggt -->
                {#if data.user}
                    <a href="/profile/{data.user.id}" class="text-gray-400 hover:text-pink-600 transition">My Profile</a>
                {/if}
            </div>
        </div>

    </div>
    
    <!-- Copyright-Zeile -->
    <div class="border-t border-gray-100">
        <div class="max-w-4xl mx-auto px-4 py-4 text-xs text-gray-400">
            © 2026 OrestGram. All rights reserved.
        </div>
    </div>
</footer>

</div>