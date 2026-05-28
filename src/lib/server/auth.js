import pool from './database.js';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';


export async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
}