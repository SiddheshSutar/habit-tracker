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

export const STATUS_DONE = 'Completed'
export const STATUS_NOT_DONE = 'Not Done'
export const STATUS_NONE = 'None'

export const getActivityStatus = (habit, dayText, dayNumber) => {
    let status = ''
    habit.days.forEach(item => {
        const indexFromStore = (new Date(item.day)).getDay()

        if (daysShortTexts[indexFromStore] === dayText) {
            if(item.status === STATUS_DONE) {
                status= `completed`
            }
            
            if(item.status === STATUS_NOT_DONE) {
                status= `partial`
            }
        }
    })
    return status
}

export const getStatusValue = (habitObj, selectedDayString) => {
    if(habitObj.days.find(item => item.day === selectedDayString)) {
        return habitObj.days.find(item => item.day === selectedDayString).status
    }
    else return STATUS_NONE
}

export const generateDayArrAsPerCurrentDay = (daysArr) => {
    const currentDayObj = (new Date())
    const selectedDayIndex = new Date(currentDayObj.getTime() - 6*24*60*60*1000).getDay(); // 7 days before

    let newArr = [...daysArr]
    let shiftedArr=[]
    for (let i=0; i< selectedDayIndex; i++) {
        const shiftedPos = newArr.shift()
        shiftedArr.push(shiftedPos)
    }
    newArr = [...newArr, ...shiftedArr]

    return newArr
}