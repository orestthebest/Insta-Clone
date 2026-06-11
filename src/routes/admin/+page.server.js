import pool from '$lib/server/database.js';
import { redirect } from '@sveltejs/kit';
import { del } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export async function load({ locals }) {

    if (!locals.user) redirect(303, '/login');

 
    const [adminCheck] = await pool.execute(
        'SELECT is_admin FROM users WHERE id = ?',
        [locals.user.id]
    );

    if (!adminCheck[0].is_admin) redirect(303, '/');

  
    const [images] = await pool.execute(`
        SELECT images.id, images.image, images.description, images.votes, users.username
        FROM images
        JOIN users ON images.author_id = users.id
        ORDER BY images.id DESC
    `);

    const [users] = await pool.execute(
        'SELECT id, username, is_admin FROM users ORDER BY id ASC'
    );


    const [comments] = await pool.execute(`
        SELECT comments.id, comments.text, comments.image_id, users.username, users.id as user_id
        FROM comments
        JOIN users ON comments.user_id = users.id
        ORDER BY comments.id DESC
    `);

    return { images, users, comments, currentUser: locals.user };
}

export const actions = {

    deleteImage: async ({ request, locals }) => {
        if (!locals.user) redirect(303, '/login');

        const form = await request.formData();
        const imageId = form.get('imageId');

 
        const [rows] = await pool.execute(
            'SELECT * FROM images WHERE id = ?',
            [imageId]
        );

        if (rows.length === 0) return;

       
        await del(rows[0].image, { token: BLOB_READ_WRITE_TOKEN });

        
        await pool.execute('DELETE FROM images WHERE id = ?', [imageId]);

        redirect(303, '/admin');
    },

 
    deleteUser: async ({ request, locals }) => {
        if (!locals.user) redirect(303, '/login');

        const form = await request.formData();
        const userId = form.get('userId');

      
        if (Number(userId) === locals.user.id) redirect(303, '/admin');

        
        await pool.execute('DELETE FROM users WHERE id = ?', [userId]);

        redirect(303, '/admin');
    },


    deleteComment: async ({ request, locals }) => {


        if (!locals.user) redirect(303, '/login');

        const form = await request.formData();
        const commentId = form.get('commentId');

        // Delete comment from database
        await pool.execute('DELETE FROM comments WHERE id = ?', [commentId]);

        redirect(303, '/admin');
    }
};


