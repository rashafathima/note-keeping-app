import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public signupForm!: FormGroup;

  constructor(private supabaseService: SupabaseService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  public async signup(): Promise<void> {
    const { email, password } = this.signupForm.value;
    const user = await this.supabaseService.signUp(email, password);
    if (user) {
      alert('Check your inbox and confirm your email ID')
      this.router.navigate(['/login']);
    } else {
      alert('Unable to signup');
    }
  }
}
