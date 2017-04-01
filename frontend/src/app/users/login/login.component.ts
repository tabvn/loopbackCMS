import {Component, OnInit} from '@angular/core';
import {User} from "../../../../../backend/src/app/shared/models/user.model";
import {UserService} from "../../../../../backend/src/app/shared/services/custom/user.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


    public errorMessage: string;
    user: User = new User();
    submitted: boolean = false;

    mainForm: FormGroup;

    formErrors = {
        'username': '',
        'password': '',

    };
    validationMessages = {
        'username': {
            'required': 'Username is required.',
        },
        'password': {
            'required': 'Password is required.',
        },
    };


    constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {


    }

    ngOnInit() {

        this.buildForm();
    }


    buildForm(): void {
        this.mainForm = this.fb.group({
            'username': [this.user.username, [
                Validators.required
            ]
            ],
            'password': [this.user.username, [
                Validators.required
            ]
            ]
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


        this.userService.login(this.user).subscribe(res => {
            this.router.navigate(['/']);
        }, err => {
            this.submitted = false;
            this.errorMessage = "An error login.";
        });


    }

}
