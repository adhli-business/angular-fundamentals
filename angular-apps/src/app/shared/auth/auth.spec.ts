import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Auth } from './auth';
// src/test.ts (WAJIB DICEK!)
import 'zone.js'; // ✔
import 'zone.js/testing'; // ✔


describe('Auth Service', () => {
  let service: Auth;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Auth],
    });

    service = TestBed.inject(Auth);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear(); // Bersihkan localStorage di awal
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully and store token', async () => {
    const mockToken = 'abc123';

    const loginPromise = service.login('eve.holt@reqres.in', 'cityslicka');

    const req = httpMock.expectOne('https://reqres.in/api/login');
    expect(req.request.method).toBe('POST');
    req.flush({ token: mockToken });

    const result = await loginPromise;

    expect(result).toBeTrue();
    expect(localStorage.getItem('token')).toBe(mockToken);
  });

  it('should fail login and clear token', async () => {
    const loginPromise = service.login('wrong', 'wrongpass');

    const req = httpMock.expectOne('https://reqres.in/api/login');
    req.flush({ error: 'Invalid credentials' }, { status: 401, statusText: 'Unauthorized' });

    const result = await loginPromise;

    expect(result).toBeFalse();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('should return true if token exists in localStorage', () => {
    localStorage.setItem('token', 'abc123');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return false if no token', () => {
    localStorage.removeItem('token');
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should clear token on logout', () => {
    localStorage.setItem('token', 'abc123');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('should fail login if response has no token', async () => {
  const loginPromise = service.login('test@example.com', 'password');

  const req = httpMock.expectOne('https://reqres.in/api/login');
  req.flush({}); // <== tidak mengandung token

  const result = await loginPromise;

  expect(result).toBeFalse();
  expect(localStorage.getItem('token')).toBeNull();
});

});
