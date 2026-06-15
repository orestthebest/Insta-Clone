import { redirect, fail } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import pool from '$lib/server/database.js';

// Nur eingeloggte User dürfen die Upload-Seite sehen.
export async function load({ locals }) {

    if (!locals.user) redirect(303, '/login');
    return {};
}

export const actions = {

    // Lädt ein Bild hoch und speichert es in der Datenbank.
    upload: async ({ request, locals }) => {

        // Sicherheitscheck: ohne Login kein Upload.
        if (!locals.user) redirect(303, '/login');

        // Formulardaten auslesen.
        const form = await request.formData();
        const imageFile = form.get('image');
        const description = form.get('description');
        const title = form.get('title');

        // Prüfen, ob überhaupt eine Datei ausgewählt wurde.
        if (!imageFile || imageFile.size === 0) {
            return fail(400, { error: 'Please select an image' });
        }

        // Bild zu Vercel Blob hochladen, wir bekommen eine öffentliche URL zurück.
        const blob = await put(imageFile.name, imageFile, {
            access: 'public',
            token: BLOB_READ_WRITE_TOKEN
        });

        // Nur die URL wird in der DB gespeichert.
        await pool.execute(
            'INSERT INTO images (image, title, description, author_id) VALUES (?, ?, ?, ?)',
            [blob.url, title, description, locals.user.id]
        );

        redirect(303, '/');
    }
};