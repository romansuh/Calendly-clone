export const submitCreateEventFormData = (values, callDispatch) => {
    const event = {
        name: values.name,
        description: values.description,
    }

    callDispatch(event);
};