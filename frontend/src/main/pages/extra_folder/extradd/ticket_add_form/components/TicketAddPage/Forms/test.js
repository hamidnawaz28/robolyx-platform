let post_data = {...values };

post_data.created_by = 1;
post_data.vendor_number =
    'SUPP' + Math.floor(1000 + Math.random() * 90000000);

post_data = JSON.stringify(post_data, null, 2);
console.log(values);
axios.post(`/vendor/basic/`, post_data).then((res) => {
    setErrorCheck(res.data.error);
    console.log(res);
    console.log(res.data.error);
    if (res.data.error) {
        const error = JSON.stringify(res.data.message, null, 2);
        setSubmitError(error), actions.setSubmitting(false);
    } else
        setSubmitError(''),
        console.log('No Error'),
        actions.setSubmitting(false),
        history.push('/dashboard/default/');
});