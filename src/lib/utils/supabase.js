
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Create a single supabase client for interacting with your database
export const supabase = createClient(process.env['SUPABASE_URL'], process.env['SUPABASE_TOKEN']);

// import { supabase } from "$lib/utils/supabase";


// supabase.from('view_league').select('*').eq('league_id', leagueID)
// supabase.from('view_league_rosters').select('*').eq('league_id', queryLeagueID)

// supabase.from('view_league_users').select('*').eq('league_id', currentLeagueID)

// supabase.from('view_league_winners_brackets').select('*').eq('league_id', leagueID)
// supabase.from('view_league_losers_brackets').select('*').eq('league_id', leagueID)

// supabase.from('view_league_matchups').select('*').eq('league_key', queryLeagueID)
//push(supabase.from('view_league_matchups').select('*').eq('league_key', leagueID)[i])

// supabase.from('view_draft').select('*').eq('draft_id', draftID)
// supabase.from('view_league_drafts').select('*')
// supabase.from('view_draft_picks').select('*').eq('draft_id', draftID)

// supabase.from('view_league_transactions').select('*').eq('league_id', singleLeagueID)
