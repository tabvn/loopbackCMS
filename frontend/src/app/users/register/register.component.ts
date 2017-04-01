import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {User} from "../../../../../backend/src/app/shared/models/user.model";
import {UserService} from "../../../../../backend/src/app/shared/services/custom/user.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    errorMessage: string;
    successMessage: string;

    user: User = new User();
    passwordConfirm: string;
    submitted: boolean = false;

    mainForm: FormGroup;

    formErrors = {
        'email': '',
        'username': '',
        'password': '',
        'passwordConfirm': ''

    };
    validationMessages = {
        'email': {
            'required': 'Email is required.',
            'email': 'Email is wrong format.'
        },
        'username': {
            'required': 'Username is required.',
            'minlength': 'Username must be at least 3 characters long.',
            'maxlength': 'Username cannot be more than 24 characters long.'
        },
        'password': {
            'required': 'Password is required.',
            'minlength': 'Password must be at least 8 characters long.',
            'validateEqual': 'Password mismatch.'
        },
        'passwordConfirm': {
            'required': 'Password confirm is required.',
            'validateEqual': 'Password mismatch.'
        }
    };


    constructor(private fb: FormBuilder, private userService: UserService) {


    }

    ngOnInit() {

        this.buildForm();
    }


    buildForm(): void {
        this.mainForm = this.fb.group({
            'email': [this.user.email, [
                Validators.required,
                Validators.email,
            ]
            ],
            'username': [this.user.username, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(24)
            ]
            ],
            'password': [this.user.username, [
                Validators.required,
                Validators.minLength(8)
            ]
            ],
            'passwordConfirm': [this.passwordConfirm, [
                Validators.required,
            ]]
        });


        this.mainForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // (re)set validation messages now

    }

    onValueChanged(data?: any) {


        if (!this.mainForm) {
            return;
        }
        const form = this.mainForm;


        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }

    }


    onSubmit() {

        this.submitted = true;
        this.user = this.mainForm.value;

        this.userService.create(this.user).subscribe((response: any) => {
            this.errorMessage = null;
            this.successMessage = "Your account has been created. Check your mailbox if verify account is required.";
        }, err => {
            this.errorMessage = err.message;
            this.submitted = false;
        });

    }


}
