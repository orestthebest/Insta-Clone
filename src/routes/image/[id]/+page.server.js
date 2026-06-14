import pool from '$lib/server/database.js';
import pool from '$lib/server/database.js';
import { redirect, fail } from '@sveltejs/kit';


export async function load({ params }) {
    const id = params.id;


    const [images] = await pool.execute(`
        SELECT images.id, images.image, images.title, images.description, images.votes, images.author_id, users.username, users.avatar
        FROM images
        JOIN users ON images.author_id = users.id
        WHERE images.id = ?
    `, [id]);

    if (images.length === 0) {
        return { status: 404 };
    }


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

    vote: async ({ params, locals }) => {

        if (!locals.user) redirect(303, '/login');

        const id = params.id;


        const [adminCheck] = await pool.execute(
        'SELECT is_admin FROM users WHERE id = ?',
        [locals.user.id]
        );

        const isAdmin = adminCheck[0].is_admin;

    if (!isAdmin) {
        const [existing] = await pool.execute(
        'SELECT * FROM image_votes WHERE user_id = ? AND image_id = ?',
        [locals.user.id, id]
        );

    
        if (existing.length > 0) {
        redirect(303, `/image/${id}`);
        }

   
        await pool.execute(
        'INSERT INTO image_votes (user_id, image_id) VALUES (?, ?)',
        [locals.user.id, id]
        );
    }

        await pool.execute(
            'UPDATE images SET votes = votes + 1 WHERE id = ?',
            [id]
        );

        redirect(303, `/image/${id}`);
    },




    comment: async ({ params, locals, request }) => {

        if (!locals.user) redirect(303, '/login');

        const id = params.id;
        const form = await request.formData();
        const text = form.get('text');

        
        if (!text || text.trim() === '') {
            return fail(400, { error: 'Comment cannot be empty' });
        }

       
        await pool.execute(
            'INSERT INTO comments (user_id, image_id, text) VALUES (?, ?, ?)',
            [locals.user.id, id, text]
        );

        redirect(303, `/image/${id}`);
    }
};


