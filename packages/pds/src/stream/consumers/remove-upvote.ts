import { sql } from 'kysely'
import Database from '../../db'
import { RemoveUpvote } from '../messages'
import { Consumer } from '../types'

export default class extends Consumer<RemoveUpvote> {
  async dispatch(ctx: { db: Database; message: RemoveUpvote }) {
    const { db, message } = ctx
    const userScenes = await db.getScenesForUser(message.user)
    if (userScenes.length === 0) return
    await db.db
      .updateTable('scene_votes_on_post')
      .set({ count: sql`count - 1` })
      .where('subject', '=', message.subject)
      .where('did', 'in', userScenes)
      .returning(['did', 'count'])
      .execute()
  }
}
