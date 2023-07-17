import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, Session, User, PostgrestResponse} from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseUrl = 'https://otfeeuvuuxisftxpgrko.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90ZmVldXZ1dXhpc2Z0eHBncmtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk0OTYxMjUsImV4cCI6MjAwNTA3MjEyNX0.qkC7g-1M6ZesWd4JNhYbGGTeReW1SlHQWH9iwKS4h9A';
  public supabase: SupabaseClient;
  // getSession: any;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  public async signIn(email: string, password: string): Promise<Session | null> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: email,
      password: password
    });
    if (error) {
      console.error('Error signing in:', error);
      return null;
    }
    return data.user?data.session : null;
  }

  public async signUp(email: string, password: string): Promise<User | null> {
    const { data, error } = await this.supabase.auth.signUp({
      email: email,
      password: password
    });
    // if (error) {
    //   console.error('Error signing up:', error);
    //   return null;
    // }
    return data.user;
  }


  public async createNote(note: { title: string; text: string; color: string }): Promise<void> {
    const session = await this.getSession();
    const userId = session?.user?.id;
    if (userId) {
      const data = await this.supabase
        .from('notes')
        .insert([{ ...note, user_id: userId }]);
      if (data.error) {
        console.log(data.error);
      }
    }
  }
  



  

public async getUserNotes(userId: string): Promise<{ title: string; text: string; color: string }[]> {
  const { data, error }: PostgrestResponse<{ title: string; text: string; color: string }> = await this.supabase
    .from('notes')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user notes:', error);
    return [];
  }

  return data ?? [];
}

  
public async getSession(): Promise<Session | null> {
  const { data, error } = await this.supabase.auth.getSession();
  return data.session ?? null;
}


public async deleteNote(note: { title: string; text: string; color: string }): Promise<void> {
  const session = await this.getSession();
  const userId = session?.user?.id;
  if (userId) {
    await this.supabase
      .from('notes')
      .delete()
      .eq('user_id', userId)
      .eq('title', note.title)
      .eq('text', note.text)
      .eq('color', note.color);
  }
}





public async updateNote(note: { title: string; text: string; color: string }): Promise<{ title: string; text: string; color: string } | null> {
  const session = await this.getSession();
  const userId = session?.user?.id;
  if (userId) {
    const { data, error } = await this.supabase
      .from('notes')
      .update({ title: note.title, text: note.text, color: note.color })
      .eq('user_id', userId);

    if (error) {
      console.error('Error updating note:', error);
      return null;
    }

    return data ? data[0] : null;
  }

  return null;
}







logOut(): void {
  this.supabase.auth.signOut();
}




  // Add a method to update the color of a note
  async updateNoteColor(noteId: string, color: string): Promise<void> {
    const { data, error } = await this.supabase
      .from('notes')
      .update({ color })
      .match({ id: noteId });
    if (error) {
      console.error('Error updating note color:', error.message);
    }
  }

  // Add a method to get the color of a note
  async getNoteColor(noteId: string): Promise<string | null> {
    const { data, error } = await this.supabase
      .from('notes')
      .select('color')
      .match({ id: noteId })
      .single();
    if (error) {
      console.error('Error getting note color:', error.message);
      return null;
    }
    return data?.color || null;
  }



}
