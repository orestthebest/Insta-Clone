import { redirect, fail } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import pool from '$lib/server/database.js';

export async function load({ locals }) {

    if (!locals.user) redirect(303, '/login');
    return {};
}

export const actions = {
    upload: async ({ request, locals }) => {

        if (!locals.user) redirect(303, '/login');

        const form = await request.formData();
        const imageFile = form.get('image');
        const description = form.get('description');

        if (!imageFile || imageFile.size === 0) {
            return fail(400, { error: 'Please select an image' });
        }

        const blob = await put(imageFile.name, imageFile, {
            access: 'public',
            token: BLOB_READ_WRITE_TOKEN
        });

        await pool.execute(
            'INSERT INTO images (image, title, description, author_id) VALUES (?, ?, ?, ?)',
            [blob.url, title, description, locals.user.id]
        );

        redirect(303, '/');
    }
};