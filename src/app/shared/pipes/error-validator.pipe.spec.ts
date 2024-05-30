import { ErrorValidatorPipe } from './error-validator.pipe';

describe('ErrorValidatorPipe', () => {
  it('create an instance', () => {
    const pipe = new ErrorValidatorPipe();
    expect(pipe).toBeTruthy();
  });
});
