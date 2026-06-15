import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';
import { hashPassword, createSession } from '$lib/server/auth.js';


// Legt einen neuen User an und loggt ihn direkt ein.
export const actions = {
    register: async ({ request, cookies }) => {
        const form = await request.formData();
        const username = form.get('username');
        const password = form.get('password');

        // Falls kein username oder password gegeben -> bitte alle Felder füllen!
        if (!username || !password) {
            return fail(400, { error: 'Please fill in all fields' });
        }


        let result;
        try {
            // Passwort wird gehasht gespeichert, niemals im Klartext.
            [result] = await pool.execute(
                'INSERT INTO users (username, password_hash) VALUES (?, ?)',
                [username, await hashPassword(password)]
            );
        } catch (err) {
            // Der Username ist in der DB UNIQUE -> doppelte Namen lösen diesen Fehler aus.
            if (err.code === 'ER_DUP_ENTRY') {
                return fail(400, { error: 'Username is already taken' });
            }
            throw err;
        }

        // Session-Cookie setzen (30 Tage gültig) und zur Startseite weiterleiten.
        const sessionId = await createSession(result.insertId);
        cookies.set('session', sessionId, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30
        });

        redirect(303, '/');
    }
};