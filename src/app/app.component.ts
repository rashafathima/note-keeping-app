import { Component } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'note-app';
  //testing connnection

  // public isConnected: boolean = false;

  // constructor(private supabaseService: SupabaseService) {
  //   this.checkConnection();
  // }

  // private checkConnection(): void {
  //   this.isConnected = this.supabaseService.supabase!=null;
  // }
}
