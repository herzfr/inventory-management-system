import { UuidMaskPipe } from "./uuid-mask.pipe";


describe('HiddenStringPipe', () => {
  it('create an instance', () => {
    const pipe = new UuidMaskPipe();
    expect(pipe).toBeTruthy();
  });
});
