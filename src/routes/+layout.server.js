// Passes the logged-in user to every page via data.user
export const load = async ({ locals }) => {
    return {
        user: locals.user
    };
};