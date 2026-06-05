import pool from '$lib/server/database.js';

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