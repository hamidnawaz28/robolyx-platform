export const setProgressStatus=(data, percentage)=>(
    {
        type: "UPDATE_PROGRESS_STATUS",
        payload: data,
        percentage
    }
);