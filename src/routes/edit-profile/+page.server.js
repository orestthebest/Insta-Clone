import pool from '$lib/server/database.js';
import { redirect, fail } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export async function load({ locals }) {
   
    if (!locals.user) redirect(303, '/login');

  
    const [rows] = await pool.execute(
        'SELECT id, username, bio, avatar FROM users WHERE id = ?',
        [locals.user.id]
    );

    return { user: rows[0] };
}

export const actions = {
    save: async ({ request, locals }) => {
        if (!locals.user) redirect(303, '/login');

        const form = await request.formData();
        const bio = form.get('bio');
        const avatarFile = form.get('avatar');


        if (avatarFile && avatarFile.size > 0) {
            const blob = await put(avatarFile.name, avatarFile, {
                access: 'public',
                token: BLOB_READ_WRITE_TOKEN,
                addRandomSuffix: true
            });


            await pool.execute(
                'UPDATE users SET bio = ?, avatar = ? WHERE id = ?',
                [bio, blob.url, locals.user.id]
            );
        } else {
         
            await pool.execute(
                'UPDATE users SET bio = ? WHERE id = ?',
                [bio, locals.user.id]
            );
        }

        redirect(303, `/profile/${locals.user.id}`);
    }
};