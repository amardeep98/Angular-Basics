import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f') signUpForm: NgForm;
  defaultOption = "teacher";
  answer = '';
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  isSubmitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signUpForm.setValue({              //takes all the controls
    //   userdata: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionanswer: 'Tommy',
    //   gender: 'female'
    // });
    this.signUpForm.form.patchValue({           //to override only certain controls
      userdata: {
        username: suggestedName
      }
    });
  }

  // onSubmit(form: HTMLFormElement){      //gives the whole element
  //   console.log(form);
  // }

  onSubmit(){
    console.log(this.signUpForm);
    this.isSubmitted = true;
    this.user.username = this.signUpForm.value.userdata.username;
    this.user.email = this.signUpForm.value.userdata.email;
    this.user.secretQuestion = this.signUpForm.value.secret;
    this.user.answer = this.signUpForm.value.questionanswer;
    this.user.gender = this.signUpForm.value.gender;

    this.signUpForm.reset();
  }
}
