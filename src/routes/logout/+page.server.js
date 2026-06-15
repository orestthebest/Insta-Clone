import { redirect } from '@sveltejs/kit';
import { invalidateSession } from '$lib/server/auth.js';

export const actions = {
    // Loggt den User aus: löscht die Session in der DB und das Cookie.
    logout: async ({ cookies }) => {
         // Aktuelle Session-ID aus dem Cookie lesen.
        const sessionId = cookies.get('session');

        // Nur etwas tun, wenn überhaupt eine Session vorhanden ist.
        if (sessionId) {
            // Session in der Datenbank löschen, damit sie ungültig wird.
            await invalidateSession(sessionId);
            // Session-Cookie im Browser entfernen.
            cookies.delete('session', { path: '/' });
        }

        // Zurück zur Startseite leiten.
        redirect(303, '/');
    }
};