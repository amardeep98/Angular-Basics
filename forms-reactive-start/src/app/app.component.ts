import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  signupForm: FormGroup;
  genders = ['male', 'female'];
  forbiddenUsernames = ['Anshu', 'Shivani'];

  ngOnInit(){
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),   //binding is done to inform angular 
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    // this.signupForm.valueChanges.subscribe(
    //   (value) => {
    //     console.log(value);              //logs each key stroke
    //   }
    // )

    this.signupForm.statusChanges.subscribe(
      (status) => {
        console.log(status);            //logs the status of the whole form
      }
    )

    this.signupForm.setValue({
      'userData':{
        'username': 'Anshu',
        'email': 'test@test.com'
      },
      'gender': 'female',
      'hobbies': []
    });

    this.signupForm.patchValue({
      'userData':{
        'username': 'Shivani'
      }
    });
  }

  onSubmit(){
    console.log(this.signupForm);
    this.signupForm.reset();           //can pass an object to reset the form to specific values
  }

  onAddHobies(){
    const control = new FormControl(null, Validators.required);
    const control1 = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);               //we need to typecast to FormArray
    (<FormArray>this.signupForm.get('hobbies')).push(control1);
  }

  getControls(){
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenUsernames.indexOf(control.value) != -1){
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'test@test.com'){
          resolve({emailForbidden: true});
        }
        else{
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
