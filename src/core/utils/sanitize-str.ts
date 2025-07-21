export function sanitizeStr(s: string) {
    const clean = !s || typeof s !== 'string' ? '' : s.trim().normalize();
    return clean;
};