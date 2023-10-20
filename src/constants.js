export const apiUrl = 'https://jsonplaceholder.typicode.com/todos'
export const toastTimeout = 3500

export const toastifySettings = {
    position: "top-right",
    autoClose: toastTimeout,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}

export const daysShortTexts = [
    'Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'
]

export const STATUS_PARTIAL = 'Partial'
export const STATUS_COMPLETED = 'Completed'
export const STATUS_None = 'None'

export const getActivityStatus = (habit, dayText, dayNumber) => {
    let status = ''
    habit.days.forEach(item => {
        if (item.day === dayNumber) {
            if(item.status === STATUS_COMPLETED) {
                status= `completed`
            }
            
            if(item.status === STATUS_PARTIAL) {
                status= `partial`
            }
        }
    })
    return status
}