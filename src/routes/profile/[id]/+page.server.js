import pool from '$lib/server/database.js';
import { redirect } from '@sveltejs/kit';
import { del } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

// Lädt das Profil eines Users und alle seine hochgeladenen Bilder.
export async function load({ params, locals }) {
    const userId = params.id;

    // User-Daten holen.
    const [users] = await pool.execute(
        'SELECT id, username, bio, avatar FROM users WHERE id = ?',
        [userId]
    );

    // Falls es den User nicht gibt: 404 zurückgeben.
    if (users.length === 0) {
        return { status: 404 };
    }

    // Alle Bilder des Users laden, neueste zuerst.
    const [images] = await pool.execute(
        'SELECT * FROM images WHERE author_id = ? ORDER BY created_at DESC',
        [userId]
    );

    return {
        profile: users[0],
        images,
        user: locals.user
    };
}


export const actions = {

    // Löscht ein Bild – nur das eigene Bild darf gelöscht werden.
    delete: async ({ request, locals }) => {
    
        if (!locals.user) redirect(303, '/login');

        const form = await request.formData();
        const imageId = form.get('imageId');

       // Bild aus der DB holen
        const [rows] = await pool.execute(
            'SELECT * FROM images WHERE id = ?',
            [imageId]
        );

        // Falls das Bild nicht existiert: nichts tun.
        if (rows.length === 0) return;

        const image = rows[0];

       // Nur der Besitzer darf sein Bild löschen.
        if (image.author_id !== locals.user.id) return;

       // Bild-Datei aus dem Vercel-Blob-Speicher löschen.
        await del(image.image, { token: BLOB_READ_WRITE_TOKEN });

        // Eintrag aus der Datenbank löschen.
        await pool.execute('DELETE FROM images WHERE id = ?', [imageId]);

        redirect(303, `/profile/${locals.user.id}`);
    }
};






