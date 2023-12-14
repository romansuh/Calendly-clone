export const submitCreateEventFormData = (values, ownerId, callDispatch) => {
    const eventData = {
        ownerId: ownerId,
        name: values.name,
        description: values.description,
        dateTime: values.dateTime,
        participants: values.selectedUsers.map(
            selectedUser => ({
                id: selectedUser.id,
                name: selectedUser.username,
                email: selectedUser.email,
            })
        ),
    };

    callDispatch(eventData);
};