// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Database } from './schema.ts'

console.log('Hello from `added-to-waiting-list` function!')

type WaitingList = Database['public']['Tables']['waiting_list']['Row']

interface WebhookPayload {
	type: 'INSERT' | 'UPDATE' | 'DELETE'
	table: string
	record: WaitingList
	schema: 'public'
	old_record: null | WaitingList
}

serve(async (req: Request) => {
	const payload: WebhookPayload = await req.json()
	console.log(payload.record.full_name)

	return new Response('ok')
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
