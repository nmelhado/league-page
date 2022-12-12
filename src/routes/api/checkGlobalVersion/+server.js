import {version} from '$lib/version';
import { json } from '@sveltejs/kit';

export async function GET() {
    return json(version);
}
