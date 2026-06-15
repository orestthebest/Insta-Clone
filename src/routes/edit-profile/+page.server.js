import pool from '$lib/server/database.js';
import { redirect, fail } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

// Lädt die aktuellen Profildaten des eingeloggten Users in das Formular.
export async function load({ locals }) {
   
    if (!locals.user) redirect(303, '/login');

  
    const [rows] = await pool.execute(
        'SELECT id, username, bio, avatar FROM users WHERE id = ?',
        [locals.user.id]
    );

    return { user: rows[0] };
}

export const actions = {
    // Speichert die Änderungen am Profil (Bio und/oder neues Avatar-Bild).
    save: async ({ request, locals }) => {
        if (!locals.user) redirect(303, '/login');

        const form = await request.formData();
        const bio = form.get('bio');
        const avatarFile = form.get('avatar');

        // Wurde ein neues Avatar-Bild hochgeladen?
        if (avatarFile && avatarFile.size > 0) {
            // Neues Bild zu Vercel Blob hochladen (Zufalls-Suffix gegen Namens-Konflikte).
            const blob = await put(avatarFile.name, avatarFile, {
                access: 'public',
                token: BLOB_READ_WRITE_TOKEN,
                addRandomSuffix: true
            });

            // Bio und neue Avatar-URL speichern.
            await pool.execute(
                'UPDATE users SET bio = ?, avatar = ? WHERE id = ?',
                [bio, blob.url, locals.user.id]
            );
        } else {
            // Kein neues Bild: nur die Bio aktualisieren.
            await pool.execute(
                'UPDATE users SET bio = ? WHERE id = ?',
                [bio, locals.user.id]
            );
        }

        redirect(303, `/profile/${locals.user.id}`);
    }
};