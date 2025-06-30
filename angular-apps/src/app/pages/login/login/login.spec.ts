import { ComponentFixture, TestBed } from '@angular/core/testing';
import 'zone.js';  // <-- ini WAJIB
import 'zone.js/testing';


import { Login } from './login';
import { Auth } from '../../../shared/auth/auth';
import { Router } from '@angular/router';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let mockAuth: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockAuth = jasmine.createSpyObj('Auth', ['login']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [Login], // untuk standalone component
      providers: [
        { provide: Auth, useValue: mockAuth },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //form invalid
  it('should not submit if form is invalid', async () => {
    component.loginForm.setValue({ username: '', password: '' });
    await component.onSubmit();

    expect(component.errorMsg).toBe('Username dan password wajib diisi!');
    expect(mockAuth.login).not.toHaveBeenCalled();
  });

  //login gagal
  it('should show error message on failed login', async () => {
  mockAuth.login.and.returnValue(Promise.resolve(false));
  component.loginForm.setValue({ username: 'user', password: 'wrongpass' });

  await component.onSubmit();

  expect(component.errorMsg).toBe('Username atau password salah!');
  expect(mockRouter.navigate).not.toHaveBeenCalled();
});

  //login berhasil
  it('should navigate on successful login', async () => {
  mockAuth.login.and.returnValue(Promise.resolve(true));
  component.loginForm.setValue({ username: 'user', password: 'pass' });

  await component.onSubmit();

  expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
});

//Test Lifecycle & Form Reset Behavior

it('should reset errorMsg on form value change', () => {
  component.errorMsg = 'Some error';
  component.loginForm.get('username')?.setValue('newUser');
  expect(component.errorMsg).toBe('');
});

// username/password hanya spasi
it('should not submit if username or password is only whitespace', async () => {
  component.loginForm.setValue({ username: '   ', password: '   ' });

  await component.onSubmit();

  expect(component.errorMsg).toBe('Username dan password tidak boleh kosong!');
  expect(mockAuth.login).not.toHaveBeenCalled();
});



  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
