import pool from '$lib/server/database.js';
import { redirect } from '@sveltejs/kit';
import { del } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

// Lädt alle Daten fürs Admin-Panel – nur für Admins zugänglich.
export async function load({ locals }) {

    if (!locals.user) redirect(303, '/login');

    // Prüfen, ob der eingeloggte User ein Admin ist.
    const [adminCheck] = await pool.execute(
        'SELECT is_admin FROM users WHERE id = ?',
        [locals.user.id]
    );

    // Kein Admin -> zurück zur Startseite.
    if (!adminCheck[0].is_admin) redirect(303, '/');

    // Alle Bilder mit Autor laden.
    const [images] = await pool.execute(`
        SELECT images.id, images.image, images.description, images.votes, users.username
        FROM images
        JOIN users ON images.author_id = users.id
        ORDER BY images.id DESC
    `);

    // Alle User laden.
    const [users] = await pool.execute(
        'SELECT id, username, is_admin FROM users ORDER BY id ASC'
    );

    // Alle Kommentare mit Autor laden.
    const [comments] = await pool.execute(`
        SELECT comments.id, comments.text, comments.image_id, users.username, users.id as user_id
        FROM comments
        JOIN users ON comments.user_id = users.id
        ORDER BY comments.id DESC
    `);

    return { images, users, comments, currentUser: locals.user };
}

export const actions = {

    // Löscht ein beliebiges Bild (Admin-Recht).
    deleteImage: async ({ request, locals }) => {
        if (!locals.user) redirect(303, '/login');

        const form = await request.formData();
        const imageId = form.get('imageId');

        // Bild aus der DB holen.
        const [rows] = await pool.execute(
            'SELECT * FROM images WHERE id = ?',
            [imageId]
        );

        if (rows.length === 0) return;

       // Bild-Datei aus dem Blob-Speicher löschen.
        await del(rows[0].image, { token: BLOB_READ_WRITE_TOKEN });

        // Eintrag aus der Datenbank löschen.
        await pool.execute('DELETE FROM images WHERE id = ?', [imageId]);

        redirect(303, '/admin');
    },

    // Löscht einen User (Admin-Recht).
    deleteUser: async ({ request, locals }) => {
        if (!locals.user) redirect(303, '/login');

        const form = await request.formData();
        const userId = form.get('userId');

        // Ein Admin kann sich selbst nicht löschen.
        if (Number(userId) === locals.user.id) redirect(303, '/admin');

        
        await pool.execute('DELETE FROM users WHERE id = ?', [userId]);

        redirect(303, '/admin');
    },

    // Löscht einen beliebigen Kommentar (Admin-Recht).
    deleteComment: async ({ request, locals }) => {


        if (!locals.user) redirect(303, '/login');

        const form = await request.formData();
        const commentId = form.get('commentId');

        // Kommentar aus der Datenbank löschen.
        await pool.execute('DELETE FROM comments WHERE id = ?', [commentId]);

        redirect(303, '/admin');
    }
};


