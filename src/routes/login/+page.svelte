<script>
    // form enthält eine Fehlermeldung vom Login-Action.
    let { form } = $props();
</script>

<div class="max-w-sm mx-auto mt-16">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Login</h1>

    <!-- Fehlermeldung anzeigen, falls der Login fehlgeschlagen ist -->
    {#if form?.error}
        <p class="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-4 text-sm">
            {form.error}
        </p>
    {/if}
    
    <!-- Login-Formular: schickt Username + Passwort an den login-Action -->
    <form action="?/login" method="POST"
        class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">

        <!-- Eingabefeld für den Username -->
        <div class="flex flex-col gap-1">
            <label for="username" class="text-sm font-semibold text-gray-700">Username</label>
            <input type="text" id="username" name="username" required
                class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>

        <!-- Eingabefeld für das Passwort -->
        <div class="flex flex-col gap-1">
            <label for="password" class="text-sm font-semibold text-gray-700">Password</label>
            <input type="password" id="password" name="password" required
                class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>

        <!-- Absende-Button -->
        <button type="submit"
            class="bg-indigo-600 text-white rounded-lg py-2 font-semibold hover:bg-indigo-700 transition cursor-pointer">
            Login
        </button>

        <!-- Link zur Registrierung für User ohne Account -->
        <p class="text-sm text-gray-500 text-center">
            No account? <a href="/register" class="text-indigo-600 hover:underline">Register here</a>
        </p>

    </form>
</div>