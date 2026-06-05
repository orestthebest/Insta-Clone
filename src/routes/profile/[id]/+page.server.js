import pool from '$lib/server/database.js';
import { redirect } from '@sveltejs/kit';
import { del } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export async function load({ params }) {
    const userId = params.id;

    const [users] = await pool.execute(
        'SELECT id, username FROM users WHERE id = ?',
        [userId]
    );

    if (users.length === 0) {
        return { status: 404 };
    }


    const [images] = await pool.execute(
        'SELECT * FROM images WHERE author_id = ? ORDER BY created_at DESC',
        [userId]
    );

    return {
        profile: users[0],
        images
    };
}


export const actions = {
    
    delete: async ({ request, locals }) => {
    
        if (!locals.user) redirect(303, '/login');

        const form = await request.formData();
        const imageId = form.get('imageId');

       
        const [rows] = await pool.execute(
            'SELECT * FROM images WHERE id = ?',
            [imageId]
        );

        if (rows.length === 0) return;

        const image = rows[0];

       
        if (image.author_id !== locals.user.id) return;

       
        await del(image.image, { token: BLOB_READ_WRITE_TOKEN });

        
        await pool.execute('DELETE FROM images WHERE id = ?', [imageId]);

        redirect(303, `/profile/${locals.user.id}`);
    }
};






