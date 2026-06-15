<script>
    // data = aktuelle Profildaten, form = evtl. Fehlermeldung.
    let { data, form } = $props();
</script>

<div class="max-w-lg mx-auto">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Edit Profile</h1>

    <!-- Fehlermeldung anzeigen, falls das Speichern fehlgeschlagen ist -->
    {#if form?.error}
        <p class="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-4 text-sm">
            {form.error}
        </p>
    {/if}

    <!-- Formular zum Bearbeiten: multipart/form-data wegen Datei-Upload -->
    <form action="?/save" method="POST" enctype="multipart/form-data"
        class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">

        <!-- Vorschau des aktuellen Avatars (nur wenn vorhanden) -->
        {#if data.user.avatar}
            <div class="flex items-center gap-4">
                <img src={data.user.avatar} alt="avatar"
                    class="w-16 h-16 rounded-full object-cover border border-gray-200" />
                <span class="text-sm text-gray-400">Current profile picture</span>
            </div>
        {/if}

        <!-- Auswahl eines neuen Profilbilds -->
        <div class="flex flex-col gap-1">
            <label for="avatar" class="text-sm font-semibold text-gray-700">Profile picture</label>
            <input type="file" id="avatar" name="avatar" accept="image/*"
                class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>

        <!-- Eingabefeld für die Bio (mit aktuellem Wert vorbefüllt) -->
        <div class="flex flex-col gap-1">
            <label for="bio" class="text-sm font-semibold text-gray-700">Bio</label>
            <textarea id="bio" name="bio" rows="3" placeholder="Tell something about yourself..."
                class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                value={data.user.bio || ''}></textarea>
        </div>

        <!-- Absende-Button -->
        <button type="submit"
            class="bg-indigo-600 text-white rounded-lg py-2 font-semibold hover:bg-indigo-700 transition cursor-pointer">
            Save Profile
        </button>

    </form>
</div>