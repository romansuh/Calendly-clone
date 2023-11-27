export const submitCreateEventFormData = (values, callDispatch) => {
    const eventData = {
        eventName: values.eventName,
        description: values.description,
        dateTime: values.dateTime,
    };

    callDispatch(eventData);
};