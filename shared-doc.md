# Dynamic input field

This input component reciever prop of 
formGroup and Object with props of input element's properties( input type, placeholder, validation... etc), passed from their parent component and also recieve and event from the parent component that emit message to toast component for various visual feedback.

## Analysis:

prop passed to dynamic input component
example:


loginInputConfig = [
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter address here',
      validators: [Validators.required, Validators.email]
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: '******',
      validators: [Validators.required, Validators.minLength(8)]
    },
  ];
