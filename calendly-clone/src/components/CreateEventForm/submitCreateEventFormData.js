export const submitCreateEventFormData = (values, ownerId, callDispatch) => {
    const eventData = {
        name: values.eventName,
        description: values.description,
        dateTime: values.dateTime,
        participantsId: values.selectedUsers.map(
            (selectedUser) => ({
                name: selectedUser.username,
            })
        ),
    };

    callDispatch(eventData);
};