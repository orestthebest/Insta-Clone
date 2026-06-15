import pool from '$lib/server/database.js';
import { redirect, fail } from '@sveltejs/kit';

// Lädt ein einzelnes Bild samt Autor und allen Kommentaren.
export async function load({ params }) {
    const id = params.id;

    // Bild mit Autor-Infos holen.
    const [images] = await pool.execute(`
        SELECT images.id, images.image, images.title, images.description, images.votes, images.author_id, users.username, users.avatar
        FROM images
        JOIN users ON images.author_id = users.id
        WHERE images.id = ?
    `, [id]);

    // Falls es das Bild nicht gibt: 404 zurückgeben.
    if (images.length === 0) {
        return { status: 404 };
    }

    // Alle Kommentare zu diesem Bild laden, älteste zuerst.
    const [comments] = await pool.execute(`
        SELECT comments.id, comments.text, comments.created_at, users.username, users.id as user_id, users.avatar
        FROM comments
        JOIN users ON comments.user_id = users.id
        WHERE comments.image_id = ?
        ORDER BY comments.created_at ASC
    `, [id]);

    return {
        image: images[0],
        comments
    };
}

export const actions = {

    // Erhöht die Votes eines Bildes um 1.
    vote: async ({ params, locals }) => {

        if (!locals.user) redirect(303, '/login');

        const id = params.id;

        // Prüfen, ob der User ein Admin ist.
        const [adminCheck] = await pool.execute(
        'SELECT is_admin FROM users WHERE id = ?',
        [locals.user.id]
        );

        const isAdmin = adminCheck[0].is_admin;

    // Normale User dürfen pro Bild nur einmal voten, Admins beliebig oft (zum Testen).
    if (!isAdmin) {
        // Hat dieser User schon für das Bild gevotet?
        const [existing] = await pool.execute(
        'SELECT * FROM image_votes WHERE user_id = ? AND image_id = ?',
        [locals.user.id, id]
        );

        // Wenn ja: abbrechen und zurück zum Bild.
        if (existing.length > 0) {
        redirect(303, `/image/${id}`);
        }

        // Vote merken, damit der User nicht doppelt voten kann.
        await pool.execute(
        'INSERT INTO image_votes (user_id, image_id) VALUES (?, ?)',
        [locals.user.id, id]
        );
    }
        // Vote-Zähler am Bild erhöhen.
        await pool.execute(
            'UPDATE images SET votes = votes + 1 WHERE id = ?',
            [id]
        );

        redirect(303, `/image/${id}`);
    },

    // Speichert einen neuen Kommentar zum Bild.
    comment: async ({ params, locals, request }) => {

        if (!locals.user) redirect(303, '/login');

        const id = params.id;
        const form = await request.formData();
        const text = form.get('text');

        // Leere Kommentare nicht zulassen.
        if (!text || text.trim() === '') {
            return fail(400, { error: 'Comment cannot be empty' });
        }

       
        await pool.execute(
            'INSERT INTO comments (user_id, image_id, text) VALUES (?, ?, ?)',
            [locals.user.id, id, text]
        );

        redirect(303, `/image/${id}`);
    },

    // Löscht einen Kommentar – nur der eigene Kommentar darf gelöscht werden.
    deleteComment: async ({ request, locals }) => {
    if (!locals.user) redirect(303, '/login');

    const form = await request.formData();
    const commentId = form.get('commentId');
    const id = request.url.split('/image/')[1].split('/')[0];

    // Kommentar aus der DB holen.
    const [rows] = await pool.execute(
        'SELECT * FROM comments WHERE id = ?',
        [commentId]
    );

    // Falls der Kommentar nicht existiert: nichts tun.
    if (rows.length === 0) return;

    // Nur der Besitzer darf löschen.
    if (rows[0].user_id !== locals.user.id) return;

    await pool.execute('DELETE FROM comments WHERE id = ?', [commentId]);

    redirect(303, `/image/${rows[0].image_id}`);
    }
};


