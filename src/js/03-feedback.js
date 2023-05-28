import throttle from 'lodash.throttle';

let formData = {};
const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

refs.input.addEventListener('input', e => {
  formData[e.target.name] = e.target.value;
});

populateFeedbackForm();

function onFormSubmit(e) {
  e.preventDefault();
  console.log({ email: refs.input.value, message: refs.textarea.value });
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateFeedbackForm() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    formData = JSON.parse(data);
    refs.input.value = formData.email;
    refs.textarea.value = formData.message;
  }
}
