import pkg from 'jsonwebtoken';

const { sign } = pkg;

const token = sign(
  { userId: '1', name: 'John Doe' },
  'oScfEDmtkFqWWZL+/+rJYPCXXhXLAgx7goTxyJ993GJ5Ht8MmdVKwoo/kAF/GOH7gOAT6ZEaNHf6DxHHbk1BQ9V67enMowzRQYhhMQep79xphEa2V+C7Rq117bKHyGiqEyioKQ9trKTfBtPFNesW0W9goR6uIxDdd6gTNsDKrOkfNwJ+fK/2EBUxcRa5hNnB+Wen16KS81sMOo9TdzL3pJUx7DSRugFBg7LWVYhKg3xIA4yQ3h1lW4jS8d6tUcdyi/l1TWBh4RsyC2vBjTJ6HZLVOoBBI3D7zEtj4/rzW5geAavXjeh58Hl6G0JxDyQ6XEECl/i9BpLcSn/zuIre1g==',
  {
    expiresIn: '1h',
  },
);
console.log(token);
