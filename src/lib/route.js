import { goto } from '$app/navigation'

export async function route(path, delay = 1000) {
	if (delay) await new Promise((r) => setTimeout(r, delay))
	await goto(path)
}
