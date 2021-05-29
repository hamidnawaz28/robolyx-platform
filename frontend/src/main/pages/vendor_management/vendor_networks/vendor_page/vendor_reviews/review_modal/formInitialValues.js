import FormModel from './FormModel';
const {
	formField: { review_name, review_template_id },
} = FormModel;

const formInitialValues = {
	[review_name.name]: '',
	[review_template_id.name]: '',
};

export default formInitialValues;
