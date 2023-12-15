import {PARTICIPANT_STATUS} from "../../../common/constants/constants";

export const submitCreateEventFormData = (values, ownerId, callDispatch) => {
    const selectedUserStatusCalculation = (selectedUserId) => {
        if (selectedUserId === ownerId) {
            return PARTICIPANT_STATUS.ACCEPTED
        } else {
            return PARTICIPANT_STATUS.PENDING
        }
    };

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
                status: selectedUserStatusCalculation(selectedUser.id)
            })
        ),
    };

    callDispatch(eventData);
};